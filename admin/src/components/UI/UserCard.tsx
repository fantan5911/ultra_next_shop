import userService from "../../service/user.service";
import type { IUser } from "../../types/user.types";
import BanUserButton from "./BanUserButton";

interface Props {
    user: IUser;
}

const UserCard = ({ user }: Props) => {
    async function banUser(userId: string, isBanned: boolean) {
        await userService.banUserById(userId, isBanned);
    }

    return (
        <div className="flex px-12 py-4 border-t border-t-solid border-t-black/15 bg-black/2">
            <div className="flex justify-center w-[25%]">
                <p className="text-black">
                {user.id}
                </p>
            </div>
            <div className="flex justify-center w-[25%]">
                <p className="text-black font-semibold text-lg">{user.username}</p>
            </div>
            <div className="flex justify-center w-[25%]">
                <p className="text-black text-lg">{user.email}</p>
            </div>
            <div className="flex justify-center w-[25%]">
                <p className={
                    user.isBanned ?
                    "flex justify-center items-center rounded-xl bg-red-700/20 text-red-600 px-5 font-semibold"
                    :
                    "flex justify-center items-center rounded-xl bg-green-700/20 text-green-500 px-5 font-semibold"
                }>
                    {user.isBanned ? "Забанен" : "Не забанен"}
                </p>
            </div>
            <div className="flex justify-center w-[25%]"> 
                <BanUserButton
                onclick={() => banUser(user.id, !user.isBanned)} 
                isBanned={user.isBanned}
                />
            </div>
        </div>
    );
};

export default UserCard;