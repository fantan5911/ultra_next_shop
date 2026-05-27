import type { FC } from "react";
import BlockIcon from '@mui/icons-material/Block';
import HowToRegIcon from '@mui/icons-material/HowToReg';

interface Props {
    onclick: () => void;
    isBanned: boolean
}

const BanUserButton: FC<Props> = ({onclick, isBanned}) => {
    return (
        <button onClick={onclick}
        className={isBanned ? 
            "rounded-xl px-2 py-1.5 bg-[#1db14e] text-sm text-white cursor-pointer hover:bg-[#1c9e47] transition-colors duration-100"
             :
            "rounded-xl px-2 py-1.5 bg-[#dd3232] text-sm text-white cursor-pointer hover:bg-[#c71d1d] transition-colors duration-100"}
        >
            {isBanned ? <HowToRegIcon className="text-white mr-3" /> : <BlockIcon className="text-white mr-3" />}
            {isBanned ? "Разбанить" : "Забанить"}
        </button>
    );
};

export default BanUserButton;