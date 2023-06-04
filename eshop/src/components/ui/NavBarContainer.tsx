import { observer } from "mobx-react";
import * as React from "react";
import { customColors } from "../util/Theme";
import { BACKGROUND_BORDER_RADIUS } from "./Components";

export const NavBarContainer = observer(
  (props: { children: React.ReactNode; style?: React.CSSProperties }) => {
    return (
      <>
        <div
          style={{
            height: 32,
            width: "100%",
            backgroundColor: customColors.backgroundColor,
            position: "fixed",
            top: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            backgroundColor: customColors.backgroundColor,
            left: 32,
            top: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "calc(100vw - 64px)",
              padding: "16px 32px",
              borderRadius: `${BACKGROUND_BORDER_RADIUS}px ${BACKGROUND_BORDER_RADIUS}px 0 0`,
              justifyContent: "space-between",
              backgroundColor: customColors.white,
              ...props.style,
            }}
          >
            {props.children}
          </div>
        </div>
      </>
    );
  }
);
