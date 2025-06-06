'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth(); // Assuming you have a context for auth state

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <Image 
                src="/logo-app.png" // replace with your actual logo path
                alt="AppWork Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 32px, 32px"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AppWork
            </span>
          </Link>
          <div className="flex space-x-4 md:space-x-8">
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm md:text-base`}
            >
              Browse Jobs
            </Link>
            <Link 
              href="/add-job" 
              className={`${pathname === '/add-job' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm md:text-base`}
            >
              Post a Job
            </Link>
            <Link 
              href="/register" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base"
            >
              Register
            </Link>
            <Link 
              href={user ? '/profile' : '/login'} 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base"
            >
              {user ? 'Profile' : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;