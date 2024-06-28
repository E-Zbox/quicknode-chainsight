// .
import paginatedLogs from "./paginatedLogs";
import screenCard from "./screenCard";
// assets
import externalLinkIcon from "../../public/icons8-external-link-48.png";
import loaderGif from "../../public/loader.gif";

export const devices = {};

export const screens = {
  paginatedLogs,
  screenCard,
  shared: {
    assets: {
      externalLinkIcon,
      loaderGif,
    },
  },
};

export const theme = {
  bgColor: "#e2e0e6",
  black01: "#3d444e",
  blue01: "#41c7f0",
  textColor: "#11151a",
  white01: "#e9eaef",
  white02: "#e5e5eb",
};
