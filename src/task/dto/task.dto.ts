import { Document } from 'mongoose';

export interface TaskDto extends Document {
  id?: string;

  title: string;

  description: string;

  done: boolean;
}
