import { User } from "@/components/UI/User";
import userService from "@/service/user.service";
import { IUser } from "@/shared/types/user.types";
import { redirect } from "next/navigation";
import BannedPage from "../../banned/page";

type Params = {
  username: string;
};

export const metadata = {
  title: "User Profile",
  description: "Страница профиля пользователя",
};

export default async function UserPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { username } = await params;
  let user: IUser;
  try {
    user = await userService.getUserByName(username);
  } catch (error) {
    if (error instanceof Error && error.message === "404") {
      redirect("/404");
    }
    throw error;
  }

  if (user.isBanned) {
    return <BannedPage />;
  }

  return (
    <div className="w-full min-h-[80vh] flex justify-center mx-auto">
      <div className="w-[78%] px-2 py-6">
        <User
          username={user.username}
          avatarUrl={user.avatarUrl}
          isBanned={user.isBanned}
        />
      </div>
    </div>
  );
}
