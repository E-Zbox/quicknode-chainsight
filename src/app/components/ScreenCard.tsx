"use client";
import Image from "next/image";
import React from "react";
// components
import Searchbar from "./Searchbar";
// store
import { useScreenCardStore } from "@/store";
// styles
import { FlexContainer } from "../styles/shared/Container.styles";
import {
  MainScreenCard,
  Title,
  TitleButton,
} from "../styles/ScreenCard.styles";
// utils
import { screens } from "@/utils/data";

interface IScreenCardProps {
  children: React.ReactNode;
  id: string;
}

const ScreenCard = ({ children, id }: IScreenCardProps) => {
  const { items, toggleItemCollapse } = useScreenCardStore(
    ({ items, toggleItemCollapse }) => ({ items, toggleItemCollapse })
  );

  const {
    screenCard: {
      assets: { collapseArrowIcon, expandArrowIcon },
    },
  } = screens;

  const { collapsed, title } = items[id];

  return (
    <MainScreenCard $collapsed={collapsed}>
      <TitleButton>
        <Title>{title}</Title>
        <Image
          height={40}
          width={40}
          src={collapsed ? expandArrowIcon : collapseArrowIcon}
          alt=""
          onClick={() => toggleItemCollapse(id)}
        />
      </TitleButton>
      <FlexContainer
        $height={collapsed ? "0px" : "fit-content"}
        $miscellaneous={collapsed ? "overflow: hidden" : ""}
      >
        {children}
      </FlexContainer>
    </MainScreenCard>
  );
};

export default ScreenCard;
