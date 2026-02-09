import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEntry } from 'src/DTOs/CreateEntry.dto';
import { Entry, EntryDocument } from 'src/schemas/Entry';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  private getStartAndEndOfDayUTC(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
  }

  async createEntry(createEntryDto: CreateEntry, uid: string) {
    const date = new Date(createEntryDto.date);

    const { startOfDay, endOfDay } = this.getStartAndEndOfDayUTC(date);

    const entryExists = await this.entryModel.findOne({
      uid,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (entryExists) return entryExists;

    const createdEntry = new this.entryModel({
      ...createEntryDto,
      uid,
    });

    return createdEntry.save();
  }

  async getEntryByDate(month: string, day: string, year: string, uid: string) {
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );

    const { startOfDay, endOfDay } = this.getStartAndEndOfDayUTC(date);

    return (
      (await this.entryModel
        .findOne({
          uid,
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        })
        .select('-__v')) || []
    );
  }
}
