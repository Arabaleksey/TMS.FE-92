import { CircularProgress, Pagination } from "@mui/material";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components";
import { Routes } from "../../constants/Routes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getPosts } from "../../store/postsSlice";
import {
  StyledContainer,
  StyledLeftColumn,
  StyledMainPost,
  StyledPaginationContainer,
  StyledPost,
  StyledPostsContainer,
  StyledRightColumn,
} from "./styles";

export const AllPosts = () => {
  const { loading, posts, count } = useTypedSelector((store) => store.posts);

  const dispatch = useAppDispatch();

  const onChangePage = (event: React.ChangeEvent<any>, pageNumber: number) => {
    dispatch(getPosts(pageNumber));
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <StyledContainer>
      {loading ? (
        <Loader />
      ) : (
        <StyledPostsContainer>
          <StyledLeftColumn>
            <StyledMainPost>
              <StyledPost>{posts[0]?.id}</StyledPost>
            </StyledMainPost>
            {posts.slice(1, 5).map((post) => (
              <StyledPost> {post.id}</StyledPost>
            ))}
          </StyledLeftColumn>
          <StyledRightColumn>
            {posts.slice(6, 11).map((post) => (
              <StyledPost>{post.id}</StyledPost>
            ))}
          </StyledRightColumn>
        </StyledPostsContainer>
      )}

      <StyledPaginationContainer>
        <Pagination count={Math.ceil(count / 11)} onChange={onChangePage} />
      </StyledPaginationContainer>
    </StyledContainer>
  );
};
