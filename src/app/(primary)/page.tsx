"use client";
import React, { useEffect } from "react";
// api
import { getLatestLogs, traceTransactionHash } from "@/api";
// components
import ExternalLink from "../components/ExternalLInk";
import JsonDropDown from "../components/JsonDropDown";
import PaginatedLogs from "../components/PaginatedLogs";
import ScreenCard from "../components/ScreenCard";
import Searchbar from "../components/Searchbar";
// store
import {
  SCREEN_CARD_LATEST_LOGS,
  SCREEN_CARD_TRANSACTION_TRACER,
  useScreenCardStore,
  useSearchStore,
  useTracedTxStore,
  useTxLogStore,
} from "@/store";
// styles
import { HomeScreen } from "../styles/App.styles";
import { FlexContainer } from "../styles/shared/Container.styles";
import { SearchResultText } from "../styles/shared/Text.styles";

const LOCAL_STORAGE_TRACED_TX = "tracedTxState";
const LOCAL_STORAGE_TX_LOG = "logState";

export default function Home() {
  const { items } = useScreenCardStore(({ items }) => ({ items }));

  const { formState, updateFormState } = useSearchStore(
    ({ formState, updateFormState }) => ({ formState, updateFormState })
  );

  const { tracedTxState, updateTracedTxState } = useTracedTxStore(
    ({ tracedTxState, updateTracedTxState }) => ({
      tracedTxState,
      updateTracedTxState,
    })
  );

  const { logState, updateLogState } = useTxLogStore(
    ({ logState, updateLogState }) => ({ logState, updateLogState })
  );

  const screenCardItemKeys = Object.getOwnPropertyNames(items);

  const screenCardNodes: React.ReactNode[] = [];

  const handleSearch = async (SCREEN_CARD_X: string) => {
    switch (SCREEN_CARD_X) {
      case SCREEN_CARD_LATEST_LOGS:
        var {
          input_latest_logs: { currentSearchQuery, loading, value },
        } = formState;

        if (value.length == 0 || loading) return;

        var regexp = /^(0x)?[0-9a-fA-F]{40}$/;

        if (!regexp.test(value)) {
          console.log(`"${value}" is not a valid Ethereum address`);
          return;
        }

        var valueInLowerCase = value.toLowerCase();

        if (logState[valueInLowerCase]?.length > 0) {
          updateFormState({
            input_latest_logs: {
              currentSearchQuery: valueInLowerCase,
              loading: false,
              value: "",
            },
          });
          return;
        }

        updateFormState({
          input_latest_logs: {
            currentSearchQuery,
            loading: true,
            value,
          },
        });

        var { data: logsData, error, success } = await getLatestLogs(value);

        if (!success) {
          console.log(error);

          updateFormState({
            input_latest_logs: {
              currentSearchQuery: valueInLowerCase,
              loading: false,
              value,
            },
          });
          return;
        }

        updateLogState({ [value.toLowerCase()]: logsData });

        updateFormState({
          input_latest_logs: {
            currentSearchQuery: valueInLowerCase,
            loading: false,
            value: "",
          },
        });
        break;
      case SCREEN_CARD_TRANSACTION_TRACER:
        var {
          input_transaction_tracer: { currentSearchQuery, loading, value },
        } = formState;

        if (value.length == 0 || loading) return;

        var regexp = /^(0x)?[0-9a-fA-F]{64}$/;

        if (!regexp.test(value)) {
          console.log(`"${value}" is not a valid Ethereum address`);
          return;
        }

        var valueInLowerCase = value.toLowerCase();

        if (tracedTxState[valueInLowerCase]?.length > 0) {
          updateFormState({
            input_transaction_tracer: {
              currentSearchQuery: valueInLowerCase,
              loading: false,
              value: "",
            },
          });
          return;
        }

        updateFormState({
          input_transaction_tracer: {
            currentSearchQuery,
            loading: true,
            value,
          },
        });

        var {
          data: tracedTxData,
          error,
          success,
        } = await traceTransactionHash(valueInLowerCase);

        if (!success) {
          console.log(error);

          updateFormState({
            input_transaction_tracer: {
              currentSearchQuery,
              loading: false,
              value,
            },
          });
          return;
        }

        updateTracedTxState({ [valueInLowerCase]: tracedTxData });

        updateFormState({
          input_transaction_tracer: {
            currentSearchQuery: valueInLowerCase,
            loading: false,
            value: "",
          },
        });
        break;
    }
  };

  useEffect(() => {
    // first render
    const localStorageTracedTx = localStorage.getItem(LOCAL_STORAGE_TRACED_TX);

    if (localStorageTracedTx) {
      updateTracedTxState(JSON.parse(localStorageTracedTx));
    }

    const localStorageTxLog = localStorage.getItem(LOCAL_STORAGE_TX_LOG);

    if (localStorageTxLog) {
      updateLogState(JSON.parse(localStorageTxLog));
    }
  }, []);

  useEffect(() => {
    const logStateKeys = Object.getOwnPropertyNames(logState);

    if (logStateKeys.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_TX_LOG, JSON.stringify(logState));
    }
  }, [logState]);

  useEffect(() => {
    const tracedTxStateKeys = Object.getOwnPropertyNames(tracedTxState);

    if (tracedTxStateKeys.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_TRACED_TX,
        JSON.stringify(tracedTxState)
      );
    }
  }, [tracedTxState]);

  screenCardItemKeys.forEach((id, key) => {
    if (id === SCREEN_CARD_LATEST_LOGS) {
      var {
        input_latest_logs: { currentSearchQuery },
      } = formState;
      screenCardNodes.push(
        <ScreenCard id={id} key={key}>
          <FlexContainer $padding="0px 20px">
            <Searchbar
              inputName="input_latest_logs"
              placeholder="Contract Address"
              handleSubmit={() => handleSearch(SCREEN_CARD_LATEST_LOGS)}
            />
            {currentSearchQuery.length > 0 &&
            logState[currentSearchQuery] &&
            logState[currentSearchQuery].length > 0 ? (
              <SearchResultText>
                Showing results for "<span>{currentSearchQuery}</span>"
              </SearchResultText>
            ) : (
              <></>
            )}
            <PaginatedLogs />
          </FlexContainer>
        </ScreenCard>
      );
    }
    if (id === SCREEN_CARD_TRANSACTION_TRACER) {
      var {
        input_transaction_tracer: { currentSearchQuery },
      } = formState;

      const link = `https://etherscan.io/tx/${currentSearchQuery}`;

      screenCardNodes.push(
        <ScreenCard id={id} key={key}>
          <FlexContainer $padding="0px 20px">
            <Searchbar
              inputName="input_transaction_tracer"
              placeholder="Transaction Hash"
              handleSubmit={() => handleSearch(SCREEN_CARD_TRANSACTION_TRACER)}
            />
            {currentSearchQuery.length > 0 ? (
              <ExternalLink
                link={link}
                text={currentSearchQuery}
                viewText="view on etherscan"
              />
            ) : (
              <></>
            )}
          </FlexContainer>
          <JsonDropDown />
        </ScreenCard>
      );
    }
  });

  return <HomeScreen>{screenCardNodes.map((node) => node)}</HomeScreen>;
}
