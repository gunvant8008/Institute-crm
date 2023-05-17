import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, updateUser } from "@/features/user/axios/userApi";
import { TEditUser, User } from "../../types/userTypes";
import { useEffect } from "react";
import { UserSchema } from "../../zod/userSchemas";
import Button from "@/AppComponents/basic/Button";
import SelectWithLabel from "@/AppComponents/basic/selectWithLabel";
// import { DevTool } from "@hookform/devtools"

const EditUser = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery(["user", id.toString()], () => (id ? getUser(id) : null));

  const { mutate } = useMutation(updateUser, {
    onMutate: async (user: User) => {
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      const newUser = queryClient.setQueryData(
        ["user", user.id.toString()],
        user,
      );
      queryClient.setQueryData(["users"], (old: User[] | undefined) => {
        return newUser
          ? old?.map((item) => (item.id === user.id ? newUser : item))
          : old;
      });
      await router.push("/enquiries");
      return { previousUsers };
    },
    onError: (context: { previousUsers: User[] }) => {
      queryClient.setQueryData(["users"], context.previousUsers);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["users"]);
    },
  });

  const {
    // control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      instituteName: userData?.instituteName,
      ownersName: userData?.ownersName,
      managersName: userData?.managersName,
      address: userData?.address,
      phone1: userData?.phone1,
      phone2: userData?.phone2,
      email: userData?.email,
      website: userData?.website,
      description: userData?.description,
      leadType: userData?.leadType,
      leadSource: userData?.leadSource,
    },
  });

  // REVIEW: IS THIS THE BEST WAY TO DO THIS? resetting the data on hard refresh
  useEffect(() => {
    if (!userData) return;
    reset(userData);
  }, [userData, reset]);

  const onSubmit = (data: TEditUser) => {
    mutate({
      id,
      ...data,
      addedOn: userData?.addedOn as string,
      userStatus: userData?.userStatus as string,
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center gap-4 mt-10">
        <p>Something went wrong!</p>
        <Link className="self-center p-2 bg-teal-800" href="/">
          Try again{" "}
        </Link>
      </div>
    );
  }
  if (isLoading || !userData) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
      <h2 className="p-4 text-2xl text-center">Update User</h2>
      <form
        className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]"
        // REVIEW: Typescript error removed after adding void
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <div className=" flex flex-wrap items-start gap-10">
            <InputWithLabel
              labelText="Id"
              inputType="number"
              disabled
              defaultValue={id.toString()}
              className="p-1 text-gray-400 rounded-md"
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Institute Name"
              inputType="text"
              placeholder="Institute Name"
              error={errors.instituteName?.message as string}
              inputProps={register("instituteName")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Owner's Name"
              inputType="text"
              placeholder="Enter Owner's Name"
              error={errors.ownersName?.message as string}
              inputProps={register("ownersName")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Manager's Name"
              inputType="text"
              placeholder="Enter Manager's Name"
              error={errors.managersName?.message as string}
              inputProps={register("managersName")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Address"
              inputType="text"
              placeholder="Enter Address"
              error={errors.address?.message as string}
              inputProps={register("address")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Phone"
              inputType="number"
              placeholder="Phone 1"
              error={errors.phone1?.message as string}
              inputProps={register("phone1")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Alternate Phone"
              inputType="number"
              placeholder="phone 2"
              error={errors.phone2?.message as string}
              inputProps={register("phone2")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Email"
              inputType="email"
              placeholder="Enter Email"
              error={errors.email?.message as string}
              inputProps={register("email")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Website"
              inputType="text"
              placeholder="Enter Website"
              error={errors.website?.message as string}
              inputProps={register("website")}
              flexDirection="column"
            />
            <InputWithLabel
              labelText="Description"
              inputType="text"
              placeholder="Enter Description"
              error={errors.description?.message as string}
              inputProps={register("description")}
              flexDirection="column"
            />

            <div className="flex items-start w-full gap-10">
              <SelectWithLabel
                labelText="Lead Type"
                options={["HOT", "WARM", "COLD"]}
                error={errors.leadType?.message as string}
                inputProps={register("leadType")}
              />
              <SelectWithLabel
                labelText="Lead Source"
                options={["WEBSITE", "REFERRAL", "SOCIAL MEDIA"]}
                error={errors.leadSource?.message as string}
                inputProps={register("leadSource")}
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="self-center">
          Update User
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
