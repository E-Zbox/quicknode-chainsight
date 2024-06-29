export const convertTimeInMsToWords = (timestamp: number) => {
  const timeDiff = (Date.now() - timestamp) / 1000;

  if (timeDiff < 60) {
    return `${timeDiff.toFixed(0)} secs ago`;
  } else if (timeDiff < 3600) {
    let result = timeDiff / 60;
    return `${result.toFixed(0)} mins ago`;
  } else if (timeDiff < 86400) {
    let result = timeDiff / 3600;
    return `${result.toFixed(0)} hours ago`;
  }
  let result = timeDiff / 86400;
  return `${result.toFixed(0)} days ago`;
};
