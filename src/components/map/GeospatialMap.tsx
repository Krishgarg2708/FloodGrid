import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useFloodGrid } from '../../context/FloodGridContext';
import { INITIAL_INFRASTRUCTURE } from '../../data/mockData';
import { Layers, Eye, EyeOff, Navigation, AlertTriangle, Cpu, Building2, Droplets } from 'lucide-react';
import { RiskLevel } from '../../types';

export const GeospatialMap: React.FC = () => {
  const { 
    selectedCity, 
    selectedZone, 
    setSelectedZone, 
    sensors, 
    setSelectedSensorId, 
    setActiveTab,
    mapLayers,
    toggleMapLayer,
    incidents,
    theme
  } = useFloodGrid();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const layersGroupRef = useRef<{
    zones?: L.LayerGroup;
    sensors?: L.LayerGroup;
    infrastructure?: L.LayerGroup;
    incidents?: L.LayerGroup;
    drainageLines?: L.LayerGroup;
  }>({});

  const [activeInspector, setActiveInspector] = useState<{
    type: 'zone' | 'sensor' | 'infrastructure' | 'incident';
    data: any;
  } | null>(null);

  // Initialize or re-center Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: selectedCity.coordinates,
        zoom: selectedCity.zoom,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Positron (light) or Dark Matter tiles
      const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(selectedCity.coordinates, selectedCity.zoom);
    }
  }, [selectedCity]);

  // Update tile layer when theme changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    const newTileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTileLayer;
  }, [theme]);

  // Update map layers based on toggles & data
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing layer groups
    Object.values(layersGroupRef.current).forEach(lg => lg?.clearLayers());

    // 1. Flood Risk Zone Polygons Layer
    if (mapLayers.floodRiskZones) {
      const zonesGroup = layersGroupRef.current.zones || L.layerGroup().addTo(map);
      layersGroupRef.current.zones = zonesGroup;

      selectedCity.zones.forEach(zone => {
        const getZoneColor = (risk: RiskLevel) => {
          switch (risk) {
            case 'CRITICAL': return '#DC2626';
            case 'SEVERE': return '#EA580C';
            case 'HIGH': return '#D97706';
            case 'MODERATE': return '#0284C7';
            default: return '#16A34A';
          }
        };

        const polygon = L.polygon(zone.coordinates, {
          color: getZoneColor(zone.currentRisk),
          weight: 2,
          opacity: 0.85,
          fillColor: getZoneColor(zone.currentRisk),
          fillOpacity: 0.2
        });

        polygon.on('click', () => {
          setSelectedZone(zone);
          setActiveInspector({ type: 'zone', data: zone });
        });

        polygon.bindTooltip(`
          <div class="font-sans text-xs">
            <strong class="text-slate-900">${zone.name}</strong><br/>
            <span class="text-sky-600 font-semibold">Risk: ${zone.currentRisk} (${zone.riskProbability}%)</span><br/>
            <span class="text-slate-600">Accumulation: ${zone.predictedAccumulationCm} cm</span>
          </div>
        `, { sticky: true });

        polygon.addTo(zonesGroup);
      });
    }

    // 2. Drainage Network Flow Polyline Layer
    if (mapLayers.drainageNetwork) {
      const drainageGroup = layersGroupRef.current.drainageLines || L.layerGroup().addTo(map);
      layersGroupRef.current.drainageLines = drainageGroup;

      // Draw stylized interconnected culvert trunk paths
      selectedCity.zones.forEach((zone, idx) => {
        const nextZone = selectedCity.zones[(idx + 1) % selectedCity.zones.length];
        const line = L.polyline([zone.center, nextZone.center], {
          color: '#0284C7',
          weight: 2.5,
          dashArray: '6, 8',
          opacity: 0.75
        });
        line.bindTooltip(`Stormwater Trunk Interceptor [${zone.name} -> ${nextZone.name}]`);
        line.addTo(drainageGroup);
      });
    }

    // 3. IoT Sensors Layer
    if (mapLayers.iotSensors) {
      const sensorGroup = layersGroupRef.current.sensors || L.layerGroup().addTo(map);
      layersGroupRef.current.sensors = sensorGroup;

      sensors.forEach(sensor => {
        const getSensorColor = (status: string) => {
          if (status === 'CRITICAL') return '#DC2626';
          if (status === 'WARNING') return '#D97706';
          return '#16A34A';
        };

        const customSensorIcon = L.divIcon({
          className: 'custom-sensor-icon',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="h-4 w-4 rounded-full border-2 border-white shadow-md" style="background-color: ${getSensorColor(sensor.status)};"></div>
              ${sensor.status === 'CRITICAL' ? '<span class="absolute h-6 w-6 rounded-full animate-ping opacity-75" style="background-color: #DC2626;"></span>' : ''}
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker(sensor.coordinates, { icon: customSensorIcon });
        marker.on('click', () => {
          setSelectedSensorId(sensor.id);
          setActiveInspector({ type: 'sensor', data: sensor });
        });

        marker.bindTooltip(`
          <div class="font-sans text-xs">
            <strong class="text-slate-900">${sensor.sensorCode}: ${sensor.name}</strong><br/>
            <span>Status: <strong style="color: ${getSensorColor(sensor.status)}">${sensor.status}</strong></span><br/>
            <span>Depth: ${sensor.waterLevelMeters}m / ${sensor.maxCulvertDepthMeters}m (${sensor.fillPercentage}%)</span>
          </div>
        `, { sticky: true });

        marker.addTo(sensorGroup);
      });
    }

    // 4. Critical Infrastructure Pins
    if (mapLayers.criticalInfrastructure) {
      const infraGroup = layersGroupRef.current.infrastructure || L.layerGroup().addTo(map);
      layersGroupRef.current.infrastructure = infraGroup;

      INITIAL_INFRASTRUCTURE.forEach(infra => {
        const customInfraIcon = L.divIcon({
          className: 'custom-infra-icon',
          html: `
            <div class="flex h-5 w-5 items-center justify-center rounded-sm bg-slate-900 border border-amber-400 text-amber-300 shadow-md">
              <span class="text-[9px] font-bold">🏛</span>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker(infra.coordinates, { icon: customInfraIcon });
        marker.on('click', () => {
          setActiveInspector({ type: 'infrastructure', data: infra });
        });

        marker.bindTooltip(`
          <div class="font-sans text-xs">
            <strong class="text-amber-700 dark:text-amber-300">[${infra.type}] ${infra.name}</strong><br/>
            <span>Vulnerability: <strong>${infra.vulnerabilityScore}/100 (${infra.riskLevel})</strong></span><br/>
            <span>Status: ${infra.status}</span>
          </div>
        `, { sticky: true });

        marker.addTo(infraGroup);
      });
    }

    // 5. Active Incident Hotspots
    const incidentsGroup = layersGroupRef.current.incidents || L.layerGroup().addTo(map);
    layersGroupRef.current.incidents = incidentsGroup;

    incidents.filter(i => i.status !== 'RESOLVED').forEach(inc => {
      const customIncIcon = L.divIcon({
        className: 'custom-incident-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 border border-white text-white text-[11px] font-black shadow-lg animate-bounce">
              !
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(inc.coordinates, { icon: customIncIcon });
      marker.on('click', () => {
        setActiveInspector({ type: 'incident', data: inc });
      });

      marker.addTo(incidentsGroup);
    });

  }, [selectedCity, mapLayers, sensors, incidents]);

  return (
    <div className="relative h-full w-full bg-slate-50 dark:bg-[#0B1220] overflow-hidden flex flex-col transition-colors">
      {/* Map Header Toolbar */}
      <div className="z-20 flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0E1726]/90 px-4 py-2.5 backdrop-blur-md gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
            <Navigation className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span className="font-bold text-slate-900 dark:text-white">{selectedCity.name}</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-slate-500 dark:text-slate-400">
              {selectedCity.coordinates[0].toFixed(4)}°N, {selectedCity.coordinates[1].toFixed(4)}°E
            </span>
          </div>
        </div>

        {/* Map Layer Switchers */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" /> Layers:
          </span>
          <button
            onClick={() => toggleMapLayer('floodRiskZones')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors border ${
              mapLayers.floodRiskZones 
                ? 'bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30' 
                : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {mapLayers.floodRiskZones ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            Risk Zones
          </button>

          <button
            onClick={() => toggleMapLayer('iotSensors')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors border ${
              mapLayers.iotSensors 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30' 
                : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {mapLayers.iotSensors ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            Sensors
          </button>

          <button
            onClick={() => toggleMapLayer('drainageNetwork')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors border ${
              mapLayers.drainageNetwork 
                ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30' 
                : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {mapLayers.drainageNetwork ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            Drainage Grid
          </button>

          <button
            onClick={() => toggleMapLayer('criticalInfrastructure')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors border ${
              mapLayers.criticalInfrastructure 
                ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30' 
                : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {mapLayers.criticalInfrastructure ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            Infrastructure
          </button>
        </div>
      </div>

      {/* Main Map Viewport & Inspector Panel */}
      <div className="relative flex-1 w-full h-full">
        <div ref={mapContainerRef} className="h-full w-full z-10" />

        {/* Floating Geospatial Legend */}
        <div className="absolute bottom-6 left-6 z-20 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0E1726]/90 p-3 shadow-lg backdrop-blur-md max-w-xs text-xs">
          <p className="font-bold text-slate-900 dark:text-slate-200 mb-2">GIS Flood Probability Legend</p>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-sm bg-rose-600" /> Critical Risk (&gt;90%)
              </span>
              <span className="text-slate-500 dark:text-slate-400">&gt;60cm water</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-sm bg-orange-500" /> Severe Risk (80-90%)
              </span>
              <span className="text-slate-500 dark:text-slate-400">40-60cm water</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> High Risk (65-80%)
              </span>
              <span className="text-slate-500 dark:text-slate-400">20-40cm water</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-sm bg-sky-500" /> Moderate Risk (40-65%)
              </span>
              <span className="text-slate-500 dark:text-slate-400">10-20cm water</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-sm bg-emerald-600" /> Low Risk (&lt;40%)
              </span>
              <span className="text-slate-500 dark:text-slate-400">&lt;10cm water</span>
            </div>
          </div>
        </div>

        {/* Selected Entity Inspector Drawer */}
        {activeInspector && (
          <div className="absolute top-4 right-4 z-20 w-80 max-h-[85vh] overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-[#172235]/95 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-600 dark:text-sky-400 font-bold tracking-wider">
                  {activeInspector.type.toUpperCase()} INSPECTOR
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeInspector.type === 'zone' && activeInspector.data.name}
                  {activeInspector.type === 'sensor' && `${activeInspector.data.sensorCode}: ${activeInspector.data.name}`}
                  {activeInspector.type === 'infrastructure' && activeInspector.data.name}
                  {activeInspector.type === 'incident' && activeInspector.data.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveInspector(null)}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Zone content */}
            {activeInspector.type === 'zone' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2">
                    <span className="text-slate-500 dark:text-slate-400 block">Risk Level</span>
                    <strong className="text-rose-600 dark:text-rose-400 text-sm">{activeInspector.data.currentRisk}</strong>
                  </div>
                  <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2">
                    <span className="text-slate-500 dark:text-slate-400 block">Probability</span>
                    <strong className="text-amber-600 dark:text-amber-400 text-sm">{activeInspector.data.riskProbability}%</strong>
                  </div>
                  <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2">
                    <span className="text-slate-500 dark:text-slate-400 block">Expected Depth</span>
                    <strong className="text-sky-600 dark:text-sky-300 text-sm">{activeInspector.data.predictedAccumulationCm} cm</strong>
                  </div>
                  <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2">
                    <span className="text-slate-500 dark:text-slate-400 block">Elevation</span>
                    <strong className="text-slate-800 dark:text-slate-200 text-sm">{activeInspector.data.elevationMeters}m</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-semibold mb-1">Key At-Risk Infrastructure:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-300">
                    {activeInspector.data.keyInfrastructure.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab('predictions')}
                  className="w-full rounded-md bg-sky-600 hover:bg-sky-500 py-1.5 font-semibold text-white transition-colors shadow-xs"
                >
                  View AI Risk Decomposition
                </button>
              </div>
            )}

            {/* Sensor content */}
            {activeInspector.type === 'sensor' && (
              <div className="space-y-3 text-xs">
                <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2.5">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Current Water Level</span>
                    <strong className="font-mono text-sky-600 dark:text-sky-400">{activeInspector.data.waterLevelMeters}m / {activeInspector.data.maxCulvertDepthMeters}m</strong>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${activeInspector.data.fillPercentage > 85 ? 'bg-rose-500' : 'bg-sky-500'}`}
                      style={{ width: `${Math.min(100, activeInspector.data.fillPercentage)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">Culvert Fill: {activeInspector.data.fillPercentage}%</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2">
                    <span className="text-slate-500 dark:text-slate-400 block">Flow Velocity</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">{activeInspector.data.flowVelocityMs} m/s</span>
                  </div>
                  <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0E1726] p-2">
                    <span className="text-slate-500 dark:text-slate-400 block">Silt / Blockage</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{activeInspector.data.blockagePercentage}%</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedSensorId(activeInspector.data.id);
                    setActiveTab('sensor-detail');
                  }}
                  className="w-full rounded-md bg-blue-600 hover:bg-blue-500 py-1.5 font-semibold text-white transition-colors shadow-xs"
                >
                  Inspect Full Telemetry & MQTT Logs
                </button>
              </div>
            )}

            {/* Infrastructure content */}
            {activeInspector.type === 'infrastructure' && (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-amber-50 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20 px-2 py-0.5 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold">
                    {activeInspector.data.type}
                  </span>
                  <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                    Score: {activeInspector.data.vulnerabilityScore}/100
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeInspector.data.consequenceSummary}
                </p>
                <div className="rounded border border-amber-200 bg-amber-50/70 dark:border-amber-500/20 dark:bg-amber-500/5 p-2 text-amber-900 dark:text-amber-200 text-[11px]">
                  <strong>Action:</strong> {activeInspector.data.mitigationRequirement}
                </div>
              </div>
            )}

            {/* Incident content */}
            {activeInspector.type === 'incident' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">{activeInspector.data.priority}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono">{activeInspector.data.status}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{activeInspector.data.locationDescription}</p>
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  <span>Water Depth: <strong className="text-rose-600 dark:text-rose-400">{activeInspector.data.waterDepthCm} cm</strong></span>
                </div>
                <button
                  onClick={() => setActiveTab('incidents')}
                  className="w-full rounded-md bg-rose-600 hover:bg-rose-500 py-1.5 font-semibold text-white transition-colors shadow-xs"
                >
                  Manage Emergency Incident
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
