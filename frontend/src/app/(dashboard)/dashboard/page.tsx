import UserContent from "@/components/dashboard/UserContent";
import extractUserInfo from "@/utils/verify";

export default async function Dashboard() {
  const { permissions } = await extractUserInfo();
  return (
    <>
      <UserContent permissions={permissions} />
    </>
  );
}
