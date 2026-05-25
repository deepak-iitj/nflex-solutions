/**
 * Generates a dummy PDF datasheet. Run: node scripts/generate-dummy-datasheet.js
 */
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function main() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let y = 720;
  page.drawText("Product Datasheet", { x: 72, y, size: 18, font: bold });
  y -= 28;
  page.drawText("NFlex Solutions", { x: 72, y, size: 14, font });
  y -= 24;
  page.drawText("Industrial Automation & Electrical Solutions", { x: 72, y, size: 10, font });
  y -= 40;
  page.drawText("This is a placeholder datasheet. Replace with the actual product PDF in Admin.", { x: 72, y, size: 10, font });
  y -= 60;
  page.drawText("For each product, you can:", { x: 72, y, size: 10, font });
  y -= 20;
  page.drawText("• Add your PDF to public/datasheets/ and set Datasheet URL in Admin.", { x: 72, y, size: 10, font });
  y -= 20;
  page.drawText("• Or use \"Request Datasheet by Email\" if no file is linked.", { x: 72, y, size: 10, font });

  const outDir = path.join(__dirname, "..", "public", "datasheets");
  const outPath = path.join(outDir, "dummy-datasheet.pdf");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, await doc.save());
  console.log("Created", outPath);
}

main().catch((e) => { console.error(e); process.exit(1); });
