import React from "react";
import { User } from "../../types/userTypes";
import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";

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
        <InputWithLabel
          labelText="EMAIL"
          labelClassName="text-sm font-semibold text-gray-500"
          inputType="text"
          defaultValue={user.email}
          disabled={true}
          flexDirection="column"
          className="p-2 text-gray-500 shadow-md"
        />
        <InputWithLabel
          labelText="PHONE"
          labelClassName="text-sm font-semibold text-gray-500"
          inputType="text"
          defaultValue={user.phone1}
          disabled={true}
          flexDirection="column"
          className="p-2 text-gray-500 shadow-md"
        />
        <InputWithLabel
          labelText="ALTERNATE PHONE"
          labelClassName="text-sm font-semibold text-gray-500"
          inputType="text"
          defaultValue={user.phone2}
          disabled={true}
          flexDirection="column"
          className="p-2 text-gray-500 shadow-md"
        />
        <InputWithLabel
          labelText="WEBSITE"
          labelClassName="text-sm font-semibold text-gray-500"
          inputType="text"
          defaultValue={user.website}
          disabled={true}
          flexDirection="column"
          className="p-2 text-gray-500 shadow-md"
        />
        <InputWithLabel
          labelText="ADDRESS"
          labelClassName="text-sm font-semibold text-gray-500"
          inputType="text"
          defaultValue={user.address}
          disabled={true}
          flexDirection="column"
          className="p-2 text-gray-500 shadow-md"
        />
        <InputWithLabel
          labelText="ENQUIRY ADDED"
          labelClassName="text-sm font-semibold text-gray-500"
          inputType="text"
          defaultValue={user.addedOn}
          disabled={true}
          flexDirection="column"
          className="p-2 text-gray-500 shadow-md"
        />
      </div>
    </div>
  );
};

export default UserContactInfo;
