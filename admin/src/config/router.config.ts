import type { FC } from "react";
import Smartphones from "../pages/Smartphones";
import Users from "../pages/Users";
import Analytics from "../pages/Analytics";

interface IRoute {
    path: string;
    component: FC;
}

export const ROUTES: IRoute[] = [
    {
        path: "/smartphones",
        component: Smartphones
    },
    {
        path: "/users",
        component: Users
    },
    {
        path: "/analytics",
        component: Analytics
    }
];