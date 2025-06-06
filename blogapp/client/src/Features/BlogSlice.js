import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
    blogs: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const shareBlog = createAsyncThunk('blogs/shareBlog', async (blogData) => {
    try {
        const response = await axios.post(`${ENV.SERVER_URL}/share-blog`, {
            blogContent: blogData.blogContent,
            bloggedBy: blogData.bloggedBy,
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const getBlogs = createAsyncThunk('blogs/getBlogs', async (blogData) => {
    try {
        const response = await axios.get(`${ENV.SERVER_URL}/get-blogs`);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const likeBlog = createAsyncThunk('blogs/likeBlog', async (blogData) => {
    try {
        const response = await axios.post(`${ENV.SERVER_URL}/like-blog/${blogData.blogID}`, {
            userID: blogData.userID,
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(shareBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(shareBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(shareBlog.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = action.payload.blogs;
            })
            .addCase(getBlogs.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(likeBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likeBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const blogToUpdateIndex = state.blogs.findIndex((blog) => blog._id === action.payload.blog._id);
                if (blogToUpdateIndex !== -1) {
                    state.blogs[blogToUpdateIndex].likes = action.payload.blog.likes;
                }
            })
            .addCase(likeBlog.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;