import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from '../schemas/Entry';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [EntryService],
  controllers: [EntryController],
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
export class EntryModule {}
