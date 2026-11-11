import { City, DrainageSensor, InfrastructureAsset, FloodAlert, EmergencyIncident, HistoricalFloodRecord } from '../types';

export const CITIES_DATA: City[] = [
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR Metropolitan',
    state: 'National Capital Region',
    country: 'India',
    coordinates: [28.6139, 77.2090],
    zoom: 12,
    totalZones: 6,
    totalSensors: 42,
    currentRainfallIntensity: 48.5,
    floodRiskIndex: 78,
    infrastructureVulnerabilityScore: 74,
    activeAlertsCount: 4,
    criticalDrainageFailures: 3,
    zones: [
      {
        id: 'delhi-yamuna-basin',
        name: 'Yamuna Floodplain & Ring Road',
        cityId: 'delhi-ncr',
        center: [28.6328, 77.2485],
        coordinates: [
          [28.6550, 77.2400],
          [28.6500, 77.2650],
          [28.6150, 77.2600],
          [28.6000, 77.2500],
          [28.6100, 77.2350],
          [28.6350, 77.2380]
        ],
        elevationMeters: 206,
        slopePercentage: 0.8,
        imperviousSurfaceRatio: 0.72,
        drainageDensityKmPerSqKm: 1.4,
        soilAbsorptionType: 'Alluvial Loam',
        populationDensity: 18500,
        currentRainfallMmHr: 54.0,
        predictedAccumulationCm: 68.5,
        currentRisk: 'CRITICAL',
        riskProbability: 92,
        sensorsCount: 9,
        activeIncidentsCount: 2,
        keyInfrastructure: ['Ring Road Expressway', 'ITO Barrage Sluice', 'Old Yamuna Iron Bridge', 'IP Power Grid Substation']
      },
      {
        id: 'delhi-ito-central',
        name: 'ITO & Supreme Court Corridor',
        cityId: 'delhi-ncr',
        center: [28.6289, 77.2405],
        coordinates: [
          [28.6350, 77.2300],
          [28.6360, 77.2460],
          [28.6200, 77.2480],
          [28.6180, 77.2320]
        ],
        elevationMeters: 211,
        slopePercentage: 1.2,
        imperviousSurfaceRatio: 0.88,
        drainageDensityKmPerSqKm: 2.1,
        soilAbsorptionType: 'Urban Fill',
        populationDensity: 14200,
        currentRainfallMmHr: 48.0,
        predictedAccumulationCm: 52.0,
        currentRisk: 'SEVERE',
        riskProbability: 84,
        sensorsCount: 7,
        activeIncidentsCount: 1,
        keyInfrastructure: ['ITO Metro Station Gate 4', 'Vikas Marg Underpass', 'PWD Pump Station 2']
      },
      {
        id: 'delhi-minto-cp',
        name: 'Minto Bridge & Connaught Place Central',
        cityId: 'delhi-ncr',
        center: [28.6358, 77.2245],
        coordinates: [
          [28.6430, 77.2150],
          [28.6440, 77.2330],
          [28.6280, 77.2340],
          [28.6270, 77.2140]
        ],
        elevationMeters: 214,
        slopePercentage: 3.5, // Steep bowl depression at railway underpass
        imperviousSurfaceRatio: 0.94,
        drainageDensityKmPerSqKm: 2.8,
        soilAbsorptionType: 'Urban Fill',
        populationDensity: 22000,
        currentRainfallMmHr: 44.0,
        predictedAccumulationCm: 85.0, // High depression water accumulation
        currentRisk: 'CRITICAL',
        riskProbability: 95,
        sensorsCount: 6,
        activeIncidentsCount: 2,
        keyInfrastructure: ['Minto Railway Underpass', 'NDMC Sump Well 1', 'Barakhamba Road Corridor']
      },
      {
        id: 'delhi-barapullah',
        name: 'Barapullah & South Ext Drain Catchment',
        cityId: 'delhi-ncr',
        center: [28.5820, 77.2420],
        coordinates: [
          [28.5950, 77.2200],
          [28.5980, 77.2550],
          [28.5650, 77.2580],
          [28.5620, 77.2250]
        ],
        elevationMeters: 216,
        slopePercentage: 1.5,
        imperviousSurfaceRatio: 0.81,
        drainageDensityKmPerSqKm: 3.2,
        soilAbsorptionType: 'Clay Silt',
        populationDensity: 19800,
        currentRainfallMmHr: 39.0,
        predictedAccumulationCm: 34.0,
        currentRisk: 'HIGH',
        riskProbability: 71,
        sensorsCount: 8,
        activeIncidentsCount: 1,
        keyInfrastructure: ['Barapullah Elevated Corridor', 'AIIMS Trauma Center Road', 'JLN Stadium Subway']
      },
      {
        id: 'delhi-najafgarh',
        name: 'Najafgarh Basin & Dwarka Sub-City',
        cityId: 'delhi-ncr',
        center: [28.5921, 77.0460],
        coordinates: [
          [28.6200, 77.0100],
          [28.6250, 77.0800],
          [28.5600, 77.0850],
          [28.5550, 77.0150]
        ],
        elevationMeters: 219,
        slopePercentage: 0.6,
        imperviousSurfaceRatio: 0.64,
        drainageDensityKmPerSqKm: 1.1,
        soilAbsorptionType: 'Sandy Loam',
        populationDensity: 12500,
        currentRainfallMmHr: 28.0,
        predictedAccumulationCm: 18.0,
        currentRisk: 'MODERATE',
        riskProbability: 46,
        sensorsCount: 7,
        activeIncidentsCount: 0,
        keyInfrastructure: ['Dwarka Sector 21 Inter-Modal Terminal', 'Najafgarh Trunk Drain Siphon']
      },
      {
        id: 'delhi-ncr-cybercity',
        name: 'Gurugram NH-48 & CyberHub Corridor',
        cityId: 'delhi-ncr',
        center: [28.4900, 77.0900],
        coordinates: [
          [28.5150, 77.0700],
          [28.5180, 77.1100],
          [28.4650, 77.1150],
          [28.4600, 77.0750]
        ],
        elevationMeters: 228,
        slopePercentage: 1.1,
        imperviousSurfaceRatio: 0.91,
        drainageDensityKmPerSqKm: 1.8,
        soilAbsorptionType: 'Sandy Loam',
        populationDensity: 16400,
        currentRainfallMmHr: 52.0,
        predictedAccumulationCm: 58.0,
        currentRisk: 'SEVERE',
        riskProbability: 86,
        sensorsCount: 5,
        activeIncidentsCount: 1,
        keyInfrastructure: ['NH-48 Hero Honda Chowk Underpass', 'Subhash Chowk Culvert', 'Cyber City Rapid Metro']
      }
    ]
  },
  {
    id: 'mumbai-mmr',
    name: 'Mumbai Metropolitan Region',
    state: 'Maharashtra',
    country: 'India',
    coordinates: [19.0760, 72.8777],
    zoom: 12,
    totalZones: 5,
    totalSensors: 38,
    currentRainfallIntensity: 72.0,
    floodRiskIndex: 88,
    infrastructureVulnerabilityScore: 82,
    activeAlertsCount: 6,
    criticalDrainageFailures: 4,
    zones: [
      {
        id: 'mumbai-mithi-river',
        name: 'Mithi River & BKC Basin',
        cityId: 'mumbai-mmr',
        center: [19.0650, 72.8680],
        coordinates: [
          [19.0900, 72.8500],
          [19.0950, 72.8850],
          [19.0400, 72.8800],
          [19.0350, 72.8550]
        ],
        elevationMeters: 7,
        slopePercentage: 0.3,
        imperviousSurfaceRatio: 0.89,
        drainageDensityKmPerSqKm: 2.9,
        soilAbsorptionType: 'Clay Silt',
        populationDensity: 28000,
        currentRainfallMmHr: 84.0,
        predictedAccumulationCm: 110.0,
        currentRisk: 'CRITICAL',
        riskProbability: 97,
        sensorsCount: 10,
        activeIncidentsCount: 3,
        keyInfrastructure: ['Bandra-Kurla Complex Financial Hub', 'Mithi River Outfall Sluice', 'Kurla Western Railway Tracks']
      },
      {
        id: 'mumbai-hindmata',
        name: 'Hindmata & Dadar TT Low-Lying Bowl',
        cityId: 'mumbai-mmr',
        center: [19.0180, 72.8430],
        coordinates: [
          [19.0300, 72.8350],
          [19.0320, 72.8550],
          [19.0050, 72.8500],
          [19.0020, 72.8330]
        ],
        elevationMeters: 4,
        slopePercentage: 0.2,
        imperviousSurfaceRatio: 0.96,
        drainageDensityKmPerSqKm: 3.4,
        soilAbsorptionType: 'Urban Fill',
        populationDensity: 34000,
        currentRainfallMmHr: 76.0,
        predictedAccumulationCm: 92.0,
        currentRisk: 'CRITICAL',
        riskProbability: 94,
        sensorsCount: 8,
        activeIncidentsCount: 2,
        keyInfrastructure: ['Hindmata Underground Holding Tanks', 'Dr. B.A. Ambedkar Road Flyover', 'KEM Hospital Emergency Road']
      },
      {
        id: 'mumbai-milan-subway',
        name: 'Milan Subway & Santacruz Western Hub',
        cityId: 'mumbai-mmr',
        center: [19.0830, 72.8420],
        coordinates: [
          [19.0950, 72.8300],
          [19.0960, 72.8550],
          [19.0700, 72.8520],
          [19.0680, 72.8320]
        ],
        elevationMeters: 6,
        slopePercentage: 2.1,
        imperviousSurfaceRatio: 0.92,
        drainageDensityKmPerSqKm: 2.2,
        soilAbsorptionType: 'Urban Fill',
        populationDensity: 26000,
        currentRainfallMmHr: 68.0,
        predictedAccumulationCm: 80.0,
        currentRisk: 'SEVERE',
        riskProbability: 89,
        sensorsCount: 6,
        activeIncidentsCount: 1,
        keyInfrastructure: ['Milan Subway Vehicular Underpass', 'Western Railway High Tide Pumping Point']
      },
      {
        id: 'mumbai-andheri-subway',
        name: 'Andheri Subway & SV Road Catchment',
        cityId: 'mumbai-mmr',
        center: [19.1190, 72.8460],
        coordinates: [
          [19.1350, 72.8350],
          [19.1360, 72.8600],
          [19.1050, 72.8600],
          [19.1020, 72.8350]
        ],
        elevationMeters: 8,
        slopePercentage: 1.8,
        imperviousSurfaceRatio: 0.93,
        drainageDensityKmPerSqKm: 2.5,
        soilAbsorptionType: 'Clay Silt',
        populationDensity: 31000,
        currentRainfallMmHr: 72.0,
        predictedAccumulationCm: 88.0,
        currentRisk: 'CRITICAL',
        riskProbability: 93,
        sensorsCount: 7,
        activeIncidentsCount: 2,
        keyInfrastructure: ['Andheri Subway Railway Underpass', 'Gokhale Bridge Approach', 'Andheri Metro Line 1']
      },
      {
        id: 'mumbai-colaba-harbour',
        name: 'South Mumbai Marine & Fort Coastal',
        cityId: 'mumbai-mmr',
        center: [18.9220, 72.8340],
        coordinates: [
          [18.9450, 72.8250],
          [18.9480, 72.8450],
          [18.9050, 72.8350],
          [18.9020, 72.8180]
        ],
        elevationMeters: 9,
        slopePercentage: 0.5,
        imperviousSurfaceRatio: 0.85,
        drainageDensityKmPerSqKm: 3.1,
        soilAbsorptionType: 'Urban Fill',
        populationDensity: 19500,
        currentRainfallMmHr: 45.0,
        predictedAccumulationCm: 22.0,
        currentRisk: 'MODERATE',
        riskProbability: 51,
        sensorsCount: 7,
        activeIncidentsCount: 0,
        keyInfrastructure: ['Naval Dockyard Outfall', 'Gateway Marine Embankment']
      }
    ]
  },
  {
    id: 'bengaluru-blrup',
    name: 'Bengaluru Silicon Corridor & Lakes',
    state: 'Karnataka',
    country: 'India',
    coordinates: [12.9716, 77.5946],
    zoom: 12,
    totalZones: 4,
    totalSensors: 32,
    currentRainfallIntensity: 36.0,
    floodRiskIndex: 65,
    infrastructureVulnerabilityScore: 68,
    activeAlertsCount: 3,
    criticalDrainageFailures: 2,
    zones: [
      {
        id: 'blr-bellandur-basin',
        name: 'Bellandur & Varthur Lake Catchment',
        cityId: 'bengaluru-blrup',
        center: [12.9360, 77.6740],
        coordinates: [
          [12.9600, 77.6400],
          [12.9650, 77.7100],
          [12.9100, 77.7150],
          [12.9050, 77.6500]
        ],
        elevationMeters: 890,
        slopePercentage: 1.4,
        imperviousSurfaceRatio: 0.86,
        drainageDensityKmPerSqKm: 1.7,
        soilAbsorptionType: 'Clay Silt',
        populationDensity: 15400,
        currentRainfallMmHr: 44.0,
        predictedAccumulationCm: 56.0,
        currentRisk: 'SEVERE',
        riskProbability: 82,
        sensorsCount: 9,
        activeIncidentsCount: 2,
        keyInfrastructure: ['EcoSpace Tech Park Entry', 'Bellandur Sluice Channel', 'Outer Ring Road Arterial']
      },
      {
        id: 'blr-silkboard',
        name: 'Central Silk Board & Hosur Junction',
        cityId: 'bengaluru-blrup',
        center: [12.9176, 77.6238],
        coordinates: [
          [12.9300, 77.6100],
          [12.9320, 77.6400],
          [12.9020, 77.6380],
          [12.9000, 77.6120]
        ],
        elevationMeters: 902,
        slopePercentage: 2.2,
        imperviousSurfaceRatio: 0.95,
        drainageDensityKmPerSqKm: 2.1,
        soilAbsorptionType: 'Urban Fill',
        populationDensity: 23000,
        currentRainfallMmHr: 38.0,
        predictedAccumulationCm: 48.0,
        currentRisk: 'HIGH',
        riskProbability: 76,
        sensorsCount: 8,
        activeIncidentsCount: 1,
        keyInfrastructure: ['Silk Board Metro Interchange', 'Madiwala Lake Overflow Canal']
      },
      {
        id: 'blr-koramangala-valley',
        name: 'Koramangala Valley & Sony World',
        cityId: 'bengaluru-blrup',
        center: [12.9352, 77.6245],
        coordinates: [
          [12.9500, 77.6150],
          [12.9520, 77.6400],
          [12.9250, 77.6420],
          [12.9220, 77.6180]
        ],
        elevationMeters: 898,
        slopePercentage: 1.6,
        imperviousSurfaceRatio: 0.88,
        drainageDensityKmPerSqKm: 2.6,
        soilAbsorptionType: 'Clay Silt',
        populationDensity: 21000,
        currentRainfallMmHr: 35.0,
        predictedAccumulationCm: 38.0,
        currentRisk: 'MODERATE',
        riskProbability: 62,
        sensorsCount: 8,
        activeIncidentsCount: 0,
        keyInfrastructure: ['Koramangala SWD Primary Drain', 'Intermediate Ring Road Flyover']
      },
      {
        id: 'blr-hebbal',
        name: 'Hebbal Valley & Manyata Tech Park',
        cityId: 'bengaluru-blrup',
        center: [13.0358, 77.5970],
        coordinates: [
          [13.0600, 77.5800],
          [13.0650, 77.6250],
          [13.0150, 77.6200],
          [13.0100, 77.5850]
        ],
        elevationMeters: 915,
        slopePercentage: 1.2,
        imperviousSurfaceRatio: 0.79,
        drainageDensityKmPerSqKm: 1.9,
        soilAbsorptionType: 'Sandy Loam',
        populationDensity: 14000,
        currentRainfallMmHr: 22.0,
        predictedAccumulationCm: 14.0,
        currentRisk: 'LOW',
        riskProbability: 28,
        sensorsCount: 7,
        activeIncidentsCount: 0,
        keyInfrastructure: ['Hebbal Flyover Grade Separator', 'Nagawara Lake Catchment Outlet']
      }
    ]
  }
];

