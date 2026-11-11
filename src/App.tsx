import React from 'react';
import { FloodGridProvider, useFloodGrid } from './context/FloodGridContext';
import { CustomCursor } from './components/common/CustomCursor';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { CityCommandDashboard } from './components/dashboard/CityCommandDashboard';
import { GeospatialMap } from './components/map/GeospatialMap';
import { PredictionCenter } from './components/predictions/PredictionCenter';
import { SensorMonitoring } from './components/drainage/SensorMonitoring';
import { SensorDetail } from './components/drainage/SensorDetail';
import { AccumulationSimulator } from './components/simulation/AccumulationSimulator';
import { InfrastructureVulnerability } from './components/infrastructure/InfrastructureVulnerability';
import { EmergencyResponseCenter } from './components/emergency/EmergencyResponseCenter';
import { AlertManagement } from './components/alerts/AlertManagement';
import { HistoricalAnalytics } from './components/analytics/HistoricalAnalytics';
import { ReportsExportCenter } from './components/reports/ReportsExportCenter';
import { AdminSettings } from './components/admin/AdminSettings';

const AppContent: React.FC = () => {
  const { activeTab, isDemoMode, triggerSimulatedSurge } = useFloodGrid();

  // If on landing page, display the full-width portal view while keeping top bar for navigation
  if (activeTab === 'landing') {
    return (
      <div className="flex h-screen w-screen flex-col bg-slate-50 dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 overflow-hidden">
        <CustomCursor />
        <TopBar />
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-50 dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 overflow-hidden">
      <CustomCursor />
      <TopBar />

      {/* Prominent Demo Mode & Telemetry Header Indicator */}
      {isDemoMode && (
        <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 px-4 py-1.5 text-xs text-amber-900 dark:text-amber-300">
          <div className="flex items-center gap-2 font-mono">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">DEMO MODE ACTIVE:</span>
            <span className="hidden sm:inline">
              Simulated IoT telemetry, Doppler precipitation, and emergency teams enabled for demonstration.
            </span>
          </div>
          <button
            onClick={triggerSimulatedSurge}
            className="rounded bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 border border-amber-300 dark:border-amber-500/40 px-2 py-0.5 text-[11px] font-mono font-bold text-amber-900 dark:text-amber-300 transition-colors shadow-2xs"
          >
            Trigger Flash Inundation Drill
          </button>
        </div>
      )}

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-[#0B1220]">
          {activeTab === 'dashboard' && <CityCommandDashboard />}
          {activeTab === 'map' && <GeospatialMap />}
          {activeTab === 'predictions' && <PredictionCenter />}
          {activeTab === 'sensors' && <SensorMonitoring />}
          {activeTab === 'sensor-detail' && <SensorDetail />}
          {activeTab === 'simulator' && <AccumulationSimulator />}
          {activeTab === 'infrastructure' && <InfrastructureVulnerability />}
          {activeTab === 'incidents' && <EmergencyResponseCenter />}
          {activeTab === 'alerts' && <AlertManagement />}
          {activeTab === 'analytics' && <HistoricalAnalytics />}
          {activeTab === 'reports' && <ReportsExportCenter />}
          {activeTab === 'admin' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <FloodGridProvider>
      <AppContent />
    </FloodGridProvider>
  );
}
