'use client';

import { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import ApplyButton from './ApplyButton';

const JobCard = ({ job, hideApplied = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If hideApplied is true and job is applied, don't render anything
  if (hideApplied && job.applied) {
    return null;
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer ${
        isExpanded ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
            <p className="text-gray-600 mt-1">{job.company}</p>
            
          </div>

          <div className="flex items-center space-x-2">
            {job.applied ? (
              <div className="flex items-center text-green-500">
                <CheckCircle size={20} className="mr-1" />
                <span>Applied</span>
              </div>
            ) : (
              <div className="flex items-center text-yellow-500">
                <Clock size={20} className="mr-1" />
                <span>Available</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {job.type}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            {job.location}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Kshs {job.salary}
          </span>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900">Description</h4>
            <p className="text-gray-600 mt-2">{job.description}</p>
            <p className="text-gray-600 mt-1">Posted by: {job.postedBy}</p>

            {/* Only show ApplyButton if not already applied */}
            {!job.applied && (
              <div className="mt-6 flex justify-end">
                <ApplyButton job={job} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;