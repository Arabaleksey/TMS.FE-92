import { Menu } from "@mui/icons-material";
import { useRef, useState } from "react";
import { SideMenu } from "./SideMenu";
import { StyledHeader, StyledMenuBlock } from "./styles";
import { CSSTransition } from "react-transition-group";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Persona } from "./Persona";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/userSlice/selectors";
import { Search } from "./Search";

export const Header = () => {
  const user = useSelector(userSelector);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(headerRef, () => {
    setIsMenuOpen(false);
  });

  const toggleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <StyledHeader ref={headerRef}>
      <CSSTransition
        nodeRef={sideMenuRef}
        in={isMenuOpen}
        timeout={100}
        classNames="side-menu"
        unmountOnExit
      >
        <SideMenu ref={sideMenuRef} closeMenu={toggleMenuOpen} />
      </CSSTransition>
      <StyledMenuBlock>
        <Menu
          onClick={toggleMenuOpen}
          sx={{
            cursor: "pointer",
          }}
        />
      </StyledMenuBlock>
      <Search />
      <div>
        <Persona name={user.name} />
      </div>
    </StyledHeader>
  );
};
