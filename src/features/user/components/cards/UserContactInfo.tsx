import React from "react";
import { User } from "../../types/userTypes";

type UserContactInfoProps = {
  user: User;
};

const UserContactInfo = ({ user }: UserContactInfoProps) => {
  return (
    <div className="w-full">
      <h3 className="text-md font-semibold text-gray-400">
        CONTACT INFORMATION
      </h3>
      <div className="flex flex-wrap items-center gap-10 p-4">
        <div className="flex flex-col space-y-2 min-w-[18rem] ">
          <p className="text-sm font-semibold text-gray-500">EMAIL</p>
          <span className="p-2 font-thin bg-white rounded-md shadow-md">
            {user.email}
          </span>
        </div>
        <div className="flex flex-col min-w-[18rem] space-y-2">
          <p className="text-sm font-semibold text-gray-500">PHONE 1</p>
          <span className="p-2 font-thin bg-white rounded-md shadow-md">
            {user.phone1}
          </span>
        </div>
        <div className="flex flex-col space-y-2 min-w-[18rem] ">
          <p className="text-sm font-semibold text-gray-500">PHONE 2</p>
          <span className="p-2 font-thin bg-white rounded-md shadow-md">
            {user.phone2}
          </span>
        </div>
        <div className="flex flex-col space-y-2 min-w-[18rem] ">
          <p className="text-sm font-semibold text-gray-500">WEBSITE</p>
          <span className="p-2 font-thin bg-white rounded-md shadow-md">
            {user.website}
          </span>
        </div>
        <div className="flex flex-col space-y-2 min-w-[18rem] ">
          <p className="text-sm font-semibold text-gray-500">ADDRESS</p>
          <span className="p-2 font-thin bg-white rounded-md shadow-md">
            {user.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserContactInfo;
