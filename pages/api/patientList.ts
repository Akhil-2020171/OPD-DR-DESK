import type { NextApiRequest, NextApiResponse } from "next";

import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Resolve the absolute path to the JSON file
    const jsonFilePath = path.resolve(
      process.cwd(),
      "../RequiredData/Patients.json",
    );
    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

    // Get request query parameters (departmentId, status)
    const { departmentId, status } = req.query;

    //console.log('Query parameters:', departmentId, status);

    // Validate if the JSON structure includes the requested status and department
    if (!data[0][status as string]) {
      return res.status(400).json({ error: "Invalid status provided" });
    }

    const patientsByStatus = data[0][status as string];

    // Get patients for the specific department
    const filteredPatients = departmentId
      ? patientsByStatus[departmentId as string] || []
      : [];

    //console.log('Filtered data:', filteredPatients);

    // Send the filtered data as response
    res.status(200).json(filteredPatients);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error reading Patients.json:", error);
    res.status(500).json({ error: "Failed to load patients data." });
  }
}
