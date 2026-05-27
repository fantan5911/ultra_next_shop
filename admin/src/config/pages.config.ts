import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material';

export interface IPage {
    name: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    path: string;
}

export const PAGES: IPage[] = [
    {
        name: "Смартфоны",
        icon: SmartphoneIcon,
        path: "/smartphones",
    },
    {
        name: "Пользователи",
        icon: PersonIcon,
        path: "/users",
    },
    {
        name: "Аналитика",
        icon: LeaderboardIcon,
        path: "/analytics",
    }
]