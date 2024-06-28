import styled from "styled-components";

interface ISearch {
  $onFocused: boolean;
}

export const MainSearch = styled.div`
  position: relative;
  height: 50px;
  width: 450px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px calc(var(--ten-px) * 1.4);
  margin-bottom: calc(var(--ten-px));
  border: 1px solid ${({ theme: { textColor } }) => `${textColor}0A`};
`;

export const SearchLabel = styled.label<ISearch>`
  position: absolute;
  width: fit-content;
  font-family: "Source Sans Pro";
  font-weight: bolder;
  opacity: 0.48;
  ${({ $onFocused, theme: { black01, white02 } }) =>
    $onFocused
      ? `
      top: 0px;
      font-size: 0.95rem;
      padding: 0 30px 0px 10px;
      transform: translate(0px, -50%);
      background-color: ${black01};

      &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        background-color: ${white02};
        z-index: -1;
      }
  `
      : `
      top: 50%;
      left: 15px;
      font-size: 0.92rem;
      transform: translate(0px, -50%);
      `}
`;

export const SearchInput = styled.input`
  outline: none;
  background: none;
  border: none;
  width: 100%;
  font-size: 1rem;
`;

export const SearchIcon = styled.img`
  --size: 28px;
  scale: 0.9;
  height: var(--size);
  width: var(--size);

  &:hover {
    scale: 1;
  }

  &:active {
    scale: 0.93;
  }
`;
