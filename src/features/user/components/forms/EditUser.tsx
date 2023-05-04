import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, updateUser } from "@/features/user/axios/userApi";
import { User } from "../../types/userTypes";
import { useEffect } from "react";
// import { DevTool } from "@hookform/devtools"

const EditUserSchema = z.object({
  instituteName: z
    .string()
    .min(5, { message: "Institute Name must contain at least 5 character(s)" })
    .max(100),
  ownersName: z
    .string()
    .min(4, { message: "Name must be greater than or equal to 4" })
    .max(50)
    .optional(),
  managersName: z
    .string()
    .min(4, { message: "Name must be greater than or equal to 4" })
    .max(50)
    .optional(),
  address: z
    .string()
    .min(5, { message: "Address must contain at least 5 character(s)" })
    .max(100),
  phone1: z.string().min(10).max(10),
  phone2: z.string().min(10).max(10).optional(),

  email: z.string().email(),
  website: z.string().optional(),
  description: z.string().optional(),
  leadType: z.string().optional(),
  leadSource: z.string().optional(),
});
type TEditUserSchema = z.infer<typeof EditUserSchema>;

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
  } = useForm<TEditUserSchema>({
    resolver: zodResolver(EditUserSchema),
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

  const onSubmit = (data: TEditUserSchema) => {
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
        <Link className="self-center p-2 bg-teal-800" href="/list">
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
            <TextFieldWithLabel
              labelText="Id"
              inputType="number"
              placeholder="Id"
              readOnly
              className="p-1 text-gray-400 rounded-md"
            />
            <TextFieldWithLabel
              labelText="Institute Name"
              inputType="text"
              placeholder="Institute Name"
              error={errors.instituteName?.message as string}
              inputProps={register("instituteName")}
            />
            <TextFieldWithLabel
              labelText="Owner's Name"
              inputType="text"
              placeholder="Enter Owner's Name"
              error={errors.ownersName?.message as string}
              inputProps={register("ownersName")}
            />
            <TextFieldWithLabel
              labelText="Manager's Name"
              inputType="text"
              placeholder="Enter Manager's Name"
              error={errors.managersName?.message as string}
              inputProps={register("managersName")}
            />
            <TextFieldWithLabel
              labelText="Address"
              inputType="text"
              placeholder="Enter Address"
              error={errors.address?.message as string}
              inputProps={register("address")}
            />
            <TextFieldWithLabel
              labelText="Phone"
              inputType="number"
              placeholder="Phone 1"
              error={errors.phone1?.message as string}
              inputProps={register("phone1")}
            />
            <TextFieldWithLabel
              labelText="Alternate Phone"
              inputType="number"
              placeholder="phone 2"
              error={errors.phone2?.message as string}
              inputProps={register("phone2")}
            />
            <TextFieldWithLabel
              labelText="Email"
              inputType="email"
              placeholder="Enter Email"
              error={errors.email?.message as string}
              inputProps={register("email")}
            />
            <TextFieldWithLabel
              labelText="Website"
              inputType="text"
              placeholder="Enter Website"
              error={errors.website?.message as string}
              inputProps={register("website")}
            />
            <TextFieldWithLabel
              labelText="Description"
              inputType="text"
              placeholder="Enter Description"
              error={errors.description?.message as string}
              inputProps={register("description")}
            />

            <div className="flex items-start w-full gap-10">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lead Type
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("leadType")}
                >
                  <option value="HOT">HOT</option>
                  <option value="WARM">WARM</option>
                  <option value="COLD">COLD</option>
                </select>
              </label>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lead Source
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("leadSource")}
                >
                  <option value="WEBSITE">WEBSITE</option>
                  <option value="REFERRAL">REFERRAL</option>
                  <option value="SOCIAL MEDIA">SOCIAL MEDIA</option>
                  <option value="SALES FUNNEL">SALES FUNNEL</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <button className="self-center p-1.5 bg-blue-300">Update User</button>
      </form>
      {/* <DevTool control={control} /> */}
      <Link className=" self-center p-2 bg-white rounded-md" href="/enquiries">
        Go To Enquiries
      </Link>
    </div>
  );
};

export default EditUser;
