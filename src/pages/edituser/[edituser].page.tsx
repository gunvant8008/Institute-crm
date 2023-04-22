import EditUser from "@/features/user/components/forms/EditUser";
import { useRouter } from "next/router";

const EditUserPage = () => {
  const { query } = useRouter();
  const id = Number(query.edituser?.toString());
  return <EditUser id={id} />;
};

export default EditUserPage;
