import { User } from "../../types/userTypes";

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
          {title === "Enquiries This Month" || title === "Members This Month"
            ? ""
            : "￡"}
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

type TopCardsProps = {
  thisMonthEnquiries?: number;
  lastMonthEnquiries?: number;
  thisMonthActiveUsers?: number;
  lastMonthActiveUsers?: number;
  thisMonthRevenue?: number;
  lastMonthRevenue?: number;
  thisYearRevenue?: number;
  lastYearRevenue?: number;
};

const TopCards = ({
  thisMonthEnquiries,
  lastMonthEnquiries,
  thisMonthRevenue,
  lastMonthRevenue,
  thisYearRevenue,
  lastYearRevenue,
  thisMonthActiveUsers,
  lastMonthActiveUsers,
}: TopCardsProps) => {
  const monthRevenuePercentage = () => {
    if (thisMonthRevenue && lastMonthRevenue) {
      return +(
        ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };
  const yearRevenuePercentage = () => {
    if (thisYearRevenue && lastYearRevenue) {
      return +(
        ((thisYearRevenue - lastYearRevenue) / lastYearRevenue) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };
  const monthEnquiryPercentage = () => {
    if (thisMonthEnquiries && lastMonthEnquiries) {
      return +(
        ((thisMonthEnquiries - lastMonthEnquiries) / lastMonthEnquiries) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };
  const monthActiveUsersPercentage = () => {
    if (thisMonthActiveUsers && lastMonthActiveUsers) {
      return +(
        ((thisMonthActiveUsers - lastMonthActiveUsers) / lastMonthActiveUsers) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };

  return (
    <div className="lg:grid-cols-5 grid gap-4 px-4 pt-4">
      <div className="lg:col-span-2 col-span-1">
        <DataCard
          title="This Month"
          value={thisMonthRevenue}
          percentage={monthRevenuePercentage()}
        />
      </div>
      <div className="col-span-1">
        <DataCard
          title="YTD Revenue"
          value={thisYearRevenue}
          percentage={yearRevenuePercentage()}
        />
      </div>
      <div className="col-span-1">
        <DataCard
          title="Enquiries This Month"
          value={thisMonthEnquiries}
          percentage={monthEnquiryPercentage()}
        />
      </div>
      <div className="col-span-1">
        <DataCard
          title="Members This Month"
          value={thisMonthActiveUsers}
          percentage={monthActiveUsersPercentage()}
        />
      </div>
    </div>
  );
};

export default TopCards;
