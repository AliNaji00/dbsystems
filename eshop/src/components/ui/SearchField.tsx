import { Input, InputAdornment } from "@mui/material";
import { debounce } from "lodash";
import * as React from "react";
import { customColors } from "../util/Theme";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  placeholder?: string;
  searchValue?: string;
  style?: React.CSSProperties;
  debounceMs?: number;
  onChange: (value: string) => void;
  onFocus?: () => void;
};

export const SearchField = ({
  placeholder,
  searchValue,
  style,
  debounceMs,
  onChange,
  onFocus,
}: Props) => {
  const [value, setValue] = React.useState(searchValue ?? "");

  // Optional debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChanged = React.useCallback(
    debounceMs
      ? debounce((value: string) => {
          onChange(value);
        }, debounceMs)
      : onChange,
    [onChange, debounceMs]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onSearchChanged(event.target.value);
  };

  const handleReset = () => {
    setValue("");
    onChange("");
  };

  return (
    <Input
      onChange={handleChange}
      onFocus={onFocus}
      placeholder={placeholder}
      autoComplete="off"
      value={value}
      endAdornment={
        value ? (
          <InputAdornment
            position="end"
            style={{ cursor: "pointer" }}
            onClick={handleReset}
          >
            <CloseIcon />
          </InputAdornment>
        ) : (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        )
      }
      inputProps={{
        style: { fontSize: 12, color: customColors.primaryColor },
      }}
      style={{
        height: 40,
        borderRadius: "100px",
        padding: "0 18px",
        maxWidth: 320,
        border: `1px solid ${customColors.primaryColor}`,
        ...style,
      }}
      disableUnderline={true}
    />
  );
};
