import { CircularProgress } from "@mui/material";
import { StyledLoaderContainer } from "./styles";

export const Loader = () => {
  return (
    <StyledLoaderContainer>
      <CircularProgress />
    </StyledLoaderContainer>
  );
};
