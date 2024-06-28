import styled from "styled-components";

interface IMainExternalLink {
  $onHover: boolean;
}

export const MainExternalLink = styled.a<IMainExternalLink>`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;

  h4 {
    position: relative;
    text-decoration: none;
    ${({ $onHover, theme: { blue01 } }) =>
      $onHover
        ? `
        color: ${blue01}DE;
        &::before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 0px;
            height: 1px;
            width: 100%;
            background-color: ${blue01}d3;
        }
    `
        : ``}
  }

  img {
    --size: 14px;
    height: var(--size);
    width: var(--size);
    margin-left: var(--seven-px);
  }

  span {
    font-size: 0.9rem;
    color: ${({ theme: { blue01 } }) => blue01};
    padding-left: var(--three-px);
  }

  ${({ $onHover }) =>
    $onHover
      ? `
  `
      : `
    span, img {
        width: 0px;
        overflow: hidden;
        transition: 350ms linear;
    }
  `}
`;
