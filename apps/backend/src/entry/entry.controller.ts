import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntry } from 'src/DTOs/CreateEntry.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { IsAuthorGuard } from 'src/guards/IsAuthor.guard';
import { EditEntry } from 'src/DTOs/EditEntry.dto';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post('new')
  @UseGuards(AuthGuard())
  createEntry(
    @Body() createEntryDto: CreateEntry,
    @CurrentUser() user: types.UserPayload,
  ) {
    return this.entryService.createEntry(createEntryDto, user._id);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  getAllEntries(@CurrentUser() user: types.UserPayload) {
    return this.entryService.getAllEntries(user._id);
  }

  @Delete('all')
  @UseGuards(AuthGuard())
  deleteAllEntries(@CurrentUser() user: types.UserPayload) {
    return this.entryService.deleteAllEntries(user._id);
  }

  @Get(':month/:day/:year')
  @UseGuards(AuthGuard(), IsAuthorGuard)
  getEntryByDate(
    @Param('month') month: string,
    @Param('day') day: string,
    @Param('year') year: string,
    @CurrentUser() user: types.UserPayload,
  ) {
    return this.entryService.getEntryByDate(month, day, year, user._id);
  }

  @Patch(':entryID/toggle-visibility')
  @UseGuards(AuthGuard(), IsAuthorGuard)
  toggleEntryVisibility(
    @Param('entryID') entryID: string,
    @CurrentUser() user: types.UserPayload,
  ) {
    return this.entryService.toggleEntryVisibility(entryID, user._id);
  }

  @Get(':entryID')
  getShareableEntry(@Param('entryID') entryID: string) {
    return this.entryService.getShareableEntry(entryID);
  }

  @Delete(':entryID')
  @UseGuards(AuthGuard(), IsAuthorGuard)
  deleteEntry(
    @Param('entryID') entryID: string,
    @CurrentUser() user: types.UserPayload,
  ) {
    return this.entryService.deleteEntry(entryID, user._id);
  }

  @Patch(':entryID/edit')
  @UseGuards(AuthGuard(), IsAuthorGuard)
  editEntry(
    @Param('entryID') entryID: string,
    @Body() editEntryDto: EditEntry,
    @CurrentUser() user: types.UserPayload,
  ) {
    return this.entryService.editEntry(entryID, user._id, editEntryDto);
  }
}
