import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEnquiry } from "@/features/user/axios/userApi";
import { TAddEnquiry, User } from "@/features/user/types/userTypes";
import { UserSchema } from "../../zod/userSchemas";
import Button from "@/AppComponents/basic/Button";

const AddEnquiry = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation(addEnquiry, {
    onMutate: async (user: TAddEnquiry) => {
      await queryClient.cancelQueries(["enquiries"]);
      const previousEnquiries = queryClient.getQueryData<User[]>(["enquiries"]);
      const newId = 0;
      const newUser = queryClient.setQueryData(["enquiry", newId.toString()], {
        ...user,
        id: 0,
        addedOn: new Date().toISOString().split("T")[0],
        userStatus: "ENQUIRY",
      });
      queryClient.setQueryData(["enquiries"], (old: User[] | undefined) => {
        return newUser && old ? [newUser, ...old] : old;
      });
      await router.push("/enquiries");
      return { previousEnquiries };
    },
    onError: (context: { previousEnquiries: User[] }) => {
      queryClient.setQueryData(["enquiries"], context.previousEnquiries);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["enquiries"]);
    },
  });

  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddEnquiry>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: TAddEnquiry) => {
    mutate({
      addedOn: new Date().toISOString().split("T")[0],
      userStatus: "ENQUIRY",
      ...data,
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center gap-4 mt-10">
        <p>Something went wrong!</p>
        <Link className="self-center p-2 bg-teal-200" href="/list">
          Try again{" "}
        </Link>
      </div>
    );
  }

  return (
    <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
      <h2 className="p-4 text-2xl text-center">Add Enquiry</h2>

      <form
        className=" rounded-xl flex flex-col max-w-5xl gap-4 p-8 bg-gray-200 shadow-lg"
        // REVIEW: Typescript error removed after adding void
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <div className=" flex flex-wrap items-start gap-10">
            <InputWithLabel
              labelText="Id"
              inputType="number"
              placeholder="Id"
              readOnly
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
        <Button type="submit" className="self-center">
          Add Enquiry
        </Button>
      </form>
    </div>
  );
};

export default AddEnquiry;
