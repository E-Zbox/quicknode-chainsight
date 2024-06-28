"use client";
import React from "react";
// components
// styles
import { MainApp } from "../styles/App.styles";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainApp>{children}</MainApp>;
}
