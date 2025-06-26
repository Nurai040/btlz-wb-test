import { uploadTariffsToSheet } from "#googletable.js";
import { fetchAndSaveTariffs } from "#tariffs.js";
import cron from "node-cron";

export function startCron() {
    cron.schedule("0 * * * *", async () => {
        console.log("Running hourly job: Fetch WB Box Tariffs and Update the table");
        try {
            await fetchAndSaveTariffs();
            console.log("Tariffs fetched and saved");
            await uploadTariffsToSheet();
            console.log("Tariffs uploaded to Google Sheets");
        } catch (error) {
            console.error("Cron job error:", error);
        }
    });
}
