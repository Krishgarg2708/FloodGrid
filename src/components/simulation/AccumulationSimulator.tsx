import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { runHydrologicalSimulation } from '../../services/predictionEngine';
import { HydrologicalSimulationParams, RiskLevel } from '../../types';
import { 
  Droplets, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  HelpCircle, 
  Building2, 
  TrendingUp, 
  Compass, 
  Car, 
  ShieldCheck 
} from 'lucide-react';

export const AccumulationSimulator: React.FC = () => {
  const { selectedCity, setActiveTab } = useFloodGrid();

  const [params, setParams] = useState<HydrologicalSimulationParams>({
    rainfallIntensityMmHr: 65,
    durationHours: 3,
    drainageEfficiencyPercent: 70,
    soilSaturationIndexPercent: 80,
    stormwaterGateBlockagePercent: 40,
    upstreamInflowCumecs: 120,
    scenarioPreset: 'Heavy Downpour'
  });

  const [activePreset, setActivePreset] = useState<HydrologicalSimulationParams['scenarioPreset']>('Heavy Downpour');

  const applyPreset = (preset: HydrologicalSimulationParams['scenarioPreset']) => {
    setActivePreset(preset);
    switch (preset) {
      case 'Normal Monsoon':
        setParams({
          rainfallIntensityMmHr: 22,
          durationHours: 2,
          drainageEfficiencyPercent: 90,
          soilSaturationIndexPercent: 40,
          stormwaterGateBlockagePercent: 10,
          upstreamInflowCumecs: 40,
          scenarioPreset: preset
        });
        break;
      case 'Heavy Downpour':
        setParams({
          rainfallIntensityMmHr: 65,
          durationHours: 3,
          drainageEfficiencyPercent: 70,
          soilSaturationIndexPercent: 80,
          stormwaterGateBlockagePercent: 35,
          upstreamInflowCumecs: 120,
          scenarioPreset: preset
        });
        break;
      case 'Cloudburst Emergency':
        setParams({
          rainfallIntensityMmHr: 110,
          durationHours: 1.5,
          drainageEfficiencyPercent: 50,
          soilSaturationIndexPercent: 95,
          stormwaterGateBlockagePercent: 50,
          upstreamInflowCumecs: 250,
          scenarioPreset: preset
        });
        break;
      case 'Drainage Failure':
        setParams({
          rainfallIntensityMmHr: 45,
          durationHours: 4,
          drainageEfficiencyPercent: 25,
          soilSaturationIndexPercent: 75,
          stormwaterGateBlockagePercent: 85,
          upstreamInflowCumecs: 90,
          scenarioPreset: preset
        });
        break;
      case 'Combined Catastrophic':
        setParams({
          rainfallIntensityMmHr: 125,
          durationHours: 5,
          drainageEfficiencyPercent: 20,
          soilSaturationIndexPercent: 100,
          stormwaterGateBlockagePercent: 90,
          upstreamInflowCumecs: 380,
          scenarioPreset: preset
        });
        break;
    }
  };

  const simulationResults = runHydrologicalSimulation(params, selectedCity.zones);

  const totalInundatedWaterM3 = simulationResults.reduce((acc, r) => acc + r.waterSurplusVolumeCubicMeters, 0);
  const totalRoadsBlockedKm = simulationResults.reduce((acc, r) => acc + r.affectedRoadKm, 0);
  const criticalZones = simulationResults.filter(r => r.riskLevel === 'CRITICAL' || r.riskLevel === 'SEVERE');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <Droplets className="h-3.5 w-3.5" />
            <span>HYDRAULIC WHAT-IF STRESS TESTING ENGINE</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">NUMERICAL SIMULATOR</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Water Accumulation & Inundation Simulator
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate stormwater accumulation depth, road blockages, and infrastructure exposure under hypothetical rainfall curves.
          </p>
        </div>

        {/* Reset / Standard Preset Button */}
        <button
          onClick={() => applyPreset('Normal Monsoon')}
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Baseline
        </button>
      </div>

      {/* Prominent Simulation Disclaimer Box */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>SIMULATION OUTPUT NOTICE:</strong> The figures displayed below are mathematical model projections generated using the Rational Method and Manning's culvert equations. They represent hypothetical "What-If" stress tests and do not reflect current physical field readings.
          </span>
        </div>
      </div>

      {/* Scenario Presets Bar */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider block mb-2.5">
          Scenario Presets
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {(['Normal Monsoon', 'Heavy Downpour', 'Cloudburst Emergency', 'Drainage Failure', 'Combined Catastrophic'] as const).map(preset => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className={`rounded-lg p-2.5 text-xs text-center font-semibold transition-all border ${
                activePreset === preset
                  ? 'bg-sky-600 text-white font-bold border-sky-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#0E1726] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sliders & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            Configure Hydrological Variables
          </h3>

          {/* Rainfall Intensity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Precipitation Rate</span>
              <span className="text-sky-600 dark:text-sky-300 font-bold">{params.rainfallIntensityMmHr} mm/hr</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={params.rainfallIntensityMmHr}
              onChange={(e) => setParams(p => ({ ...p, rainfallIntensityMmHr: +e.target.value }))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Rainfall Duration</span>
              <span className="text-sky-600 dark:text-sky-300 font-bold">{params.durationHours} hours</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="12"
              step="0.5"
              value={params.durationHours}
              onChange={(e) => setParams(p => ({ ...p, durationHours: +e.target.value }))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>

          {/* Drainage Network Efficiency */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Drainage System Efficiency</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{params.drainageEfficiencyPercent}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={params.drainageEfficiencyPercent}
              onChange={(e) => setParams(p => ({ ...p, drainageEfficiencyPercent: +e.target.value }))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Siltation & Sluice Gate Blockage */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Culvert / Sluice Blockage</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">{params.stormwaterGateBlockagePercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              value={params.stormwaterGateBlockagePercent}
              onChange={(e) => setParams(p => ({ ...p, stormwaterGateBlockagePercent: +e.target.value }))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Antecedent Soil Saturation */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Antecedent Soil Saturation</span>
              <span className="text-amber-700 dark:text-amber-400 font-bold">{params.soilSaturationIndexPercent}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={params.soilSaturationIndexPercent}
              onChange={(e) => setParams(p => ({ ...p, soilSaturationIndexPercent: +e.target.value }))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Upstream River Basin Inflow */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Upstream River Inflow (Q)</span>
              <span className="text-purple-700 dark:text-purple-400 font-bold">{params.upstreamInflowCumecs} m³/s</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={params.upstreamInflowCumecs}
              onChange={(e) => setParams(p => ({ ...p, upstreamInflowCumecs: +e.target.value }))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right 2 Columns: Simulation Results Table & Impact Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Projected Impact KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Est. Water Surplus Volume</span>
              <span className="text-2xl font-black text-sky-700 dark:text-sky-300 tabular-nums">
                {(totalInundatedWaterM3 / 1000).toFixed(1)}k
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">m³ retention burden</span>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Vulnerable Road Network</span>
              <span className="text-2xl font-black text-amber-700 dark:text-amber-300 tabular-nums">
                {totalRoadsBlockedKm.toFixed(1)} km
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Arterial lanes underwater</span>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">High / Critical Catchments</span>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400 tabular-nums">
                {criticalZones.length} / {selectedCity.zones.length}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Severely exposed</span>
            </div>
          </div>

          {/* Zone-by-Zone Simulated Accumulation Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Simulated Inundation Depth by Municipal Zone
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="pb-2.5">Catchment Zone</th>
                    <th className="pb-2.5">Projected Risk</th>
                    <th className="pb-2.5 text-right">Est. Depth (cm)</th>
                    <th className="pb-2.5 text-right">Road Inundated</th>
                    <th className="pb-2.5">Exposed Critical Infrastructure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                  {simulationResults.map(res => {
                    return (
                      <tr key={res.zoneId} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="py-3 font-semibold text-slate-900 dark:text-white">
                          {res.zoneName}
                        </td>
                        <td className="py-3 font-mono font-bold">
                          <span className={
                            res.riskLevel === 'CRITICAL' ? 'text-rose-600 dark:text-rose-400' :
                            res.riskLevel === 'SEVERE' ? 'text-orange-600 dark:text-orange-400' :
                            res.riskLevel === 'HIGH' ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-300'
                          }>
                            {res.riskLevel}
                          </span>
                        </td>
                        <td className="py-3 font-mono text-right tabular-nums font-bold text-sky-700 dark:text-sky-300">
                          {res.simulatedDepthCm} cm
                        </td>
                        <td className="py-3 font-mono text-right tabular-nums text-slate-700 dark:text-slate-300 font-semibold">
                          {res.affectedRoadKm} km
                        </td>
                        <td className="py-3">
                          {res.vulnerableFacilitiesExposed.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {res.vulnerableFacilitiesExposed.map((f, i) => (
                                <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-800 dark:text-amber-300 font-medium">
                                  {f}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400">None anticipated</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500 dark:text-slate-400">Want to test mitigation routing?</span>
              <button
                onClick={() => setActiveTab('incidents')}
                className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-semibold flex items-center gap-1"
              >
                Pre-position Dewatering Crews in Operations Center →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
