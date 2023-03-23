import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPosts } from "../../services/blog";

export const getPosts = createAsyncThunk(
  "posts/getall",
  async (page?: number | null) => {
    const response = await getAllPosts(page);

    return response.data;
  }
);
