import { HomeButton } from "@/components/UI/HomeButton";

export default function BannedPage() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
      <h1 className="text-3xl text-red-600">
        Ваш аккаунт был заблокирован за нарушение правил платформы
      </h1>
      <HomeButton />
    </div>
  );
}
