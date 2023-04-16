import EditPhoto from "@/components/forms/EditPhoto";
import { useRouter } from "next/router";

const EditPage = () => {
  const { query } = useRouter();
  const id = query.edit as string;
  console.log(id);
  return <EditPhoto id={id} />;
};

export default EditPage;
