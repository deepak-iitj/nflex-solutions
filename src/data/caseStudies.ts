import caseAutomotive from "@/assets/case-automotive.jpg";
import casePharma from "@/assets/case-pharma.jpg";
import caseSteel from "@/assets/case-steel.jpg";
import caseFood from "@/assets/case-food.jpg";
import caseWater from "@/assets/case-water.jpg";
import caseEnergy from "@/assets/case-energy.jpg";

export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  client: string;
  industry: string;
  year: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies?: string[];
  image: string;
  keyMetric: string;
  metricLabel: string;
  featured?: boolean;
}

export const industries = [
  "All",
  "Automotive",
  "Pharmaceuticals",
  "Metals & Steel",
  "Food & Beverage",
  "Water & Wastewater",
  "Energy / Utilities",
] as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: "automotive-assembly-plc-scada",
    title: "Automotive Assembly Line – PLC & SCADA Integration",
    excerpt: "Full PLC and SCADA integration for a tier-1 automotive supplier, reducing downtime by 40% and improving traceability.",
    client: "Confidential (Tier-1 Auto Supplier)",
    industry: "Automotive",
    year: "2024",
    challenge: "The client's existing assembly lines had fragmented control systems, leading to unplanned downtime, poor traceability, and difficulty in scaling production. Manual data collection was error-prone and delayed root-cause analysis.",
    solution: "NFlex Solutions designed and commissioned a unified control architecture using Siemens SIMATIC S7-1500 PLCs and WinCC SCADA. We integrated multiple workstations over PROFINET, implemented recipe management, and deployed real-time OEE dashboards with alarm rationalization.",
    results: [
      "40% reduction in unplanned downtime",
      "100% traceability per unit with barcode and production data logging",
      "Faster changeover with recipe-based parameter sets",
      "Real-time OEE and alarm management for maintenance teams",
    ],
    technologies: ["Siemens S7-1500", "WinCC SCADA", "PROFINET", "OEE Dashboard"],
    image: caseAutomotive,
    keyMetric: "↓ 40%",
    metricLabel: "Unplanned downtime",
    featured: true,
  },
  {
    slug: "pharma-clean-room-bms",
    title: "Pharma Clean Room – Building & Process Automation",
    excerpt: "BMS and process automation for a pharmaceutical clean room, ensuring GMP compliance and energy efficiency.",
    client: "Confidential (Pharma MNC)",
    industry: "Pharmaceuticals",
    year: "2023",
    challenge: "The facility required strict environmental control (temperature, humidity, pressure differentials) and full audit trails for regulatory compliance. Legacy systems could not provide centralized monitoring or meet updated GMP guidelines.",
    solution: "We implemented a building management system (BMS) with redundant controllers, integrated HVAC and pressure monitoring, and a validated data historian for audit trails. All critical parameters are alarmed and logged with user access control.",
    results: [
      "Continuous GMP-compliant environmental monitoring and reporting",
      "20% energy savings through optimized HVAC sequencing",
      "Centralized dashboards for facility and quality teams",
      "Validated 21 CFR Part 11–ready data logging",
    ],
    technologies: ["BMS", "HVAC Control", "Data Historian", "GMP Compliance"],
    image: casePharma,
    keyMetric: "↓ 20%",
    metricLabel: "Energy consumption",
  },
  {
    slug: "steel-plant-drives-power-distribution",
    title: "Steel Plant – Drives & Power Distribution Upgrade",
    excerpt: "Upgrade of drives and power distribution for a mid-size steel plant, improving reliability and power quality.",
    client: "Confidential (Steel Manufacturer)",
    industry: "Metals & Steel",
    year: "2023",
    challenge: "Aging drives and switchgear were causing production losses and safety concerns. The client needed a phased upgrade without long shutdowns and wanted better power monitoring for demand management.",
    solution: "We delivered a phased replacement of AC drives (ABB ACS880 series), upgraded LV switchgear with modern protection and metering, and installed power quality meters with Ethernet connectivity for central monitoring.",
    results: [
      "Zero unplanned shutdowns in the first 12 months post-commissioning",
      "Improved power factor and reduced penalties",
      "Real-time power and energy dashboards for operations",
      "Safer maintenance with modern protection and interlocks",
    ],
    technologies: ["ABB ACS880", "LV Switchgear", "Power Metering", "EtherNet/IP"],
    image: caseSteel,
    keyMetric: "0",
    metricLabel: "Unplanned shutdowns / 12 mo",
  },
  {
    slug: "food-beverage-packaging-line",
    title: "Food & Beverage – Packaging Line Automation",
    excerpt: "End-to-end automation of a packaging line with vision and safety systems for a F&B manufacturer.",
    client: "Confidential (F&B Manufacturer)",
    industry: "Food & Beverage",
    year: "2024",
    challenge: "Manual packing and inconsistent quality checks were limiting throughput. The client needed automated conveying, filling, capping, and inspection with safety guarding and CIP compatibility.",
    solution: "NFlex Solutions supplied and integrated PLC-based line control, variable-speed drives, safety light curtains and interlocks, and vision-based inspection. All equipment was selected for washdown environments and connected to a central HMI and SCADA.",
    results: [
      "2x throughput with same footprint",
      "Reject rate reduced by 60% with automated inspection",
      "Safety-compliant guarding with access control",
      "Recipe-driven changeover for multiple SKUs",
    ],
    technologies: ["Rockwell CompactLogix", "Safety Light Curtains", "Vision Inspection", "VFDs"],
    image: caseFood,
    keyMetric: "2×",
    metricLabel: "Throughput increase",
  },
  {
    slug: "water-treatment-scada-plc",
    title: "Water Treatment Plant – SCADA & PLC Modernization",
    excerpt: "SCADA and PLC modernization for a municipal water treatment plant, enabling remote monitoring and predictive maintenance.",
    client: "Confidential (Municipal Utility)",
    industry: "Water & Wastewater",
    year: "2023",
    challenge: "The plant operated on outdated PLCs with limited connectivity and no central SCADA. Operators relied on local panels and phone calls, and maintenance was reactive.",
    solution: "We modernized the control system with redundant PLCs (Schneider Modicon M580), a centralized SCADA with mimic screens and trending, and integration of flow, level, and quality sensors. Remote access was secured with VPN and role-based permissions.",
    results: [
      "24/7 remote monitoring and alarm notification",
      "Faster response to process deviations and equipment faults",
      "Historical data for trend analysis and predictive maintenance",
      "Compliance with municipal reporting requirements",
    ],
    technologies: ["Schneider Modicon M580", "SCADA", "Remote Access", "Data Logging"],
    image: caseWater,
    keyMetric: "24/7",
    metricLabel: "Remote monitoring",
  },
  {
    slug: "energy-substation-monitoring",
    title: "Utility Substation – Power Monitoring & SCADA",
    excerpt: "Substation automation and power quality monitoring for a regional energy utility, improving grid reliability.",
    client: "Confidential (Energy Utility)",
    industry: "Energy / Utilities",
    year: "2024",
    challenge: "An ageing 33/11 kV substation lacked centralized monitoring, leading to slow fault isolation, recurring penalties for poor power quality, and limited visibility for the grid operations team.",
    solution: "We deployed IEC 61850-based substation automation with numerical relays, power quality analyzers, and a SCADA gateway integrated to the utility's central control center. Event recording and disturbance capture were enabled across feeders.",
    results: [
      "60% faster fault isolation and restoration",
      "Power factor improved from 0.86 to 0.98",
      "IEC 61850 GOOSE-based protection coordination",
      "Centralized event and disturbance records for compliance",
    ],
    technologies: ["IEC 61850", "Numerical Relays", "Power Quality Analyzer", "SCADA Gateway"],
    image: caseEnergy,
    keyMetric: "↑ 0.98 PF",
    metricLabel: "Power factor",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getOtherCaseStudies(currentSlug: string, limit = 3): CaseStudy[] {
  return caseStudies.filter((c) => c.slug !== currentSlug).slice(0, limit);
}
