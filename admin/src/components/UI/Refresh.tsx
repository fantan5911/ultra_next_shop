import RefreshIcon from '@mui/icons-material/Refresh';
import type { FC } from 'react';

interface Props {
    onclick: () => void;
}

const Refresh: FC<Props> = ({onclick}) => {
    return (
        <button 
        type="button"
        onClick={onclick}
        className="inline-flex items-center justify-center
        gap-2 max-w-30 text-sm mt-1.5
        border border-solid border-black/15 bg-black/5 rounded-md cursor-pointer
        active:bg-black/15 transition-colors duration-75
        "
        >
            <RefreshIcon />
            <span className="text-black">Обновить</span>
        </button>
    );
};

export default Refresh;