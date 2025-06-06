'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db,auth } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useJobs } from '@/context/JobsContext';
import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';

export default function AddJobPage() {
  const { user, loading } = useAuth();

  // Ensure user is authenticated before proceeding
  if (loading) return <div> User Loading...</div>;
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    type: 'Full-time',
    location: '',
    salary: '',
    contactNumber: '',
    postedBy: user.email || "Anonymous",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { addJob } = useJobs();
  const router = useRouter();

  // Add this useEffect to check if the component mounts properly
  useEffect(() => {
    console.log('AddJobPage component mounted');
    return () => console.log('AddJobPage component unmounted');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // First, verify the event is being properly prevented
    e.preventDefault();
    
    try {
      console.log('2. Setting submitting state');
      setIsSubmitting(true);
      setError(null);


     
      const newJob = {
        ...formData,
        postedDate: new Date().toISOString(),
        applied: false,
      };
      const docRef = await addDoc(collection(db, 'jobs'), newJob);
    //   addJob({id:docRef.id,...newJob});
      
      router.push('/');
    } catch (error) {
      console.error('8. Error caught:', error);
      let errorMessage = 'Failed to post job. ';
      
      if (error.code) {
        switch (error.code) {
          case 'permission-denied':
            errorMessage += 'You don\'t have permission to post jobs.';
            break;
          case 'unavailable':
            errorMessage += 'Network error. Please check your connection.';
            break;
          default:
            errorMessage += error.message || 'Please try again.';
        }
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setError(errorMessage);
    } finally {
     
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Post a New Job
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
            <p className="mt-2 text-sm">Check console for more details</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                placeholder="e.g., Phone Repair Technician"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Job Type *
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Contract">Casual</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                placeholder="e.g., Remote, Milimani, Kisian"
              />
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Pay (Kshs) *
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                required
                value={formData.salary}
                onChange={handleChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                placeholder="e.g., 8000"
                min="0"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number (WhatsApp) *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                placeholder="e.g., +254712345678"
                pattern="[0-9]{10,15}"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
              placeholder="Describe the job responsibilities, requirements, and benefits..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </span>
              ) : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}