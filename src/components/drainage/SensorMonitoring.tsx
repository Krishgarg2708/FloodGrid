import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  Cpu, 
  Search, 
  Filter, 
  Activity, 
  Battery, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  Radio, 
  ExternalLink,
  ArrowUpDown
} from 'lucide-react';
import { SensorStatus } from '../../types';

export const SensorMonitoring: React.FC = () => {
  const { sensors, setSelectedSensorId, setActiveTab } = useFloodGrid();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = 
      sensor.sensorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || sensor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <Cpu className="h-3.5 w-3.5" />
            <span>METROPOLITAN IOT DRAINAGE TELEMETRY GRID</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">MQTT BROKER SYNCED</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Drainage Sensor Intelligence Network
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time ultrasonic water level transducers, Doppler velocity radars, and acoustic siltation monitors.
          </p>
        </div>

        {/* Quick Summary Pill Strip */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3 py-1.5 text-slate-700 dark:text-slate-300 shadow-2xs">
            Total Nodes: <strong className="text-slate-900 dark:text-white">{sensors.length}</strong>
          </div>
          <div className="rounded-md border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 text-rose-700 dark:text-rose-300 shadow-2xs">
            Critical: <strong className="text-rose-600 dark:text-rose-400">{sensors.filter(s => s.status === 'CRITICAL').length}</strong>
          </div>
          <div className="rounded-md border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 text-amber-800 dark:text-amber-300 shadow-2xs">
            Warning: <strong className="text-amber-600 dark:text-amber-400">{sensors.filter(s => s.status === 'WARNING').length}</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by code, culvert name, or road..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-sky-500 shadow-2xs"
          />
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 dark:bg-[#0E1726] rounded-md border border-slate-200 dark:border-slate-800">
          {(['ALL', 'CRITICAL', 'WARNING', 'ONLINE', 'MAINTENANCE'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded px-2.5 py-1 text-xs font-mono transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Sensor Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSensors.map((sensor) => {
          const isCritical = sensor.status === 'CRITICAL';
          const isWarning = sensor.status === 'WARNING';

          return (
            <div
              key={sensor.id}
              onClick={() => {
                setSelectedSensorId(sensor.id);
                setActiveTab('sensor-detail');
              }}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 hover:border-sky-400 dark:hover:border-sky-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 uppercase font-semibold">
                      {sensor.sensorCode} · {sensor.protocol}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                      {sensor.name}
                    </h3>
                  </div>
                  <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                    isCritical ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30' :
                    isWarning ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                  }`}>
                    {sensor.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
                  {sensor.locationName}
                </p>

                {/* Culvert Water Fill Gauge */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">Culvert Water Level</span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {sensor.waterLevelMeters}m / {sensor.maxCulvertDepthMeters}m ({sensor.fillPercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${Math.min(100, sensor.fillPercentage)}%` }}
                    />
                  </div>
                </div>

                {/* Sensor Telemetry Stats */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-slate-100 dark:border-slate-800/80 pt-3 mb-4">
                  <div className="rounded bg-slate-50 dark:bg-[#0E1726] p-2 border border-slate-100 dark:border-transparent">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Flow Velocity</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">{sensor.flowVelocityMs} m/s</span>
                  </div>
                  <div className="rounded bg-slate-50 dark:bg-[#0E1726] p-2 border border-slate-100 dark:border-transparent">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Culvert Discharge</span>
                    <span className="text-sky-700 dark:text-sky-300 font-bold">{sensor.dischargeRateCumecs} m³/s</span>
                  </div>
                  <div className="rounded bg-slate-50 dark:bg-[#0E1726] p-2 border border-slate-100 dark:border-transparent">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Silt / Obstruction</span>
                    <span className={sensor.blockagePercentage > 50 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-800 dark:text-slate-200 font-bold'}>
                      {sensor.blockagePercentage}% ({sensor.siltationEstimateCm}cm)
                    </span>
                  </div>
                  <div className="rounded bg-slate-50 dark:bg-[#0E1726] p-2 border border-slate-100 dark:border-transparent">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Signal / Battery</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{sensor.signalDbm}dBm · {sensor.batteryPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <span className="font-mono">Ping: {sensor.lastCommunication}</span>
                <span className="text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Deep Telemetry →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
