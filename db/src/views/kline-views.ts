import sequelize from "../config/db-connection";

export async function createKlineViews() {
  console.log("Ensuring kline materialized views exist...");

  await sequelize.query(`
    CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1m AS
    SELECT
        market,
        time_bucket('1 minute', time) AS start,
        time_bucket('1 minute', time) + interval '1 minute' AS "end",
        first(price, time) AS open,
        max(price) AS high,
        min(price) AS low,
        last(price, time) AS close,
        sum(volume) AS volume,
        sum(price * volume) AS "quoteVolume",
        count(*) AS trades
    FROM tata_prices
    GROUP BY market, start;
  `);

  await sequelize.query(`
    CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1h AS
    SELECT
        market,
        time_bucket('1 hour', time) AS start,
        time_bucket('1 hour', time) + interval '1 hour' AS "end",
        first(price, time) AS open,
        max(price) AS high,
        min(price) AS low,
        last(price, time) AS close,
        sum(volume) AS volume,
        sum(price * volume) AS "quoteVolume",
        count(*) AS trades
    FROM tata_prices
    GROUP BY market, start;
  `);

  await sequelize.query(`
    CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1w AS
    SELECT
        market,
        time_bucket('1 week', time) AS start,
        time_bucket('1 week', time) + interval '1 week' AS "end",
        first(price, time) AS open,
        max(price) AS high,
        min(price) AS low,
        last(price, time) AS close,
        sum(volume) AS volume,
        sum(price * volume) AS "quoteVolume",
        count(*) AS trades
    FROM tata_prices
    GROUP BY market, start;
  `);

  await sequelize.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS klines_1m_idx ON klines_1m (market, start);
    CREATE UNIQUE INDEX IF NOT EXISTS klines_1h_idx ON klines_1h (market, start);
    CREATE UNIQUE INDEX IF NOT EXISTS klines_1w_idx ON klines_1w (market, start);
  `);

  console.log("Kline views ready");
}