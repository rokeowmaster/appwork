'use client';

import { useContext } from 'react';
import { JobsContext } from '@/context/JobsContext';
import Link from 'next/link';

const ApplyButton = ({ job }) => {
  const { applyForJob } = useContext(JobsContext);

  const handleApply = (e) => {
    // Prevent default if we're using a link
    e.preventDefault();
    applyForJob(job.id);
  };

  const message = `Hi, I'm interested in applying for the ${job.title} position at ${job.company}. Here are my details: [Your Name], [Your Contact Info], [Brief Introduction].`;
  const whatsappUrl = `https://wa.me/${job.contactNumber}?text=${encodeURIComponent(message)}`;

  return job.applied ? (
    <button
      disabled
      className="px-6 py-2 rounded-full font-medium bg-green-100 text-green-700 cursor-not-allowed"
    >
      Applied ✓
    </button>
  ) : (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleApply}
      className="px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl text-center"
    >
      Apply Now
    </Link>
  );
};

export default ApplyButton;