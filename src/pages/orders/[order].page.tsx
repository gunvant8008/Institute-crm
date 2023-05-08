import { OrderDetails } from "@/features/orders/components/details/OrderDetails";
import { useRouter } from "next/router";

const OrderDetailsPage = () => {
  const { query } = useRouter();
  const id = Number(query.order?.toString());
  return <OrderDetails id={id} />;
};

export default OrderDetailsPage;
