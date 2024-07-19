import { BiographyForm } from "@/components/biography-form";

export default function Page() {
  return (
    <div className="p-6 lg:py-10 w-full h-full space-y-4">
      <h1 className="text-lg font-medium">Meu perfil</h1>

      <BiographyForm />
    </div>
  );
}
