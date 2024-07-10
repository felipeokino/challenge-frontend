import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen w-screen bg-gray-700 text-white'>

      <header className='flex justify-between items-center w-full h-16 px-4 bg-gray-800'>
        <h1>My App</h1>
        <nav >
          <ul className='flex items-center space-x-4'>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className='flex-1 p-4'>
        <Outlet />
      </main>
    </div>

  )
}

export default Layout