import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.blue};
  justify-content: space-between;
  align-items: stretch;
`;

export const StyledBlock = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-right: 0.5px solid ${(props) => props.theme.border};
  border-left: 0.5px solid ${(props) => props.theme.border};
`;

export const StyledMenuBlock = styled(StyledBlock)`
  border-left: none;
`;
