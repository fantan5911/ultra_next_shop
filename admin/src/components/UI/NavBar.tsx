import { Link, useLocation } from "react-router";
import { PAGES } from "../../config/pages.config";
import AdminButton from "./AdminButton";
import type { FC } from "react";

const NavBar: FC = () => {
    const pathname = useLocation().pathname;

    return (
        <div className="w-[15%] min-h-screen border-r border-r-black/15 relative z-20">
            <div className="flex py-8 justify-center items-center 
             min-h-[10%] border-b border-b-black/15 mb-3">
                <Link to={PAGES[0].path} className="text-3xl text-blue-500 font-extrabold">MONO ADMIN</Link>
            </div>
            <div className="flex flex-col gap-3 w-full min-h-[90%]">
                {PAGES.map(page => 
                    <AdminButton key={page.path} page={page} isActive={pathname === page.path}>
                        {page.name}
                    </AdminButton>
                )}
            </div>
        </div>
    );
};

export default NavBar;