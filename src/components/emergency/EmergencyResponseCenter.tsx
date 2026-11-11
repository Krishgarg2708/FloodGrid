import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  LifeBuoy, 
  ShieldAlert, 
  Truck, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  FileText,
  Phone,
  Navigation,
  Send
} from 'lucide-react';
import { EmergencyIncident, IncidentStatus } from '../../types';

export const EmergencyResponseCenter: React.FC = () => {
  const { 
    incidents, 
    selectedIncident, 
    setSelectedIncidentId, 
    updateIncidentStatus, 
    assignTeamToIncident,
    userRole,
    selectedCity 
  } = useFloodGrid();

  const [activeIncidentId, setActiveIncidentId] = useState<string>(incidents[0]?.id || '');
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState('');
  const [leadOfficerInput, setLeadOfficerInput] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(['High-Discharge Sump Pump P-12']);
  const [noteInput, setNoteInput] = useState('');

  const currentIncident = incidents.find(i => i.id === activeIncidentId) || incidents[0];

  const handleStatusChange = (newStatus: IncidentStatus) => {
    if (!currentIncident) return;
    updateIncidentStatus(currentIncident.id, newStatus, noteInput || undefined);
    setNoteInput('');
  };

  const handleDispatchTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentIncident || !teamNameInput || !leadOfficerInput) return;
    assignTeamToIncident(currentIncident.id, teamNameInput, leadOfficerInput, selectedVehicles);
    setDispatchModalOpen(false);
    setTeamNameInput('');
    setLeadOfficerInput('');
  };

  const availableVehicles = [
    '150 HP Dewatering Mobile Truck (MP-04)',
    'High-Discharge Sump Pump P-12',
    'Hydro-Jetting Vacuum Tanker HJ-02',
    'Sandbag Reinforcement Flatbed SB-09',
    'Zodiac Inflatable Rescue Boat RB-01',
    'Heavy Recovery Winch Tow Truck TT-01'
  ];

  const toggleVehicle = (v: string) => {
    if (selectedVehicles.includes(v)) {
      setSelectedVehicles(selectedVehicles.filter(item => item !== v));
    } else {
      setSelectedVehicles([...selectedVehicles, v]);
    }
  };

  const statuses: IncidentStatus[] = ['DETECTED', 'VERIFIED', 'ASSIGNED', 'RESPONSE IN PROGRESS', 'RESOLVED'];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <LifeBuoy className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
            <span>DISASTER OPERATIONS & TACTICAL INCIDENT DESK</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">DISPATCH READY</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Emergency Response & Incident Management Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage live urban flood emergencies, deploy dewatering fleets, assign rescue brigades, and track resolution workflows.
          </p>
        </div>

        {/* Command Room Quick Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] px-3 py-1.5 text-xs shadow-2xs">
            <img
              src="/src/assets/images/avatar_disaster_chief_1794407129686.jpg"
              alt="Disaster Director"
              referrerPolicy="no-referrer"
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">Duty Director: Col. Sanjeev Rawat</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Incident Queue on Left, Operational Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Incidents List */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
              Active Tactical Incidents ({incidents.length})
            </h3>
            <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">
              {incidents.filter(i => i.status !== 'RESOLVED').length} Open
            </span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {incidents.map(inc => {
              const isSelected = currentIncident?.id === inc.id;
              const isResolved = inc.status === 'RESOLVED';

              return (
                <div
                  key={inc.id}
                  onClick={() => setActiveIncidentId(inc.id)}
                  className={`rounded-lg border p-3.5 text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-[#1E2E48] shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0E1726] hover:bg-slate-100 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                    <span className="font-bold text-rose-600 dark:text-rose-400">{inc.priority}</span>
                    <span className="text-slate-500 dark:text-slate-400">{inc.detectedAt}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{inc.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 line-clamp-1">{inc.locationDescription}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono">
                    <span className="text-sky-700 dark:text-sky-300 font-bold">Water Depth: {inc.waterDepthCm}cm</span>
                    <span className={`font-semibold ${
                      isResolved ? 'text-emerald-600 dark:text-emerald-400' :
                      inc.status === 'RESPONSE IN PROGRESS' ? 'text-amber-700 dark:text-amber-400' : 'text-sky-700 dark:text-sky-400'
                    }`}>
                      {inc.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Incident Deep-Dive & Stepper Action Console */}
        {currentIncident && (
          <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-sky-600 dark:text-sky-400 mb-1">
                  <span>INCIDENT REF: {currentIncident.incidentCode}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">{currentIncident.priority}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span>TIME: {currentIncident.detectedAt}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{currentIncident.title}</h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{currentIncident.locationDescription}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDispatchModalOpen(true)}
                  className="rounded-lg bg-sky-600 hover:bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Truck className="h-3.5 w-3.5" />
                  Dispatch Response Squad
                </button>
              </div>
            </div>

            {/* Stepper: DETECTED -> VERIFIED -> ASSIGNED -> IN PROGRESS -> RESOLVED */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-semibold">
                Operational Incident Life Cycle:
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {statuses.map((st, idx) => {
                  const currentIdx = statuses.indexOf(currentIncident.status);
                  const isPassed = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`rounded p-2 text-center text-[10px] font-mono transition-all border ${
                        isCurrent
                          ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/50 font-bold shadow-2xs'
                          : isPassed
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30 font-medium'
                            : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-800 hover:text-slate-700'
                      }`}
                    >
                      <div className="text-[9px] opacity-75">Step 0{idx + 1}</div>
                      <div className="truncate">{st}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Field Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Water Depth Recorded</span>
                <span className="text-xl font-bold text-rose-600 dark:text-rose-400">{currentIncident.waterDepthCm} cm</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Stranded Vehicles</span>
                <span className="text-xl font-bold text-amber-700 dark:text-amber-300">{currentIncident.strandedVehiclesCount} units</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Assigned Unit</span>
                <span className="text-sm font-bold text-sky-700 dark:text-sky-300 truncate block">
                  {currentIncident.assignedTeam ? currentIncident.assignedTeam.teamName : 'Pending Squad Dispatch'}
                </span>
              </div>
            </div>

            {/* Assigned Team Details (if assigned) */}
            {currentIncident.assignedTeam && (
              <div className="rounded-lg border border-sky-200 dark:border-sky-500/20 bg-sky-50/70 dark:bg-sky-950/20 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-700 dark:text-sky-400 font-bold uppercase text-[11px]">
                    Assigned Task Force: {currentIncident.assignedTeam.teamName}
                  </span>
                  <span className="font-mono text-amber-800 dark:text-amber-300 font-semibold">ETA: {currentIncident.assignedTeam.etaMinutes} mins</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                  <div>Officer in Command: <strong>{currentIncident.assignedTeam.leadOfficer}</strong></div>
                  <div>Direct Comms: <strong>{currentIncident.assignedTeam.contactNumber}</strong></div>
                </div>
                <div className="pt-2 border-t border-sky-200 dark:border-sky-500/20 text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Deployed Fleet Assets: </span>
                  <span className="text-slate-800 dark:text-slate-200 font-mono">{currentIncident.assignedTeam.vehiclesDispatched.join(', ')}</span>
                </div>
              </div>
            )}

            {/* Incident Chronological Action Log */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                Chronological Incident Action Log
              </h4>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {currentIncident.actionLog.map((log, idx) => (
                  <div key={idx} className="rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[10px] mb-1">
                      <span className="text-sky-600 dark:text-sky-400 font-semibold">{log.officer}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200">{log.action}</p>
                  </div>
                ))}
              </div>

              {/* Log Note Input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Append dispatch log entry or telemetry observation..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] px-3 py-1.5 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 shadow-2xs"
                />
                <button
                  onClick={() => {
                    if (!noteInput) return;
                    updateIncidentStatus(currentIncident.id, currentIncident.status, noteInput);
                    setNoteInput('');
                  }}
                  className="rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
                >
                  Log Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dispatch Response Team Modal */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                Dispatch Tactical Dewatering / Rescue Force
              </h3>
              <button
                onClick={() => setDispatchModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDispatchTeam} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Unit / Strike Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NDMC Quick Response Unit Bravo"
                  value={teamNameInput}
                  onChange={(e) => setTeamNameInput(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Incident Commander / Lead Officer</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sub-Inspector Rohit Verma"
                  value={leadOfficerInput}
                  onChange={(e) => setLeadOfficerInput(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Select Equipment & Vehicles to Deploy</label>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {availableVehicles.map(veh => (
                    <label key={veh} className="flex items-center gap-2 p-1.5 rounded bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedVehicles.includes(veh)}
                        onChange={() => toggleVehicle(veh)}
                        className="accent-sky-600"
                      />
                      <span className="text-slate-800 dark:text-slate-200">{veh}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setDispatchModalOpen(false)}
                  className="rounded px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-600 hover:bg-sky-500 px-4 py-2 font-bold text-white shadow-sm"
                >
                  Authorize Field Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
