import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ROUTES } from "./config/router.config";
import NavBar from "./components/UI/NavBar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex">
      <NavBar />
      <Routes>
        {ROUTES.map(route => 
          <Route key={route.path} path={route.path} element={<route.component />} />
        )}
        <Route path="*" element={<Navigate to="/smartphones"/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;