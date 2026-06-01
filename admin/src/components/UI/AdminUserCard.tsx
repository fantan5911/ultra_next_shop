import type { FC } from "react";

// interface Props {

// }

const AdminUserCard: FC = () => {
    return (
        <div className="flex flex-col min-h-60 border border-solid border-black/15 rounded-2xl mt-2">
                <div className="flex px-12 py-6 overflow-x-auto">
                    <div className="flex justify-center w-[25%]">
                        <h1 className="text-blue-500 font-semibold text-lg">ID</h1>
                    </div>
                    <div className="flex justify-center w-[25%]">
                        <h1 className="text-blue-500 font-semibold text-lg">Имя пользователя</h1>
                    </div>
                    <div className="flex justify-center w-[25%]">
                        <h1 className="text-blue-500 font-semibold text-lg">Email</h1>
                    </div>
                    <div className="flex justify-center w-[25%]">
                        <h1 className="text-blue-500 font-semibold text-lg">Состояние</h1>
                    </div>
                    <div className="flex justify-center w-[25%]">
                    <h1 className="text-blue-500 font-semibold text-lg">Действия</h1>
                    </div>
                </div>
            </div>
    );
};

export default AdminUserCard;