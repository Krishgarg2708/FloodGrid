import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  AlertOctagon, 
  Send, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Webhook, 
  Bell, 
  ShieldCheck, 
  Filter,
  UserCheck
} from 'lucide-react';
import { FloodAlert, RiskLevel } from '../../types';

export const AlertManagement: React.FC = () => {
  const { alerts, acknowledgeAlert, userRole, selectedCity } = useFloodGrid();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [selectedAlert, setSelectedAlert] = useState<FloodAlert | null>(alerts[0] || null);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);

  // New simulated alert draft state
  const [newTitle, setNewTitle] = useState('');
  const [newZoneId, setNewZoneId] = useState(selectedCity.zones[0]?.id || '');
  const [newSeverity, setNewSeverity] = useState<RiskLevel>('SEVERE');
  const [newCondition, setNewCondition] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [targetChannels, setTargetChannels] = useState({
    inApp: true,
    sms: true,
    email: true,
    whatsapp: true,
    capWebhook: true
  });

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  const handleCreateAndBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const targetZone = selectedCity.zones.find(z => z.id === newZoneId) || selectedCity.zones[0];
    const createdAlert: FloodAlert = {
      id: `ALT-MANUAL-${Date.now().toString().slice(-4)}`,
      title: newTitle,
      zoneId: targetZone.id,
      zoneName: targetZone.name,
      severity: newSeverity,
      triggerCondition: newCondition || 'Manual command directive initiated by emergency controller.',
      estimatedAffectedAreaSqKm: 3.2,
      estimatedPeopleExposed: 48000,
      recommendedResponse: newResponse || 'Avoid low-lying underpasses and follow police traffic diversions.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Local',
      status: 'ACTIVE',
      channels: targetChannels
    };

    alerts.unshift(createdAlert);
    setSelectedAlert(createdAlert);
    setDispatchModalOpen(false);
    setNewTitle('');
    setNewCondition('');
    setNewResponse('');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1220] p-6 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
            <AlertOctagon className="h-3.5 w-3.5" />
            <span>HYPERLOCAL WARNING & BROADCAST SUBSYSTEM</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">CAP-XML / NDMA COMPLIANT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Location-Specific Flood Alert Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Trigger, acknowledge, and broadcast targeted early warnings across multiple civilian and municipal channels.
          </p>
        </div>

        <button
          onClick={() => setDispatchModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors whitespace-nowrap"
        >
          <Send className="h-3.5 w-3.5" />
          Draft Emergency Broadcast
        </button>
      </div>

      {/* Demo Safe Mode Notification */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-3 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between font-mono shadow-2xs">
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0" />
          DEMO MODE SANDBOX: Live SMS, WhatsApp, and CAP-Webhook gateways are running in simulation sandbox. No external civilian alarms will be delivered.
        </span>
      </div>

      {/* Main Grid: Left Roster & Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Alerts Roster */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
              Dispatched Alerts ({filteredAlerts.length})
            </h3>

            {/* Filter buttons */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] px-2 py-1 text-[11px] font-mono text-slate-700 dark:text-slate-300 outline-none"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="SEVERE">Severe</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredAlerts.map(alert => {
              const isSelected = selectedAlert?.id === alert.id;
              const isAcknowledged = alert.status === 'ACKNOWLEDGED';

              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`rounded-lg border p-3.5 text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 dark:bg-[#1E2E48] shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0E1726] hover:bg-slate-100 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                    <span className="text-slate-500 dark:text-slate-400">{alert.id}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      alert.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30' :
                      alert.severity === 'SEVERE' ? 'bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30' :
                      'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{alert.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{alert.zoneName}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[10px] font-mono">
                    <span className="text-slate-500 dark:text-slate-400">{alert.timestamp}</span>
                    <span className={isAcknowledged ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-700 dark:text-amber-400 font-bold'}>
                      {isAcknowledged ? 'ACKNOWLEDGED' : 'ACTIVE WATCH'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected Alert Dossier & Channel Transmission Status */}
        {selectedAlert && (
          <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-sky-600 dark:text-sky-400 mb-1">
                  <span>ALERT DOSSIER: {selectedAlert.id}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span>TIME: {selectedAlert.timestamp}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedAlert.title}</h2>
                <span className="text-xs text-slate-600 dark:text-slate-300">{selectedAlert.zoneName}</span>
              </div>

              {selectedAlert.status !== 'ACKNOWLEDGED' ? (
                <button
                  onClick={() => acknowledgeAlert(selectedAlert.id, `${userRole}`)}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-colors flex items-center gap-2 whitespace-nowrap shadow-xs"
                >
                  <UserCheck className="h-4 w-4" />
                  Acknowledge as {userRole}
                </button>
              ) : (
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-3 py-1.5 rounded-lg font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Acknowledged by {selectedAlert.acknowledgedBy}</span>
                </div>
              )}
            </div>

            {/* Alert Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Severity Level</span>
                <span className="text-lg font-bold text-rose-600 dark:text-rose-400">{selectedAlert.severity}</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Est. Affected Area</span>
                <span className="text-lg font-bold text-sky-700 dark:text-sky-300">{selectedAlert.estimatedAffectedAreaSqKm} km²</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-3 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Civilians Exposed</span>
                <span className="text-lg font-bold text-amber-700 dark:text-amber-300">~{selectedAlert.estimatedPeopleExposed.toLocaleString()}</span>
              </div>
            </div>

            {/* Trigger Reason & Recommended Protocols */}
            <div className="space-y-4 text-xs">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1726] p-4">
                <span className="font-mono text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block mb-1">
                  Triggering Physical Condition:
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-mono">{selectedAlert.triggerCondition}</p>
              </div>

              <div className="rounded-lg border border-amber-200 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/5 p-4">
                <span className="font-mono text-amber-800 dark:text-amber-300 text-[10px] uppercase font-bold block mb-1">
                  Mandated Emergency Protocols:
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{selectedAlert.recommendedResponse}</p>
              </div>
            </div>

            {/* Omni-Channel Dispatch Architecture */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider mb-3">
                Delivery Gateways & Outbound Telemetry
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-[11px]">
                <div className={`rounded-lg border p-2.5 text-center ${selectedAlert.channels.inApp ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'}`}>
                  <Bell className="h-4 w-4 mx-auto mb-1" />
                  <span className="block font-bold">In-App Push</span>
                  <span className="text-[10px] block opacity-80">{selectedAlert.channels.inApp ? 'Delivered' : 'Disabled'}</span>
                </div>

                <div className={`rounded-lg border p-2.5 text-center ${selectedAlert.channels.sms ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'}`}>
                  <Smartphone className="h-4 w-4 mx-auto mb-1" />
                  <span className="block font-bold">Cell SMS (CB)</span>
                  <span className="text-[10px] block opacity-80">{selectedAlert.channels.sms ? 'Broadcasted' : 'Disabled'}</span>
                </div>

                <div className={`rounded-lg border p-2.5 text-center ${selectedAlert.channels.whatsapp ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'}`}>
                  <MessageSquare className="h-4 w-4 mx-auto mb-1" />
                  <span className="block font-bold">WhatsApp B2C</span>
                  <span className="text-[10px] block opacity-80">{selectedAlert.channels.whatsapp ? 'Sent' : 'Disabled'}</span>
                </div>

                <div className={`rounded-lg border p-2.5 text-center ${selectedAlert.channels.email ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'}`}>
                  <Mail className="h-4 w-4 mx-auto mb-1" />
                  <span className="block font-bold">SMTP Dispatch</span>
                  <span className="text-[10px] block opacity-80">{selectedAlert.channels.email ? 'Sent' : 'Disabled'}</span>
                </div>

                <div className={`rounded-lg border p-2.5 text-center ${selectedAlert.channels.capWebhook ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'}`}>
                  <Webhook className="h-4 w-4 mx-auto mb-1" />
                  <span className="block font-bold">CAP Webhook</span>
                  <span className="text-[10px] block opacity-80">{selectedAlert.channels.capWebhook ? 'HTTP 200' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manual Alert Draft Modal */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                Draft Emergency Warning Broadcast
              </h3>
              <button
                onClick={() => setDispatchModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAndBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Alert Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Immediate Underpass Inundation Warning..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Zone</label>
                  <select
                    value={newZoneId}
                    onChange={(e) => setNewZoneId(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none"
                  >
                    {selectedCity.zones.map(z => (
                      <option key={z.id} value={z.id}>{z.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as RiskLevel)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-rose-600 dark:text-rose-400 font-mono font-bold outline-none"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="SEVERE">SEVERE</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MODERATE">MODERATE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Trigger Reason / Sensor Finding</label>
                <input
                  type="text"
                  placeholder="e.g. Sluice gate jammed with debris; water rising at 15cm/10min"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Recommended Response / Evacuation Protocol</label>
                <textarea
                  rows={2}
                  placeholder="Instructions for traffic police and public..."
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
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
                  className="rounded bg-rose-600 hover:bg-rose-500 px-4 py-2 font-bold text-white shadow-sm"
                >
                  Authorize Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
