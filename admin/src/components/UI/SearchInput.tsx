import type { ChangeEvent, FC } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchInput: FC<Props> = ({ value, onChange, placeholder }) => {
    return (
        <div className="relative w-full mt-12 mb-5">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
                value={value}
                onChange={onChange}
                type="text"
                placeholder={placeholder}
                className="w-full border border-solid border-black/15 focus:border-black/35 transition-colors duration-200 rounded-xl pl-10 pr-4 py-2 outline-none"
            />
        </div>
    )
};

export default SearchInput;