import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">
        Welcome, Admin! Here you can manage seller registrations, property listings, and view analytics.
      </p>
      {/* Additional admin controls, tables, or charts can be added here */}
    </div>
  );
};

export default AdminDashboard;
