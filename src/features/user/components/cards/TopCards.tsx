import {
  getThisMonthRevenue,
  getThisMonthUsers,
  getYearToDateRevenue,
} from "@/features/user/axios/userApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type DataCardProps = {
  title?: string;
  value?: number;
  percentage?: string;
  color?: string;
};

export const DataCard = ({ title, value, percentage }: DataCardProps) => {
  return (
    <div className="flex justify-between w-full p-4 bg-white border rounded-lg">
      <div className="flex flex-col w-full pb-4">
        <p className="text-2xl font-bold">
          {title === "Customers" ? "" : "￡"}
          {value?.toLocaleString()}
        </p>
        <p className="text-gray-600">{title}</p>
      </div>
      <p className="flex items-center justify-center p-2 bg-green-200 rounded-lg">
        <span className="text-lg text-green-700">{percentage}%</span>
      </p>
    </div>
  );
};

const TopCards = () => {
  const { data: thisMonthUsers } = useQuery(
    ["thisMonthUsers"],
    getThisMonthUsers,
  );

  const { data: thisMonthRevenue } = useQuery(
    ["thisMonthRevenue"],
    getThisMonthRevenue,
  );

  const { data: yearToDateRevenue } = useQuery(
    ["yearToDateRevenue"],
    getYearToDateRevenue,
  );

  return (
    <div className="lg:grid-cols-5 grid gap-4 p-4">
      <div className="lg:col-span-2 col-span-1">
        <DataCard title="This Month" value={thisMonthRevenue} percentage="18" />
      </div>
      <div className="lg:col-span-2 col-span-1">
        <DataCard
          title="YTD Revenue"
          value={yearToDateRevenue}
          percentage="11"
        />
      </div>
      <div className="">
        <DataCard
          title="Customers"
          value={thisMonthUsers?.length}
          percentage="17"
        />
      </div>
    </div>
  );
};

export default TopCards;
