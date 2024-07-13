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
    <div className="max-w-screen-lg mx-auto">
      <AccountsHeader user={user} />

      <Feed posts={user.posts} />
    </div>
  );
}
