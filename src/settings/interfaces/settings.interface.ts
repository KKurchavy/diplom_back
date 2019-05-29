import { Document } from 'mongoose';

export interface Settings extends Document {
    controlMode: boolean;
    engRus: boolean;
    splitMode: string;
    allPermissions: boolean;
}