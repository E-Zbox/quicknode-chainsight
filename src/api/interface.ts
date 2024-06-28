export interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface ITracedTx {
  action: {
    from: string;
    callType: string;
    gas: string;
    input: string;
    to: string;
    value: string;
  };
  blockHash: string;
  blockNumber: number;
  result: {
    gasUsed: string;
    output: string;
  };
  subtraces: number;
  traceAddress: number[];
  transactionHash: string;
  transactionPosition: number;
  type: string;
}

export interface ITracedTxResponse extends IGenericResponse<ITracedTx[]> {}

export interface ITxLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
  timestamp: string;
}

export interface ITxLogResponse extends IGenericResponse<ITxLog[]> {}
