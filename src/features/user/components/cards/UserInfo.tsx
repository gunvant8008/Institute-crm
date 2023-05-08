import { TextFieldWithLabel } from "@/AppComponents/basic/TextFieldWithLabel";
import React from "react";
import { User } from "../../types/userTypes";

type userInfoProps = {
  userData: User;
  error?: string;
  inputProps?: unknown;
};

const UserInfo = ({ userData, error, inputProps }: userInfoProps) => {
  return (
    <div>
      <div className=" flex flex-wrap items-start gap-10">
        <div>
          <label className="flex flex-col">
            User ID
            <input
              className="bg-gray-50 p-1 text-gray-400 rounded-md"
              disabled
              type="number"
              {...(inputProps ?? {})}
            />
          </label>
          {error && <span className="block text-sm text-red-400">{error}</span>}
        </div>
        <TextFieldWithLabel
          labelText="Institute Name"
          inputType="text"
          defaultValue={userData.instituteName}
          readOnly
          className="focus-none p-1 text-gray-400 rounded-md"
        />
        <TextFieldWithLabel
          labelText="Owner's Name"
          inputType="text"
          placeholder={userData.ownersName}
          readOnly
        />
        <TextFieldWithLabel
          labelText="Manager's Name"
          inputType="text"
          placeholder={userData.managersName}
          readOnly
        />

        <TextFieldWithLabel
          labelText="Phone"
          inputType="number"
          placeholder={userData.phone1}
          readOnly
        />
        <TextFieldWithLabel
          labelText="Email"
          inputType="email"
          placeholder={userData.email}
          readOnly
        />

        <div className="flex items-start w-full gap-10">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Lead Type
            <input
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={userData.leadType}
              readOnly
            ></input>
          </label>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Lead Source
            <input
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={userData.leadSource}
              readOnly
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
