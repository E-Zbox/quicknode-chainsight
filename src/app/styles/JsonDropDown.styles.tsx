import styled from "styled-components";

interface IFieldDropDown {
  $collapsed: boolean;
  $hasChildren: boolean;
}

interface IDropDownIcon {
  $bgImg: string;
  $size: string;
}

export const DropDownTitle = styled.h4`
  width: 100%;
  text-align: left;
  font-size: 1.95rem;
  font-weight: bold;
  margin: calc(var(--ten-px) * 3) 0px calc(var(--ten-px) * 2);
`;

export const MainDropDown = styled.main`
  position: relative;
  height: fit-content;
  min-height: 50vh;
  max-height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: scroll;
  border-radius: 10px;
  padding: calc(var(--seven-px) * 1.5);
  box-shadow: 0px 0px 5px ${({ theme: { white01 } }) => `${white01}43`} inset,
    0px 0px 10px ${({ theme: { black01 } }) => `${black01}33`} inset;
  background-color: ${({ theme: { white01 } }) => `${white01}44`};

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background-color: ${({ theme: { white01 } }) => `${white01}13`};
  }
`;

export const FieldDropDown = styled.div<IFieldDropDown>`
  position: relative;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 4px;
  cursor: pointer;
  ${({ $collapsed, $hasChildren, theme: { black01, white02 } }) =>
    $hasChildren
      ? `
      padding: var(--seven-px);
      margin-bottom: calc(var(--three-px) * 2);
      background-color: ${black01}11;

      & > div {
        &:first-of-type {
          margin: var(--three-px) 0px;
        }
      }

      &:hover {
        background-color: ${black01}31;
      }

      &::before {
        content: "";
        position: absolute;
        top: 35px;
        left: 26px;
        width: 1px;
        height: ${$collapsed ? "1px" : "calc(100% - 40px)"};
        background: linear-gradient(to bottom, ${white02}13, ${white02}7E, ${white02}7E, ${white02}05);
      }
    `
      : `
      margin-bottom: calc(var(--three-px));
      `}
`;

export const Field = styled.div<IFieldDropDown>`
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: calc(var(--three-px) * 2.5);
  overflow: hidden;
  border-radius: 4px;
  color: ${({ theme: { white02 } }) => white02};
  ${({ $hasChildren, theme: { black01, white02 } }) =>
    $hasChildren
      ? `
        background: linear-gradient(to bottom right, ${black01}CE, ${black01}CE, ${black01}9E);
    `
      : `
        background: ${black01}9E;
    `}
`;

export const FieldName = styled.h4`
  font-family: "Nunito Sans";
  font-size: 0.79rem;
  font-weight: 200;
  opacity: 0.67;
  margin-right: calc(var(--ten-px) * 3);
  color: ${({ theme: { white02 } }) => white02};
  text-transform: uppercase;
`;

export const FieldValue = styled.h4`
  font-size: 1rem;
  font-weight: 900;
  opacity: 1;
  width: fit-content;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: scroll;
  border-radius: 3px;
  padding: var(--three-px) var(--seven-px);
  color: ${({ theme: { blue01 } }) => `${blue01}DA`};
  background-color: ${({ theme: { black01 } }) => `${black01}13`};
  box-shadow: 0px 0px 4px ${({ theme: { black01 } }) => `${black01}43`} inset;
`;

export const DropDownIcon = styled.button<IDropDownIcon>`
  --color: ${({ theme: { white02 } }) => white02};
  height: ${({ $size }) => $size};
  width: ${({ $size }) => $size};
  border: 1px solid var(--color);
  border-radius: 4px;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  outline: none;
  margin-right: calc(var(--ten-px) * 1.5);

  &:hover {
    background-color: var(--color);
    border: 0px;
  }
`;
