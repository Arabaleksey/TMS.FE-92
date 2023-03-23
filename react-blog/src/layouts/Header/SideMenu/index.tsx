import { Routes } from "../../../constants/Routes";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  StyledLogOut,
  StyledMenu,
  StyledNavLink,
  StyledNavMenu,
  StyledNavMenuItem,
  StyledThemeSelectorContainer,
} from "./styles";
import { ThemeSelector } from "./ThemeSelector";
import { useDispatch, useSelector } from "react-redux";
import { uiThemeSelector } from "../../../store/uiSlice/selectors";
import { setTheme, UITheme } from "../../../store/uiSlice";
import { resetUser } from "../../../store/userSlice";
import { userSelector } from "../../../store/userSlice/selectors";
import { useHistory } from "react-router-dom";

interface INavLink {
  to: Routes;
  exact: boolean;
  activeClassName: string;
  label: string;
}

const activeClassName = "active";

const navLinks: INavLink[] = [
  {
    to: Routes.HOME,
    exact: true,
    activeClassName,
    label: "Home",
  },
  {
    to: Routes.ALL_POSTS,
    exact: true,
    activeClassName,
    label: "All Posts",
  },
  {
    to: Routes.ADD_POST,
    exact: true,
    activeClassName,
    label: "Add post",
  },
];

interface IProps {
  closeMenu: () => void;
}

export const SideMenu = React.forwardRef<{}, IProps>(({ closeMenu }, ref) => {
  const history = useHistory();

  const user = useSelector(userSelector);
  const uiTheme = useSelector(uiThemeSelector);

  const dispatch = useDispatch();

  const onClickTheme = (themeName: UITheme) => () => {
    dispatch(setTheme(themeName));
  };

  const onLoginAction = () => {
    if (user.isAuth) {
      dispatch(resetUser());
    } else {
      history.push(Routes.LOGIN);
      closeMenu();
    }
  };

  return (
    <StyledMenu ref={ref as any}>
      <StyledNavMenu>
        {navLinks.map(({ to, exact, activeClassName, label }) => (
          <StyledNavMenuItem>
            <StyledNavLink
              to={to}
              activeClassName={activeClassName}
              exact={exact}
            >
              {label}
            </StyledNavLink>
          </StyledNavMenuItem>
        ))}
      </StyledNavMenu>
      <div>
        <StyledThemeSelectorContainer>
          <ThemeSelector
            isActive={uiTheme === "light"}
            onClick={onClickTheme("light")}
          >
            <LightModeIcon />
          </ThemeSelector>
          <ThemeSelector
            isActive={uiTheme === "dark"}
            onClick={onClickTheme("dark")}
          >
            <DarkModeIcon />
          </ThemeSelector>
        </StyledThemeSelectorContainer>
        <StyledLogOut withWholeWidth onClick={onLoginAction}>
          {user.isAuth ? "Log Out" : "Login"}
        </StyledLogOut>
      </div>
    </StyledMenu>
  );
});
