import styled from "styled-components";

interface IMainScreenCard {
  $collapsed: boolean;
}

export const MainScreenCard = styled.main<IMainScreenCard>`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  border-radius: 4px;
  margin-bottom: calc(var(--seven-px) * 3);
  ${({ $collapsed, theme: { black01, white02 } }) =>
    $collapsed
      ? `
    background-color: ${black01}03};
  `
      : `
    padding: calc(var(--ten-px) * 2);
    background-color: ${white02};
  `}
`;

export const TitleButton = styled.button`
  border: none;
  outline: none;
  background: none;
  max-width: 100%;
  width: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--seven-px) * 1.4) calc(var(--ten-px) * 1.4);
  border-radius: 10px;
  box-shadow: 0px 0px 5px ${({ theme: { textColor } }) => `${textColor}11`}
    inset;

  &:hover {
    box-shadow: 1px 1px 5px ${({ theme: { textColor } }) => `${textColor}21`}
        inset,
      -1px -1px 5px ${({ theme: { textColor } }) => `${textColor}21`} inset;
  }
`;

export const Title = styled.h4`
  font-family: "Source Sans Pro";
  font-size: 1.1rem;
  font-weight: bolder;
`;
