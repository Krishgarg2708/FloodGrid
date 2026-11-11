import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  Cpu, 
  ArrowLeft, 
  Activity, 
  Battery, 
  Wifi, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Code2, 
  Terminal,
  RefreshCw,
  Compass,
  FileText
} from 'lucide-react';

export const SensorDetail: React.FC = () => {
  const { selectedSensor, setSelectedSensorId, sensors, setActiveTab } = useFloodGrid();
  const [activeTabSub, setActiveTabSub] = useState<'readings' | 'mqtt' | 'maintenance'>('readings');

  // Fallback to first sensor if none selected
  const sensor = selectedSensor || sensors[0];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Top Navigation Back Action */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('sensors')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Drainage Grid Roster
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">Switch Sensor:</span>
          <select
            value={sensor.id}
            onChange={(e) => setSelectedSensorId(e.target.value)}
            className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3 py-1 text-xs font-mono text-sky-700 dark:text-sky-400 outline-none shadow-xs"
          >
            {sensors.map(s => (
              <option key={s.id} value={s.id}>{s.sensorCode} - {s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Sensor Identification Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Technical Telemetry & Readings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
                  <span>NODE: {sensor.sensorCode}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span>PROTOCOL: {sensor.protocol}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span>FW: {sensor.firmwareVersion}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{sensor.name}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">{sensor.locationName}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-bold px-3 py-1 rounded ${
                  sensor.status === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/40' :
                  sensor.status === 'WARNING' ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40' :
                  'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40'
                }`}>
                  STATUS: {sensor.status}
                </span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono mb-6">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Water Level</span>
                <span className="text-xl font-bold text-sky-700 dark:text-sky-300 tabular-nums">
                  {sensor.waterLevelMeters}m
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Max: {sensor.maxCulvertDepthMeters}m
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Culvert Fill</span>
                <span className={`text-xl font-bold tabular-nums ${sensor.fillPercentage > 85 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-300'}`}>
                  {sensor.fillPercentage}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Hydraulic Stage</span>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Velocity</span>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                  {sensor.flowVelocityMs} <span className="text-xs font-normal">m/s</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Doppler Radar</span>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Obstruction</span>
                <span className={`text-xl font-bold tabular-nums ${sensor.blockagePercentage > 50 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {sensor.blockagePercentage}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Silt: {sensor.siltationEstimateCm}cm</span>
              </div>
            </div>

            {/* Tabbed Detail Section */}
            <div className="border-b border-slate-200 dark:border-slate-800 mb-4 flex gap-4 text-xs font-medium">
              <button
                onClick={() => setActiveTabSub('readings')}
                className={`pb-2.5 transition-colors ${activeTabSub === 'readings' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Recent Telemetry Series
              </button>
              <button
                onClick={() => setActiveTabSub('mqtt')}
                className={`pb-2.5 transition-colors ${activeTabSub === 'mqtt' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                MQTT Payload Specification
              </button>
              <button
                onClick={() => setActiveTabSub('maintenance')}
                className={`pb-2.5 transition-colors ${activeTabSub === 'maintenance' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Maintenance & Desilting Log
              </button>
            </div>

            {/* Content: Readings Table */}
            {activeTabSub === 'readings' && (
              <div>
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase font-mono mb-2">
                  Time-Series Log (Last 5 Polling Intervals)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px]">
                      <tr>
                        <th className="pb-2">Timestamp</th>
                        <th className="pb-2">Water Level</th>
                        <th className="pb-2">Flow Velocity</th>
                        <th className="pb-2 text-right">Discharge (Q)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {sensor.recentReadings.map((r, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="py-2.5 text-slate-700 dark:text-slate-300">{r.timestamp}</td>
                          <td className="py-2.5 text-sky-700 dark:text-sky-300 font-bold">{r.waterLevel} m</td>
                          <td className="py-2.5 text-slate-700 dark:text-slate-300">{r.flowVelocity} m/s</td>
                          <td className="py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">{r.dischargeRate} m³/s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Content: MQTT Specs */}
            {activeTabSub === 'mqtt' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0E1726] p-3 text-slate-800 dark:text-slate-300">
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold block mb-1">BROKER TOPIC:</span>
                  <code className="text-sky-700 dark:text-sky-300 font-bold">floodgrid/iot/{sensor.zoneId}/{sensor.sensorCode}/telemetry</code>
                </div>

                <div className="rounded border border-slate-800 bg-[#0E1726] p-3 text-slate-100 shadow-md">
                  <span className="text-[10px] text-sky-400 block mb-1 font-bold">SAMPLE JSON INGEST PACKET:</span>
                  <pre className="text-[11px] text-slate-300 overflow-x-auto">
{`{
  "sensor_id": "${sensor.id}",
  "sensor_code": "${sensor.sensorCode}",
  "timestamp": "${new Date().toISOString()}",
  "telemetry": {
    "water_level_m": ${sensor.waterLevelMeters},
    "max_depth_m": ${sensor.maxCulvertDepthMeters},
    "velocity_mps": ${sensor.flowVelocityMs},
    "discharge_cumecs": ${sensor.dischargeRateCumecs},
    "blockage_pct": ${sensor.blockagePercentage},
    "signal_dbm": ${sensor.signalDbm},
    "battery_pct": ${sensor.batteryPercentage}
  },
  "diagnostics": {
    "transducer_health": "NOMINAL",
    "doppler_reflectivity": "HIGH",
    "firmware": "${sensor.firmwareVersion}"
  }
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* Content: Maintenance History */}
            {activeTabSub === 'maintenance' && (
              <div className="space-y-3 text-xs">
                {sensor.maintenanceHistory.map((m, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3.5 space-y-1">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      <span className="text-sky-700 dark:text-sky-400 font-bold">{m.type}</span>
                      <span>{m.date}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200">{m.notes}</p>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Technician: {m.technician}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Physical Field Equipment Photo & Diagnostics */}
        <div className="space-y-6">
          {/* Hardware Photo Asset Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 overflow-hidden shadow-xs">
            <div className="relative h-48 w-full bg-slate-900">
              <img
                src="/src/assets/images/drainage_iot_sensor_1794407123122.jpg"
                alt="IoT ultrasonic water level sensor deployed in storm culvert"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono text-sky-200 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                FIELD INSTALLATION #CULVERT-STATION-7
              </span>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Industrial Telemetry Transducer</h4>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                IP68 submersible ultrasonic transducer paired with 24GHz CW millimeter-wave Doppler velocity radar. Internal lithium iron phosphate battery with solar float charger.
              </p>
              
              <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">GPS Coordinates:</span>
                  <span className="text-slate-800 dark:text-slate-200">{sensor.coordinates[0].toFixed(4)}°N, {sensor.coordinates[1].toFixed(4)}°E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Battery Level:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{sensor.batteryPercentage}% (Nominal)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Signal Strength:</span>
                  <span className="text-slate-800 dark:text-slate-200">{sensor.signalDbm} dBm (4G NB-IoT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Last Telemetry:</span>
                  <span className="text-sky-600 dark:text-sky-300 font-semibold">{sensor.lastCommunication}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 space-y-2 text-xs shadow-xs">
            <span className="font-bold text-slate-900 dark:text-white uppercase font-mono text-[11px]">Field Operations</span>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => alert(`Diagnostics ping sent to Node ${sensor.sensorCode}. Received 200 OK in 142ms.`)}
                className="w-full rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 py-2 text-slate-800 dark:text-slate-200 font-medium transition-colors shadow-2xs"
              >
                Send Diagnostic Ping (OTA)
              </button>
              <button
                onClick={() => {
                  setActiveTab('incidents');
                }}
                className="w-full rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/20 dark:hover:bg-rose-600/30 border border-rose-200 dark:border-rose-500/40 py-2 text-rose-700 dark:text-rose-300 font-semibold transition-colors shadow-2xs"
              >
                Flag Maintenance Work Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
