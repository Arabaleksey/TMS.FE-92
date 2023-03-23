import axios from "axios";
import { api } from "..";

const postsLimit = 11;

export const getAllPosts = (page?: number | null) => {
  return axios.get("https://studapi.teachmeskills.by/blog/posts/", {
    params: {
      limit: postsLimit,
      offset: page ? (page - 1) * postsLimit : 0,
    },
  });
};

export const createPost = (body: any) => {
  return api.post("blog/posts/", body);
};
