import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  Sliders, 
  Users, 
  Building, 
  Radio, 
  Database, 
  ShieldCheck, 
  Key, 
  CheckCircle2, 
  MousePointer, 
  Bell, 
  Save, 
  Server,
  Sun,
  Moon
} from 'lucide-react';
import { UserRole } from '../../types';

export const AdminSettings: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    customCursorEnabled, 
    setCustomCursorEnabled,
    isStreamingLive,
    setIsStreamingLive,
    theme,
    setTheme
  } = useFloodGrid();

  const [activeTabSub, setActiveTabSub] = useState<'users' | 'orgs' | 'integrations' | 'preferences'>('integrations');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Integrations state
  const [mqttBroker, setMqttBroker] = useState('mqtts://broker.floodgrid.gov.in:8883');
  const [imdFeed, setImdFeed] = useState('https://api.imd.gov.in/v2/radar/delhi/reflectivity');
  const [postgisHost, setPostgisHost] = useState('postgis-cluster.spatial.internal:5432');
  const [capWebhook, setCapWebhook] = useState('https://sachet.ndma.gov.in/api/v1/alerts/cap');

  const usersList = [
    { name: 'Col. Sanjeev Rawat', role: 'Disaster Management Officer', agency: 'Delhi Disaster Management (DDMA)', email: 's.rawat@ddma.delhi.gov.in', status: 'Active' },
    { name: 'Dr. Meenakshi Sundaram', role: 'Municipal Administrator', agency: 'Municipal Corporation (MCD)', email: 'm.sundaram@mcd.gov.in', status: 'Active' },
    { name: 'Er. Rajesh Goel', role: 'Infrastructure Operator', agency: 'Public Works Department (PWD)', email: 'r.goel@pwd.delhi.gov.in', status: 'Active' },
    { name: 'Pooja Narang', role: 'Analyst', agency: 'Urban Hydrology Research Cell', email: 'p.narang@hydrology.res.in', status: 'Active' },
    { name: 'Krish Garg', role: 'Super Administrator', agency: 'National Informatics Center', email: 'krish.garg2708@gmail.com', status: 'Active' }
  ];

  const organizations = [
    { name: 'Delhi Disaster Management Authority (DDMA)', jurisdiction: 'Metropolitan Capital Region', monitoredAssets: 182, contacts: '+91 11 2242 1414' },
    { name: 'Public Works Department (PWD Drainage Wing)', jurisdiction: 'State Highways & Trunk Drains', monitoredAssets: 340, contacts: '+91 11 2331 8900' },
    { name: 'National Disaster Response Force (NDRF)', jurisdiction: 'Rapid Flood Rescue Ops', monitoredAssets: 50, contacts: '+91 11 2436 3260' },
    { name: 'Gurugram Metropolitan Development Authority (GMDA)', jurisdiction: 'NH-48 & Badshahpur Basin', monitoredAssets: 110, contacts: '+91 124 274 0000' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Integration configurations & endpoints committed to encrypted keystore.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <Sliders className="h-3.5 w-3.5" />
            <span>PLATFORM ADMINISTRATION & INTEGRATION CONSOLE</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SECURITY AUDIT PASS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Settings, Integrations & Access Governance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage Role-Based Access Control (RBAC), municipal agency rosters, MQTT telemetry brokers, and geospatial database connections.
          </p>
        </div>

        {saveStatus && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-3 py-1.5 rounded-lg shadow-2xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{saveStatus}</span>
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTabSub('integrations')}
          className={`px-3 py-1.5 rounded-md transition-colors font-semibold ${
            activeTabSub === 'integrations' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          API & Hardware Integrations
        </button>
        <button
          onClick={() => setActiveTabSub('users')}
          className={`px-3 py-1.5 rounded-md transition-colors font-semibold ${
            activeTabSub === 'users' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          User Roles (RBAC)
        </button>
        <button
          onClick={() => setActiveTabSub('orgs')}
          className={`px-3 py-1.5 rounded-md transition-colors font-semibold ${
            activeTabSub === 'orgs' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Participating Organizations
        </button>
        <button
          onClick={() => setActiveTabSub('preferences')}
          className={`px-3 py-1.5 rounded-md transition-colors font-semibold ${
            activeTabSub === 'preferences' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          System Preferences
        </button>
      </div>

      {/* Tab: Integrations */}
      {activeTabSub === 'integrations' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
              Connected Telemetry Pipelines & Environmental Feeds
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-800 dark:text-slate-300 font-semibold flex items-center gap-2">
                  <Radio className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  MQTT Telemetry Broker Endpoint (TLS 1.3)
                </label>
                <input
                  type="text"
                  value={mqttBroker}
                  onChange={(e) => setMqttBroker(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2.5 font-mono text-slate-800 dark:text-slate-200 outline-none focus:border-sky-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Subscribes to floodgrid/iot/+/+/telemetry</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-800 dark:text-slate-300 font-semibold flex items-center gap-2">
                  <Server className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  IMD Doppler Weather Radar Feed API
                </label>
                <input
                  type="text"
                  value={imdFeed}
                  onChange={(e) => setImdFeed(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2.5 font-mono text-slate-800 dark:text-slate-200 outline-none focus:border-sky-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">High-resolution radar reflectivity grid</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-800 dark:text-slate-300 font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  PostGIS Spatial Database Cluster
                </label>
                <input
                  type="text"
                  value={postgisHost}
                  onChange={(e) => setPostgisHost(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2.5 font-mono text-slate-800 dark:text-slate-200 outline-none focus:border-sky-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Stores polygon contours and drainage polylines</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-800 dark:text-slate-300 font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  NDMA Common Alerting Protocol (CAP) Webhook
                </label>
                <input
                  type="text"
                  value={capWebhook}
                  onChange={(e) => setCapWebhook(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2.5 font-mono text-slate-800 dark:text-slate-200 outline-none focus:border-sky-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Standardized XML payload for national emergency siren triggers</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-5 py-2 text-xs font-bold text-white shadow-sm transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                Save & Validate Integrations
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab: Users */}
      {activeTabSub === 'users' && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
              Role-Based Access Control Roster
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Total Authorized Accounts: {usersList.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                <tr>
                  <th className="pb-2.5">User</th>
                  <th className="pb-2.5">Role</th>
                  <th className="pb-2.5">Department / Agency</th>
                  <th className="pb-2.5">Email</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                {usersList.map((u, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 font-semibold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="py-3 font-mono text-sky-700 dark:text-sky-400 font-medium">{u.role}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">{u.agency}</td>
                    <td className="py-3 font-mono text-slate-500 dark:text-slate-400">{u.email}</td>
                    <td className="py-3 font-mono text-right text-emerald-600 dark:text-emerald-400 font-semibold">{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Organizations */}
      {activeTabSub === 'orgs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {organizations.map((org, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 space-y-2 text-xs shadow-xs">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{org.name}</h4>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 text-[10px] bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                  VERIFIED
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">Jurisdiction: {org.jurisdiction}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span>Monitored Assets: <strong className="text-slate-900 dark:text-slate-200">{org.monitoredAssets}</strong></span>
                <span>Emergency: <strong className="text-sky-700 dark:text-sky-300">{org.contacts}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Preferences */}
      {activeTabSub === 'preferences' && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 shadow-xs space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
            User Interface & Operational Preferences
          </h3>

          <div className="space-y-4 pt-2">
            {/* Simple White / Dark Theme Selector */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726]">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Visual Theme</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Choose simple crisp white light mode or high-contrast dark operations mode.
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white dark:bg-[#172235] p-1 rounded-md border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${theme === 'light' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Sun className="h-3.5 w-3.5" /> Simple White
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${theme === 'dark' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Moon className="h-3.5 w-3.5" /> Dark
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726]">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Custom Geospatial Cursor System</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Enables smooth trailing radar ring and reactive click animations on desktop devices.
                </span>
              </div>
              <input
                type="checkbox"
                checked={customCursorEnabled}
                onChange={(e) => setCustomCursorEnabled(e.target.checked)}
                className="h-4 w-4 accent-sky-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726]">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Live IoT Streaming Engine</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Simulates periodic sensor jitter and water level fluctuation every 4.5 seconds.
                </span>
              </div>
              <input
                type="checkbox"
                checked={isStreamingLive}
                onChange={(e) => setIsStreamingLive(e.target.checked)}
                className="h-4 w-4 accent-sky-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726]">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Active Operating Role</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Simulate different agency perspectives (Administrator, Disaster Officer, Operator, Public).
                </span>
              </div>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3 py-1.5 font-mono text-xs text-sky-700 dark:text-sky-400 outline-none shadow-xs"
              >
                <option value="Municipal Administrator">Municipal Administrator</option>
                <option value="Disaster Management Officer">Disaster Management Officer</option>
                <option value="Infrastructure Operator">Infrastructure Operator</option>
                <option value="Analyst">Analyst</option>
                <option value="Super Administrator">Super Administrator</option>
                <option value="Public Viewer">Public Viewer</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
