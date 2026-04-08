import Image from "next/image";


interface Props {
    avatarUrl: string | null | '';
    username: string;
    isBanned: boolean;
}

export function User({avatarUrl, username, isBanned}: Props) {
    return (
        <div className="flex items-center">
            <Image src={avatarUrl === null || avatarUrl === '' ? '/avatar_user.png' : avatarUrl}
             alt={username}
             width={90}
             height={90}
             className="rounded-full"
            />
            <div className="ml-4 gap-2 flex flex-col">
                <h1 className="font-extrabold uppercase text-4xl font">{username}</h1>
                <p className="text-lg font-semibold text-white/50">Рейтинг продавца: 4.8</p>
                {isBanned && (
                    <p className="text-lg font-bold text-red-500">Пользователь заблокирован</p>
                )}

            </div>
        </div>
    )
}