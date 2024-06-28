"use client";
import React, { ReactNode, useState } from "react";
// styles
import {
  DropDownIcon,
  Field,
  FieldDropDown,
  FieldName,
  FieldValue,
} from "@/app/styles/JsonDropDown.styles";
// utils
import { screens } from "@/utils/data";
import { FlexContainer } from "@/app/styles/shared/Container.styles";

interface IDropDownProps {
  children?: ReactNode;
  fieldName: string;
  fieldValue?: string;
}

const DropDown = ({ children, fieldName, fieldValue }: IDropDownProps) => {
  const [collapsedState, setCollapsedState] = useState(false);

  const {
    screenCard: {
      assets: { collapseArrowIcon, expandArrowIcon },
    },
  } = screens;

  const hasChildren = children !== undefined;

  const toggleCollapsedState = () => {
    setCollapsedState((prevState) => !prevState);
  };

  return (
    <FieldDropDown $collapsed={collapsedState} $hasChildren={hasChildren}>
      <Field $collapsed={collapsedState} $hasChildren={hasChildren}>
        {hasChildren ? (
          <DropDownIcon
            $bgImg={
              collapsedState ? expandArrowIcon.src : collapseArrowIcon.src
            }
            $size="24px"
            onClick={toggleCollapsedState}
          />
        ) : (
          <></>
        )}
        <FieldName>{fieldName}</FieldName>
        {fieldValue ? <FieldValue>{fieldValue}</FieldValue> : <></>}
      </Field>
      {hasChildren ? (
        <FlexContainer
          $height={!collapsedState ? "fit-content" : "0px"}
          $padding="0px 0px 0px 40px"
          $miscellaneous="overflow: hidden"
        >
          {children}
        </FlexContainer>
      ) : (
        <></>
      )}
    </FieldDropDown>
  );
};

export default DropDown;
