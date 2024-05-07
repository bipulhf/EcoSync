import UserContent from "@/components/dashboard/UserContent";
import extractUserInfo from "@/utils/verify";

export default async function StsManager() {
  const { permissions } = await extractUserInfo();
  return (
    <>
      <UserContent />
    </>
  );
}
