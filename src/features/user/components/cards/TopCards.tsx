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
          {title === "Enquiries This Month" ? "" : "￡"}
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
  thisMonthEnquiries?: User[];
  lastMonthEnquiries?: User[];
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
    if (thisMonthEnquiries?.length && lastMonthEnquiries?.length) {
      return +(
        ((thisMonthEnquiries?.length - lastMonthEnquiries?.length) /
          lastMonthEnquiries?.length) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };

  return (
    <div className="lg:grid-cols-5 grid gap-4 p-4">
      <div className="lg:col-span-2 col-span-1">
        <DataCard
          title="This Month"
          value={thisMonthRevenue}
          percentage={monthRevenuePercentage()}
        />
      </div>
      <div className="lg:col-span-2 col-span-1">
        <DataCard
          title="YTD Revenue"
          value={thisYearRevenue}
          percentage={yearRevenuePercentage()}
        />
      </div>
      <div className="">
        <DataCard
          title="Enquiries This Month"
          value={thisMonthEnquiries?.length}
          percentage={monthEnquiryPercentage()}
        />
      </div>

      <h2>top cards</h2>
    </div>
  );
};

export default TopCards;
