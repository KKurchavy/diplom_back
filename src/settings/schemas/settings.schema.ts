import { Schema } from 'mongoose';


export const SettingsSchema = new Schema({
    controlMode: Boolean,
    engRus: Boolean,
    SplitMode: String,
    allPermissions: Boolean
});