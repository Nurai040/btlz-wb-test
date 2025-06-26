import axios from "axios";
import knex from "#postgres/knex.js";
import env from "#config/env/env.js";

const normalizeValue = (value: string) => {
    if (value === "-" || value === "") return null;
    return parseFloat(value.replace(",", "."));
};

export async function fetchAndSaveTariffs() {
    try {
        const date = new Date().toISOString().split("T")[0];
        const { data } = await axios.get(`https://common-api.wildberries.ru/api/v1/tariffs/box?date=${date}`, {
            headers: {
                Authorization: `${env.WB_API_TOKEN}`,
            },
        });
        const warehouseList = data?.response?.data?.warehouseList;
        console.log(warehouseList);
        if (!warehouseList || !Array.isArray(warehouseList)) {
            throw new Error("Invalid data format from WB API");
        }

        const records = warehouseList.map((item: any) => ({
            warehouse_name: item.warehouseName,
            box_delivery_and_storage_expr: normalizeValue(item.boxDeliveryAndStorageExpr),
            box_delivery_base: normalizeValue(item.boxDeliveryBase),
            box_delivery_liter: normalizeValue(item.boxDeliveryLiter),
            box_storage_base: normalizeValue(item.boxStorageBase),
            box_storage_liter: normalizeValue(item.boxStorageLiter),
            date: date,
            updated_at: new Date(),
        }));

        for (const record of records) {
            await knex("tariffs").insert(record).onConflict(["warehouse_name", "date"]).merge();
        }

        console.log(`Box tariffs updated for ${date}`);
    } catch (error) {
        console.error("Error fetching or saving box tariffs:", error);
    }
}