export const INITIAL_SENSORS: DrainageSensor[] = [
  {
    id: 'sensor-dl-01',
    sensorCode: 'FG-DEL-YM01',
    name: 'Yamuna Floodplain Sluice Gate #3',
    zoneId: 'delhi-yamuna-basin',
    locationName: 'Old Railway Iron Bridge, Geeta Colony Outfall',
    coordinates: [28.6492, 77.2510],
    status: 'CRITICAL',
    waterLevelMeters: 4.85,
    maxCulvertDepthMeters: 5.20,
    fillPercentage: 93.2,
    flowVelocityMs: 3.4,
    dischargeRateCumecs: 48.6,
    blockagePercentage: 68.0,
    siltationEstimateCm: 45,
    batteryPercentage: 88,
    signalDbm: -68,
    protocol: 'Cellular NB-IoT',
    lastCommunication: '2 mins ago',
    firmwareVersion: 'v3.4.1-rc2',
    recentReadings: [
      { timestamp: '13:00', waterLevel: 3.2, flowVelocity: 2.1, dischargeRate: 28.5 },
      { timestamp: '13:30', waterLevel: 3.6, flowVelocity: 2.4, dischargeRate: 34.0 },
      { timestamp: '14:00', waterLevel: 4.1, flowVelocity: 2.8, dischargeRate: 40.2 },
      { timestamp: '14:30', waterLevel: 4.5, flowVelocity: 3.1, dischargeRate: 44.9 },
      { timestamp: '15:00', waterLevel: 4.85, flowVelocity: 3.4, dischargeRate: 48.6 }
    ],
    maintenanceHistory: [
      { date: '2026-09-12', type: 'Silt Clearance', technician: 'R. K. Sharma (PWD)', notes: 'Dredged 12 tons of silt and plastic blockage.' },
      { date: '2026-06-20', type: 'Ultrasonic Transducer Calibration', technician: 'A. Verma (IoT Ops)', notes: 'Zero point reset and firmware flashed.' }
    ]
  },
  {
    id: 'sensor-dl-02',
    sensorCode: 'FG-DEL-MB02',
    name: 'Minto Road Culvert Inflow Mon-1',
    zoneId: 'delhi-minto-cp',
    locationName: 'Minto Railway Underpass Sump Inlet',
    coordinates: [28.6360, 77.2250],
    status: 'CRITICAL',
    waterLevelMeters: 2.35,
    maxCulvertDepthMeters: 2.50,
    fillPercentage: 94.0,
    flowVelocityMs: 1.1,
    dischargeRateCumecs: 14.2,
    blockagePercentage: 78.5,
    siltationEstimateCm: 60,
    batteryPercentage: 92,
    signalDbm: -72,
    protocol: 'MQTT',
    lastCommunication: '1 min ago',
    firmwareVersion: 'v3.4.1-rc2',
    recentReadings: [
      { timestamp: '13:00', waterLevel: 0.8, flowVelocity: 0.9, dischargeRate: 5.2 },
      { timestamp: '13:30', waterLevel: 1.2, flowVelocity: 1.0, dischargeRate: 7.8 },
      { timestamp: '14:00', waterLevel: 1.7, flowVelocity: 1.1, dischargeRate: 10.4 },
      { timestamp: '14:30', waterLevel: 2.1, flowVelocity: 1.1, dischargeRate: 12.9 },
      { timestamp: '15:00', waterLevel: 2.35, flowVelocity: 1.1, dischargeRate: 14.2 }
    ],
    maintenanceHistory: [
      { date: '2026-10-04', type: 'High-Flow Pump Test', technician: 'M. Hussain (NDMC)', notes: 'Automatic float switch inspected; backup generator operational.' }
    ]
  },
  {
    id: 'sensor-dl-03',
    sensorCode: 'FG-DEL-ITO03',
    name: 'ITO Vikas Marg Storm Drainage Ch-A',
    zoneId: 'delhi-ito-central',
    locationName: 'ITO Junction Metro Gate 4 Culvert',
    coordinates: [28.6295, 77.2412],
    status: 'WARNING',
    waterLevelMeters: 2.10,
    maxCulvertDepthMeters: 2.80,
    fillPercentage: 75.0,
    flowVelocityMs: 2.2,
    dischargeRateCumecs: 22.4,
    blockagePercentage: 38.0,
    siltationEstimateCm: 25,
    batteryPercentage: 79,
    signalDbm: -65,
    protocol: 'Cellular NB-IoT',
    lastCommunication: '3 mins ago',
    firmwareVersion: 'v3.3.9',
    recentReadings: [
      { timestamp: '13:00', waterLevel: 1.1, flowVelocity: 1.6, dischargeRate: 12.0 },
      { timestamp: '13:30', waterLevel: 1.4, flowVelocity: 1.8, dischargeRate: 15.5 },
      { timestamp: '14:00', waterLevel: 1.8, flowVelocity: 2.0, dischargeRate: 19.2 },
      { timestamp: '14:30', waterLevel: 2.0, flowVelocity: 2.1, dischargeRate: 21.0 },
      { timestamp: '15:00', waterLevel: 2.1, flowVelocity: 2.2, dischargeRate: 22.4 }
    ],
    maintenanceHistory: [
      { date: '2026-08-18', type: 'Routine Inspection', technician: 'P. Nair (PWD)', notes: 'Sensor cleaned, free of debris.' }
    ]
  },
  {
    id: 'sensor-dl-04',
    sensorCode: 'FG-DEL-BP04',
    name: 'Barapullah Outfall Drain Stn-7',
    zoneId: 'delhi-barapullah',
    locationName: 'Sarai Kale Khan Outfall to River Basin',
    coordinates: [28.5860, 77.2510],
    status: 'WARNING',
    waterLevelMeters: 3.10,
    maxCulvertDepthMeters: 4.50,
    fillPercentage: 68.9,
    flowVelocityMs: 2.8,
    dischargeRateCumecs: 38.5,
    blockagePercentage: 42.0,
    siltationEstimateCm: 32,
    batteryPercentage: 95,
    signalDbm: -70,
    protocol: 'LoRaWAN',
    lastCommunication: 'Just now',
    firmwareVersion: 'v3.4.1-rc2',
    recentReadings: [
      { timestamp: '13:00', waterLevel: 2.0, flowVelocity: 2.2, dischargeRate: 25.0 },
      { timestamp: '13:30', waterLevel: 2.4, flowVelocity: 2.4, dischargeRate: 29.5 },
      { timestamp: '14:00', waterLevel: 2.7, flowVelocity: 2.6, dischargeRate: 33.8 },
      { timestamp: '14:30', waterLevel: 2.9, flowVelocity: 2.7, dischargeRate: 36.2 },
      { timestamp: '15:00', waterLevel: 3.1, flowVelocity: 2.8, dischargeRate: 38.5 }
    ],
    maintenanceHistory: [
      { date: '2026-07-22', type: 'Desilting', technician: 'T. Joshi (DDA)', notes: 'Excavator cleared downstream hyacinth buildup.' }
    ]
  },
  {
    id: 'sensor-dl-05',
    sensorCode: 'FG-DEL-GG05',
    name: 'NH-48 Hero Honda Sump Telemetry',
    zoneId: 'delhi-ncr-cybercity',
    locationName: 'Gurugram Expressway km-37 Underpass Sump',
    coordinates: [28.4820, 77.0810],
    status: 'CRITICAL',
    waterLevelMeters: 2.65,
    maxCulvertDepthMeters: 3.00,
    fillPercentage: 88.3,
    flowVelocityMs: 1.4,
    dischargeRateCumecs: 16.5,
    blockagePercentage: 62.0,
    siltationEstimateCm: 48,
    batteryPercentage: 84,
    signalDbm: -74,
    protocol: 'MQTT',
    lastCommunication: '4 mins ago',
    firmwareVersion: 'v3.4.0',
    recentReadings: [
      { timestamp: '13:00', waterLevel: 1.2, flowVelocity: 1.0, dischargeRate: 8.5 },
      { timestamp: '13:30', waterLevel: 1.6, flowVelocity: 1.2, dischargeRate: 11.0 },
      { timestamp: '14:00', waterLevel: 2.0, flowVelocity: 1.3, dischargeRate: 13.5 },
      { timestamp: '14:30', waterLevel: 2.4, flowVelocity: 1.4, dischargeRate: 15.2 },
      { timestamp: '15:00', waterLevel: 2.65, flowVelocity: 1.4, dischargeRate: 16.5 }
    ],
    maintenanceHistory: [
      { date: '2026-09-30', type: 'Pump Station Overhaul', technician: 'GMDA Hydro Team', notes: 'Diesel backup pump #2 primer replaced.' }
    ]
  },
  {
    id: 'sensor-dl-06',
    sensorCode: 'FG-DEL-NJ06',
    name: 'Najafgarh Trunk Drain Inflow Mon-4',
    zoneId: 'delhi-najafgarh',
    locationName: 'Kakrola Regulator Outfall Structure',
    coordinates: [28.6010, 77.0390],
    status: 'ONLINE',
    waterLevelMeters: 1.95,
    maxCulvertDepthMeters: 4.00,
    fillPercentage: 48.7,
    flowVelocityMs: 1.8,
    dischargeRateCumecs: 24.0,
    blockagePercentage: 18.0,
    siltationEstimateCm: 15,
    batteryPercentage: 98,
    signalDbm: -60,
    protocol: 'Cellular NB-IoT',
    lastCommunication: '1 min ago',
    firmwareVersion: 'v3.4.1-rc2',
    recentReadings: [
      { timestamp: '13:00', waterLevel: 1.4, flowVelocity: 1.5, dischargeRate: 18.0 },
      { timestamp: '13:30', waterLevel: 1.55, flowVelocity: 1.6, dischargeRate: 19.5 },
      { timestamp: '14:00', waterLevel: 1.7, flowVelocity: 1.7, dischargeRate: 21.0 },
      { timestamp: '14:30', waterLevel: 1.85, flowVelocity: 1.75, dischargeRate: 22.8 },
      { timestamp: '15:00', waterLevel: 1.95, flowVelocity: 1.8, dischargeRate: 24.0 }
    ],
    maintenanceHistory: [
      { date: '2026-08-05', type: 'Telemetry Inspection', technician: 'Delhi I&FC Dept', notes: 'All channels nominal.' }
    ]
  }
];

