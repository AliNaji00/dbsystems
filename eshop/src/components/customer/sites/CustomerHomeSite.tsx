import * as React from "react";
import { CustomerBackground } from "../../ui/Components";
import { CustomerNavBar } from "../CustomerNavBar";

export const CustomerHomeSite = () => {
  return (
    <>
      <CustomerNavBar />
      <CustomerBackground>
        <div
          style={{ height: 2000, width: 10, backgroundColor: "black" }}
        ></div>
      </CustomerBackground>
    </>
  );
};
