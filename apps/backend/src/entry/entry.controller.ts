import { Body, Controller, Post } from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntry } from 'src/DTOs/CreateEntry.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

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
}
