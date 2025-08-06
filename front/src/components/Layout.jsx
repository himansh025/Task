import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <nav className="md:hidden">
        <Navbar />
      </nav>

      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Sidebar for md and above */}
        <aside className="hidden md:block md:w-64 bg-gray-950 text-white">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 mt-10 lg-mt-5 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
