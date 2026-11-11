import React, { useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';
import { 
  ShieldAlert, 
  ArrowRight, 
  Cpu, 
  BrainCircuit, 
  Building2, 
  LifeBuoy, 
  Layers, 
  CheckCircle2, 
  Activity, 
  MapPin, 
  Send,
  Sparkles,
  CloudRain,
  Play
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useFloodGrid();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoFormSent, setDemoFormSent] = useState(false);
  const [name, setName] = useState('');
  const [cityAgency, setCityAgency] = useState('');
  const [email, setEmail] = useState('');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoFormSent(true);
    setTimeout(() => {
      setDemoFormSent(false);
      setDemoModalOpen(false);
      setActiveTab('dashboard');
    }, 1800);
  };

  const corePillars = [
    {
      icon: BrainCircuit,
      title: 'HydroML Predictive Intelligence',
      desc: 'Combines 10m Digital Elevation Models with real-time Doppler rainfall and soil saturation to predict water accumulation 90 minutes before surface ponding occurs.'
    },
    {
      icon: Cpu,
      title: 'IoT Drainage Network Telemetry',
      desc: 'Submersible ultrasonic transducers and millimeter-wave Doppler velocity sensors monitor storm culverts, measuring discharge capacity and silt obstructions.'
    },
    {
      icon: Building2,
      title: 'Infrastructure Exposure Defense',
      desc: 'Automated vulnerability scoring for underground railway underpasses, trauma center hospital roads, transit interchanges, and electrical substations.'
    },
    {
      icon: LifeBuoy,
      title: 'Common Alerting Protocol (CAP)',
      desc: 'Hyperlocal targeted notifications over In-App alerts, SMS cell broadcast, and WhatsApp Business API to divert traffic and mobilize dewatering crews.'
    }
  ];

  const deploymentPhases = [
    { step: '01', title: 'Topological Catchment Mapping', desc: 'Ingest municipal GIS boundaries, storm drain schematics, and elevation rasters into high-performance PostGIS spatial storage.' },
    { step: '02', title: 'IoT Sensor Grid Deployment', desc: 'Install solar-assisted ultrasonic depth transducers at vulnerable culvert choke points and underpass sumps.' },
    { step: '03', title: 'Model Calibration & Baselines', desc: 'Tune SCS Curve Number runoff and Manning roughness coefficients using historical monsoon waterlogging archives.' },
    { step: '04', title: '24/7 Command Center Live', desc: 'Empower municipal operators with automated situation reports (SITREP), dynamic traffic diversion triggers, and early warnings.' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 select-text transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0B1220] dark:via-[#0E1726] dark:to-[#0B1220]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-3.5 py-1 text-xs font-mono text-sky-700 dark:text-sky-400 font-semibold shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>URBAN DISASTER INTELLIGENCE PLATFORM</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Understand Flood Risk <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-blue-700 dark:from-sky-400 dark:via-teal-300 dark:to-blue-500">
                Before Water Reaches Your Streets.
              </span>
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              FloodGrid combines geospatial intelligence, rainfall analytics, drainage monitoring, and predictive modeling to help cities anticipate urban flooding and protect critical infrastructure.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-all"
              >
                Launch Command Center
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#172235] hover:bg-slate-50 dark:hover:bg-[#1E2E48] px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors"
              >
                Request Municipal Pilot
              </button>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-6 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Verified Deployment: <strong>Delhi NCR · Mumbai · Bengaluru</strong></span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Resolution: <strong>10m High-Precision DEM</strong></span>
            </div>
          </div>

          {/* Hero Satellite Graphic */}
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 overflow-hidden shadow-xl group">
            <img
              src="/src/assets/images/hero_flood_satellite_1794407122405.jpg"
              alt="Geospatial satellite flood risk analysis"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-slate-700/80 bg-[#0E1726]/90 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">
                  LIVE GIS RADAR CONTOURS
                </span>
                <span className="text-xs font-bold text-white">Metropolitan Catchment Stress Test</span>
              </div>
              <button
                onClick={() => setActiveTab('map')}
                className="rounded bg-sky-600 hover:bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                Explore Interactive GIS Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Capabilities Section */}
      <section className="py-16 px-6 md:px-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-transparent">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
              Comprehensive Architectural Capability
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              From Reactive Pumping to Predictive Mitigation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transform urban waterlogging management with continuous situational awareness across all 5 municipal operational phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-6 space-y-3 hover:border-sky-300 dark:hover:border-slate-700 shadow-xs transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Command Center & Field IoT Preview Section */}
      <section className="py-16 px-6 md:px-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1726]/40">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                Emergency Command Center
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Engineered for High-Pressure Disaster Operations
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                When cloudbursts overwhelm city infrastructure, response leaders cannot afford fragmented phone calls or missing culvert data. FloodGrid unifies rainfall radars, automatic dewatering pumps, police traffic barriers, and citizen SMS broadcasts onto a single authoritative GIS console.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Real-time culvert siltation & blockage alarms prior to backwater inundation.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Automated Situation Reports (SITREP) formatted for Mayoral and Chief Secretary briefings.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pre-positioning recommendations for high-capacity 150 HP pump trucks.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('incidents')}
                  className="rounded-lg bg-sky-600 hover:bg-sky-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors"
                >
                  Inspect Incident Operations Console →
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235] overflow-hidden shadow-lg">
              <img
                src="/src/assets/images/emergency_command_center_1794407124046.jpg"
                alt="Disaster command and control center"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Lifecycle / Methodology */}
      <section className="py-16 px-6 md:px-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-transparent">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
              Deployment Roadmap
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4-Phase Municipal Rollout</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deploymentPhases.map((phase) => (
              <div key={phase.step} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#172235]/60 p-5 space-y-2 shadow-xs">
                <span className="font-mono text-2xl font-black text-sky-600 dark:text-sky-400">{phase.step}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{phase.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 md:px-12 bg-slate-50 dark:bg-gradient-to-t dark:from-[#0B1220] dark:to-[#0E1726]">
        <div className="mx-auto max-w-4xl rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-white dark:bg-sky-950/20 p-8 md:p-12 text-center space-y-6 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ready to Protect Your City’s Infrastructure?
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            FloodGrid is available for deployment across Smart City Missions, State Disaster Authorities, and Infrastructure Concessionaires.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="rounded-lg bg-sky-600 hover:bg-sky-500 px-6 py-3 text-xs font-bold text-white shadow-md transition-colors"
            >
              Enter Live Command Center
            </button>
            <button
              onClick={() => setDemoModalOpen(true)}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#172235] hover:bg-slate-100 dark:hover:bg-[#1E2E48] px-6 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors"
            >
              Contact Solutions Architect
            </button>
          </div>
        </div>
      </section>

      {/* Demo / Pilot Request Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#172235] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Request Smart City Pilot</h3>
              <button onClick={() => setDemoModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">✕</button>
            </div>

            {demoFormSent ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Deployment Brief Registered</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  A geospatial systems architect will contact your municipal office with pilot hardware specs.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Full Name & Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Mehra, Chief City Engineer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Municipal Body / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune Municipal Corporation / NDMA"
                    value={cityAgency}
                    onChange={(e) => setCityAgency(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Official Government / Enterprise Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. commissioner@pune.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(false)}
                    className="rounded px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-sky-600 hover:bg-sky-500 px-5 py-2 font-bold text-white shadow-sm"
                  >
                    Submit Deployment Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
