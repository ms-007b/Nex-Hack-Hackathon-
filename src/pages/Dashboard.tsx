import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('device');
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar user={user} onLogout={onLogout} />
    </div>
  );
};

export default Dashboard;