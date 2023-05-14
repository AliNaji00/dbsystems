import styled, { keyframes } from "styled-components";
import { customColors } from "../util/Theme";

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
    ${customColors.primaryColorLight}}
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 8s ease-in-out infinite;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomerBackground = styled.div`
  backgroud-color: ${customColors.white};
  width: 100%;
  height: 100vh;
  margin: 16px 32px;
  corner-radius: 20px;
`;
