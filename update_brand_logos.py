content = """/**
 * Brand logos from assets – imported so Vite bundles and hashes them.
 * Use getBrandLogo(brand) or brandLogoUrls for display; scale/crop via CSS (object-contain, aspect ratio).
 */
import siemens from "@/assets/siemens.png";
import abb from "@/assets/abb.png";
import schneider from "@/assets/schneider.png";
import rockwell from "@/assets/rockwell.png";
import mitsubishi from "@/assets/mitsubishi.png";
import honeywell from "@/assets/honeywell.png";
import kuebler from "@/assets/kuebler.svg";

export const brandLogoUrls: Record<string, string> = {
  Siemens: siemens,
  ABB: abb,
  Schneider: schneider,
  Rockwell: rockwell,
  Mitsubishi: mitsubishi,
  Honeywell: honeywell,
  KUEBLER: kuebler,
};

export function getBrandLogo(brand: string): string | undefined {
  return brandLogoUrls[brand];
}
"""

with open('src/data/brandLogos.ts', 'w') as f:
    f.write(content)

print("Updated brandLogos.ts")
