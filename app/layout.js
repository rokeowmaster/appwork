import Navbar from '@/components/Navbar';
import { JobsProvider } from '@/context/JobsContext';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/authContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AppWork - Find Your Next Opportunity',
  description: 'Modern job listing platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <JobsProvider>
            <Navbar />
            <main className="">
              {children}
            </main>
          </JobsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}