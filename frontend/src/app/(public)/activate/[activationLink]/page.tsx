import authService from "@/service/auth.service";

type Params = { activationLink: string };

export default async function ActivatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { activationLink } = await params;

  const response = await authService.activate(activationLink);

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <h1 className="text-2xl font-semibold">{response}</h1>
    </div>
  );
}
