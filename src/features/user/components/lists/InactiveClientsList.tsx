import { deleteUser, getInactiveClients } from "@/features/user/axios/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { User } from "@/features/user/types/userTypes";
import { BsPersonFill } from "react-icons/bs";
import Loading from "@/AppComponents/basic/Loading";

const InactiveClientsList = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: inactiveClients,
  } = useQuery(["inactiveClients"], getInactiveClients);
  const deleteUserMutation = useMutation(deleteUser, {
    onMutate: async (userId) => {
      await queryClient.cancelQueries(["inactiveClients"]);
      const previousInactiveClients = queryClient.getQueryData<User[]>([
        "inactiveClients",
      ]);
      queryClient.setQueryData(
        ["inactiveClients"],
        (old: User[] | undefined) => {
          return old?.filter((user) => user.id !== userId);
        },
      );
      return { previousInactiveClients };
    },
    onError: (_error, _heroId, context) => {
      queryClient.setQueryData(
        ["inactiveClients"],
        context?.previousInactiveClients,
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["inactiveClients"]);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  if (inactiveClients.length === 0) {
    return <h3>No data found!</h3>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-between w-full">
        <h2 className="p-4 text-2xl">Clients List</h2>
        <Link className="p-2 m-2 bg-green-200 rounded-md shadow-md" href="/new">
          Add Enquiry
        </Link>
      </div>
      <div className="gap-x-4 flex items-start w-full p-4 bg-gray-200">
        <Link href="/clients">
          <span className="p-2 text-gray-600 bg-gray-300 border border-gray-400">
            Active
          </span>
        </Link>
        <Link href="/clients/trial">
          <span className="p-2 text-gray-600 bg-gray-300 border border-gray-400">
            Trial
          </span>
        </Link>
        <Link href="/clients/inactive">
          <span className="shadow-black p-2 font-semibold bg-gray-300 border border-black shadow-sm">
            Inactive{"("}
            <span>{inactiveClients.length}</span>
            {")"}
          </span>
        </Link>
      </div>
      <div className="w-full p-4 overflow-y-auto bg-white border rounded-lg">
        <div className="lg:grid-cols-6 grid items-center justify-between grid-cols-3 p-2 my-3 font-semibold cursor-pointer">
          <span className=" col-span-2">Institute</span>
          <span className="lg:block hidden">Contact</span>
          <span className="lg:block hidden">Status</span>
          <span className="lg:block hidden">Address</span>
          <span>Actions</span>
        </div>
        <ul>
          {inactiveClients.map((user: User) => (
            // while (index < 10) {
            //   // just be careful doing this if you have loads of data.
            //   // the cache will become gigantic!
            // queryClient.setQueryData(["user", user.id.toString()], user);
            <li
              key={user.id}
              className="bg-gray-50 hover:bg-gray-100 lg:grid-cols-6 grid items-center justify-between grid-cols-3 p-2 my-3 cursor-pointer"
            >
              <div className="flex items-center col-span-2">
                <div className="p-3 bg-orange-200 rounded-lg">
                  <BsPersonFill className="text-orange-800" />
                </div>
                <p className="pl-4">
                  {user.instituteName}{" "}
                  <span className="block text-sm text-gray-500">
                    Manager:{user.managersName}
                  </span>
                </p>
              </div>
              <p className="lg:text-left lg:block hidden text-right text-gray-600">
                {user.email}
                <span className="block text-sm text-gray-500">
                  Phone:{user.phone1}
                </span>
              </p>
              <p className="lg:flex hidden">{user.userStatus}</p>
              <p className="lg:block hidden">{user.address}</p>
              <div className="gap-x-10 flex items-center justify-between">
                <div className="gap-x-2 flex">
                  <Link
                    href={`/user/${user.id}`}
                    className="p-1.5  bg-gray-200 rounded-md"
                  >
                    View
                  </Link>
                  <button
                    className="p-1 bg-red-200 rounded-md"
                    onClick={() => deleteUserMutation.mutate(user.id)}
                  >
                    Delete
                  </button>
                  <Link
                    href={`/edituser/${user.id}`}
                    className="p-1.5  bg-blue-200 rounded-md"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InactiveClientsList;
