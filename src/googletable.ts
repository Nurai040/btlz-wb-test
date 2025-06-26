import { google } from "googleapis";
import env from "#config/env/env.js";
import knex from "#postgres/knex.js";

const auth = new google.auth.GoogleAuth({
    keyFile: env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function uploadTariffsToSheet() {
    const spreadsheetId = env.GOOGLE_SHEETS_ID;
    const sheetName = "stocks_coefs";

    const tariffs = await knex("tariffs").select("*").orderBy("box_delivery_liter", "asc");

    const header = ["Дата", "Склад", "boxDeliveryBase", "boxDeliveryLiter", "boxDeliveryAndStorageExpr", "boxStorageBase", "boxStorageLiter"];

    const rows = tariffs.map((item) => [
        item.date,
        item.warehouse_name,
        item.box_delivery_base,
        item.box_delivery_liter,
        item.box_delivery_and_storage_expr,
        item.box_storage_base,
        item.box_storage_liter,
    ]);

    const values = [header, ...rows];

    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${sheetName}!A1:Z1000`,
    });

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values,
        },
    });

    console.log("Данные успешно выгружены в Google Sheets");
}
