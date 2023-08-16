import { model, Schema } from 'mongoose';

const issueSchema = new Schema(
    {
        summary: {
            type: String,
            required: true,
        },
        assigneeId: {
            type: String,
        }
    }
);

export default model("Issue", issueSchema);