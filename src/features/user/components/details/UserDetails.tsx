import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteUser, getUser } from "../../axios/userApi";
import Loading from "../basic/Loading";

const UserDetails = ({ id }: { id: number }) => {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
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
      await router.push("/list");
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
        <Link href="/list" className="p-2 bg-white font-bold rounded-md">
          Go Back
        </Link>

        <div className="flex justify-between w-full bg-white p-4 rounded-md">
          <h2 className="text-2xl font-semibold text-gray-400">
            USER ID- {user.id}
          </h2>
          <div className="flex gap-x-2">
            <Link
              href={`/edituser/${user.id}`}
              className="p-2  bg-blue-200 rounded-md"
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
          <div className="p-4 flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">
                INSTITUTE NAME
              </p>
              <span className="bg-white p-2 rounded-md font-thin shadow-md">
                {user.instituteName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">NAME</p>
              <span className="bg-white p-2 rounded-md font-thin shadow-md">
                {user.fullName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">CITY</p>
              <span className="bg-white p-2 rounded-md font-thin shadow-md">
                {user.city}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-md font-semibold text-gray-400">
            SUBJECT PURCHASED
          </h3>
          <div className="p-4 flex flex-col space-y-2">
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
          <div className="p-4 flex flex-col space-y-2">
            <div className="flex space-x-8">
              <p className="text-sm font-semibold text-gray-500 bg-green-100 p-1">
                AMOUNT PAID- {user.amountPaid}
              </p>
              <p className="text-sm font-semibold text-gray-500 bg-orange-100 p-1">
                DISCOUNT- {user.discountGiven}
              </p>
              <p className="text-sm font-semibold text-gray-500 bg-red-100 p-1">
                AMOUNT DUE- {user.amountDue ?? "❌"}
              </p>
              <p className="text-sm font-semibold text-gray-500 bg-blue-200 p-1">
                PURCHASED DATE-{" "}
                {new Date(user.datePurchased).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm font-semibold text-gray-500 bg-gray-200 p-1">
                VALIDITY-{" "}
                {new Date(user.validity).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm font-semibold text-gray-500 p-1 bg-red-300">
                DUE DATE-{" "}
                {user.amountDue
                  ? new Date(user.validity).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
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
          <div className="p-4 flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">EMAIL</p>
              <span className="bg-white p-2 rounded-md font-thin shadow-md">
                {user.email}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-gray-500">PHONE</p>
              <span className="bg-white p-2 rounded-md font-thin shadow-md">
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
