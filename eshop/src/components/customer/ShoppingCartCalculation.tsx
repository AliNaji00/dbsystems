import { Button, Card, TextField } from "@mui/material";
import * as React from "react";
import {
  ICheckOrderItemsBySeller,
  IShoppingCartItem,
} from "../network/APITypes";
import { customColors } from "../util/Theme";
import { useGeneralStore } from "../../stores/GeneralStore";
import { useCheckOrder } from "../../stores/useCheckOrder";
import { API } from "../network/API";

export const ShoppingCartCalculation = (props: {
  items: IShoppingCartItem[];
}) => {
  const [coupons, setCoupons] = React.useState<string[]>([]);
  const [currentCoupon, setCurrentCoupon] = React.useState<string>("");
  const [couponError, setCouponError] = React.useState<string | null>(null);

  const generalStore = useGeneralStore();

  const checkOrder = useCheckOrder(generalStore.userId, coupons);

  const handleAddCoupon = () => {
    if (coupons.includes(currentCoupon)) {
      setCouponError("This coupon has already been used.");
    } else {
      setCoupons([...coupons, currentCoupon]);
      setCurrentCoupon("");
      setCouponError(null);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      await API.postOrder(generalStore.userId, coupons);
      generalStore.toggleBasketChangeFlag();
    } catch (err) {
      console.log(err);
    }
  };

  // Function to group items by seller
  return (
    <div
      style={{
        flex: 2,
        display: "flex",
        flexDirection: "column",
        marginLeft: "32px",
        gap: 32,
      }}
    >
      {checkOrder?.data.items_by_seller.map(
        (itemsBySeller: ICheckOrderItemsBySeller) => {
          const sellerItems = itemsBySeller.items;

          return (
            <Card
              sx={{
                backgroundColor: customColors.backgroundColor,
                height: "fit-content",
                width: "100%",
              }}
              key={itemsBySeller.seller_id}
            >
              <h2
                style={{
                  padding: "24px 32px 8px",
                  fontSize: 22,
                }}
              >
                {itemsBySeller.store_name}
              </h2>
              <div
                key={itemsBySeller.seller_id}
                style={{
                  borderBottom: `2px solid ${customColors.body1}`,
                  padding: "0 32px 0",
                }}
              >
                {sellerItems.map((item) => {
                  const itemName = props.items.find(
                    (basketItem) => basketItem.product_id === item.product_id
                  )?.name;

                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                      key={item.product_id}
                    >
                      <h4>
                        {item.quantity}x {itemName}
                      </h4>
                      <h4 style={{ minWidth: 64, textAlign: "end" }}>
                        $ {item.total_price}
                      </h4>
                    </div>
                  );
                })}
                {/* Display shipping cost */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <h4>Shipping Cost:</h4>
                  <h4>$ {itemsBySeller.shipping_cost}</h4>
                </div>
              </div>
              {/* Display total price for the seller */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  padding: "16px 32px 0",
                }}
              >
                <h4>Total Price (After Coupons):</h4>
                <h4>$ {itemsBySeller.total_price}</h4>
              </div>
            </Card>
          );
        }
      )}
      <Card
        sx={{
          backgroundColor: customColors.backgroundColor,
          height: "fit-content",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            padding: "16px 32px 0",
          }}
        >
          <h4>Total Price for all sellers:</h4>
          <h4>$ {checkOrder?.data.summed_price}</h4>
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h4 style={{ margin: 0 }}>Enter coupon codes:</h4>
        <TextField
          label="Coupon"
          variant="outlined"
          fullWidth
          color="primary"
          value={currentCoupon}
          onChange={(e) => setCurrentCoupon(e.target.value)}
        />
        <Button
          onClick={handleAddCoupon}
          variant="outlined"
          color="primary"
          sx={{ alignSelf: "flex-end" }}
        >
          Validate Coupon
        </Button>
        {couponError && <p style={{ color: "red" }}>{couponError}</p>}
        {coupons.map((coupon, index) => (
          <p
            key={index}
            style={{ color: customColors.green, fontSize: 18, margin: 0 }}
          >
            Coupon: {coupon}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};
