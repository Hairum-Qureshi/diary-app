import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEntry } from 'src/DTOs/CreateEntry.dto';
import { EditEntry } from 'src/DTOs/EditEntry.dto';
import { Entry, EntryDocument } from 'src/schemas/Entry';
import { EntriesArchive } from 'src/types';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  getStartAndEndOfDayUTC(date: Date) {
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
      createdAt: date,
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

  async toggleEntryVisibility(entryID: string, uid: string) {
    const entry = await this.entryModel.findOne({ _id: entryID, uid });

    if (!entry) return null;

    entry.visibility = entry.visibility === 'private' ? 'public' : 'private';
    await entry.save();

    return entry;
  }

  async getShareableEntry(entryID: string) {
    const entry = await this.entryModel.findOne({
      _id: entryID,
      visibility: 'public',
    });

    if (!entry) return null;
    return entry;
  }

  async deleteEntry(entryID: string, uid: string) {
    const entry = await this.entryModel.findOneAndDelete({ _id: entryID, uid });

    if (!entry) return null;

    return { success: true };
  }

  async editEntry(entryID: string, uid: string, editEntryDto: EditEntry) {
    const entry = await this.entryModel.findOne({ _id: entryID, uid });

    if (!entry) return null;

    entry.title = editEntryDto.title;
    entry.createdAt = new Date(editEntryDto.date);
    entry.content = editEntryDto.content;

    await entry.save();

    return entry;
  }

  async getAllEntries(uid: string) {
    const entries = await this.entryModel.find({ uid }).select('-__v');

    const postedYears: number[] = [];
    const archives: EntriesArchive[] = [];

    entries.forEach((entry) => {
      const currYear = entry.createdAt.getUTCFullYear();
      const exists = archives.some(
        (dateArchiveObj: EntriesArchive) => dateArchiveObj.year === currYear,
      );
      if (!exists) {
        postedYears.push(currYear);
        const months = [
          ...new Set(
            entries
              .filter((e) => e.createdAt.getUTCFullYear() === currYear)
              .map((e) => e.createdAt.getUTCMonth() + 1),
          ),
        ];

        archives.push({ year: currYear, months });
      }
    });

    return { postedYears, archives };
  }

  async deleteAllEntries(uid: string) {
    await this.entryModel.deleteMany({ uid });
    return { success: true };
  } 
}