export const INITIAL_INFRASTRUCTURE: InfrastructureAsset[] = [
  {
    id: 'infra-01',
    name: 'Minto Railway Underpass',
    type: 'Underpass',
    zoneId: 'delhi-minto-cp',
    coordinates: [28.6360, 77.2250],
    elevationMeters: 209,
    vulnerabilityScore: 96,
    riskLevel: 'CRITICAL',
    floodThresholdCm: 30,
    status: 'Impassable',
    consequenceSummary: 'Vital artery connecting Connaught Place to New Delhi Railway Station; deep bowl topology creates life-threatening submersion within 25 minutes of 40mm/h rainfall.',
    mitigationRequirement: 'Deploy high-volume dewatering truck (150 HP) immediately; trigger automatic traffic diversion gates.',
    contactAgency: 'Delhi Traffic Police & NDMC Drainage Control'
  },
  {
    id: 'infra-02',
    name: 'Ring Road Yamuna Embankment Bypass (ISBT Kashmere Gate)',
    type: 'Highway Corridor',
    zoneId: 'delhi-yamuna-basin',
    coordinates: [28.6650, 77.2310],
    elevationMeters: 207,
    vulnerabilityScore: 92,
    riskLevel: 'CRITICAL',
    floodThresholdCm: 45,
    status: 'High Watch',
    consequenceSummary: 'Inter-state bus terminal approach; Yamuna water level at 205.8m approaches danger mark 205.33m, risking backflow inundation of north carriageway.',
    mitigationRequirement: 'Activate reverse sluice flood gates at drain #12; install sandbag barricading on ramp.',
    contactAgency: 'PWD North Zone & Irrigation Dept'
  },
  {
    id: 'infra-03',
    name: 'ITO Metro Station & Vikas Marg Junction',
    type: 'Metro Station',
    zoneId: 'delhi-ito-central',
    coordinates: [28.6292, 77.2408],
    elevationMeters: 211,
    vulnerabilityScore: 84,
    riskLevel: 'SEVERE',
    floodThresholdCm: 25,
    status: 'High Watch',
    consequenceSummary: 'Gate #4 escalator subway vulnerable to storm runoff heading towards drain #12 overflow.',
    mitigationRequirement: 'Deploy perimeter flood barriers; standby suction pump at subterranean concourse.',
    contactAgency: 'DMRC Station Operations & NDMC'
  },
  {
    id: 'infra-04',
    name: 'Lok Nayak Hospital (LNJP) Emergency Gate',
    type: 'Hospital',
    zoneId: 'delhi-ito-central',
    coordinates: [28.6380, 77.2380],
    elevationMeters: 213,
    vulnerabilityScore: 78,
    riskLevel: 'HIGH',
    floodThresholdCm: 20,
    status: 'Operational',
    consequenceSummary: 'Critical tertiary trauma center; ambulance ingress route prone to waterlogging if PWD drainage channel gets choked.',
    mitigationRequirement: 'Clear trash grates every 30 minutes; keep secondary gate open on Asaf Ali Road.',
    contactAgency: 'Medical Superintendent & PWD Central'
  },
  {
    id: 'infra-05',
    name: 'NH-48 Hero Honda Chowk Underpass',
    type: 'Underpass',
    zoneId: 'delhi-ncr-cybercity',
    coordinates: [28.4820, 77.0810],
    elevationMeters: 226,
    vulnerabilityScore: 89,
    riskLevel: 'SEVERE',
    floodThresholdCm: 35,
    status: 'High Watch',
    consequenceSummary: 'Major national economic highway linking Delhi, Gurugram, and Jaipur; history of gridlock and vehicle drowning during monsoon cloudbursts.',
    mitigationRequirement: 'Force-start pumps 1, 2, and 3; dispatch GMDA rapid response vehicle with mobile winch.',
    contactAgency: 'GMDA Drainage Control & Gurugram Traffic Police'
  },
  {
    id: 'infra-06',
    name: 'IP Power Grid 220kV Substation',
    type: 'Power Substation',
    zoneId: 'delhi-yamuna-basin',
    coordinates: [28.6240, 77.2470],
    elevationMeters: 208,
    vulnerabilityScore: 91,
    riskLevel: 'CRITICAL',
    floodThresholdCm: 40,
    status: 'High Watch',
    consequenceSummary: 'Supplies power to Central Delhi and Government Secretariat; water ingress inside switchyard could force emergency blackout.',
    mitigationRequirement: 'Erect steel flood barriers; run 4 high-capacity submersible pumps continuously.',
    contactAgency: 'Delhi Transco Ltd (DTL) Load Dispatch'
  }
];

