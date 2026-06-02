import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.cwd(), "src");

function replaceInFiles() {
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        walk(p);
      } else if (p.endsWith(".tsx") || p.endsWith(".ts")) {
        let content = fs.readFileSync(p, "utf-8");
        let newContent = content
          .replace(/Embedded Systems/g, "Biomed Consumers Application")
          .replace(/Embedded systems/g, "Biomed Consumers Application")
          // Optional: fixing related text
          .replace(/Agri & Embedded/g, "Agri & Biomed")
          .replace(/embedded hardware platforms/g, "biomed consumer applications")
          .replace(/Embedded AI/g, "Biomed AI")
          .replace(
            /Food · Agri · AI · Embedded · Consumer/g,
            "Food · Agri · AI · Biomed · Consumer",
          );

        if (content !== newContent) {
          fs.writeFileSync(p, newContent);
          console.log("Updated " + p);
        }
      }
    }
  }
  walk(SRC_DIR);
}

replaceInFiles();
