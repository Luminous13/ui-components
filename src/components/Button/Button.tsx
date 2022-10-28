import React, { useState, useRef, useCallback, useMemo } from "react";
import styled, { keyframes, css } from "styled-components";
// import "./Button.css";

interface StyledButtonProps {
  coordinates?: { x: number; y: number; clicked: boolean } | null;
  theme?: string;
}

const pulse = keyframes`
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
`;

export interface ButtonProps {
  theme?: string;
  label?: string;
  color?: string;
  onClick?: () => void;
}

const Button = ({ label, color, theme, onClick }: ButtonProps) => {
  const [clickValues, setclickValues] = useState({
    x: 0,
    y: 0,
    clicked: false,
  });

  const StyledButton = styled.button<StyledButtonProps>`
    appearance: none;
    position: relative;
    display: inline-grid;
    place-items: center;
    isolation: isolate;
    appearance: none;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
    font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    background-color: rgb(30, 167, 253, 1);
    cursor: pointer;
    overflow: hidden;
    color: ${(props) => props.color || "white"};

    ${({ theme }) => {
      if (theme === "light") {
        return css`
          box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
        `;
      }

      if (theme === "dark") {
        return css`
          box-shadow: 0 10px 20px -8px rgba(255, 255, 255, 0.7);
          background-color: #ffffff;
          color: black;
        `;
      }
    }}

    &::before {
      content: "";
      pointer-events: none;
      position: absolute;
      top: ${(props) => props.coordinates?.y || 0}px;
      left: ${(props) => props.coordinates?.x || 0}px;
      transform: translate(-50%, -50%) scale(0);
      z-index: -1;
      width: 200%;
      aspect-ratio: 1;
      background-color: ${(props) =>
        props.theme === "light" ? "black" : "white"};
      opacity: 0.35;
      border-radius: 50%;
      animation: ${(props) =>
        props.coordinates?.clicked &&
        css`
          ${pulse} 0.5s
        `};
    }

    &:hover {
      /* background-color: rgb(30, 167, 253, 0.9); */
      ${({ theme }) => {
        if (theme === "light") {
          return css`
            background-color: white;
            color: black;
          `;
        }

        if (theme === "dark") {
          return css`
            background-color: black;
            color: white;
          `;
        }
      }}
    }
  `;

  StyledButton.defaultProps = {
    color: "white",
    theme: "light",
  };

  return (
    <StyledButton
      color={color}
      coordinates={clickValues}
      theme={theme}
      onClick={(e: React.MouseEvent) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setclickValues({ ...clickValues, x, y, clicked: true });

        onClick;
      }}
      onAnimationEnd={() => {
        setclickValues({ ...clickValues, clicked: false });
      }}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
