import { create } from "zustand";
// interface
import { ITracedTx, ITxLog } from "@/api/interface";
import { createDynamicallyTrackedSearchParams } from "next/dist/client/components/search-params";

export const SCREEN_CARD_TRANSACTION_TRACER = "TRANSACTION_TRACER";
export const SCREEN_CARD_LATEST_LOGS = "LATEST_LOGS";

interface IRecord {
  [name: string]: string;
}

interface IScreenCardItem {
  collapsed: boolean;
  title: string;
}

interface IScreenCardItemRecord {
  [id: string]: IScreenCardItem;
}

interface IScreenCardStore {
  items: IScreenCardItemRecord;
  toggleItemCollapse: (id: string) => void;
}

const screenCardItems: IScreenCardItemRecord = {
  [SCREEN_CARD_LATEST_LOGS]: {
    collapsed: false,
    title: SCREEN_CARD_LATEST_LOGS.split("_").join(" "),
  },
  // [SCREEN_CARD_TRANSACTION_TRACER]: {
  //   collapsed: false,
  //   title: SCREEN_CARD_TRANSACTION_TRACER.split("_").join(" "),
  // },
};

export const useScreenCardStore = create<IScreenCardStore>((set) => ({
  items: screenCardItems,
  toggleItemCollapse: (id: string) =>
    set((store) => {
      const selectedItem = store.items[id];
      return {
        items: {
          ...store.items,
          [id]: { ...selectedItem, collapsed: !selectedItem.collapsed },
        },
      };
    }),
}));

interface IFormState {
  [name: string]: {
    currentSearchQuery: string;
    loading: boolean;
    value: string;
  };
}

interface ISearchStore {
  formState: IFormState;
  updateFormState: (updateState: IFormState) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  formState: {
    input_latest_logs: {
      currentSearchQuery: "",
      loading: false,
      value: "",
    },
    input_transaction_tracer: {
      currentSearchQuery: "",
      loading: false,
      value: "",
    },
  },
  updateFormState: (updateState: IFormState) =>
    set((store) => {
      return {
        formState: { ...store.formState, ...updateState },
      };
    }),
}));

interface ITxLogRecord {
  [name: string]: ITxLog[];
}

interface ITxLogStore {
  logState: ITxLogRecord;
  updateLogState: (updateState: ITxLogRecord) => void;
}

export const useTxLogStore = create<ITxLogStore>((set) => ({
  logState: {},
  updateLogState: (updateState: ITxLogRecord) =>
    set((store) => ({ logState: { ...store.logState, ...updateState } })),
}));

interface ITracedTxRecord {
  [name: string]: ITracedTx[];
}

interface ITracedTxStore {
  tracedTxState: ITracedTxRecord;
  updateTracedTxState: (updateState: ITracedTxRecord) => void;
}

export const useTracedTxStore = create<ITracedTxStore>((set) => ({
  tracedTxState: {},
  updateTracedTxState: (updateState: ITracedTxRecord) =>
    set((store) => ({
      tracedTxState: { ...store.tracedTxState, ...updateState },
    })),
}));

interface IJsonDropDownStore {
  width: number;
  setWidth: (newState: number) => void;
}

export const useJsonDropDownStore = create<IJsonDropDownStore>((set) => ({
  width: 0,
  setWidth: (newState: number) => set({ width: newState }),
}));
