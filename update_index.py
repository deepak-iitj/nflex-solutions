import re

with open('src/pages/Index.tsx', 'r') as f:
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

content = content.replace('import originalHeroVideo from "@/assets/hero_video.mp4";', 
                          'import originalHeroVideo from "@/assets/hero_video.mp4";\n' + imports_to_add)

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
old_jsx = """<div className="group p-7 rounded-xl border border-border bg-card card-hover h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <s.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
                </div>"""

new_jsx = """<div className="h-full rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-md hover:shadow-primary/5">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-4 -mt-12 relative z-20 shadow-lg">
                      <s.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
                  </div>
                </div>"""

content = content.replace(old_jsx, new_jsx)

with open('src/pages/Index.tsx', 'w') as f:
    f.write(content)

print("Updated Index.tsx")
