import { IPost } from "../store/postsSlice";

export interface IPostsResponse {
  count: number;
  next: string;
  previous: null | string;
  results: IPost[];
}
