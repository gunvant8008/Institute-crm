import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center">
      <div className="w-16 h-16 border-4 m-auto border-dashed rounded-full animate-spin border-gray-400"></div>
    </div>
  );
};

export default Loading;
