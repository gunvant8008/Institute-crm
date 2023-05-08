import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteUser, getUser, getUserOrders } from "../../axios/userApi";
import Loading from "@/AppComponents/basic/Loading";
import UserContactInfo from "../cards/UserContactInfo";
import OrderInfo from "@/features/orders/components/cards/OrderInfo";

const UserDetails = ({ id }: { id: number }) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery(["user", id], () => (id ? getUser(id) : null));

  const { data: userOrders } = useQuery(["userOrders", id], () =>
    id ? getUserOrders(id) : null,
  );
  const { mutate, isLoading: deleteLoading } = useMutation(deleteUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["users"]);
      await router.push("/enquiries");
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
        <Link href="/enquiries" className="p-2 font-bold bg-white rounded-md">
          Go To Enquiries
        </Link>

        <div className="flex justify-between w-full p-4 bg-white rounded-md">
          <h2 className="text-2xl font-semibold text-gray-400">
            USER ID- {user.id}
            <span className="block text-sm text-gray-500">
              Status:{user.userStatus}
            </span>
          </h2>
          <div className="gap-x-2 flex items-center">
            <Link
              href={`/edituser/${user.id}`}
              className="p-1.5 bg-blue-200 rounded-md"
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
          <div className="flex flex-wrap items-center gap-8 p-4">
            <div className="flex flex-col space-y-2 min-w-[18rem]">
              <p className="text-sm font-semibold text-gray-500">
                INSTITUTE NAME
              </p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.instituteName}
              </span>
            </div>
            <div className="flex flex-col space-y-2 min-w-[18rem]">
              <p className="text-sm font-semibold text-gray-500">OWNER NAME</p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.ownersName}
              </span>
            </div>
            <div className="flex flex-col space-y-2 min-w-[18rem]">
              <p className="text-sm font-semibold text-gray-500">
                MANAGER NAME
              </p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.managersName}
              </span>
            </div>
            <div className="flex flex-col space-y-2 min-w-[18rem]">
              <p className="text-sm font-semibold text-gray-500">DESCRIPTION</p>
              <span className="p-2 font-thin bg-white rounded-md shadow-md">
                {user.description}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-md font-semibold text-gray-400">STATUS</h3>
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col space-y-2 min-w-[18rem] ">
                <p className="text-sm font-semibold text-gray-500">
                  CURRENT STATUS
                </p>
                <span className="p-2 font-thin bg-white rounded-md shadow-md">
                  {user.userStatus}
                </span>
              </div>
              <div className="flex flex-col min-w-[18rem] space-y-2">
                <p className="text-sm font-semibold text-gray-500">LEAD TYPE</p>
                <span className="p-2 font-thin bg-white rounded-md shadow-md">
                  {user.leadType}
                </span>
              </div>
              <div className="flex flex-col min-w-[18rem] space-y-2">
                <p className="text-sm font-semibold text-gray-500">
                  LEAD SOURCE
                </p>
                <span className="p-2 font-thin bg-white rounded-md shadow-md">
                  {user.leadSource}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-md font-semibold text-gray-400">PURCHASES</h3>
          <div className="md:grid-cols-9 sm:grid-cols-3 grid items-center justify-between grid-cols-2 gap-4 p-2 my-3 font-semibold">
            <span>Order No</span>
            <span className="sm:text-left text-right">Products</span>
            <span className="md:grid hidden">Total</span>
            <span className="sm:grid hidden">Discount</span>
            <span className="sm:grid hidden">Paid</span>
            <span className="sm:grid hidden">Balance</span>
            <span className="sm:grid hidden">Due Date</span>
            <span className="sm:grid hidden">Method</span>
            <span className="sm:grid hidden">Paid By</span>
          </div>
          <ul className="bg-gray-50 p-1.5 border">
            {userOrders &&
              userOrders.map((order) => (
                <li key={order.id}>
                  <OrderInfo order={order} />
                </li>
              ))}
          </ul>
        </div>

        <span className="border-b-[1px] border-gray-300 w-full"></span>
        <UserContactInfo user={user} />
      </div>
    );

    // REVIEW:
  } else return null;
};

export default UserDetails;
