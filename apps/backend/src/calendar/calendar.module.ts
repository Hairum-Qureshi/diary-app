import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from 'src/schemas/Entry';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CalendarService],
  controllers: [CalendarController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Entry.name,
        schema: EntrySchema,
      },
    ]),
    AuthModule,
  ],
})
export class CalendarModule {}
