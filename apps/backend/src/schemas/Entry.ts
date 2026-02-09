import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Entry {
  @Prop({ type: String, ref: 'User' })
  uid: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 'private' })
  visibility: 'public' | 'private';

  @Prop({ default: Date.now })
  createdAt: Date;
}

SchemaFactory.createForClass(Entry);
export const EntrySchema = SchemaFactory.createForClass(Entry);
export type EntryDocument = HydratedDocument<Entry>;
