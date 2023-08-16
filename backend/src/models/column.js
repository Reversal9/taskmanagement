import { model, Schema } from 'mongoose';

const columnSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        issueIds: {
            type: [String],
            required: true,
        }
    }
);

export default model("Column", columnSchema);