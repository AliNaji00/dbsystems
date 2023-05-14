import * as React from "react";
import { useGeneralStore } from "../../stores/generalstore";
import { logo } from "../util/Images";

export const CustomerNavBar = (props: { style?: React.CSSProperties }) => {
  const generalStore = useGeneralStore("CustomerNavBar");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        ...props.style,
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: 64,
          height: 64,
          borderRadius: 5,
        }}
      />
      <generalStore.SearchField placeholder="Search" maxWidth />
    </div>
  );
};
