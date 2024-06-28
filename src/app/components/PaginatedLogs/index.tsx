"use client";
import React from "react";
// components
import TxLog from "./TxLog";
// store
import { useSearchStore, useTxLogStore } from "@/store";
// styles
import {
  MainPagination,
  MainTxLogHeader,
  TxHeaderText,
  VerboseTitle,
} from "@/app/styles/PaginatedLogs.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";

const PaginatedLogs = () => {
  const {
    formState: {
      input_latest_logs: { currentSearchQuery },
    },
  } = useSearchStore(({ formState }) => ({ formState }));

  const { logState } = useTxLogStore(({ logState }) => ({ logState }));

  if (currentSearchQuery.length > 0 && logState[currentSearchQuery]) {
    const txLog = logState[currentSearchQuery];

    return (
      <MainPagination>
        <MainTxLogHeader>
          <TxHeaderText>#</TxHeaderText>
          <TxHeaderText>Block</TxHeaderText>
          <TxHeaderText>Transaction Hash</TxHeaderText>
          <TxHeaderText>Age</TxHeaderText>
        </MainTxLogHeader>
        {txLog
          .slice(0, 20)
          .map(
            (
              {
                blockNumber,
                logIndex,
                timestamp,
                topics,
                transactionHash,
                transactionIndex,
              },
              index
            ) => (
              <TxLog
                key={index}
                blockNumber={blockNumber}
                logIndex={logIndex}
                timestamp={timestamp}
                topics={topics}
                transactionHash={transactionHash}
                transactionIndex={transactionIndex}
              />
            )
          )}
      </MainPagination>
    );
  }

  if (currentSearchQuery.length > 0) {
    return (
      <MainPagination>
        <FlexContainer $flexDirection="row" $justifyContent="center">
          <VerboseTitle>
            "{currentSearchQuery}" has no transactions to show
          </VerboseTitle>
        </FlexContainer>
      </MainPagination>
    );
  }

  return <></>;
};

export default PaginatedLogs;
