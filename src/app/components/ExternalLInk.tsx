"use client";
import React, { useState } from "react";
// styles
import { MainExternalLink } from "../styles/shared/ExternalLink.styles";
// utils
import { screens } from "@/utils/data";

interface IExternalLinkProps {
  link: string;
  text: string;
  viewText: string;
}

const ExternalLink = ({ link, text, viewText }: IExternalLinkProps) => {
  const [mouseOverState, setMouseOverState] = useState(false);

  const {
    shared: {
      assets: { externalLinkIcon },
    },
  } = screens;

  return (
    <MainExternalLink
      href={link}
      target="_blank"
      $onHover={mouseOverState}
      onMouseOver={() => setMouseOverState(true)}
      onMouseLeave={() => setMouseOverState(false)}
    >
      <h4>{text}</h4>
      {mouseOverState ? (
        <>
          <img src={externalLinkIcon.src} />
          <span>{viewText}</span>
        </>
      ) : (
        <></>
      )}
    </MainExternalLink>
  );
};

export default ExternalLink;
