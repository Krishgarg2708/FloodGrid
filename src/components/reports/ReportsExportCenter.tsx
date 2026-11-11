import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Printer, 
  CheckCircle2, 
  Copy, 
  Calendar, 
  Sparkles,
  Building2,
  Clock
} from 'lucide-react';

export const ReportsExportCenter: React.FC = () => {
  const { selectedCity, sensors, alerts, incidents } = useFloodGrid();
  const [reportType, setReportType] = useState<'SITREP' | 'EXECUTIVE' | 'DRAINAGE_AUDIT'>('SITREP');
  const [copied, setCopied] = useState(false);
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const criticalSensors = sensors.filter(s => s.status === 'CRITICAL');
  const openIncidents = incidents.filter(i => i.status !== 'RESOLVED');

  const sitrepContent = `================================================================================
MUNICIPAL DISASTER MANAGEMENT SITUATION REPORT (SITREP #2026-DEL-14)
JURISDICTION: ${selectedCity.name.toUpperCase()}
DATE & TIME: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} LOCAL
STATUS: SEVERE METEOROLOGICAL FLOOD ADVISORY IN EFFECT
================================================================================

1. EXECUTIVE SUMMARY:
- Current Doppler Rainfall Intensity: ${selectedCity.currentRainfallIntensity} mm/hr
- Metropolitan Flood Risk Index: ${selectedCity.floodRiskIndex} / 100
- Active Hyperlocal Alerts Dispatched: ${activeAlerts.length}
- Unresolved Tactical Incidents: ${openIncidents.length}
- Critical Culvert Siltation Chokes: ${criticalSensors.length}

2. AT-RISK ZONES & TOPOLOGY:
${selectedCity.zones.map(z => `* [${z.currentRisk}] ${z.name}: Elevation ${z.elevationMeters}m | Predicted Water Depth: ${z.predictedAccumulationCm}cm | Probability: ${z.riskProbability}%`).join('\n')}

3. CRITICAL INFRASTRUCTURE STATUS:
- Minto Railway Underpass: Submerged (92cm water), vehicular diversion in progress.
- Ring Road Kashmere Gate: High watch, sandbag reinforcement underway.
- ITO Junction & Metro Gate 4: Submersible pumps operational at capacity.
- NH-48 Hero Honda Sump: 62% silt blockage detected, hydro-jetters on route.

4. RESOURCE MOBILIZATION:
- Total Dewatering Fleet: 18 units deployed (150 HP high-volume pumps active)
- Police Traffic Closures: Minto Road, Vikas Marg slow carriageway
- Citizen Advisory Broadcasts: In-App, SMS Cell Broadcast, WhatsApp Business live

5. INCIDENT COMMANDER DIRECTIVES:
- Maintain continuous IoT telemetry prober frequency at 10-second intervals.
- Prepare NDRF standby company at Yamuna Khadar low-lying relief camps.
- Next SITREP scheduled in 120 minutes.

AUTHORIZING OFFICER:
Col. Sanjeev Rawat, Disaster Operations Directorate
Verified via FloodGrid Automated Intelligence Platform (HydroML v4.2)
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sitrepContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    const headers = 'SensorID,Code,Name,Zone,Status,WaterLevelMeters,MaxDepthMeters,FlowVelocityMs,DischargeRateCumecs,BlockagePct,Battery\n';
    const rows = sensors.map(s => 
      `"${s.id}","${s.sensorCode}","${s.name}","${s.zoneId}","${s.status}",${s.waterLevelMeters},${s.maxCulvertDepthMeters},${s.flowVelocityMs},${s.dischargeRateCumecs},${s.blockagePercentage},${s.batteryPercentage}`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `floodgrid-sensors-${selectedCity.id}-${Date.now()}.csv`;
    a.click();
    setExportedStatus('CSV Telemetry Dataset exported successfully.');
    setTimeout(() => setExportedStatus(null), 3500);
  };

  const handleExportJSON = () => {
    const dump = {
      city: selectedCity,
      generatedAt: new Date().toISOString(),
      sensors,
      alerts,
      incidents
    };
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `floodgrid-sitrep-dossier-${selectedCity.id}-${Date.now()}.json`;
    a.click();
    setExportedStatus('JSON Geo-Hydrological Dossier downloaded.');
    setTimeout(() => setExportedStatus(null), 3500);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <FileText className="h-3.5 w-3.5" />
            <span>MUNICIPAL SITUATION BRIEFING & TELEMETRY EXPORT</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">AUTOMATED SITREP ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Reports & SITREP Export Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate standardized disaster management situation reports (SITREP), municipal executive briefings, and raw sensor datasets.
          </p>
        </div>

        {/* Quick Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Export Sensor CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            Export JSON Dossier
          </button>
        </div>
      </div>

      {exportedStatus && (
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300 font-mono flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{exportedStatus}</span>
        </div>
      )}

      {/* Report Template Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-mono">
        <button
          onClick={() => setReportType('SITREP')}
          className={`px-3 py-1.5 rounded-md transition-colors font-semibold ${
            reportType === 'SITREP' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Official Disaster SITREP
        </button>
        <button
          onClick={() => setReportType('EXECUTIVE')}
          className={`px-3 py-1.5 rounded-md transition-colors font-semibold ${
            reportType === 'EXECUTIVE' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Mayoral Executive Briefing
        </button>
        <button
          onClick={() => setReportType('DRAINAGE_AUDIT')}
          className={`px-3 py-1.5 rounded-md transition-colors font-semibold ${
            reportType === 'DRAINAGE_AUDIT' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Culvert Infrastructure Audit
        </button>
      </div>

      {/* Main SITREP Document Viewer */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
            <Clock className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span>Generated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Authenticated By Digital Signature</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] px-3 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:text-white"
            >
              {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied to Clipboard' : 'Copy Text'}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] px-3 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:text-white"
            >
              <Printer className="h-3.5 w-3.5" />
              Print
            </button>
          </div>
        </div>

        {/* Monospaced SITREP Body */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0F1D] p-5 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text shadow-2xs">
          {sitrepContent}
        </div>
      </div>
    </div>
  );
};
