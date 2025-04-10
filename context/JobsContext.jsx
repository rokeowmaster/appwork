'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const JobsContext = createContext();

export const useJobs = () => useContext(JobsContext);

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const jobsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyForJob = async (jobId) => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, {
        applied: true,
        appliedAt: new Date().toISOString()
      });
      
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, applied: true } : job
      ));
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const addJob = async (newJob) => {
    try {
      const docRef = await addDoc(collection(db, 'jobs'), newJob);
      
      const addedJob = { id: docRef.id, ...newJob };
      setJobs([addedJob, ...jobs]);
      return addedJob;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  return (
    <JobsContext.Provider value={{ jobs, loading, useJobs, applyForJob, addJob }}>
      {children}
    </JobsContext.Provider>
  );
};