import { useEffect, useState, type FC } from 'react';
import SearchInput from '../components/UI/SearchInput';
import { useDebounce } from '../hooks/useDebounce';
import userService from '../service/user.service';
import { Button, Dialog } from '@mui/material';
import CustomButton from '../components/UI/CustomButton';
import Refresh from '../components/UI/Refresh';
import UserCard from '../components/UI/UserCard';
import { type IUser } from '../types/user.types';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const Users: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [users, setUsers] = useState<IUser[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");
    const [banError, setBanError] = useState<string>("");

    async function banUser() {
        try {
            const response = await userService.banUserById(userId, true);
            if (response.status === 200 || response.status === 201) {
                setModalIsOpen(false);
                alert("Успешно забанен");
            }
        } 
        catch (error: any) {
            console.error(error);
            setBanError(error.message);
        }
    }

    async function getUsers() {
        try {
            const response = await userService.getUsers();
            if (response && Array.isArray(response)) {
                setUsers(response);
            } else {
                console.error('Invalid response format:', response);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    }

    async function searchUsers(search: string) {
        try {
            const response = await userService.searchUsers(search);
            if (response && Array.isArray(response)) {
                setUsers(response);
            } else {
                console.error('Invalid response format:', response);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchUsers(debouncedSearchTerm);
        }
        else {
            getUsers();
        }
    }, [debouncedSearchTerm]);
    return (
        <div className="flex flex-col w-[85%] px-15 py-10">
            <div className="w-full flex justify-between">
                <h1 className="text-3xl font-semibold text-blue-500">Пользователи</h1>
                <CustomButton onClick={() => setModalIsOpen(true)}>
                    Забанить пользователя по ID
                </CustomButton>
                <Dialog open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <div className="p-6 flex flex-col gap-4">
                        <h2 className="text-xl font-semibold">Введите ID пользователя</h2>
                        <input
                        type="text" 
                        placeholder="User id" 
                        className="w-full 
                        border border-solid border-black/15 rounded-xl p-2 outline-none" 
                        required 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        />
                        {banError && <p>{banError}</p>}
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => setModalIsOpen(false)} variant="outlined">Закрыть</Button>
                            <Button onClick={() => {
                                if (userId) {
                                    banUser();
                                }
                            }} variant="contained">Бан</Button>
                        </div>
                    </div>
                </Dialog>
                
            </div>
            <div className="">
                    <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск пользователей"
                    />
            </div>
            <Refresh onclick={getUsers} />
            {users.length ? 
            <div className="flex flex-col min-h-50 border border-solid border-black/15 rounded-2xl mt-2">
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
                {users.map(user => 
                    <UserCard key={user.id} user={user} />
                )}
            </div>
            : (
                <>
                <div className="flex flex-col border border-solid border-black/15 rounded-2xl mt-2">
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
                <div className="flex flex-col min-h-130 justify-center items-center">
                    <SearchOffIcon sx={{
                        fontSize: 140
                    }}/>
                    <h1 className="text-2xl font-semibold">Ничего не нашлось</h1>
                </div>
                </>
            )
            }
        </div>
    );
};

export default Users;