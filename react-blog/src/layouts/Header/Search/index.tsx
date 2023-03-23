import { StyledSearchContainer } from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import { StyledBlock } from "../styles";

export const Search = () => {
  return (
    <StyledSearchContainer>
      <StyledBlock>
        <SearchIcon />
      </StyledBlock>
    </StyledSearchContainer>
  );
};
