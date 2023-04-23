import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, updateUser } from "@/features/user/axios/userApi";
import { TUser } from "../../types/userTypes";
import { useEffect } from "react";
// import { DevTool } from "@hookform/devtools"

const EditUserSchema = z.object({
  fullName: z
    .string()
    .min(5, { message: "Full Name must be greater than or equal to 5" }),
  instituteName: z
    .string()
    .min(5, { message: "Institute Name must contain at least 5 character(s)" })
    .max(100),
  city: z
    .string()
    .min(3, { message: "Title must contain at least 3 character(s)" })
    .max(100),
  phone: z.string().min(10).max(10),
  email: z.string().email(),
  mathsPurchased: z.boolean(),
  biologyPurchased: z.boolean(),
  chemistryPurchased: z.boolean(),
  physicsPurchased: z.boolean(),
  amountPaid: z.number().min(0),
  discountGiven: z.number().min(0),
  amountDue: z.number().min(0),
  datePurchased: z.date(),
  validity: z.date(),
  dueDate: z.date(),
});
type TEditUserSchema = z.infer<typeof EditUserSchema>;

const EditUser = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(["user", id.toString()], () =>
    id ? getUser(id) : null,
  );

  const { mutate } = useMutation(updateUser, {
    onMutate: async (user: TUser) => {
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData<TUser[]>(["users"]);
      const newUser = queryClient.setQueryData(
        ["user", user.id.toString()],
        user,
      );
      queryClient.setQueryData(["users"], (old: TUser[] | undefined) => {
        return newUser
          ? old?.map((item) => (item.id === user.id ? newUser : item))
          : old;
      });
      await router.push("/list");
      return { previousUsers };
    },
    onError: (context: { previousUsers: TUser[] }) => {
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
      fullName: data?.fullName,
      instituteName: data?.instituteName,
      city: data?.city,
      phone: data?.phone,
      email: data?.email,
      mathsPurchased: data?.mathsPurchased,
      biologyPurchased: data?.biologyPurchased,
      chemistryPurchased: data?.chemistryPurchased,
      physicsPurchased: data?.physicsPurchased,
      amountPaid: data?.amountPaid,
      discountGiven: data?.discountGiven,
      amountDue: data?.amountDue,
      datePurchased: data?.datePurchased,
      validity: data?.validity,
      dueDate: data?.dueDate,
    },
  });

  // REVIEW: IS THIS THE BEST WAY TO DO THIS? resetting the data on hard refresh
  useEffect(() => {
    if (!data) {
      return;
    }
    reset(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (data: TEditUserSchema) => {
    mutate({
      id,
      ...data,
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
  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
      <h2 className="p-4 text-2xl text-center">Add User</h2>
      <form
        className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]"
        // REVIEW: Typescript error removed after adding void
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid grid-cols-2 gap-8">
          <div className="gap-y-4 flex col-span-1 flex-col w-full">
            <TextFieldWithLabel
              labelText="Id"
              inputType="number"
              placeholder={data?.id.toString()}
              readOnly
              className="text-gray-400 p-1 rounded-md"
            />
            <TextFieldWithLabel
              labelText="Full Name"
              inputType="text"
              error={errors.fullName?.message as string}
              inputProps={register("fullName")}
            />
            <TextFieldWithLabel
              labelText="Institute Name"
              inputType="text"
              error={errors.instituteName?.message as string}
              inputProps={register("instituteName")}
            />
            <TextFieldWithLabel
              labelText="City"
              inputType="text"
              error={errors.city?.message as string}
              inputProps={register("city")}
            />
            <TextFieldWithLabel
              labelText="Phone No"
              inputType="number"
              error={errors.phone?.message as string}
              inputProps={register("phone")}
            />
            <TextFieldWithLabel
              labelText="Email"
              inputType="email"
              error={errors.email?.message as string}
              inputProps={register("email")}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-gray-400">Subject Purchased</h2>
            <label className="flex justify-between gap-x-4">
              Maths
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                {...register("mathsPurchased")}
              />
            </label>
            <label className="flex justify-between gap-x-4">
              Biology
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                {...register("biologyPurchased")}
              />
            </label>
            <label className="flex justify-between gap-x-4">
              Physics
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                {...register("physicsPurchased")}
              />
            </label>
            <label className="flex justify-between gap-x-4">
              Chemistry
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                {...register("chemistryPurchased")}
              />
            </label>
            <div className="flex flex-col gap-y-4">
              <h2 className="font-semibold text-gray-400">Payment Details</h2>
              <label className="flex justify-between gap-x-4">
                Amount Paid
                <input
                  type="number"
                  className=" p-1 text-black rounded-md focus:ring focus:ring-opacity-75 focus:ring-gray-400  "
                  {...register("amountPaid", { valueAsNumber: true })}
                />
              </label>
              {errors.amountPaid ? (
                <span className=" text-sm text-red-300">
                  {errors.amountPaid.message}
                </span>
              ) : null}
              <label className="flex justify-between gap-x-4">
                Discount Given
                <input
                  className=" p-1 text-black rounded-md focus:ring focus:ring-opacity-75 focus:ring-gray-400  "
                  type="number"
                  {...register("discountGiven", { valueAsNumber: true })}
                />
              </label>
              {errors.discountGiven ? (
                <span className=" text-sm text-red-300">
                  {errors.discountGiven.message}
                </span>
              ) : null}
              <label className="flex justify-between gap-x-4">
                Amount Due
                <input
                  className=" p-1 text-black rounded-md focus:ring focus:ring-opacity-75 focus:ring-gray-400  "
                  type="number"
                  {...register("amountDue", { valueAsNumber: true })}
                />
              </label>
              {errors.amountDue ? (
                <span className=" text-sm text-red-300">
                  {errors.amountDue.message}
                </span>
              ) : null}
              <label className="flex justify-between gap-x-4">
                Date Of Purchase
                <input
                  type="date"
                  {...register("datePurchased", { valueAsDate: true })}
                />
              </label>
              {errors.datePurchased ? (
                <span className=" text-sm text-red-300">
                  {errors.datePurchased.message}
                </span>
              ) : null}
              <label className="flex justify-between gap-x-4">
                Validity
                <input
                  type="date"
                  {...register("validity", { valueAsDate: true })}
                />
              </label>
              {errors.validity ? (
                <span className=" text-sm text-red-300">
                  {errors.validity.message}
                </span>
              ) : null}
              <label className="flex justify-between gap-x-4">
                Due Date
                <input
                  // defaultValue={new Date(data.dueDate)
                  //   .toISOString()
                  //   .substring(0, 10)}
                  // defaultValue={
                  //   data.dueDate instanceof Date
                  //     ? data.dueDate.toLocaleDateString()
                  //     : new Date(data.dueDate).toLocaleDateString()
                  // }
                  type="date"
                  {...register("dueDate", { valueAsDate: true })}
                />
              </label>
              {errors.dueDate ? (
                <span className=" text-sm text-red-300">
                  {errors.dueDate.message}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <button className="p-1 bg-blue-300">Update User</button>
      </form>
      {/* <DevTool control={control} /> */}
      <Link className="self-center p-2 bg-white rounded-md " href="/list">
        Go Back
      </Link>
    </div>
  );
};

export default EditUser;
