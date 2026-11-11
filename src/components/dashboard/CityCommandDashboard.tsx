import React from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  CloudRain, 
  AlertTriangle, 
  Cpu, 
  Building2, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  Droplet,
  Compass,
  ArrowUpRight,
  Clock,
  Layers
} from 'lucide-react';

export const CityCommandDashboard: React.FC = () => {
  const { 
    selectedCity, 
    sensors, 
    alerts, 
    incidents, 
    setActiveTab, 
    setSelectedZone 
  } = useFloodGrid();

  const criticalSensors = sensors.filter(s => s.status === 'CRITICAL');
  const warningSensors = sensors.filter(s => s.status === 'WARNING');
  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');

  const maxRiskZone = [...selectedCity.zones].sort((a, b) => b.riskProbability - a.riskProbability)[0];

  // Rainfall 6-hour distribution (historical to now)
  const rainfallTrend = [
    { hour: '09:00', mm: 12.4 },
    { hour: '10:00', mm: 18.0 },
    { hour: '11:00', mm: 24.5 },
    { hour: '12:00', mm: 36.2 },
    { hour: '13:00', mm: 42.0 },
    { hour: '14:00', mm: selectedCity.currentRainfallIntensity }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Top Banner: City Situation Overview */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <Compass className="h-3.5 w-3.5" />
            <span>MUNICIPAL COMMAND METROPOLITAN OBSERVATORY</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">TELEMETRY INGEST ACTIVE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            {selectedCity.name}
            <span className="text-xs font-normal px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              {selectedCity.state}, {selectedCity.country}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors"
          >
            <Layers className="h-4 w-4" />
            Open GIS War Room Map
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className="flex items-center gap-2 rounded-lg border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 px-4 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 transition-colors shadow-2xs"
          >
            <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            {activeIncidents.length} Active Incidents
          </button>
        </div>
      </div>

      {/* KPI Real-Time Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* City Flood Risk Index */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-2">
            <span className="font-medium">City Flood Risk Index</span>
            <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">SEVERE</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {selectedCity.floodRiskIndex}
            </span>
            <span className="text-xs font-mono text-slate-400">/ 100</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full"
              style={{ width: `${selectedCity.floodRiskIndex}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 block">
            Highest threat: {maxRiskZone?.name} ({maxRiskZone?.riskProbability}%)
          </span>
        </div>

        {/* Current Doppler Rainfall */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-2">
            <span className="font-medium">Radar Rainfall Intensity</span>
            <CloudRain className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-sky-600 dark:text-sky-300">
              {selectedCity.currentRainfallIntensity}
            </span>
            <span className="text-xs font-mono text-slate-400">mm / hr</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 font-medium">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Heavy downpour (+14mm/h in last 2 hrs)</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Runoff rate exceeding storm culvert capacity
          </span>
        </div>

        {/* Active Emergency Alerts */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-2">
            <span className="font-medium">Active Hyperlocal Alerts</span>
            <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-rose-600 dark:text-rose-400">
              {activeAlerts.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Broadcasted</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">SMS / WhatsApp:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">184,000 sent</span>
          </div>
          <button
            onClick={() => setActiveTab('alerts')}
            className="text-[11px] text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 mt-1 flex items-center gap-1 font-semibold"
          >
            Review all dispatches <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        {/* Drainage Sensors Health */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-2">
            <span className="font-medium">IoT Drainage Network</span>
            <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {sensors.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Nodes Monitored</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono">
            <span className="text-rose-600 dark:text-rose-400 font-bold">{criticalSensors.length} Critical Chokes</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{warningSensors.length} Surcharging</span>
          </div>
          <button
            onClick={() => setActiveTab('sensors')}
            className="text-[11px] text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 mt-1 flex items-center gap-1 font-semibold"
          >
            Inspect sensor grid <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Two Column Grid: Geographical Risk Matrix & Rainfall Accumulation Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monitored Zones Risk Table */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Geographical Catchment Risk Analysis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sorted by predicted water depth and topological vulnerability index
              </p>
            </div>
            <button
              onClick={() => setActiveTab('predictions')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              Full AI Model Breakdown →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                <tr>
                  <th className="pb-2.5">Zone & Basin</th>
                  <th className="pb-2.5">Elevation</th>
                  <th className="pb-2.5">Impervious %</th>
                  <th className="pb-2.5">Risk Level</th>
                  <th className="pb-2.5 text-right">Probability</th>
                  <th className="pb-2.5 text-right">Pred. Depth</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                {selectedCity.zones.map((zone) => {
                  const getRiskBadge = (r: string) => {
                    switch (r) {
                      case 'CRITICAL': return 'text-rose-600 dark:text-rose-400 font-bold';
                      case 'SEVERE': return 'text-orange-600 dark:text-orange-400 font-bold';
                      case 'HIGH': return 'text-amber-600 dark:text-amber-400 font-bold';
                      case 'MODERATE': return 'text-sky-600 dark:text-sky-400 font-bold';
                      default: return 'text-emerald-600 dark:text-emerald-400 font-bold';
                    }
                  };

                  return (
                    <tr key={zone.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3">
                        <span className="font-semibold text-slate-900 dark:text-white block">{zone.name}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{zone.soilAbsorptionType}</span>
                      </td>
                      <td className="py-3 font-mono tabular-nums text-slate-600 dark:text-slate-300">
                        {zone.elevationMeters}m ({zone.slopePercentage}%)
                      </td>
                      <td className="py-3 font-mono tabular-nums text-slate-600 dark:text-slate-300">
                        {Math.round(zone.imperviousSurfaceRatio * 100)}%
                      </td>
                      <td className={`py-3 font-mono text-xs ${getRiskBadge(zone.currentRisk)}`}>
                        {zone.currentRisk}
                      </td>
                      <td className="py-3 font-mono tabular-nums text-right text-slate-700 dark:text-slate-200 font-semibold">
                        {zone.riskProbability}%
                      </td>
                      <td className="py-3 font-mono tabular-nums text-right text-sky-600 dark:text-sky-300 font-bold">
                        {zone.predictedAccumulationCm} cm
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedZone(zone);
                            setActiveTab('map');
                          }}
                          className="rounded px-2.5 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 dark:text-sky-400 dark:bg-transparent dark:border-sky-500/20 dark:hover:bg-sky-500/10 transition-colors"
                        >
                          View Map
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Real-time Hyetograph & Water Balance */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
              Precipitation Hyetograph
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hourly rainfall rate vs drainage design threshold (25mm/h)
            </p>
          </div>

          {/* SVG Hyetograph Bar Chart */}
          <div className="pt-2">
            <div className="flex items-end justify-between gap-2 h-36 border-b border-slate-200 dark:border-slate-800 px-2">
              {rainfallTrend.map((item, idx) => {
                const heightPct = Math.min(100, Math.round((item.mm / 60) * 100));
                const isOverThreshold = item.mm > 25;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.mm}
                    </span>
                    <div 
                      className={`w-full rounded-t transition-all ${
                        isOverThreshold 
                          ? 'bg-gradient-to-t from-sky-500 to-rose-500' 
                          : 'bg-sky-400 dark:bg-sky-500/70'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {item.hour}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-4 bg-rose-500 rounded-sm" /> &gt;25mm/h Culvert Limit
              </span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold">Capacity Exceeded</span>
            </div>
          </div>

          {/* Drainage Hydraulic Status */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Trunk Drainage Discharge:</span>
              <span className="font-mono text-sky-700 dark:text-sky-300 font-bold">142.5 m³/sec</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Est. Siltation Capacity Loss:</span>
              <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">-34.8%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Total Inflow Surplus:</span>
              <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">+48,200 m³/hr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Incidents & High Priority Action Strip */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Priority Incident Response Queue
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('incidents')}
            className="text-xs text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-semibold"
          >
            Emergency Center Dispatch Console →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incidents.slice(0, 3).map((inc) => (
            <div
              key={inc.id}
              className="rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#0E1726] p-3.5 space-y-2 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer shadow-2xs"
              onClick={() => setActiveTab('incidents')}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-rose-700 dark:text-rose-400 font-bold px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20">
                  {inc.priority}
                </span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{inc.detectedAt}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{inc.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{inc.locationDescription}</p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800/80 text-[11px]">
                <span className="text-sky-700 dark:text-sky-300 font-mono font-bold">Depth: {inc.waterDepthCm} cm</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">{inc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
