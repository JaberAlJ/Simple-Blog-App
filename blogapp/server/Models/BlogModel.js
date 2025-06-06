import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
    {
        blogContent: { type: String, require: true },
        bloggedBy: { type: String, require: true },
        likes: {
            count: { type: Number, default: 0 },
            users: { type: [String], default: [] }
        },
    },
    {
        timestamps: {createdAt: true, updatedAt: false},
    }
);

const BlogModel = mongoose.model("blogs", blogSchema);
export default BlogModel;