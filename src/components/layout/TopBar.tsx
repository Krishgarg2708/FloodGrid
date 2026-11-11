import React from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { ShieldAlert, Play, Pause, AlertTriangle, Sun, Moon } from 'lucide-react';
import { UserRole } from '../../types';

export const TopBar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    userRole, 
    setUserRole,
    isStreamingLive,
    setIsStreamingLive,
    triggerSimulatedSurge,
    theme,
    toggleTheme
  } = useFloodGrid();

  const roles: UserRole[] = [
    'Municipal Administrator',
    'Disaster Management Officer',
    'Infrastructure Operator',
    'Analyst',
    'Super Administrator',
    'Public Viewer'
  ];

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-8 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1220]/95 px-6 backdrop-blur-md transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 dark:bg-blue-600/20 border border-sky-200 dark:border-blue-500/30 text-sky-600 dark:text-sky-400 group-hover:border-sky-400 transition-colors">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Flood<span className="text-sky-600 dark:text-sky-400">Grid</span>
          </span>
        </button>
      </div>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'dashboard' ? 'text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400' : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Command Center
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'map' ? 'text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400' : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Geospatial Map
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'predictions' ? 'text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400' : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Risk Predictor
        </button>
        <button
          onClick={() => setActiveTab('sensors')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'sensors' ? 'text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400' : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          IoT Drainage
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'simulator' ? 'text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400' : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Hydrology Simulator
        </button>
        <button
          onClick={() => setActiveTab('incidents')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'incidents' ? 'text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400' : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Emergency Ops
        </button>
      </nav>

      {/* Zone 3: 1 primary action cluster */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Simple White / Dark Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Simple White Light Mode'}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#172235] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
        </button>

        {/* Role Switcher */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="hidden xl:inline">Role:</span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-sky-500 transition-colors shadow-xs"
          >
            {roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Live stream toggle */}
        <button
          onClick={() => setIsStreamingLive(prev => !prev)}
          title={isStreamingLive ? 'Pause live IoT telemetry stream' : 'Resume live stream'}
          className="flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#172235] px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:text-white transition-colors"
        >
          {isStreamingLive ? (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <Pause className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline font-mono">LIVE</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline font-mono">PAUSED</span>
            </>
          )}
        </button>

        {/* Surge drill trigger */}
        <button
          onClick={triggerSimulatedSurge}
          className="flex items-center gap-1.5 rounded-md bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors whitespace-nowrap shadow-xs"
        >
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span>Surge Drill</span>
        </button>
      </div>
    </header>
  );
};