export const INITIAL_ALERTS: FloodAlert[] = [
  {
    id: 'ALT-DEL-0941',
    title: 'Flash Inundation Warning: Minto Road Underpass Impassable',
    zoneId: 'delhi-minto-cp',
    zoneName: 'Minto Bridge & Connaught Place Central',
    severity: 'CRITICAL',
    triggerCondition: 'Sensor FG-DEL-MB02 water level surpassed 2.30m (94% capacity) with intense rainfall (>45mm/h).',
    estimatedAffectedAreaSqKm: 1.8,
    estimatedPeopleExposed: 45000,
    recommendedResponse: 'Close Minto Road underpass to all vehicular and pedestrian traffic immediately. Divert traffic to Barakhamba and Connaught Circus. Deploy Mobile Pump Unit MP-04.',
    timestamp: '14:48:12 Local',
    status: 'ACTIVE',
    channels: {
      inApp: true,
      sms: true,
      email: true,
      whatsapp: true,
      capWebhook: true
    }
  },
  {
    id: 'ALT-DEL-0940',
    title: 'Yamuna River Rising: Sluice Backflow Risk at Ring Road',
    zoneId: 'delhi-yamuna-basin',
    zoneName: 'Yamuna Floodplain & Ring Road',
    severity: 'CRITICAL',
    triggerCondition: 'Sensor FG-DEL-YM01 discharge rate dropped 35% due to river back-pressure; water level reached 4.85m.',
    estimatedAffectedAreaSqKm: 6.4,
    estimatedPeopleExposed: 110000,
    recommendedResponse: 'Inspect and drop regulator flood gates at Drain #12. Issue advisory to low-lying settlements near Monastery Market.',
    timestamp: '14:32:05 Local',
    status: 'ACTIVE',
    channels: {
      inApp: true,
      sms: true,
      email: true,
      whatsapp: true,
      capWebhook: true
    }
  },
  {
    id: 'ALT-DEL-0938',
    title: 'Culvert Blockage Surge: NH-48 Expressway km-37',
    zoneId: 'delhi-ncr-cybercity',
    zoneName: 'Gurugram NH-48 & CyberHub Corridor',
    severity: 'SEVERE',
    triggerCondition: 'Sensor FG-DEL-GG05 detected 62% debris blockage with continuous water accumulation of 2.65m.',
    estimatedAffectedAreaSqKm: 4.2,
    estimatedPeopleExposed: 85000,
    recommendedResponse: 'Dispatch GMDA emergency hydro-jetting squad to unblock trash screens. Activate overhead digital dynamic message signs on NH-48.',
    timestamp: '14:15:30 Local',
    status: 'ACTIVE',
    channels: {
      inApp: true,
      sms: true,
      email: false,
      whatsapp: true,
      capWebhook: true
    }
  },
  {
    id: 'ALT-DEL-0935',
    title: 'Vikas Marg Stormwater Overflow Watch',
    zoneId: 'delhi-ito-central',
    zoneName: 'ITO & Supreme Court Corridor',
    severity: 'HIGH',
    triggerCondition: 'Water level reached 75% capacity in ITO main drain channel.',
    estimatedAffectedAreaSqKm: 2.5,
    estimatedPeopleExposed: 60000,
    recommendedResponse: 'Activate standby diesel dewatering pumps at Vikas Marg junction; clear road surface storm gratings.',
    timestamp: '13:50:00 Local',
    status: 'ACKNOWLEDGED',
    acknowledgedBy: 'Col. Sanjeev Rawat (DDMA)',
    channels: {
      inApp: true,
      sms: false,
      email: true,
      whatsapp: false,
      capWebhook: false
    }
  }
];

