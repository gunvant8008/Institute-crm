import {
  getLastMonthRevenue,
  getLastMonthUsers,
  getLastYearRevenue,
  getThisMonthRevenue,
  getThisMonthUsers,
  getYearToDateRevenue,
} from "@/features/user/axios/userApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../basic/Loading";

type DataCardProps = {
  title?: string;
  value?: number;
  percentage: number;
  color?: string;
};

export const DataCard = ({ title, value, percentage }: DataCardProps) => {
  return (
    <div className="flex justify-between w-full p-4 bg-white border rounded-lg">
      <div className="flex flex-col w-full pb-4">
        <p className="text-2xl font-bold">
          {title === "Customers This Month" ? "" : "￡"}
          {value?.toLocaleString()}
        </p>
        <p className="text-gray-600">{title}</p>
      </div>
      <p
        className={`flex items-center justify-center p-2 rounded-lg + ${
          percentage >= 0 ? "bg-green-200" : "bg-red-300"
        }`}
      >
        <span className={`text-lg text-gray-700 `}>{percentage}%</span>
      </p>
    </div>
  );
};

const TopCards = () => {
  const { data: thisMonthUsers, isLoading } = useQuery(
    ["thisMonthUsers"],
    getThisMonthUsers,
  );
  const { data: lastMonthUsers } = useQuery(
    ["lastMonthUsers"],
    getLastMonthUsers,
  );

  const { data: thisMonthRevenue } = useQuery(
    ["thisMonthRevenue"],
    getThisMonthRevenue,
  );
  const { data: lastMonthRevenue } = useQuery(
    ["lastMonthRevenue"],
    getLastMonthRevenue,
  );

  const { data: yearToDateRevenue } = useQuery(
    ["yearToDateRevenue"],
    getYearToDateRevenue,
  );

  const { data: lastYearRevenue } = useQuery(
    ["lastYearRevenue"],
    getLastYearRevenue,
  );

  const monthPercentage = () => {
    if (thisMonthRevenue && lastMonthRevenue) {
      return +(
        ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };
  const yearPercentage = () => {
    if (yearToDateRevenue && lastYearRevenue) {
      return +(
        ((yearToDateRevenue - lastYearRevenue) / lastYearRevenue) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };
  const userPercentage = () => {
    if (thisMonthUsers && lastMonthUsers) {
      return +(
        ((thisMonthUsers.length - lastMonthUsers.length) /
          lastMonthUsers.length) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="lg:grid-cols-5 grid gap-4 p-4">
      <div className="lg:col-span-2 col-span-1">
        <DataCard
          title="This Month"
          value={thisMonthRevenue}
          percentage={monthPercentage()}
        />
      </div>
      <div className="lg:col-span-2 col-span-1">
        <DataCard
          title="YTD Revenue"
          value={yearToDateRevenue}
          percentage={yearPercentage()}
        />
      </div>
      <div className="">
        <DataCard
          title="Customers This Month"
          value={thisMonthUsers?.length}
          percentage={userPercentage()}
        />
      </div>
    </div>
  );
};

export default TopCards;
