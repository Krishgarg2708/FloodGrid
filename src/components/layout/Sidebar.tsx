import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BrainCircuit, 
  Cpu, 
  Activity, 
  Droplets, 
  Building2, 
  AlertOctagon, 
  LifeBuoy, 
  History, 
  FileText, 
  Sliders, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Radio,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cities, 
    selectedCity, 
    setSelectedCity,
    alerts,
    incidents
  } = useFloodGrid();

  const [collapsed, setCollapsed] = useState(false);

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE').length;
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED').length;

  interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }

  interface NavGroup {
    title: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      title: 'Real-Time Intelligence',
      items: [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'map', label: 'Geospatial Map', icon: MapIcon },
        { id: 'predictions', label: 'Flood Predictions', icon: BrainCircuit },
        { id: 'sensors', label: 'Drainage Sensors', icon: Cpu, badge: '42 Active' },
        { id: 'sensor-detail', label: 'Sensor Telemetry', icon: Activity }
      ]
    },
    {
      title: 'Operations & Engineering',
      items: [
        { id: 'simulator', label: 'Hydrology Simulator', icon: Droplets },
        { id: 'infrastructure', label: 'Vulnerable Assets', icon: Building2 },
        { id: 'alerts', label: 'Alert Dispatch', icon: AlertOctagon, badge: activeAlerts > 0 ? `${activeAlerts}` : undefined, badgeColor: 'text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20' },
        { id: 'incidents', label: 'Emergency Response', icon: LifeBuoy, badge: activeIncidents > 0 ? `${activeIncidents}` : undefined, badgeColor: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20' }
      ]
    },
    {
      title: 'Historical & Governance',
      items: [
        { id: 'analytics', label: 'Historical Analytics', icon: History },
        { id: 'reports', label: 'Reports & SITREP', icon: FileText },
        { id: 'admin', label: 'Settings & Integrations', icon: Sliders },
        { id: 'landing', label: 'Platform Portal', icon: Globe }
      ]
    }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1726] transition-all duration-300 ease-in-out shrink-0 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* City Selector Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 p-3.5">
        {!collapsed ? (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Active Geography
              </span>
              <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 flex items-center gap-1">
                <Radio className="h-2.5 w-2.5 text-emerald-500 animate-pulse" />
                Telemetry OK
              </span>
            </div>
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const target = cities.find(c => c.id === e.target.value);
                if (target) setSelectedCity(target);
              }}
              className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#172235] px-2.5 py-1.5 text-xs font-semibold text-slate-800 dark:text-white outline-none focus:border-sky-500 transition-colors shadow-xs"
            >
              {cities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span>Risk: <strong className="text-amber-600 dark:text-amber-400">{selectedCity.floodRiskIndex}/100</strong></span>
              <span>Rain: <strong className="text-sky-700 dark:text-sky-300">{selectedCity.currentRainfallIntensity} mm/h</strong></span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Globe className="h-5 w-5 text-sky-600 dark:text-sky-400 mb-1" />
            <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 truncate max-w-[48px]">
              {selectedCity.name.split(' ')[0]}
            </span>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20 shadow-xs font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                    {!collapsed && (
                      <span className="flex-1 text-left whitespace-nowrap truncate">
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor || 'text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer system status */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-3 bg-slate-50/70 dark:bg-[#0B1220]/60">
        {!collapsed ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                NDMA / IMD Feeds
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">ONLINE</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
              Spatial Resolution: 10m DEM · HydroML v4.2
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <FileCheck2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
        )}
      </div>

      {/* Collapse Toggle Handle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#172235] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </aside>
  );
};
