import { observable } from "mobx";
import * as React from "react";
import { SearchField } from "../components/ui/SearchField";

export const SEARCH_DEBOUNCE_MS = 500;

export class GeneralStore {
  name: string | null = null;
  @observable keyword = "";

  constructor(name: string) {
    this.name = name;
  }

  handleSearchChange = (search: string) => {
    this.keyword = search;
  };

  SearchField = (props: { placeholder: string; maxWidth?: boolean }) => {
    return (
      <SearchField
        searchValue={this.keyword}
        onChange={(search: string) => this.handleSearchChange(search)}
        placeholder={props.placeholder}
        style={{ flexGrow: 1, maxWidth: props.maxWidth ? 320 : "unset" }}
        debounceMs={SEARCH_DEBOUNCE_MS}
      />
    );
  };
}

let generalStore: GeneralStore | null = null;

export function useGeneralStore(name: string) {
  if (!generalStore || generalStore.name !== name) {
    generalStore = new GeneralStore(name);
  }

  return generalStore;
}

export function clearGeneralStore() {
  generalStore = null;
}
