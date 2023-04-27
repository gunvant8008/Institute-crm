interface TextFieldWithLabelProps {
  labelText: string;
  inputType?: "text" | "number" | "email" | "password";
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  error?: string;
  inputProps?: unknown;
  defaultValue?: string;
}

export const TextFieldWithLabel = ({
  labelText,
  inputType,
  error,
  inputProps,
  ...rest
}: TextFieldWithLabelProps) => {
  return (
    <label className="flex flex-col gap-1">
      {labelText}
      <input
        className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 w-full p-1 text-black rounded-md"
        type={inputType ?? "text"}
        {...(inputProps ?? {})}
        {...rest}
      />
      {error ? <span className=" text-sm text-red-300">{error}</span> : null}
    </label>
  );
};
