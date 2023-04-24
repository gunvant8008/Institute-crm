import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TextFieldWithLabel } from "../../../../components/basic/TextFieldWithLabel";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "@/features/user/axios/userApi";
import { TUser } from "@/features/user/types/userTypes";
// import { DevTool } from "@hookform/devtools"

const AddUserSchema = z.object({
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
type TAddUserSchema = z.infer<typeof AddUserSchema>;

const AddUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation(addUser, {
    onMutate: async (user: TAddUserSchema) => {
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData<TUser[]>(["users"]);
      const newId = 0;
      const newUser = queryClient.setQueryData(["user", newId.toString()], {
        ...user,
        id: 0,
      });
      queryClient.setQueryData(["users"], (old: TUser[] | undefined) => {
        return newUser && old ? [newUser, ...old] : old;
      });
      await router.push("/users");
      return { previousUsers };
    },
    onError: (context: { previousUsers: TUser[] }) => {
      queryClient.setQueryData(["users"], context.previousUsers);
      // await queryClient.invalidateQueries(["photos"])
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["users"]);
    },
  });

  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddUserSchema>({
    resolver: zodResolver(AddUserSchema),
    //  defaultValues: {
    //    albumId: 1,
    //    title: "New Photo Title",
    //    url: "Enter URL",
    //    thumbnailUrl: "Enter Thumbnail URL"
    //  }
  });

  const onSubmit = (data: TAddUserSchema) => {
    mutate(data);
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

  return (
    <div className="gap-y-10 flex flex-col items-center w-full p-8 bg-gray-100">
      <h2 className="p-4 text-2xl text-center">Add User</h2>

      <form
        className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]"
        // REVIEW: Typescript error removed after adding void
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid grid-cols-2 gap-8">
          <div className="gap-y-4 flex flex-col w-full col-span-1">
            <TextFieldWithLabel
              labelText="Id"
              inputType="number"
              placeholder="1"
              readOnly
              className="p-1 text-gray-400 rounded-md"
            />
            <TextFieldWithLabel
              labelText="Full Name"
              inputType="text"
              placeholder="Enter Full Name"
              error={errors.fullName?.message as string}
              inputProps={register("fullName")}
            />
            <TextFieldWithLabel
              labelText="Institute Name"
              inputType="text"
              placeholder="Enter Institute Name"
              error={errors.instituteName?.message as string}
              inputProps={register("instituteName")}
            />
            <TextFieldWithLabel
              labelText="City"
              inputType="text"
              placeholder="Enter City"
              error={errors.city?.message as string}
              inputProps={register("city")}
            />
            <TextFieldWithLabel
              labelText="Phone No"
              inputType="number"
              placeholder="Enter Phone No"
              error={errors.phone?.message as string}
              inputProps={register("phone")}
            />
            <TextFieldWithLabel
              labelText="Email"
              inputType="email"
              placeholder="Enter Email"
              error={errors.email?.message as string}
              inputProps={register("email")}
            />
          </div>
          <div className="gap-y-4 flex flex-col">
            <h2 className="font-semibold text-gray-400">Subject Purchased</h2>
            <label className="gap-x-4 flex justify-between">
              Maths
              <input
                type="checkbox"
                className="focus:ring-blue-500 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                {...register("mathsPurchased")}
              />
            </label>
            <label className="gap-x-4 flex justify-between">
              Biology
              <input
                type="checkbox"
                className="focus:ring-blue-500 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                {...register("biologyPurchased")}
              />
            </label>
            <label className="gap-x-4 flex justify-between">
              Physics
              <input
                type="checkbox"
                className="focus:ring-blue-500 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                {...register("physicsPurchased")}
              />
            </label>
            <label className="gap-x-4 flex justify-between">
              Chemistry
              <input
                type="checkbox"
                className="focus:ring-blue-500 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                {...register("chemistryPurchased")}
              />
            </label>
            <div className="gap-y-4 flex flex-col">
              <h2 className="font-semibold text-gray-400">Payment Details</h2>
              <label className="gap-x-4 flex justify-between">
                Amount Paid
                <input
                  type="number"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("amountPaid", { valueAsNumber: true })}
                />
              </label>
              {errors.amountPaid ? (
                <span className=" text-sm text-red-300">
                  {errors.amountPaid.message}
                </span>
              ) : null}
              <label className="gap-x-4 flex justify-between">
                Discount Given
                <input
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  type="number"
                  {...register("discountGiven", { valueAsNumber: true })}
                />
              </label>
              {errors.discountGiven ? (
                <span className=" text-sm text-red-300">
                  {errors.discountGiven.message}
                </span>
              ) : null}
              <label className="gap-x-4 flex justify-between">
                Amount Due
                <input
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  type="number"
                  {...register("amountDue", { valueAsNumber: true })}
                />
              </label>
              {errors.amountDue ? (
                <span className=" text-sm text-red-300">
                  {errors.amountDue.message}
                </span>
              ) : null}
              <label className="gap-x-4 flex justify-between">
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
              <label className="gap-x-4 flex justify-between">
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
              <label className="gap-x-4 flex justify-between">
                Due Date
                <input
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
        <button className="self-center p-2 font-semibold bg-orange-200 rounded-md">
          Add User
        </button>
      </form>
      {/* <DevTool control={control} /> */}
      <Link className=" self-center p-2 bg-white rounded-md" href="/users">
        Go Back
      </Link>
    </div>
  );
};

export default AddUser;
