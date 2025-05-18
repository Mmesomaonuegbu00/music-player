import React, { Suspense } from 'react';
import Dashboard from '@/components/DashBoard/Dashboard';

const Home = () => {
  return (
    <div className="h-full">
      <Suspense fallback={<div className="text-center pt-10 text-gray-500">Loading dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default Home;
