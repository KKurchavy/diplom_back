import { Document } from 'mongoose';

export interface ControlTestDTO {
  executor: string;
  words: string[];
  dateCreated: Date;
}

export interface UpdateControlTestDTO {
  executor?: string;
  words?: string[];
  result?: string;
  resolved?: boolean;
}

export interface ControlTest extends Document {
  executor: string;
  words: any[];
  result: any;
  resolved: boolean;
  dateCreated: Date;
}
