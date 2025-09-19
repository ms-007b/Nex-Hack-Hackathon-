import React from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="h-screen bg-gray-50">
      <Header />
      <div className="flex pt-20">
        <Sidebar user={user} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Dashboard;