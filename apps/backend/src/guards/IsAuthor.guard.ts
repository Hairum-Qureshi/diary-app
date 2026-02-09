import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntryService } from 'src/entry/entry.service';
import { Entry, EntryDocument } from 'src/schemas/Entry';

@Injectable()
export class IsAuthorGuard implements CanActivate {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
    @Inject(EntryService) private entryService: EntryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { month, day, year } = request.params;
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );

    let entry;
    if (month && day && year) {
      const { startOfDay, endOfDay } =
        this.entryService.getStartAndEndOfDayUTC(date);

      entry = await this.entryModel.findOne({
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });
    } else {
      const { entryID } = request.params;

      entry = await this.entryModel.findById(entryID);
    }

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    if (entry.visibility === 'private') {
      if (entry.uid !== user._id) {
        throw new ForbiddenException('You do not own this entry');
      }
    }

    return true;
  }
}
