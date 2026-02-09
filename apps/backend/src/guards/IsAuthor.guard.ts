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

    const { startOfDay, endOfDay } =
      this.entryService.getStartAndEndOfDayUTC(date);

    const entry = await this.entryModel.findOne({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    if (entry.uid !== user._id && entry.visibility === 'private') {
      throw new ForbiddenException('You do not own this entry');
    }

    return true; // return a boolean for success
  }
}
