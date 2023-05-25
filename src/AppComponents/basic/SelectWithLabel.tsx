interface SelectWithLabelProps {
  labelText: string;
  inputProps?: unknown;
  options: string[];
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export const SelectWithLabel = ({
  labelText,
  options,
  error,
  inputProps,
  disabled,
  defaultValue,
  ...rest
}: SelectWithLabelProps) => {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900">
      {labelText}
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...(inputProps ?? {})}
        {...rest}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className=" text-sm text-red-300">{error}</span> : null}
    </label>
  );
};
