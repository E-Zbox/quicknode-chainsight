"use client";
import React, { MutableRefObject, ReactNode, useEffect, useRef } from "react";
// store
import {
  useJsonDropDownStore,
  useSearchStore,
  useTracedTxStore,
} from "@/store";
// styles
import { DropDownTitle, MainDropDown } from "../../styles/JsonDropDown.styles";
import DropDown from "./DropDown";

const JsonDropDown = () => {
  const dropDownRef = useRef() as MutableRefObject<HTMLDivElement>;

  const {
    formState: {
      input_transaction_tracer: { currentSearchQuery },
    },
  } = useSearchStore(({ formState }) => ({ formState }));

  const { setWidth } = useJsonDropDownStore(({ setWidth }) => ({ setWidth }));

  const { tracedTxState } = useTracedTxStore(({ tracedTxState }) => ({
    tracedTxState,
  }));

  const logNestedRendering = (value: any, fieldName?: string) => {
    console.log(Array.isArray(value) ? "array" : typeof value);
    console.log(fieldName);
    console.log(value);

    var returnedText = ``;

    if (fieldName) {
      returnedText = `${fieldName}: `;
    }

    if (Array.isArray(value)) {
      returnedText = `${returnedText}[`;

      const valueLength = value.length;

      value.forEach((item, index) => {
        returnedText = `${
          index + 1 < valueLength ? ",\n\t" : ""
        }${returnedText}${logNestedRendering(item)}${
          index + 1 === valueLength ? "\n" : ""
        }`;
      });

      returnedText = `${returnedText}]`;

      return returnedText;
    }

    if (typeof value === "object") {
      returnedText = `${returnedText}{\n`;

      let objectKeys = Object.getOwnPropertyNames(value);

      objectKeys.forEach((key, index) => {
        returnedText = `${returnedText}\t${logNestedRendering(
          value[key],
          key
        )}${index + 1 < objectKeys.length ? ",\n" : ""}`;
      });

      returnedText = `${returnedText}\n\t}`;

      return returnedText;
    }

    // value should be string or number
    return `${returnedText}${value}`;
  };

  const handleNestedRendering = (value: any, fieldName: string): ReactNode => {
    console.log(fieldName);
    console.log(value);
    console.log(typeof value);
    if (Array.isArray(value)) {
      const valueLength = value.length;

      if (valueLength > 0) {
        return (
          <DropDown
            key={`${fieldName}-${Math.random() * 1_000_000}`}
            fieldName={fieldName}
          >
            {value.map((item, index) =>
              handleNestedRendering(item, `${fieldName}_${index}`)
            )}
          </DropDown>
        );
      }

      return <></>;
    } else if (typeof value == "object") {
      const objectKeys = Object.getOwnPropertyNames(value);

      return objectKeys.map((key, index) => {
        if (Array.isArray(value[key])) {
          return handleNestedRendering(value[key], key);
        } else if (typeof value[key] == "object") {
          return (
            <DropDown key={index} fieldName={key}>
              {handleNestedRendering(value[key], key)}
            </DropDown>
          );
        }
        return (
          <DropDown
            key={`${fieldName}-${Math.random() * 1_000_000}`}
            fieldName={key}
            fieldValue={value[key]}
          />
        );
      });
    }

    return (
      <DropDown
        key={`${fieldName}-${Math.random() * 1_000_000}`}
        fieldName={fieldName}
        fieldValue={value}
      />
    );
  };

  useEffect(() => {
    if (dropDownRef.current) {
      const { clientWidth } = dropDownRef.current;

      setWidth(clientWidth);
    }
  }, []);

  useEffect(() => {
    if (currentSearchQuery.length > 0 && tracedTxState[currentSearchQuery]) {
      // console.log(tracedTxState[currentSearchQuery]);
      // console.log(logNestedRendering(tracedTxState[currentSearchQuery]));
      // console.log(tracedTxState[currentSearchQuery]);
    }
  }, [currentSearchQuery, tracedTxState]);

  if (currentSearchQuery.length > 0 && tracedTxState[currentSearchQuery]) {
    return (
      <>
        <DropDownTitle>Trace tx</DropDownTitle>
        <MainDropDown>
          {tracedTxState[currentSearchQuery].map((item, key) =>
            handleNestedRendering(item, "")
          )}
        </MainDropDown>
      </>
    );
  }

  return <></>;
};

export default JsonDropDown;
