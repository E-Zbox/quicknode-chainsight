import styled from "styled-components";

interface IMainTxLog {
  $isCompactView: boolean;
}

interface ITxText {
  $highlight: boolean;
}

interface IToggleCompact {
  $bgImg: string;
}

export const MainPagination = styled.main`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: calc(var(--ten-px) * 1.4) 0px;
  background-color: ${({ theme: { white01 } }) => white01};
`;

export const MainTxLogHeader = styled.div`
    --borderLine: 1px solid ${({ theme: { black01 } }) => `${black01}45`}: 
  width: 100%;
  height: 50px;
  display: grid;
  place-items: center;
  grid-template-columns: 150px 200px 550px 200px;
  border-bottom: var(--borderLine);
`;

export const MainTxLog = styled.div<IMainTxLog>`
  --borderLine: 1px solid ${({ theme: { black01 } }) => `${black01}12`};
  width: 100%;
  ${({ $isCompactView }) =>
    $isCompactView
      ? `
      height: 50px;
      display: grid;
      place-items: center;
      grid-template-columns: 150px 200px 550px 200px;
  `
      : `
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: calc(var(--ten-px) * 2) calc(var(--ten-px) * 3);
      `}
  border-bottom: var(--borderLine);
`;

export const TxHeaderText = styled.h4`
  width: 100%;
  font-family: Roboto;
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.87;
  text-align: center;
`;

export const TxText = styled.h4<ITxText>`
  width: 100%;
  text-align: center;
  overflow-x: scroll;
  ${({ $highlight, theme: { blue01, black01 } }) =>
    $highlight
      ? `
    color: ${blue01};

    &:hover {
        color: ${blue01};
    }
  `
      : `
    color: ${black01};
  `}
`;

export const ToggleCompact = styled.button<IToggleCompact>`
  --size: 20px;
  height: var(--size);
  width: var(--size);
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
`;

export const VerboseTitle = styled.h4`
  width: fit-content;
  color: ${({ theme: { black01 } }) => `${black01}7C`};
  font-size: 1.1rem;
  font-weight: bold;
  padding-left: var(--ten-px);

  span {
    color: ${({ theme: { black01 } }) => `${black01}BC`};
  }
`;

export const VerboseField = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: calc(var(--seven-px) * 2) 0px;
`;

export const VerboseFieldName = styled.h4`
  width: 150px;
  color: ${({ theme: { black01 } }) => `${black01}AC`};
  font-size: 1rem;
`;

export const VerboseFieldValue = styled(VerboseFieldName)`
  width: fit-content;
  font-family: "Nunito Sans";
  font-size: 1.05rem;
  font-weight: bold;
  margin-left: calc(var(--ten-px) * 2);
  color: ${({ theme: { black01 } }) => `${black01}EC`};
`;

export const TopicField = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: calc(var(--seven-px) * 2.5);
  margin-left: calc(var(--ten-px) * 4);
  background-color: ${({ theme: { white02 } }) => white02};
`;

export const TopicFieldName = styled.h4`
  opacity: 0.37;
  font-family: "Nunito Sans";
  font-size: 1.1rem;
  color: ${({ theme: { black01 } }) => black01};
`;

export const TopicFieldValue = styled.h4`
  font-family: "Nunito Sans";
  font-size: 1.1rem;
  color: ${({ theme: { black01 } }) => black01};
  margin-left: calc(var(--ten-px) * 3);
`;
