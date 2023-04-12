import PhotoDetails from "@/components/Details/PhotoDetails";
import { useRouter } from "next/router";

const DetailsPage = () => {
  const { query } = useRouter();
  const id = query.details as string;
  return <PhotoDetails id={id} />;
};

export default DetailsPage;
