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
  alt?: string;
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
      className={`flex gap-2 ${flexDirection === "column" ? "flex-col" : ""} `}
    >
      <span className="p-0.5 flex-0">{labelText}</span>
      <input
        className={`focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md flex-1 w-full + 
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
