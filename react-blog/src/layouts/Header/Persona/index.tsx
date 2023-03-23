import { StyledAvatar, StyledName, StyledPersona } from "./styles";
import PersonIcon from "@mui/icons-material/Person";
import { StyledBlock } from "../styles";

interface IProps {
  name: string;
}

export const Persona = ({ name }: IProps) => {
  if (!name) {
    return (
      <StyledPersona>
        <PersonIcon />
      </StyledPersona>
    );
  }

  return (
    <StyledPersona>
      <StyledAvatar></StyledAvatar>
      <StyledName>{name}</StyledName>
    </StyledPersona>
  );
};
