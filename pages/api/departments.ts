import type { NextApiRequest, NextApiResponse } from "next";

import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Resolve the absolute path to the JSON file
    const jsonFilePath = path.resolve(
      process.cwd(),
      "../RequiredData/Department.json",
    );
    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

    // Send the response
    res.status(200).json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error reading Department.json:", error);
    res.status(500).json({ error: "Failed to load departments data." });
  }
}
