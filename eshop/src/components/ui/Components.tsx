import styled, { keyframes } from "styled-components";

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
  background: linear-gradient(270deg, #2c2c53, #8a8ac1);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 8s ease-in-out infinite;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
