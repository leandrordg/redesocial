import { AccountsHeader } from "@/components/accounts-header";
import { Feed } from "@/components/feed";
import { getUserById } from "@/utils/queries/users";
import { notFound } from "next/navigation";

export default async function Page({
  params: { accountId },
}: {
  params: { accountId: string };
}) {
  const user = await getUserById(accountId);

  if (!user) return notFound();

  return (
    <div className="p-6 lg:p-10 max-w-screen-lg mx-auto space-y-6">
      <AccountsHeader user={user} />

      <Feed posts={user.posts} />
    </div>
  );
}