export const INITIAL_INCIDENTS: EmergencyIncident[] = [
  {
    id: 'INC-2026-0881',
    incidentCode: 'INC-DEL-01',
    title: 'Minto Road Underpass Submersion & Stranded Transit Bus',
    zoneId: 'delhi-minto-cp',
    zoneName: 'Minto Bridge & Connaught Place Central',
    locationDescription: 'Railway underpass bowl connecting DDU Marg to CP Outer Circle',
    coordinates: [28.6360, 77.2250],
    priority: 'P1 - Critical',
    status: 'RESPONSE IN PROGRESS',
    detectedAt: '14:35:10 Local',
    waterDepthCm: 92,
    strandedVehiclesCount: 1,
    assignedTeam: {
      teamName: 'NDMC Quick Response Force Alpha',
      leadOfficer: 'Inspector Amit K. Malik',
      contactNumber: '+91 98110 44211',
      vehiclesDispatched: ['Heavy Towing Truck TT-01', 'High-Discharge Sump Pump P-12', 'Rescue Van R-03'],
      etaMinutes: 4
    },
    resourcesDeployed: ['150 HP Dewatering Pump Unit', 'Submersible Dredger', 'Police Traffic Diverter Barriers'],
    actionLog: [
      { timestamp: '14:35', officer: 'Automated IoT Trigger', action: 'Sensor FG-DEL-MB02 exceeded 2.2m threshold. Incident auto-created.' },
      { timestamp: '14:38', officer: 'Duty Officer S. Rawat', action: 'CCTV feed verified DTC bus stranded in 85cm water. Passengers safely evacuated to higher walkway.' },
      { timestamp: '14:41', officer: 'Traffic Control Room', action: 'Both approaches barricaded; diversions posted via Twitter/X & FM Radio.' },
      { timestamp: '14:46', officer: 'Inspector Amit K. Malik', action: 'Team Alpha arrived on site. High-discharge dewatering pump engaged.' }
    ]
  },
  {
    id: 'INC-2026-0882',
    incidentCode: 'INC-DEL-02',
    title: 'Ring Road Yamuna Embankment Seepage & Carriageway Inundation',
    zoneId: 'delhi-yamuna-basin',
    zoneName: 'Yamuna Floodplain & Ring Road',
    locationDescription: 'Ring Road near ISBT Kashmere Gate north carriageway',
    coordinates: [28.6650, 77.2310],
    priority: 'P1 - Critical',
    status: 'ASSIGNED',
    detectedAt: '14:42:00 Local',
    waterDepthCm: 48,
    strandedVehiclesCount: 3,
    assignedTeam: {
      teamName: 'Delhi PWD Flood Engineering Squad 4',
      leadOfficer: 'Executive Eng. Rajesh Goel',
      contactNumber: '+91 98711 55902',
      vehiclesDispatched: ['Sandbag Carrier Flatbed SB-09', 'Excavator EX-04', 'Dewatering Mobile Unit PU-08'],
      etaMinutes: 12
    },
    resourcesDeployed: ['Sandbag Wall Reinforcement (2,000 bags)', '100 HP Mobile Pump'],
    actionLog: [
      { timestamp: '14:42', officer: 'GIS Surveillance Sentinel', action: 'Flood probability model flagged 92% risk of road overflow.' },
      { timestamp: '14:45', officer: 'Chief Disaster Officer', action: 'Incident approved. Assigned PWD Squad 4 with 2,000 emergency sandbags.' }
    ]
  },
  {
    id: 'INC-2026-0883',
    incidentCode: 'INC-DEL-03',
    title: 'NH-48 Hero Honda Chowk Stormwater Sump Choke',
    zoneId: 'delhi-ncr-cybercity',
    zoneName: 'Gurugram NH-48 & CyberHub Corridor',
    locationDescription: 'NH-48 Underpass Sump km-37 westbound lane',
    coordinates: [28.4820, 77.0810],
    priority: 'P2 - High',
    status: 'VERIFIED',
    detectedAt: '14:46:15 Local',
    waterDepthCm: 38,
    strandedVehiclesCount: 0,
    resourcesDeployed: ['Hydro-Jetting Truck HJ-02'],
    actionLog: [
      { timestamp: '14:46', officer: 'Sensor FG-DEL-GG05', action: 'Water velocity dropped to 0.4 m/s while water level rose 40cm. Obstruction confirmed.' },
      { timestamp: '14:50', officer: 'GMDA Operations Hub', action: 'Telemetry confirmed 62% silt blockage. Alerting maintenance contractor.' }
    ]
  }
];

