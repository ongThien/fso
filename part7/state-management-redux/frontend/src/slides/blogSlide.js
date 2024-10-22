import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlide = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    create: (state, action) => [...state, action.payload],
    like: (state, action) => {
      const updated = action.payload;
      return state.map((blog) => (blog.id === updated.id ? updated : blog));
    },
    remove: (state, action) => {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    set: (state, action) => action.payload,
  },
});

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(set(blogs));
};

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog);
  dispatch(create(newBlog));
};

export const likeBlog = (blog) => async (dispatch) => {
  const updated = await blogService.update({ ...blog, likes: blog.likes + 1 });
  dispatch(like(updated));
};

export const removeBlog = (blog) => async (dispatch) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    await blogService.remove(blog.id);
    dispatch(remove(blog.id));
  }
};

export const { create, like, set, remove } = blogSlide.actions;
export default blogSlide.reducer;
