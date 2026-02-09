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

  async createEntry(createEntryDto: CreateEntry, uid: string) {
    const date = new Date(createEntryDto.date);

    const startOfday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    );

    const entryExists = await this.entryModel.findOne({
      uid,
      createdAt: {
        $gte: startOfday,
        $lt: endOfDay,
      },
    });

    if (entryExists) return entryExists;

    const createdEntry = new this.entryModel({
      ...createEntryDto,
      uid,
      createdAt: date,
    });

    return createdEntry.save();
  }
}
