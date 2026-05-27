import { Link } from "react-router";
import type { IPage } from "../../config/pages.config";
import type { FC } from "react";

interface Props {
    children: React.ReactNode;
    page: IPage;
    isActive: boolean;
}

const AdminButton: FC<Props> = ({ children, page, isActive }) => {
    return (
        <Link to={page.path}
         className={isActive ? "rounded-2xl text-lg font-sans ml-2 mr-2 px-6 py-3 bg-blue-300/20"
            : "rounded-2xl text-lg font-sans ml-2 mr-2 px-6 py-3 hover:bg-black/5 transition-colors duration-150"
         }
         >
            <page.icon className={isActive ? "text-blue-500 mr-0.5" : "text-gray-500 mr-0.5"} />
            <span className={isActive ? "text-blue-500" : "text-gray-500"}>
                {children}
            </span>
        </Link>
    );
};

export default AdminButton;