import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import MonitoringPage from './pages/MonitoringPage';
import RekapitulasiPage from './pages/RekapitulasiPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage />;
      case 'project': return <ProjectPage />;
      case 'monitoring': return <MonitoringPage />;
      case 'rekapitulasi': return <RekapitulasiPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-8">
        {renderPage()}
      </main>
    </div>
  );
}