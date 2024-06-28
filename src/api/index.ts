// interfaces

import { ITracedTxResponse, ITxLogResponse } from "./interface";

const QUICKNODE_ENDPOINT = process.env.NEXT_PUBLIC_QUICKNODE_ENDPOINT;

if (!QUICKNODE_ENDPOINT) {
  throw new Error(`"${QUICKNODE_ENDPOINT}" missing in environment variables`);
}

export const traceTransactionHash = async (
  txHash: string
): Promise<ITracedTxResponse> => {
  let response: ITracedTxResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      method: "trace_transaction",
      params: [txHash],
      id: 1,
      jsonrpc: "2.0",
    });

    const res = await fetch(QUICKNODE_ENDPOINT, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const { error, result } = await res.json();

    if (error) throw error.message;

    response = {
      data: result,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getLatestLogs = async (
  contractAddress: string
): Promise<ITxLogResponse> => {
  let response: ITxLogResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      jsonrpc: "2.0",
      method: "erigon_getLatestLogs",
      params: [
        {
          address: contractAddress,
        },
        {
          logCount: 1000,
        },
      ],
      id: 1,
    });

    const res = await fetch(QUICKNODE_ENDPOINT, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const { error, result } = await res.json();

    if (error) throw error.message;

    if (result.length == 0) {
      throw new Error(`No transactions found for "${contractAddress}"`);
    }

    response = {
      data: result,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
