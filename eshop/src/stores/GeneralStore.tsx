import { observable } from "mobx";
import * as React from "react";
import { SearchField } from "../components/ui/SearchField";

export const SEARCH_DEBOUNCE_MS = 500;

export class GeneralStore {
  @observable keyword = "";
  @observable basketItems = 4;
  @observable isLoading = false;

  handleSearchChange = (search: string) => {
    this.keyword = search;
  };

  SearchField = (props: { placeholder: string; maxWidth?: boolean }) => {
    return (
      <SearchField
        searchValue={this.keyword}
        onChange={(search: string) => this.handleSearchChange(search)}
        placeholder={props.placeholder}
        style={{ flexGrow: 1, maxWidth: props.maxWidth ? 440 : "unset" }}
        debounceMs={SEARCH_DEBOUNCE_MS}
      />
    );
  };
}

let generalStore: GeneralStore | null = null;

export function useGeneralStore() {
  if (!generalStore) {
    generalStore = new GeneralStore();
  }

  return generalStore;
}

export function clearGeneralStore() {
  generalStore = null;
}
