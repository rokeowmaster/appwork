'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';

// Example job data — replace with real Firebase fetch
const dummyJobs = [
  { id: 1, title: 'Frontend Developer', company: 'NeoTech', location: 'Remote' },
  { id: 2, title: 'AI Engineer', company: 'SynapseX', location: 'New York' },
  { id: 3, title: 'Blockchain Dev', company: 'FutureChain', location: 'San Francisco' },
];



export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const getInitials = (nameOrEmail) => {
    const parts = nameOrEmail.split(' ');
    if (parts.length === 1) return nameOrEmail.slice(0, 2).toUpperCase();
    return parts.map(part => part[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 border border-blue-500/30 rounded-2xl p-6 mb-10 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
              {user && getInitials(user.displayName || user.email)}
            </div>
            <div>
              <h1 className="text-xl font-semibold">
                {user?.displayName || user?.email}
              </h1>
              <p className="text-sm text-gray-400">AppWork Job Poster</p>
            </div>
          </div>
        </motion.div>

        {/* Job Listings */}
        <h2 className="text-2xl font-bold mb-4">Your Jobs</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {dummyJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-gray-800 border border-purple-500/20 rounded-xl p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-400">{job.title}</h3>
              <p className="text-sm text-gray-300">{job.company}</p>
              <p className="text-xs text-gray-500">{job.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
