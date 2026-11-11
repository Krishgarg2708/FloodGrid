import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { HISTORICAL_FLOODS } from '../../data/mockData';
import { 
  History, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

export const HistoricalAnalytics: React.FC = () => {
  const { selectedCity } = useFloodGrid();
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  const filteredRecords = HISTORICAL_FLOODS.filter(record => {
    if (selectedYear === 'ALL') return true;
    return record.year.toString() === selectedYear;
  });

  const annualTrends = [
    { year: 2021, incidents: 14, peakRainMm: 112.5, totalLossCr: 42.0 },
    { year: 2022, incidents: 11, peakRainMm: 98.2, totalLossCr: 28.5 },
    { year: 2023, incidents: 28, peakRainMm: 224.5, totalLossCr: 250.0 },
    { year: 2024, incidents: 19, peakRainMm: 122.0, totalLossCr: 58.0 },
    { year: 2025, incidents: 22, peakRainMm: 158.4, totalLossCr: 84.5 }
  ];

  const hotspotRankings = [
    { name: 'Minto Bridge Railway Underpass', recurrences: 14, avgDepthM: 1.85, status: 'Remediated with automatic sump' },
    { name: 'Ring Road Yamuna Embankment (ISBT - Monastery)', recurrences: 11, avgDepthM: 2.10, status: 'Flood wall reinforcement ongoing' },
    { name: 'ITO Junction & Vikas Marg Metro Ingress', recurrences: 9, avgDepthM: 0.95, status: 'Drain #12 regulator overhaul' },
    { name: 'NH-48 Hero Honda Chowk Underpass (Gurugram)', recurrences: 8, avgDepthM: 1.40, status: 'Subhash Chowk diversion drain connected' },
    { name: 'Sarai Kale Khan Outfall Culvert', recurrences: 7, avgDepthM: 1.20, status: 'Desilting completed 2025' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <History className="h-3.5 w-3.5" />
            <span>LONG-TERM METEOROLOGICAL & INUNDATION ARCHIVE</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">DATASET: 2021 - 2025</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Historical Flood Analytics & Recurrence Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Empirical multi-year analysis of extreme precipitation events, drainage infrastructure failures, and economic vulnerability trends.
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Archive Year:</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3 py-1.5 text-xs font-mono text-sky-700 dark:text-sky-400 outline-none shadow-xs"
          >
            <option value="ALL">All Years (2021-2025)</option>
            <option value="2025">2025 Inundation Events</option>
            <option value="2024">2024 Inundation Events</option>
            <option value="2023">2023 Historic High Water Events</option>
            <option value="2022">2022 Inundation Events</option>
            <option value="2021">2021 Inundation Events</option>
          </select>
        </div>
      </div>

      {/* Annual Summary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Recorded Severe Floods</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">94</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Across Metropolitan NCR</span>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Record 24h Peak Rainfall</span>
          <span className="text-2xl font-black text-sky-700 dark:text-sky-300 tabular-nums">224.5 mm</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">July 13, 2023</span>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Aggregate Infrastructure Loss</span>
          <span className="text-2xl font-black text-rose-600 dark:text-rose-400 tabular-nums">₹463 Cr</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">5-Year Economic Impact</span>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs">
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Remediation Completion</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">78.5%</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Drain outfalls deepened</span>
        </div>
      </div>

      {/* Multi-Year Incident Comparison Chart (SVG) */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
            5-Year Inundation Frequency & Peak 24h Precipitation Trends
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparing annual count of severe waterlogging occurrences vs peak downpour events
          </p>
        </div>

        <div className="pt-2">
          <div className="flex items-end justify-between gap-4 h-48 border-b border-slate-200 dark:border-slate-800 px-4">
            {annualTrends.map((t, idx) => {
              const heightIncidents = Math.min(100, Math.round((t.incidents / 30) * 100));
              const heightLoss = Math.min(100, Math.round((t.totalLossCr / 250) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="flex items-end gap-2 w-full max-w-[80px]">
                    {/* Incidents bar */}
                    <div 
                      className="flex-1 bg-sky-500 rounded-t transition-all group-hover:brightness-110"
                      style={{ height: `${heightIncidents}%` }}
                      title={`Incidents: ${t.incidents}`}
                    />
                    {/* Economic loss bar */}
                    <div 
                      className="flex-1 bg-rose-500 rounded-t transition-all group-hover:brightness-110"
                      style={{ height: `${heightLoss}%` }}
                      title={`Loss: ₹${t.totalLossCr} Cr`}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-200">
                    {t.year}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 px-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-3 rounded-sm bg-sky-500" /> Major Flood Incidents
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-3 rounded-sm bg-rose-500" /> Economic Loss (₹ Crores)
              </span>
            </div>
            <span>Historic Peak: 2023 Yamuna Sluice Jam (208.66m)</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recurrent Hotspots & Major Event Dossiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recurrent Hotspots Ranking */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Top Recurring Waterlogging Bottlenecks
          </h3>

          <div className="space-y-2.5">
            {hotspotRankings.map((spot, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0E1726] p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    0{idx + 1}. {spot.name}
                  </span>
                  <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                    {spot.recurrences} events
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800/80">
                  <span>Avg Peak Water: <strong className="text-sky-700 dark:text-sky-300">{spot.avgDepthM}m</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{spot.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Historical Event Dossiers */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Event Case Studies & Root Cause Audits
          </h3>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 text-xs">
            {filteredRecords.map(rec => (
              <div key={rec.id} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0E1726] p-3.5 space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-sky-700 dark:text-sky-400 font-bold">{rec.zoneName}</span>
                  <span className="text-slate-500 dark:text-slate-400">{rec.date}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  <strong>Root Cause:</strong> {rec.primaryCause}
                </p>
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div>Rain: <strong className="text-slate-800 dark:text-slate-200">{rec.peakRainfallMm24h} mm</strong></div>
                  <div>Depth: <strong className="text-rose-600 dark:text-rose-400">{rec.peakWaterDepthMeters} m</strong></div>
                  <div>Loss: <strong className="text-amber-700 dark:text-amber-300">₹{rec.economicDamageEstCr} Cr</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
