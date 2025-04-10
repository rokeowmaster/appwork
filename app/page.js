import JobList from '@/components/JobList';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Animated background gradient */}

      {/* Glass effect container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/5 rounded-3xl p-10 shadow-xl ring-1 ring-white/10 text-center animate-fadeIn">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl mb-6">
            Find a Job
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Browse the latest opportunities and apply with one click.
          </p>
        </div>

        {/* Job List Section */}
        <div className="mt-16 animate-fadeInSlow">
          <JobList />
        </div>
      </div>
    </div>
  );
}
