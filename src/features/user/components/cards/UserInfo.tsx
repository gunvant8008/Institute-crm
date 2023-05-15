import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";
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
          <InputWithLabel
            labelText="User ID"
            inputType="number"
            inputProps={inputProps ?? {}}
            error={error}
            disabled={true}
            flexDirection="column"
          />
        </div>
        <InputWithLabel
          labelText="Institute Name"
          inputType="text"
          defaultValue={userData.instituteName}
          disabled={true}
          flexDirection="column"
        />
        <InputWithLabel
          labelText="Owner's Name"
          inputType="text"
          placeholder={userData.ownersName}
          disabled={true}
          flexDirection="column"
        />
        <InputWithLabel
          labelText="Manager's Name"
          inputType="text"
          placeholder={userData.managersName}
          disabled={true}
          flexDirection="column"
        />

        <InputWithLabel
          labelText="Phone"
          inputType="number"
          placeholder={userData.phone1}
          disabled={true}
          flexDirection="column"
        />
        <InputWithLabel
          labelText="Email"
          inputType="email"
          placeholder={userData.email}
          disabled={true}
          flexDirection="column"
        />

        <div className="flex w-full gap-10">
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
