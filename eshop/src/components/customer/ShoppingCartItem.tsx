import { Card, CardMedia, FormControl, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { IShoppingCartItem } from "../network/APITypes";
import { getImagePath } from "../util/Helpers";
import { customColors } from "../util/Theme";

export const ShoppingCartItem = (props: { item: IShoppingCartItem }) => {
  return (
    <Card sx={{ display: "flex", height: 260 }}>
      <CardMedia
        component="img"
        sx={{
          flex: 1,
          minWidth: 0,
          height: "auto",
          objectFit: "contain",
        }}
        image={getImagePath(props.item.image_url)}
        alt={props.item.name}
      />
      <div
        style={{
          flex: 2,
          backgroundColor: customColors.backgroundColor,
          borderRight: `2px solid ${customColors.body1}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4
          style={{
            margin: "16px 0 10px 16px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {props.item.name}
        </h4>
        <p style={{ margin: "0 16px" }}>{props.item.description}</p>
        <div style={{ flex: 1 }} />
        <h4 style={{ margin: "8px 16px" }}>Quantity:</h4>
        <div style={{ width: 100, marginBottom: 8 }}>
          <FormControl sx={{ m: 1 }} fullWidth>
            <Select
              value={props.item.quantity}
              onChange={() => {}}
              displayEmpty
              sx={{ height: 40 }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: customColors.backgroundColor,
        }}
      >
        {!!props.item.original_price && (
          <h4 style={{ marginLeft: 16, marginTop: 16 }}>
            <del>Price: $ {props.item.original_price}</del>
          </h4>
        )}
        <h4
          style={{
            marginLeft: 16,
            marginTop: !!props.item.original_price ? 24 : 16,
          }}
        >
          Price: $ {props.item.price}
        </h4>
      </div>
    </Card>
  );
};
