import fs from "fs";
import path from "path";

export function loadJSON(file: string) {
  const p = path.join(process.cwd(), "content", file);
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw);
}


export function loadFolder(dir: string) {
  const base = path.join(process.cwd(), "content", dir);
  const files = fs.readdirSync(base).filter(f => f.endsWith(".json"));
  return files.map(f => JSON.parse(fs.readFileSync(path.join(base, f), "utf-8")));
}
