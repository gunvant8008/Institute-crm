interface InputWithLabelProps {
  labelText: string;
  inputType?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "checkbox"
    | "radio"
    | "date"
    | "button";
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  error?: string;
  inputProps?: unknown;
  defaultValue?: string | number;
  disabled?: boolean;
  value?: string;
  flexDirection?: "row" | "column";
  onClick?: () => void;
}

export const InputWithLabel = ({
  labelText,
  inputType,
  error,
  inputProps,
  className,
  disabled,
  flexDirection,
  ...rest
}: InputWithLabelProps) => {
  return (
    <label
      className={`flex items-center gap-1 ${
        flexDirection === "column" ? "flex-col" : ""
      } `}
    >
      {labelText}
      <input
        className={`focus:ring focus:ring-opacity-75 focus:ring-gray-400 w-full p-1 text-black rounded-md  + 
        ${className ?? ""} + ${
          disabled ? "bg-gray-50 p-1 text-gray-400 rounded-md" : ""
        }`}
        type={inputType ?? "text"}
        {...(inputProps ?? {})}
        {...rest}
        disabled={disabled}
      />
      {error ? <span className=" text-sm text-red-300">{error}</span> : null}
    </label>
  );
};
