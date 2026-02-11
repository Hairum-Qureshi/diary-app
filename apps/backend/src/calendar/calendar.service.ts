import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry, EntryDocument } from 'src/schemas/Entry';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  async getEntriesByMonth(month: string, year: string, userId: string) {
    const startOfMonth = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, 1, 0, 0, 0, 0),
    );
    const startOfNextMonth = new Date(
      Date.UTC(parseInt(year), parseInt(month), 1, 0, 0, 0, 0),
    );

    return await this.entryModel
      .find({
        uid: userId,
        createdAt: { $gte: startOfMonth, $lt: startOfNextMonth },
      })
      .select('title createdAt');
  }
}
