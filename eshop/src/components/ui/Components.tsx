import styled, { keyframes } from "styled-components";
import { customColors } from "../util/Theme";
import { TableCell, TableCellProps } from "@mui/material";
import React from "react";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const AnimatedGradient = styled.div`
  background: linear-gradient(
    270deg,
    ${customColors.primaryColorDark},
    ${customColors.primaryColorLight}
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 8s ease-in-out infinite;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BACKGROUND_BORDER_RADIUS = 60;

export const CustomerBackground = styled.div`
  background-color: ${customColors.white};
  width: calc(100vw - 64px);
  min-height: calc(100vh - 64px) !important;
  margin: 32px;
  padding-top: 70px;
  border-radius: ${BACKGROUND_BORDER_RADIUS}px;
`;

export const CustomTableCell = (props: {
  children?: React.ReactNode;
  tableCellProps?: TableCellProps;
}) => {
  return (
    <TableCell
      sx={{ color: customColors.body1, fontSize: 16 }}
      {...props.tableCellProps}
    >
      {props.children}
    </TableCell>
  );
};
