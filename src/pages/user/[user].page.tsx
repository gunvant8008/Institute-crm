import UserDetails from "@/features/user/components/details/UserDetails";
import { useRouter } from "next/router";

const UserDetailsPage = () => {
  const { query } = useRouter();
  const id = Number(query.user?.toString());
  return <UserDetails id={id} />;
};

export default UserDetailsPage;
