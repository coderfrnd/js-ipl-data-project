const fs = require("fs");
const csv = require("csvtojson");


// Function to convert CSV to JSON
const convertCsvToJson = async (csvFile, jsonFile) => {
  try {
    const jsonArray = await csv().fromFile(csvFile);
    fs.writeFileSync(jsonFile, JSON.stringify(jsonArray, null, 2));
    console.log(`Converted ${csvFile} to ${jsonFile}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Convert both CSV files
convertCsvToJson("matches.csv", "file1.json");
convertCsvToJson("deliveries.csv", "file2.json");