export const HISTORICAL_FLOODS: HistoricalFloodRecord[] = [
  {
    id: 'hist-2025-01',
    year: 2025,
    date: '2025-08-14',
    zoneName: 'Yamuna Floodplain & Ring Road',
    peakRainfallMm24h: 158.4,
    peakWaterDepthMeters: 2.1,
    durationHours: 38,
    economicDamageEstCr: 42.5,
    primaryCause: 'Upstream Hathnikund Barrage release combined with 150mm cloudburst and clogged drain outfalls.',
    drainageRemediationStatus: 'Completed'
  },
  {
    id: 'hist-2024-02',
    year: 2024,
    date: '2024-07-28',
    zoneName: 'Minto Bridge & Connaught Place Central',
    peakRainfallMm24h: 122.0,
    peakWaterDepthMeters: 2.4,
    durationHours: 14,
    economicDamageEstCr: 12.0,
    primaryCause: 'NDMC Sump pump power interruption coupled with plastic clogging in gravity fed culvert.',
    drainageRemediationStatus: 'Completed'
  },
  {
    id: 'hist-2023-03',
    year: 2023,
    date: '2023-07-13',
    zoneName: 'Yamuna Floodplain & Ring Road',
    peakRainfallMm24h: 224.5,
    peakWaterDepthMeters: 3.8,
    durationHours: 72,
    economicDamageEstCr: 185.0,
    primaryCause: 'Historic Yamuna level peak (208.66m), submerged Ring Road, ITO Barrage silt jamming 5 of 32 sluice gates.',
    drainageRemediationStatus: 'Completed'
  },
  {
    id: 'hist-2023-04',
    year: 2023,
    date: '2023-07-10',
    zoneName: 'Gurugram NH-48 & CyberHub Corridor',
    peakRainfallMm24h: 145.0,
    peakWaterDepthMeters: 1.6,
    durationHours: 24,
    economicDamageEstCr: 65.0,
    primaryCause: 'Badshahpur drain overflow into sub-drains; zero natural percolation in concrete business district.',
    drainageRemediationStatus: 'Under Execution'
  },
  {
    id: 'hist-2022-05',
    year: 2022,
    date: '2022-09-22',
    zoneName: 'ITO & Supreme Court Corridor',
    peakRainfallMm24h: 98.2,
    peakWaterDepthMeters: 0.9,
    durationHours: 8,
    economicDamageEstCr: 8.5,
    primaryCause: 'Backflow into storm drains due to elevated downstream canal stage.',
    drainageRemediationStatus: 'Completed'
  },
  {
    id: 'hist-2021-06',
    year: 2021,
    date: '2021-09-01',
    zoneName: 'Minto Bridge & Connaught Place Central',
    peakRainfallMm24h: 112.5,
    peakWaterDepthMeters: 1.8,
    durationHours: 12,
    economicDamageEstCr: 15.2,
    primaryCause: 'Flash runoff overwhelmed culverts; automatic sensors were absent.',
    drainageRemediationStatus: 'Completed'
  }
];
