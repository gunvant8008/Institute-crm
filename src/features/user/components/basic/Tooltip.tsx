import { useState } from "react";

type TooltipProps = {
  message: string;
  children: React.ReactNode;
};

export const Tooltip = ({ message, children }: TooltipProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="group relative flex flex-col items-center">
      <span
        className="flex justify-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      <div
        className={`absolute whitespace-nowrap bottom-full flex flex-col items-center  group-hover:flex ${
          !show ? "hidden" : ""
        }`}
      >
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 rounded-md shadow-lg">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600" />
      </div>
    </div>
  );
};
