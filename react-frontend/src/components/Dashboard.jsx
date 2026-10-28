import { useState } from 'react';
import '../App.css';
import DashboardContent from './DashboardContent';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useStoreData from './useStoreData';

function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const store = useStoreData();

  return (
    <div className="dashboard">
      <Sidebar activeView={activeView} onNavigate={setActiveView} {...store} />
      <main className="main-area">
        <Topbar activeView={activeView} />
        <DashboardContent key={activeView} activeView={activeView} onNavigate={setActiveView} store={store} />
      </main>
    </div>
  );
}

export default Dashboard;
