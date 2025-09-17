import { useState } from 'react';
import {
    Shield, BookOpen, User
} from 'lucide-react';
import DeviceMonitor from '../components/DeviceMonitor';
import LearningSection from '../components/LearningSection';
import ProfileSection from '../components/ProfileSection';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Sidebar: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('device');

    const tabs = [
        { id: 'device', name: 'Device Monitor', icon: Shield },
        { id: 'learning', name: 'Learn Self Defence', icon: BookOpen },
        { id: 'profile', name: 'Profile', icon: User }
    ];
    return (
        <div className="flex">
            <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
                <div className="p-6">
                    <div className="space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex-1 p-6">
                {activeTab === 'device' && <DeviceMonitor user={user} />}
                {activeTab === 'learning' && <LearningSection user={user} />}
                {activeTab === 'profile' && <ProfileSection user={user} />}
            </div>
        </div>
    );

}
export default Sidebar;