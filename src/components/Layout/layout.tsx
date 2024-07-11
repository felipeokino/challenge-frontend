import { Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

const Layout = () => {
  const { logout } = useAuthentication();

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-700 text-white">
      <header className="flex justify-between items-center w-full h-16 px-4 bg-gray-800 sticky top-0">
        <h1>Products App</h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/seeds">Seeds</a>
            </li>
          </ul>
        </nav>
        <button onClick={logout}>Sign Out</button>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
