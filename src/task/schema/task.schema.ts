import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { Document, Model } from 'mongoose';

import { User } from '../../user/schema';

@Schema()
export class Task {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ default: Date.now() })
  wrote: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = Task & Document;
/*
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;
*/

export type TaskModel = Model<Task>;
