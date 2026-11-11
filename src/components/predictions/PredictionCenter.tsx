import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { calculateZoneFloodRisk } from '../../services/predictionEngine';
import { 
  BrainCircuit, 
  CheckCircle2, 
  SlidersHorizontal, 
  HelpCircle, 
  Gauge, 
  Info, 
  Sparkles,
  RefreshCw,
  Database,
  Satellite,
  Clock,
  Layers
} from 'lucide-react';
import { CityZone } from '../../types';

export const PredictionCenter: React.FC = () => {
  const { selectedCity, setSelectedZone, setActiveTab } = useFloodGrid();
  const [selectedZoneState, setSelectedZoneState] = useState<CityZone>(selectedCity.zones[0]);
  const [rainfallOverride, setRainfallOverride] = useState<number>(selectedCity.currentRainfallIntensity);
  const [blockageOverride, setBlockageOverride] = useState<number>(35);
  const [selectedModel, setSelectedModel] = useState<string>('HydroML Ensemble v4.2');

  const prediction = calculateZoneFloodRisk(selectedZoneState, rainfallOverride, blockageOverride);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <BrainCircuit className="h-3.5 w-3.5" />
            <span>GEO-HYDROLOGICAL PREDICTIVE ENGINE</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">MODEL INFERENCE ACTIVE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Intelligent Flood Risk Prediction Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Multi-parameter hydrological modeling combining live Doppler radar, Digital Elevation Models (DEM), and IoT culvert ultrasound.
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Architecture:</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3 py-1.5 text-xs font-mono text-sky-700 dark:text-sky-300 outline-none focus:border-sky-500 shadow-xs"
          >
            <option value="HydroML Ensemble v4.2">HydroML Ensemble v4.2 (SCS-CN + PINN)</option>
            <option value="XGBoost Hydrology 2026">XGBoost Hydrology Spatial Regressor</option>
            <option value="Physics-Informed LSTM">Physics-Informed Recurrent 3-Hour Runoff</option>
          </select>
        </div>
      </div>

      {/* Mandatory Transparency Box: Provenance of Data */}
      <div className="rounded-xl border border-sky-200 dark:border-sky-500/20 bg-sky-50/80 dark:bg-sky-950/20 p-4 text-xs shadow-xs">
        <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold mb-2">
          <Info className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <span>DATA PROVENANCE & METHODOLOGY TRANSPARENCY DISCLOSURE</span>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
          FloodGrid enforces explicit transparency. In accordance with municipal engineering governance standards, we distinguish the 5 distinct data layers ingested into this predictive synthesis:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-[11px]">
          <div className="rounded border border-sky-100 dark:border-slate-800 bg-white dark:bg-[#0E1726]/80 p-2.5 shadow-2xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">1. Live Observations</span>
            <p className="text-slate-600 dark:text-slate-400">Automated IMD Doppler radar reflectivity & PWD rain gauges at 10-min cadence.</p>
          </div>
          <div className="rounded border border-sky-100 dark:border-slate-800 bg-white dark:bg-[#0E1726]/80 p-2.5 shadow-2xs">
            <span className="text-sky-600 dark:text-sky-400 font-bold block mb-1">2. Numerical Forecasts</span>
            <p className="text-slate-600 dark:text-slate-400">Open-Meteo & ECMWF high-resolution 1km atmospheric precipitation forecasts.</p>
          </div>
          <div className="rounded border border-sky-100 dark:border-slate-800 bg-white dark:bg-[#0E1726]/80 p-2.5 shadow-2xs">
            <span className="text-amber-600 dark:text-amber-400 font-bold block mb-1">3. Historical Records</span>
            <p className="text-slate-600 dark:text-slate-400">10-year georeferenced waterlogging recurrence database & Yamuna river stage archives.</p>
          </div>
          <div className="rounded border border-sky-100 dark:border-slate-800 bg-white dark:bg-[#0E1726]/80 p-2.5 shadow-2xs">
            <span className="text-purple-600 dark:text-purple-400 font-bold block mb-1">4. Simulated IoT Readings</span>
            <p className="text-slate-600 dark:text-slate-400">Culvert ultrasound water depth, flow speed (m/s), and acoustic debris obstruction %.</p>
          </div>
          <div className="rounded border border-sky-100 dark:border-slate-800 bg-white dark:bg-[#0E1726]/80 p-2.5 shadow-2xs">
            <span className="text-rose-600 dark:text-rose-400 font-bold block mb-1">5. ML Inference Model</span>
            <p className="text-slate-600 dark:text-slate-400">SCS Curve Number infiltration physics combined with gradient-boosted spatial risk classifier.</p>
          </div>
        </div>
      </div>

      {/* Main Prediction Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Prediction Inputs & Parameter Tuning */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
              Select Catchment Zone
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Run localized prediction for specific municipal boundary
            </p>
          </div>

          <div className="space-y-1.5">
            {selectedCity.zones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneState(zone)}
                className={`w-full flex items-center justify-between rounded-lg p-2.5 text-xs text-left transition-all border ${
                  selectedZoneState.id === zone.id
                    ? 'border-sky-500 bg-sky-50 text-slate-900 dark:bg-sky-500/10 dark:text-white font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0E1726]/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="block font-semibold">{zone.name}</span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    Elevation: {zone.elevationMeters}m · Slope: {zone.slopePercentage}%
                  </span>
                </div>
                <span className={`font-mono font-bold ${
                  zone.currentRisk === 'CRITICAL' ? 'text-rose-600 dark:text-rose-400' :
                  zone.currentRisk === 'SEVERE' ? 'text-orange-600 dark:text-orange-400' :
                  zone.currentRisk === 'HIGH' ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400'
                }`}>
                  {zone.riskProbability}%
                </span>
              </button>
            ))}
          </div>

          {/* Real-time parameter overrides */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">What-If Rain Inflow (mm/h)</span>
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">{rainfallOverride} mm/h</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="1"
              value={rainfallOverride}
              onChange={(e) => setRainfallOverride(+e.target.value)}
              className="w-full accent-sky-600 cursor-pointer"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Culvert Silt Blockage %</span>
              <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{blockageOverride}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={blockageOverride}
              onChange={(e) => setBlockageOverride(+e.target.value)}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right 2 Columns: AI Prediction Output & Transparent Factor Breakdown */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs space-y-6">
          {/* Prediction Result Summary Card */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Predicted Risk Classification</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                  {selectedZoneState.name}
                  <span className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                    prediction.riskLevel === 'CRITICAL' ? 'bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30' :
                    prediction.riskLevel === 'SEVERE' ? 'bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30' :
                    prediction.riskLevel === 'HIGH' ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30' :
                    'bg-sky-100 text-sky-700 border border-sky-200 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30'
                  }`}>
                    {prediction.riskLevel}
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-4 text-right font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Probability</span>
                  <span className="text-2xl font-black text-rose-600 dark:text-rose-400">{prediction.probability}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Accumulation Depth</span>
                  <span className="text-2xl font-black text-sky-600 dark:text-sky-300">{prediction.expectedDepthCm} cm</span>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Critical Time Window</span>
                <strong>{prediction.criticalWindow}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Time to Inundation Peak</span>
                <strong>{prediction.timeToPeakMinutes} minutes</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Model Confidence</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{prediction.confidenceScore}%</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Engine Architecture</span>
                <span className="truncate block">{prediction.modelVersion.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          {/* Explainable AI: Contributing Factors Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                Transparent Explainability: Factor Contribution Weights
              </h4>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Normalized Impact Sum = 100%</span>
            </div>

            <div className="space-y-3">
              {prediction.contributingFactors.map((factor, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1726]/60 p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">{factor.factor}</span>
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      {factor.impactPercentage}% impact
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full"
                      style={{ width: `${factor.impactPercentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">{factor.description}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800/60">
                    <span>Observed Metric: <strong className="text-slate-800 dark:text-slate-200">{factor.currentValue}</strong></span>
                    <span>Engineering Threshold: <strong className="text-amber-700 dark:text-amber-400">{factor.baselineThreshold}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Engineering Recommendations */}
          <div className="rounded-lg border border-amber-200 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/5 p-4 space-y-2">
            <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              Autonomous Municipal Recommendations
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              {prediction.recommendedActions.map((action, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
