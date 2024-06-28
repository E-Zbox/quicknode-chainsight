"use client";
import React, { ChangeEventHandler } from "react";
// store
import { useSearchStore } from "@/store";
// styles
import {
  MainSearch,
  SearchIcon,
  SearchInput,
  SearchLabel,
} from "../styles/Searchbar.styles";
// utils
import { screens } from "@/utils/data";
import { Loader } from "../styles/Loader.styles";

interface ISearchbarProps {
  inputName: string;
  placeholder: string;
  handleSubmit: () => void;
}

const Searchbar = ({
  inputName,
  placeholder,
  handleSubmit,
}: ISearchbarProps) => {
  const {
    screenCard: {
      assets: { searchIcon },
    },
    shared: {
      assets: { loaderGif },
    },
  } = screens;

  const { formState, updateFormState } = useSearchStore(
    ({ formState, updateFormState }) => ({
      formState,
      updateFormState,
    })
  );

  const { currentSearchQuery, loading, value } = formState[inputName];

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    updateFormState({ [name]: { currentSearchQuery, loading: false, value } });
  };

  return (
    <MainSearch>
      <SearchLabel
        htmlFor={inputName}
        $onFocused={formState[inputName].value.length > 0}
      >
        {placeholder}
      </SearchLabel>
      <SearchInput
        id={inputName}
        name={inputName}
        value={value}
        onChange={handleChange}
      />
      {loading ? (
        <Loader src={loaderGif.src} $size="44px" />
      ) : (
        <SearchIcon src={searchIcon.src} onClick={handleSubmit} />
      )}
    </MainSearch>
  );
};

export default Searchbar;
