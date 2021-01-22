import React from "react";

interface ButtonProps {
  id: string;
  label: string;
  handleClick: any;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { id, label, type, handleClick, disabled, className, loading } = props;
  const classes = `${className ? className : ""}`;

  return (
    <>
      <button
        id={id}
        type={type}
        className={classes}
        onClick={handleClick}
        disabled={disabled || loading}
      >
        <span className="button__lable">{loading ? "Loading..." : label}</span>
      </button>
    </>
  );
};

export default Button;
