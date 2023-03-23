import styled from "styled-components";

export const StyledPost = styled.div`
  width: 100%;
  border: 1px solid black;
  background-color: #ffffff;
  height: 100%;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  width: 53%;
  max-width: 800px;
  margin: 0 auto;
  flex: 1;
`;

export const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledRightColumn = styled.div`
  display: grid;
`;

export const StyledLeftColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  align-items: stretch;
`;

export const StyledPostsContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  height: 100%;
`;

export const StyledMainPost = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
`;
