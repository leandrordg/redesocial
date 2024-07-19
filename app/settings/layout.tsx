import { SettingsSidebar } from "@/components/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-xl mx-auto flex">
      <div className="hidden md:flex sticky top-0 left-0 min-w-64 lg:min-w-80 xl:min-w-96">
        <SettingsSidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
