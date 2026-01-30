import sequelize from "../config/db-connection";

async function refreshViews() {

    await sequelize.query('REFRESH MATERIALIZED VIEW klines_1m');
    await sequelize.query('REFRESH MATERIALIZED VIEW klines_1h');
    await sequelize.query('REFRESH MATERIALIZED VIEW klines_1w');

    console.log("Materialized views refreshed successfully");
}

refreshViews().catch(console.error);

setInterval(() => {
    refreshViews()
}, 1000 * 10 );