import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CurrentUser } from '../decorators/currentUser.decorator';
import * as types from '../types';
import { AuthGuard } from '@nestjs/passport';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get('entries/:month/:year')
  @UseGuards(AuthGuard())
  async getEntriesByMonth(
    @Param('month') month: string,
    @Param('year') year: string,
    @CurrentUser() user: types.UserPayload,
  ) {
    return await this.calendarService.getEntriesByMonth(month, year, user._id);
  }
}
