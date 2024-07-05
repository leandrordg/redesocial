export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center p-6 py-20 lg:p-10 h-full">
      {children}
    </div>
  );
}
