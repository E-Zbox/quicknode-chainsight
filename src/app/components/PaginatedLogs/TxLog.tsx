"use client";
import { useState } from "react";
import {
  MainTxLog,
  ToggleCompact,
  TopicField,
  TopicFieldName,
  TopicFieldValue,
  TxText,
  VerboseField,
  VerboseFieldName,
  VerboseFieldValue,
  VerboseTitle,
} from "@/app/styles/PaginatedLogs.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import { convertTimeInMsToWords } from "@/utils/transformers";

interface IRowLogProps {
  blockNumber: string;
  logIndex: string;
  timestamp: string;
  topics: string[];
  transactionIndex: string;
  transactionHash: string;
}

const TxLog = ({
  blockNumber,
  logIndex,
  timestamp,
  topics,
  transactionIndex,
  transactionHash,
}: IRowLogProps) => {
  const [isCompactView, setIsCompactView] = useState(true);

  const {
    paginatedLogs: {
      assets: { hideLogIcon, showLogIcon },
    },
  } = screens;

  const toggleIsCompactView = () => {
    setIsCompactView((prevState) => !prevState);
  };

  if (isCompactView) {
    return (
      <MainTxLog $isCompactView={isCompactView}>
        <ToggleCompact
          $bgImg={isCompactView ? showLogIcon.src : hideLogIcon.src}
          onClick={toggleIsCompactView}
        />
        <TxText $highlight={false}>{Number(blockNumber)}</TxText>
        <TxText $highlight={true}>{transactionHash}</TxText>
        <TxText $highlight={false}>
          {convertTimeInMsToWords(Number(timestamp) * 1000)}
        </TxText>
      </MainTxLog>
    );
  }

  const verboseDate = new Date(Number(timestamp) * 1000).toDateString();

  return (
    <MainTxLog $isCompactView={isCompactView}>
      <FlexContainer $flexDirection="row" $alignItems="center">
        <ToggleCompact
          $bgImg={isCompactView ? showLogIcon.src : hideLogIcon.src}
          onClick={toggleIsCompactView}
        />
        <VerboseTitle>
          Transaction Receipt on <span>{verboseDate}</span>
        </VerboseTitle>
      </FlexContainer>
      <VerboseField>
        <VerboseFieldName>Block Number</VerboseFieldName>
        <VerboseFieldValue>{blockNumber}</VerboseFieldValue>
      </VerboseField>
      <VerboseField>
        <VerboseFieldName>Log Index</VerboseFieldName>
        <VerboseFieldValue>{Number(logIndex)}</VerboseFieldValue>
      </VerboseField>
      <VerboseField>
        <VerboseFieldName>Topics</VerboseFieldName>
        <TopicField>
          {topics.map((topic, index) => (
            <FlexContainer key={index} $flexDirection="row" $padding="5px 0px">
              <TopicFieldName>{index}</TopicFieldName>
              <TopicFieldValue>{topic}</TopicFieldValue>
            </FlexContainer>
          ))}
        </TopicField>
      </VerboseField>
      <VerboseField>
        <VerboseFieldName>Transaction Hash</VerboseFieldName>
        <VerboseFieldValue>{transactionHash}</VerboseFieldValue>
      </VerboseField>
      <VerboseField>
        <VerboseFieldName>Transaction Index</VerboseFieldName>
        <VerboseFieldValue>{transactionIndex}</VerboseFieldValue>
      </VerboseField>
    </MainTxLog>
  );
};

export default TxLog;
