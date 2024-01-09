import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['todo', 'in progress', 'completed', 'cancelled', 'postponed', 'deleted', 'archived'], default: 'todo' },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    completed_at: Date,
    due_date: Date,
    priority: { type: Number, default: 0 },
    tags: [String],
    subtasks: [String],
    parent: { type: String, default: null },
    comments: [String],
    attachments: [String],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Task', TaskSchema);