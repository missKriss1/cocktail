import React from "react";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner.tsx";

interface Props {
  isLoading?: boolean;
  text: string;
  isDisabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const ButtonLoading: React.FC<Props> = ({
  isDisabled = false,
  isLoading = false,
  text,
  type = "submit",
  onClick,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        disabled={isDisabled}
        style={{
          backgroundColor: "black",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.6 : 1,
        }}
      >
        <span className="me-2">{text}</span>
        {isLoading ? <ButtonSpinner /> : null}
      </button>
    </div>
  );
};

export default ButtonLoading;
