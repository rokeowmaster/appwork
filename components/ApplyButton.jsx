'use client';

import { useContext } from 'react';
import { JobsContext } from '@/context/JobsContext';

const ApplyButton = ({ job }) => {
  const { applyForJob } = useContext(JobsContext);

  const handleApply = () => {
    // Construct the WhatsApp message with job details
    const message = `Hello, I'm interested in applying for the following position:
    
*Job Title:* ${job.title}
*Company:* ${job.company}
*Location:* ${job.location || 'Not specified'}
*Salary:* ${job.salary || 'Negotiable'}

Here are my details:
- Name: [Your Name]
- Contact: [Your Phone/Email]
- Experience: [Brief summary of your relevant experience]

I would appreciate the opportunity to discuss this position further. Thank you!`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${job.contactNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
    
    // Mark job as applied
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