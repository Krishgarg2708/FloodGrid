export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE' | 'CRITICAL';

export type UserRole = 
  | 'Super Administrator'
  | 'Municipal Administrator'
  | 'Disaster Management Officer'
  | 'Infrastructure Operator'
  | 'Analyst'
  | 'Public Viewer';

export type SensorStatus = 'ONLINE' | 'OFFLINE' | 'WARNING' | 'CRITICAL' | 'MAINTENANCE';

export type IncidentStatus = 'DETECTED' | 'VERIFIED' | 'ASSIGNED' | 'RESPONSE IN PROGRESS' | 'RESOLVED';

export type IncidentPriority = 'P1 - Critical' | 'P2 - High' | 'P3 - Moderate' | 'P4 - Low';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface CityZone {
  id: string;
  name: string;
  cityId: string;
  coordinates: [number, number][]; // Polygon coordinates
  center: [number, number];
  elevationMeters: number;
  slopePercentage: number;
  imperviousSurfaceRatio: number; // 0 to 1
  drainageDensityKmPerSqKm: number;
  soilAbsorptionType: 'Alluvial Loam' | 'Clay Silt' | 'Sandy Loam' | 'Urban Fill';
  populationDensity: number;
  currentRainfallMmHr: number;
  predictedAccumulationCm: number;
  currentRisk: RiskLevel;
  riskProbability: number; // 0 - 100%
  sensorsCount: number;
  activeIncidentsCount: number;
  keyInfrastructure: string[];
}

export interface City {
  id: string;
  name: string;
  state: string;
  country: string;
  coordinates: [number, number];
  zoom: number;
  totalZones: number;
  totalSensors: number;
  currentRainfallIntensity: number; // mm/h
  floodRiskIndex: number; // 0-100
  infrastructureVulnerabilityScore: number; // 0-100
  activeAlertsCount: number;
  criticalDrainageFailures: number;
  zones: CityZone[];
}

export interface DrainageSensor {
  id: string;
  sensorCode: string;
  name: string;
  zoneId: string;
  locationName: string;
  coordinates: [number, number];
  status: SensorStatus;
  waterLevelMeters: number;
  maxCulvertDepthMeters: number;
  fillPercentage: number;
  flowVelocityMs: number; // meters per second
  dischargeRateCumecs: number; // m³/s
  blockagePercentage: number;
  siltationEstimateCm: number;
  batteryPercentage: number;
  signalDbm: number;
  protocol: 'MQTT' | 'LoRaWAN' | 'Cellular NB-IoT';
  lastCommunication: string;
  firmwareVersion: string;
  recentReadings: {
    timestamp: string;
    waterLevel: number;
    flowVelocity: number;
    dischargeRate: number;
  }[];
  maintenanceHistory: {
    date: string;
    type: string;
    technician: string;
    notes: string;
  }[];
}

export interface FloodPrediction {
  id: string;
  zoneId: string;
  zoneName: string;
  riskLevel: RiskLevel;
  probability: number;
  expectedDepthCm: number;
  timeToPeakMinutes: number;
  criticalWindow: string;
  modelVersion: string;
  generatedAt: string;
  confidenceScore: number;
  isSimulated: boolean;
  contributingFactors: {
    factor: string;
    impactPercentage: number;
    description: string;
    currentValue: string;
    baselineThreshold: string;
  }[];
  recommendedActions: string[];
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  type: 'Underpass' | 'Bridge' | 'Hospital' | 'Metro Station' | 'Power Substation' | 'Highway Corridor' | 'School';
  zoneId: string;
  coordinates: [number, number];
  elevationMeters: number;
  vulnerabilityScore: number; // 0 - 100
  riskLevel: RiskLevel;
  floodThresholdCm: number;
  status: 'Operational' | 'High Watch' | 'Impassable' | 'Evacuating';
  consequenceSummary: string;
  mitigationRequirement: string;
  contactAgency: string;
}

export interface FloodAlert {
  id: string;
  title: string;
  zoneId: string;
  zoneName: string;
  severity: RiskLevel;
  triggerCondition: string;
  estimatedAffectedAreaSqKm: number;
  estimatedPeopleExposed: number;
  recommendedResponse: string;
  timestamp: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  acknowledgedBy?: string;
  channels: {
    inApp: boolean;
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
    capWebhook: boolean;
  };
}

export interface EmergencyIncident {
  id: string;
  incidentCode: string;
  title: string;
  zoneId: string;
  zoneName: string;
  locationDescription: string;
  coordinates: [number, number];
  priority: IncidentPriority;
  status: IncidentStatus;
  detectedAt: string;
  waterDepthCm: number;
  strandedVehiclesCount: number;
  assignedTeam?: {
    teamName: string;
    leadOfficer: string;
    contactNumber: string;
    vehiclesDispatched: string[];
    etaMinutes: number;
  };
  resourcesDeployed: string[];
  actionLog: {
    timestamp: string;
    officer: string;
    action: string;
  }[];
}

export interface HistoricalFloodRecord {
  id: string;
  year: number;
  date: string;
  zoneName: string;
  peakRainfallMm24h: number;
  peakWaterDepthMeters: number;
  durationHours: number;
  economicDamageEstCr: number;
  primaryCause: string;
  drainageRemediationStatus: 'Pending' | 'Completed' | 'Under Execution';
}

export interface HydrologicalSimulationParams {
  rainfallIntensityMmHr: number;
  durationHours: number;
  drainageEfficiencyPercent: number;
  soilSaturationIndexPercent: number;
  stormwaterGateBlockagePercent: number;
  upstreamInflowCumecs: number;
  scenarioPreset: 'Normal Monsoon' | 'Heavy Downpour' | 'Cloudburst Emergency' | 'Drainage Failure' | 'Combined Catastrophic';
}
