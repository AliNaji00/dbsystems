import { TextFieldProps } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

type Props = TextFieldProps & {
  initialAmount: number;
  maxAmount: number;
  changeValue(value: number): void;
};

export const CustomNumberField = observer(
  ({ initialAmount, changeValue, maxAmount }: Props) => {
    const [amount, setAmount] = React.useState(initialAmount);

    React.useEffect(() => {
      setAmount(initialAmount);
    }, [initialAmount]);

    const increaseAmount = () => {
      if (amount === maxAmount) {
        return;
      }
      changeValue(amount + 1);
      setAmount(amount + 1);
    };

    const decreaseAmount = () => {
      if (amount === 0) {
        return;
      }
      changeValue(amount - 1);
      setAmount(amount - 1);
    };

    return (
      <>
        <div
          style={{
            flexBasis: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: amount > 0 ? "space-between" : "end",
            width: "100%",
            maxHeight: 56,
            flexGrow: 1,
            margin: "0 5px",
          }}
          className="customNumberField"
        >
          {amount === 0 && (
            <ShoppingCartOutlinedIcon
              onClick={() => {
                increaseAmount();
              }}
              sx={{ cursor: "pointer" }}
            />
          )}
          {amount > 0 && (
            <>
              <SmallButton
                type="decrease"
                onClick={() => {
                  decreaseAmount();
                }}
                disabled={amount === 0}
              />

              <div
                style={{
                  margin: 10,
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                {amount}
              </div>

              <SmallButton
                type="increase"
                onClick={() => {
                  increaseAmount();
                }}
                disabled={amount >= maxAmount}
              />
            </>
          )}
        </div>
      </>
    );
  }
);

type SmallButtonProps = {
  onClick: VoidFunction;
  type: "increase" | "decrease";
  disabled: boolean;
};

const SmallButton = ({ onClick, type, disabled }: SmallButtonProps) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      cursor: disabled ? "auto" : "pointer",
      opacity: disabled ? 0.2 : 1,
    }}
  >
    {type === "increase" && <AddCircleOutlineIcon />}
    {type === "decrease" && <RemoveCircleOutlineIcon />}
  </div>
);
