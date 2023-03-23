import styled from "styled-components";

export const StyledPersona = styled.div`
  width: "max-content";
  max-width: 300px;
  padding: 8px 6px;
  background-color: ${(props) => props.theme.blue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledAvatar = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.blue500};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const StyledName = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
`;
