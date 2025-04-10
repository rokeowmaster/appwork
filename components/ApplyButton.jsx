'use client';

import { useContext } from 'react';
import { JobsContext } from '@/context/JobsContext';

const ApplyButton = ({ job }) => {
  const { applyForJob } = useContext(JobsContext);

  const handleApply = () => {
    const message = `Hi, I'm interested in applying for the ${job.title} position at ${job.company}. Here are my details: [Your Name], [Your Contact Info], [Brief Introduction].`;
    const whatsappUrl = `https://wa.me/${job.contactNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    applyForJob(job.id);
  };

  return (
    <button
      onClick={handleApply}
      disabled={job.applied}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
        job.applied
          ? 'bg-green-100 text-green-700 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
      }`}
    >
      {job.applied ? 'Applied ✓' : 'Apply Now'}
    </button>
  );
};

export default ApplyButton;