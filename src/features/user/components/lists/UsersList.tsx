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
  console.log(users);
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
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h2 className="text-2xl p-4">Users List</h2>
      <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
        <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer font-semibold">
          <span>Name</span>
          <span className="sm:text-left text-right">Email</span>
          <span className="hidden md:grid">Institute</span>
          <span className="hidden sm:grid">City</span>
        </div>
        <ul>
          {users.map((user: TUser, index: number) => {
            while (index < 10) {
              // just be careful doing this if you have loads of data.
              // the cache will become gigantic!
              queryClient.setQueryData(["user", user.id.toString()], user);
              return (
                <li
                  key={user.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BsPersonFill className="text-purple-800" />
                    </div>
                    <p className="pl-4">{user.fullName}</p>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">
                    {user.email}
                  </p>
                  <p className="hidden md:flex">{user.instituteName}</p>
                  <div className="sm:flex hidden gap-x-4 justify-between items-center">
                    <p>{user.city}</p>
                    <div className="flex gap-x-2">
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
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
