import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { deleteUser, getUser, getUserOrders } from "../../axios/userApi";
import Loading from "@/AppComponents/basic/Loading";
import UserContactInfo from "../cards/UserContactInfo";
import OrderInfo from "@/features/orders/components/cards/OrderInfo";
import ButtonLink from "@/AppComponents/basic/ButtonLink";
import Button from "@/AppComponents/basic/Button";
import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";

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
      <div className="flex flex-col items-center p-8 bg-gray-100 gap-y-10">
        <div className="flex justify-between w-full p-4 bg-white rounded-md">
          <div>
            <h2 className="text-2xl font-semibold text-gray-400">
              USER ID- {user.id}
            </h2>
            <span className="block text-sm text-gray-500">
              Status:{user.userStatus}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <ButtonLink href={`/edituser/${user.id}`} variant="dark">
              Edit
            </ButtonLink>
            <Button className="bg-red-500" onClick={() => mutate(user.id)}>
              Delete
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x-2">
          <div className="w-full px-10 first:pl-0 last:pr-0">
            <h3 className="font-semibold text-gray-400 text-md">
              USER INFORMATION
            </h3>
            <div className="flex flex-wrap items-center gap-8 p-4">
              <InputWithLabel
                labelText="INSTITUTE NAME"
                labelClassName="text-sm font-semibold text-gray-500"
                inputType="text"
                defaultValue={user.instituteName}
                disabled={true}
                flexDirection="column"
                className="p-2 text-gray-500 shadow-md"
              />
              <InputWithLabel
                labelText="OWNER NAME"
                labelClassName="text-sm font-semibold text-gray-500"
                inputType="text"
                defaultValue={user.ownersName}
                disabled={true}
                flexDirection="column"
                className="p-2 text-gray-500 shadow-md"
              />
              <InputWithLabel
                labelText=" MANAGER NAME"
                labelClassName="text-sm font-semibold text-gray-500"
                inputType="text"
                defaultValue={user.managersName}
                disabled={true}
                flexDirection="column"
                className="p-2 text-gray-500 shadow-md"
              />
              <InputWithLabel
                labelText="DESCRIPTION"
                labelClassName="text-sm font-semibold text-gray-500"
                inputType="text"
                defaultValue={user.description}
                disabled={true}
                flexDirection="column"
                className="p-2 text-gray-500 shadow-md min-w-[25rem]"
              />
            </div>
          </div>
          <div className="w-full px-10 first:pl-0 last:pr-0">
            <h3 className="font-semibold text-gray-400 text-md">STATUS</h3>
            <div className="flex flex-col p-4 space-y-2">
              <div className="flex flex-wrap items-center gap-8">
                <InputWithLabel
                  labelText="CURRENT STATUS"
                  labelClassName="text-sm font-semibold text-gray-500"
                  inputType="text"
                  defaultValue={user.userStatus}
                  disabled={true}
                  flexDirection="column"
                  className="p-2 text-gray-500 shadow-md"
                />
                <InputWithLabel
                  labelText="LEAD TYPE"
                  labelClassName="text-sm font-semibold text-gray-500"
                  inputType="text"
                  defaultValue={user.leadType}
                  disabled={true}
                  flexDirection="column"
                  className="p-2 text-gray-500 shadow-md"
                />
                <InputWithLabel
                  labelText="LEAD SOURCE"
                  labelClassName="text-sm font-semibold text-gray-500"
                  inputType="text"
                  defaultValue={user.leadSource}
                  disabled={true}
                  flexDirection="column"
                  className="p-2 text-gray-500 shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-semibold text-gray-400 text-md">PURCHASES</h3>
          <div className="grid items-center justify-between grid-cols-2 gap-4 p-2 my-3 font-semibold md:grid-cols-9 sm:grid-cols-3">
            <span>Order No</span>
            <span className="text-right sm:text-left">Products</span>
            <span className="hidden md:grid">Total</span>
            <span className="hidden sm:grid">Discount</span>
            <span className="hidden sm:grid">Paid</span>
            <span className="hidden sm:grid">Balance</span>
            <span className="hidden sm:grid">Due Date</span>
            <span className="hidden sm:grid">Method</span>
            <span className="hidden sm:grid">Paid By</span>
          </div>
          <ul className="bg-gray-50 p-1.5 border">
            {userOrders && userOrders.length === 0 ? (
              <li>No orders</li>
            ) : (
              userOrders?.map((order) => (
                <li key={order.id}>
                  <OrderInfo order={order} />
                </li>
              ))
            )}
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
