import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getPosts } from "./actions";
import { IPostsResponse } from "../../interfaces";

export interface IPost {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  description: string;
  author: number;
}

interface IPostState {
  posts: IPost[];
  count: number;
  loading: boolean;
  nextUrl: string | null;
}

const initialState: IPostState = {
  posts: [],
  count: 0,
  loading: false,
  nextUrl: null,
};

export const userSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<IPostsResponse>) => {
        state.loading = false;
        state.posts = action.payload.results;
        state.count = action.payload.count;
      }
    );
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;

export * from "./actions";
