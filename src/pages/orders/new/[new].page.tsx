import NewOrder from "@/features/user/components/forms/NewOrder";
import { useRouter } from "next/router";
import React from "react";

const NewOrderPage = () => {
  const { query } = useRouter();
  const id = Number(query.new?.toString());
  return <NewOrder id={id} />;
};

export default NewOrderPage;
