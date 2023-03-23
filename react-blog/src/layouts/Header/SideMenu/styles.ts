import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { CommonButton } from "../../../components";

const appearFromLeft = keyframes`
 0% { transform: translate(-100%) }
 100% { transform: translate(0) }
`;

export const StyledMenu = styled.menu`
  position: fixed;
  left: 0;
  bottom: 0;
  height: calc(100% - 40px);
  width: 200px;
  background-color: white;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-left: 0;
  &.side-menu-exit-active {
    animation: ${appearFromLeft} 0.1s linear reverse forwards;
  }
  &.side-menu-enter-active {
    animation: ${appearFromLeft} 0.1s linear;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledNavMenu = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const StyledNavMenuItem = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  text-align: center;
  border-bottom: ${(props) => `1px solid ${props.theme.border}`};
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => `${props.theme.mainText}`};
  &.active {
    color: ${(props) => `${props.theme.blue}`};
  }
`;

export const StyledThemeSelectorContainer = styled.div`
  display: flex;
  & button:first-child {
    border-right: 1px solid ${(props) => `${props.theme.border}`};
  }
`;

export const StyledThemeSelector = styled.button<{ isActive: boolean }>`
  background-color: transparent;
  border: 0;
  outline: 0;
  height: 50px;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid ${(props) => `${props.theme.border}`};
  & * {
    opacity: ${(props) => (props.isActive ? 1 : 0.4)};
  }
`;

export const StyledLogOut = styled(CommonButton)`
  background-color: ${(props) => `${props.theme.gray200}`};
  height: 50px;
  color: ${(props) => `${props.theme.mainText}`};
  border-radius: 0;
`;
