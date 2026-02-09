import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntry } from 'src/DTOs/CreateEntry.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { IsAuthorGuard } from 'src/guards/IsAuthor.guard';

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
}
