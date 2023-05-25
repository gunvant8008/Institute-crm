import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";
import React from "react";
import { User } from "../../types/userTypes";
import { SelectWithLabel } from "@/AppComponents/basic/SelectWithLabel";

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
          <SelectWithLabel
            labelText="Lead Type"
            options={["HOT", "WARM", "COLD"]}
            error={error}
            disabled={true}
            defaultValue={userData.leadType}
          />
          <SelectWithLabel
            labelText="Lead Source"
            options={["WEBSITE", "REFERRAL", "SOCIAL MEDIA"]}
            error={error}
            disabled={true}
            defaultValue={userData.leadSource}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
