import EditOrder from "@/features/user/components/forms/EditOrder";
import { useRouter } from "next/router";
import React from "react";

const EditOrderPage = () => {
  const { query } = useRouter();
  const id = Number(query.edit?.toString());
  return <EditOrder id={id} />;
};

export default EditOrderPage;
