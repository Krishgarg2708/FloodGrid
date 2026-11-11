import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  City, 
  CityZone, 
  DrainageSensor, 
  FloodAlert, 
  EmergencyIncident, 
  UserRole,
  RiskLevel
} from '../types';
import { CITIES_DATA, INITIAL_SENSORS, INITIAL_ALERTS, INITIAL_INCIDENTS } from '../data/mockData';

interface FloodGridContextType {
  cities: City[];
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  selectedZone: CityZone | null;
  setSelectedZone: (zone: CityZone | null) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sensors: DrainageSensor[];
  selectedSensor: DrainageSensor | null;
  setSelectedSensorId: (id: string | null) => void;
  alerts: FloodAlert[];
  incidents: EmergencyIncident[];
  selectedIncident: EmergencyIncident | null;
  setSelectedIncidentId: (id: string | null) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  isStreamingLive: boolean;
  setIsStreamingLive: (val: boolean | ((prev: boolean) => boolean)) => void;
  acknowledgeAlert: (alertId: string, officerName: string) => void;
  updateIncidentStatus: (incidentId: string, newStatus: EmergencyIncident['status'], note?: string) => void;
  assignTeamToIncident: (incidentId: string, teamName: string, leadOfficer: string, vehicles: string[]) => void;
  createNewIncident: (incident: Omit<EmergencyIncident, 'id' | 'detectedAt' | 'actionLog'>) => void;
  triggerSimulatedSurge: () => void;
  resetSimulationState: () => void;
  weatherOverlay: 'radar' | 'clouds' | 'satellite' | 'none';
  setWeatherOverlay: (val: 'radar' | 'clouds' | 'satellite' | 'none') => void;
  mapLayers: {
    floodRiskZones: boolean;
    drainageNetwork: boolean;
    iotSensors: boolean;
    criticalInfrastructure: boolean;
    historicalHotspots: boolean;
    elevationContours: boolean;
  };
  toggleMapLayer: (layer: keyof FloodGridContextType['mapLayers']) => void;
  customCursorEnabled: boolean;
  setCustomCursorEnabled: (val: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const FloodGridContext = createContext<FloodGridContextType | undefined>(undefined);

export const FloodGridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cities] = useState<City[]>(CITIES_DATA);
  const [selectedCityId, setSelectedCityId] = useState<string>('delhi-ncr');
  const [selectedZone, setSelectedZone] = useState<CityZone | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('Municipal Administrator');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sensors, setSensors] = useState<DrainageSensor[]>(INITIAL_SENSORS);
  const [selectedSensorId, setSelectedSensorId] = useState<string | null>('sensor-dl-01');
  const [alerts, setAlerts] = useState<FloodAlert[]>(INITIAL_ALERTS);
  const [incidents, setIncidents] = useState<EmergencyIncident[]>(INITIAL_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>('INC-2026-0881');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isStreamingLive, setIsStreamingLive] = useState<boolean>(true);
  const [weatherOverlay, setWeatherOverlay] = useState<'radar' | 'clouds' | 'satellite' | 'none'>('radar');
  const [customCursorEnabled, setCustomCursorEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [mapLayers, setMapLayers] = useState({
    floodRiskZones: true,
    drainageNetwork: true,
    iotSensors: true,
    criticalInfrastructure: true,
    historicalHotspots: false,
    elevationContours: false
  });

  const selectedCity = cities.find(c => c.id === selectedCityId) || cities[0];

  const setSelectedCity = (city: City) => {
    setSelectedCityId(city.id);
    setSelectedZone(null);
  };

  const selectedSensor = sensors.find(s => s.id === selectedSensorId) || null;
  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || null;

  const toggleMapLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Live simulation tick: periodically gently fluctuate water levels, discharge, and battery
  useEffect(() => {
    if (!isStreamingLive) return;

    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => {
          // slight random jitter between -0.04m and +0.05m
          const delta = (Math.random() - 0.45) * 0.08;
          const newLevel = Math.max(0.2, Math.min(sensor.maxCulvertDepthMeters, +(sensor.waterLevelMeters + delta).toFixed(2)));
          const fillPercentage = +((newLevel / sensor.maxCulvertDepthMeters) * 100).toFixed(1);
          
          let newStatus = sensor.status;
          if (fillPercentage >= 90) newStatus = 'CRITICAL';
          else if (fillPercentage >= 70) newStatus = 'WARNING';
          else newStatus = 'ONLINE';

          const newReading = {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            waterLevel: newLevel,
            flowVelocity: +(sensor.flowVelocityMs + (Math.random() - 0.5) * 0.1).toFixed(2),
            dischargeRate: +(sensor.dischargeRateCumecs + (Math.random() - 0.5) * 0.4).toFixed(1)
          };

          return {
            ...sensor,
            waterLevelMeters: newLevel,
            fillPercentage,
            status: newStatus,
            lastCommunication: 'Just now',
            recentReadings: [...sensor.recentReadings.slice(-7), newReading]
          };
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [isStreamingLive]);

  const acknowledgeAlert = (alertId: string, officerName: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: 'ACKNOWLEDGED',
          acknowledgedBy: officerName
        };
      }
      return a;
    }));
  };

  const updateIncidentStatus = (incidentId: string, newStatus: EmergencyIncident['status'], note?: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const updatedLog = [...inc.actionLog];
        if (note) {
          updatedLog.push({
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            officer: userRole,
            action: `${newStatus}: ${note}`
          });
        }
        return {
          ...inc,
          status: newStatus,
          actionLog: updatedLog
        };
      }
      return inc;
    }));
  };

  const assignTeamToIncident = (incidentId: string, teamName: string, leadOfficer: string, vehicles: string[]) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: 'ASSIGNED',
          assignedTeam: {
            teamName,
            leadOfficer,
            contactNumber: '+91 98100 ' + Math.floor(10000 + Math.random() * 90000),
            vehiclesDispatched: vehicles,
            etaMinutes: Math.floor(5 + Math.random() * 15)
          },
          actionLog: [
            ...inc.actionLog,
            {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              officer: userRole,
              action: `Dispatched ${teamName} (Lead: ${leadOfficer}) with [${vehicles.join(', ')}]`
            }
          ]
        };
      }
      return inc;
    }));
  };

  const createNewIncident = (incidentData: Omit<EmergencyIncident, 'id' | 'detectedAt' | 'actionLog'>) => {
    const newInc: EmergencyIncident = {
      ...incidentData,
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      detectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Local',
      actionLog: [
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          officer: userRole,
          action: 'Incident manually declared and placed on active watch.'
        }
      ]
    };
    setIncidents(prev => [newInc, ...prev]);
  };

  const triggerSimulatedSurge = () => {
    // Elevate water levels on all sensors to simulate cloudburst
    setSensors(prev => prev.map(s => {
      const surgeLevel = +(s.maxCulvertDepthMeters * 0.95).toFixed(2);
      return {
        ...s,
        waterLevelMeters: surgeLevel,
        fillPercentage: 95.0,
        status: 'CRITICAL',
        blockagePercentage: Math.min(85, s.blockagePercentage + 20)
      };
    }));

    // Add a new surge alert
    const newAlert: FloodAlert = {
      id: `ALT-SURGE-${Date.now().toString().slice(-4)}`,
      title: 'CRITICAL SURGE DETECTED: Rapid Hydrological Inundation',
      zoneId: selectedCity.zones[0]?.id || 'delhi-yamuna-basin',
      zoneName: selectedCity.zones[0]?.name || 'Yamuna Floodplain',
      severity: 'CRITICAL',
      triggerCondition: 'Simulated cloudburst test: multi-sensor water level surge >90% within 10 minutes.',
      estimatedAffectedAreaSqKm: 8.5,
      estimatedPeopleExposed: 140000,
      recommendedResponse: 'Trigger sirens in riverbed settlements, scramble NDRF and local PWD pumping corps.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Local',
      status: 'ACTIVE',
      channels: {
        inApp: true,
        sms: true,
        email: true,
        whatsapp: true,
        capWebhook: true
      }
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const resetSimulationState = () => {
    setSensors(INITIAL_SENSORS);
    setAlerts(INITIAL_ALERTS);
    setIncidents(INITIAL_INCIDENTS);
  };

  return (
    <FloodGridContext.Provider
      value={{
        cities,
        selectedCity,
        setSelectedCity,
        selectedZone,
        setSelectedZone,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        sensors,
        selectedSensor,
        setSelectedSensorId,
        alerts,
        incidents,
        selectedIncident,
        setSelectedIncidentId,
        isDemoMode,
        setIsDemoMode,
        isStreamingLive,
        setIsStreamingLive,
        acknowledgeAlert,
        updateIncidentStatus,
        assignTeamToIncident,
        createNewIncident,
        triggerSimulatedSurge,
        resetSimulationState,
        weatherOverlay,
        setWeatherOverlay,
        mapLayers,
        toggleMapLayer,
        customCursorEnabled,
        setCustomCursorEnabled,
        theme,
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </FloodGridContext.Provider>
  );
};

export const useFloodGrid = () => {
  const context = useContext(FloodGridContext);
  if (!context) {
    throw new Error('useFloodGrid must be used within a FloodGridProvider');
  }
  return context;
};
