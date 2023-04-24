import { deleteUser, getUsers } from "@/features/user/axios/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { TUser } from "@/features/user/types/userTypes";
import { BsPersonFill } from "react-icons/bs";
import Loading from "@/features/user/components/basic/Loading";

const UsersList = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data: users } = useQuery(["users"], getUsers);
  const deleteUserMutation = useMutation(deleteUser, {
    onMutate: async (userId) => {
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData<TUser[]>(["users"]);
      // REVIEW: Typescript error here
      queryClient.setQueryData(["users"], (old: TUser[] | undefined) => {
        return old?.filter((user) => user.id !== userId);
      });
      return { previousUsers };
    },
    onError: (_error, _heroId, context) => {
      queryClient.setQueryData(["users"], context?.previousUsers);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["users"]);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  if (users.length === 0) {
    return <h3>No data found!</h3>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h2 className="p-4 text-2xl">Users List</h2>
      <div className="w-full p-4 overflow-y-auto bg-white border rounded-lg">
        <div className="md:grid-cols-4 sm:grid-cols-3 grid items-center justify-between grid-cols-2 p-2 my-3 font-semibold cursor-pointer">
          <span>Name</span>
          <span className="sm:text-left text-right">Email</span>
          <span className="md:grid hidden">Institute</span>
          <span className="sm:grid hidden">City</span>
        </div>
        <ul>
          {users.map(
            (user: TUser) => (
              // while (index < 10) {
              //   // just be careful doing this if you have loads of data.
              //   // the cache will become gigantic!
              //   queryClient.setQueryData(["user", user.id.toString()], user);
              <li
                key={user.id}
                className="bg-gray-50 hover:bg-gray-100 md:grid-cols-4 sm:grid-cols-3 grid items-center justify-between grid-cols-2 p-2 my-3 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-orange-200 rounded-lg">
                    <BsPersonFill className="text-orange-800" />
                  </div>
                  <p className="pl-4">{user.fullName}</p>
                </div>
                <p className="sm:text-left text-right text-gray-600">
                  {user.email}
                </p>
                <p className="md:flex hidden">{user.instituteName}</p>
                <div className="sm:flex gap-x-4 items-center justify-between hidden">
                  <p>{user.city}</p>
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
            ),
            // }
          )}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
