import re

with open('src/pages/Services.tsx', 'r') as f:
    content = f.read()

imports_to_add = """import imgDigitalTwin from "@/assets/verticals/digital_twin_sim.png";
import imgSpm from "@/assets/verticals/spm_machine.png";
import imgAiInspection from "@/assets/verticals/ai_inspection.png";
import imgPredictive from "@/assets/verticals/predictive_maintenance.png";
import imgSynthetic from "@/assets/verticals/synthetic_data.png";
import imgModel from "@/assets/verticals/model_training.png";
import imgMlops from "@/assets/verticals/mlops_dashboard.png";
import imgCloud from "@/assets/verticals/cloud_edge.png";
import imgFleet from "@/assets/verticals/fleet_control.png";
"""

content = content.replace('import ctaVideo from "@/assets/autonomous-electric-car-factory-with-robotic-arms-assembling-battery-modules.mp4";', 
                          'import ctaVideo from "@/assets/autonomous-electric-car-factory-with-robotic-arms-assembling-battery-modules.mp4";\n' + imports_to_add)

# Update array
replacements = [
    ("icon: MonitorPlay,", "icon: MonitorPlay,\n    image: imgDigitalTwin,"),
    ("icon: Bot,", "icon: Bot,\n    image: imgSpm,"),
    ("icon: ScanEye,", "icon: ScanEye,\n    image: imgAiInspection,"),
    ("icon: Activity,", "icon: Activity,\n    image: imgPredictive,"),
    ("icon: Database,", "icon: Database,\n    image: imgSynthetic,"),
    ("icon: BrainCircuit,", "icon: BrainCircuit,\n    image: imgModel,"),
    ("icon: Cpu,", "icon: Cpu,\n    image: imgMlops,"),
    ("icon: Cloud,", "icon: Cloud,\n    image: imgCloud,"),
    ("icon: Navigation,", "icon: Navigation,\n    image: imgFleet,")
]

for old, new in replacements:
    content = content.replace(old, new)

# Update JSX
old_jsx = """<div className="p-8 h-full rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <cap.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-card-foreground mb-4">
                    {cap.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {cap.description}
                  </p>
                </div>"""

new_jsx = """<div className="h-full rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-md hover:shadow-primary/5">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img src={cap.image} alt={cap.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-4 -mt-12 relative z-20 shadow-lg">
                      <cap.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {cap.description}
                    </p>
                  </div>
                </div>"""

content = content.replace(old_jsx, new_jsx)

with open('src/pages/Services.tsx', 'w') as f:
    f.write(content)

print("Updated Services.tsx")
