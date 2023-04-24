import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteUser, getUser } from "../../axios/userApi";
import Loading from "../basic/Loading";

const UserDetails = ({ id }: { id: number }) => {
  //   return <h2>{id}</h2>
  const router = useRouter();

  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery(["user", id], () => (id ? getUser(id) : null));
  const { mutate, isLoading: deleteLoading } = useMutation(deleteUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["users"]);
      await router.push("/users");
    },
  });

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }
  if (isLoading || deleteLoading) {
    return <Loading />;
  }
  if (user) {
    return (
      <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
        <Link href="/users" className="p-2 font-bold bg-white rounded-md">
          Go Back
        </Link>

        <div className="flex justify-between w-full p-4 bg-white rounded-md">
          <h2 className="text-2xl font-semibold text-gray-400">
            USER ID- {user.id}
          </h2>
          <div className="gap-x-2 flex">
            <Link
              href={`/edituser/${user.id}`}
              className="p-2 bg-blue-200 rounded-md"
            >
              Edit
            </Link>
            <button
              className="bg-red-200 p-1.5 rounded-md"
              onClick={() => mutate(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-md font-semibold text-gray-400">
            USER INFORMATION
          </h3>
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">
                INSTITUTE NAME
              </p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.instituteName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">NAME</p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.fullName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">CITY</p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.city}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-md font-semibold text-gray-400">
            SUBJECT PURCHASED
          </h3>
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex space-x-8">
              <p className="text-sm font-semibold text-gray-500">
                MATHS- {user.mathsPurchased ? "✅" : "❌"}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                BIOLOGY- {user.biologyPurchased ? "✅" : "❌"}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                PHYSICS- {user.physicsPurchased ? "✅" : "❌"}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                CHEMISTRY- {user.chemistryPurchased ? "✅" : "❌"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-md font-semibold text-gray-400">
            PAYMENT STATUS
          </h3>
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex space-x-8">
              <p className="p-1 text-sm font-semibold text-gray-500 bg-green-100">
                AMOUNT PAID- {user.amountPaid}
              </p>
              <p className="p-1 text-sm font-semibold text-gray-500 bg-orange-100">
                DISCOUNT- {user.discountGiven}
              </p>
              <p className="p-1 text-sm font-semibold text-gray-500 bg-red-100">
                AMOUNT DUE- {user.amountDue ?? "❌"}
              </p>
              <p className="p-1 text-sm font-semibold text-gray-500 bg-blue-200">
                PURCHASED DATE-{" "}
                {user.datePurchased?.toLocaleString().substring(0, 10)}
              </p>
              <p className="p-1 text-sm font-semibold text-gray-500 bg-gray-200">
                VALIDITY- {user.validity?.toLocaleString().substring(0, 10)}
              </p>
              <p className="p-1 text-sm font-semibold text-gray-500 bg-red-300">
                DUE DATE-{" "}
                {user.amountDue
                  ? user.dueDate?.toLocaleString().substring(0, 10)
                  : "No Due Payment"}
              </p>
            </div>
          </div>
        </div>

        <span className="border-b-[1px] border-gray-300 w-full"></span>
        <div className="w-full">
          <h3 className="text-md font-semibold text-gray-400">
            CONTACT INFORMATION
          </h3>
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">EMAIL</p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.email}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">PHONE</p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    // REVIEW:
  } else return null;
};

export default UserDetails;
