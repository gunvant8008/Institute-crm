import { deleteUser, getActiveClients } from "@/features/user/axios/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { User } from "@/features/user/types/userTypes";
import { BsPersonFill } from "react-icons/bs";
import Loading from "@/AppComponents/basic/Loading";
import ButtonLink from "@/AppComponents/basic/ButtonLink";
import Button from "@/AppComponents/basic/Button";

const ActiveClientsList = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: activeClients,
  } = useQuery(["activeClients"], getActiveClients);
  const deleteUserMutation = useMutation(deleteUser, {
    onMutate: async (userId) => {
      await queryClient.cancelQueries(["activeClients"]);
      const previousActiveClients = queryClient.getQueryData<User[]>([
        "activeClients",
      ]);
      // REVIEW: Typescript error here
      queryClient.setQueryData(["activeClients"], (old: User[] | undefined) => {
        return old?.filter((user) => user.id !== userId);
      });
      return { previousActiveClients };
    },
    onError: (_error, _heroId, context) => {
      queryClient.setQueryData(
        ["activeClients"],
        context?.previousActiveClients,
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["activeClients"]);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  if (activeClients.length === 0) {
    return <h3>No data found!</h3>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-between w-full">
        <h2 className="p-4 text-2xl">Clients List</h2>
        <ButtonLink href="/new">Add Enquiry</ButtonLink>
      </div>
      <div className="gap-x-4 flex items-start w-full p-4 bg-gray-200">
        <Link href="/clients">
          <span className="shadow-black p-2 font-semibold bg-gray-300 border border-black shadow-sm">
            Active {"("}
            <span>{activeClients.length}</span>
            {")"}
          </span>
        </Link>
        <Link href="/clients/trial">
          <span className="p-2 text-gray-600 bg-gray-300 border border-gray-400">
            Trial
          </span>
        </Link>
        <Link href="/clients/inactive">
          <span className="p-2 text-gray-600 bg-gray-300 border border-gray-400">
            Inactive
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
          {activeClients.map(
            (user: User) => (
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
                <div className=" gap-x-10 items-center justify-between">
                  <div className="gap-x-2 flex">
                    <ButtonLink href={`/user/${user.id}`} variant="outline">
                      View
                    </ButtonLink>
                    <Button
                      className="bg-red-500"
                      onClick={() => deleteUserMutation.mutate(user.id)}
                    >
                      Delete
                    </Button>
                    <ButtonLink href={`/edituser/${user.id}`} variant="light">
                      Edit
                    </ButtonLink>
                  </div>
                </div>
              </li>
            ),
            // }
          )}
        </ul>
      </div>
    </div>
  );
};

export default ActiveClientsList;
