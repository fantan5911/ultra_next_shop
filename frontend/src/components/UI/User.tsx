import Image from "next/image";
import { UserSmartphoneCard } from "./UserSmartphoneCard";

interface Smartphone {
  id: string;
  src: string;
  brand: string;
  name: string;
  price: number;
  alt: string;
}

interface Props {
  avatarUrl: string | null | "";
  username: string;
  isBanned: boolean;
  smartphones?: Smartphone[];
}

export function User({
  avatarUrl,
  username,
  isBanned,
  smartphones = [],
}: Props) {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full ml-4 gap-4 flex">
        <Image
          src={
            avatarUrl === null || avatarUrl === ""
              ? "/avatar_user.png"
              : avatarUrl
          }
          alt={username}
          width={90}
          height={90}
          className="rounded-full"
        />
        <div>
          <h1 className="font-extrabold uppercase text-4xl font">{username}</h1>
          <p className="mt-2 text-lg font-semibold text-white/50">
            Рейтинг продавца: 4.8
          </p>
          {isBanned && (
            <p className="text-lg font-bold text-red-500">
              Пользователь заблокирован
            </p>
          )}
        </div>
      </div>
      <div
        className="w-full
        text-2xl font-bold py-2
       border-b border-b-white/40"
      >
        Объявления
      </div>
      <div className="w-full flex flex-col gap-3">
        {smartphones.map((smartphone) => (
          <UserSmartphoneCard
            key={smartphone.id}
            id={smartphone.id}
            src={smartphone.src}
            brand={smartphone.brand}
            name={smartphone.name}
            price={smartphone.price}
          />
        ))}
      </div>
    </div>
  );
}
