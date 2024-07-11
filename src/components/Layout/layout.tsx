import { History, Home, LogOut, Settings } from "lucide-react";
import { Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import Button from "../Button/button";

const Layout = () => {
  const { logout } = useAuthentication();

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-700 text-white">
      <header className="flex justify-between items-center w-full h-16 px-4 bg-gray-800 sticky top-0">
        <h1>Products App</h1>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a className="flex justify-center items-center" href="/">
                <Home />
                <span className="ml-2">Home</span>
              </a>
            </li>
            <li>
              <a className="flex justify-center items-center" href="/seeds">
                <Settings />
                <span className="ml-2">Seeds</span>
              </a>
            </li>
            <li>
              <a className="flex justify-center items-center" href="/logs">
                <History />
                <span className="ml-2">Logs</span>
              </a>
            </li>
          </ul>
        </nav>
        <Button variant="icon" onClick={logout}>
          <LogOut />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
