import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document, Model } from 'mongoose';

import { Task } from '../../task/schema';

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({ required: true, min: 18, max: 75 })
  age: number;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ trim: true })
  avatar: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;

export type UserModel = Model<User>;
