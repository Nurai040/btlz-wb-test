import { startCron } from "#cron.js";
import { uploadTariffsToSheet } from "#googletable.js";
import knex, { migrate, seed } from "#postgres/knex.js";
import { fetchAndSaveTariffs } from "#tariffs.js";

await migrate.latest();
await seed.run();
async function startApp() {
    try {
        console.log("Starting app...");
        console.log("All migrations and seeds have been run");

        await fetchAndSaveTariffs();
        console.log("Tariffs fetched and saved");
        await uploadTariffsToSheet();
        console.log("Tariffs uploaded to Google Sheets");
        startCron();
        console.log("Tariff cron job started");
    } catch (error) {
        console.error("Error starting app:", error);
        process.exit(1);
    }
}

await startApp();
