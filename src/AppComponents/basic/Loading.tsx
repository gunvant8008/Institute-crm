import React from "react";

const Loading = () => {
  return (
    <div
      id="loading"
      className="flex flex-col m-auto items-center justify-center w-full h-[70vh]"
    >
      <div className="animate-spin w-16 h-16 border-4 border-gray-400 border-dashed rounded-full"></div>
      <h2 className="text-xl font-semibold text-gray-500">Loading...</h2>
    </div>
  );
};

export default Loading;
