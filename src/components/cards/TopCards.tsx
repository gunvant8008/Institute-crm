import React from "react";

type DataCardProps = {
  title?: string;
  value?: string;
  percentage?: string;
  color?: string;
};

export const DataCard = ({ title, value, percentage }: DataCardProps) => {
  return (
    <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
      <div className="flex flex-col w-full pb-4">
        <p className="text-2xl font-bold">${value}</p>
        <p className="text-gray-600">{title}</p>
      </div>
      <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
        <span className="text-green-700 text-lg">{percentage}%</span>
      </p>
    </div>
  );
};

const TopCards = () => {
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 ">
        <DataCard title="Daily Revenue" value="7,846" percentage="18" />
      </div>
      <div className="lg:col-span-2 col-span-1 ">
        <DataCard title="YTD Revenue" value="1,437,876" percentage="11" />
      </div>
      <div className="">
        <DataCard title="Customers" value="11,437" percentage="17" />
      </div>
    </div>
  );
};

export default TopCards;
