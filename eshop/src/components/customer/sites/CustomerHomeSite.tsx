import { observer } from "mobx-react";
import * as React from "react";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProducts } from "../../../stores/useProducts";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { customColors } from "../../util/Theme";
import { CustomerNavBar } from "../CustomerNavBar";

export const CustomerHomeSite = observer(() => {
  const generalStore = useGeneralStore();
  const products = useProducts(generalStore.keyword);

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
      <CustomerBackground style={{ minHeight: 200 }}>
        <CustomerNavBar />
        <CenteredContent>
          <div
            style={{ height: 2000, backgroundColor: "black" }}
            onClick={() => console.log(generalStore.keyword)}
          >
            {products.map((product) => (
              <div>{product.Name}</div>
            ))}
          </div>
        </CenteredContent>
      </CustomerBackground>
    </>
  );
});
