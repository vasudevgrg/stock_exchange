import sequelize from "../config/db-connection";

function buildKlineViewQuery(
  viewName: string,
  bucketUnit: "minute" | "hour" | "week",
  bucketInterval: string
) {
  return `
    CREATE MATERIALIZED VIEW ${viewName} AS
    WITH base AS (
      SELECT
        market,
        date_trunc('${bucketUnit}', to_timestamp(
          CASE
            WHEN timestamp > 1000000000000 THEN timestamp / 1000.0
            ELSE timestamp::double precision
          END
        )) AS start,
        to_timestamp(
          CASE
            WHEN timestamp > 1000000000000 THEN timestamp / 1000.0
            ELSE timestamp::double precision
          END
        ) AS ts,
        price::numeric AS price,
        quantity::numeric AS quantity
      FROM trades
    ),
    agg AS (
      SELECT
        market,
        start,
        max(price) AS high,
        min(price) AS low,
        sum(quantity) AS volume,
        sum(price * quantity) AS "quoteVolume",
        count(*)::integer AS trades
      FROM base
      GROUP BY market, start
    ),
    open_rows AS (
      SELECT DISTINCT ON (market, start)
        market,
        start,
        price AS open
      FROM base
      ORDER BY market, start, ts ASC
    ),
    close_rows AS (
      SELECT DISTINCT ON (market, start)
        market,
        start,
        price AS close
      FROM base
      ORDER BY market, start, ts DESC
    )
    SELECT
      agg.market,
      agg.start,
      agg.start + interval '${bucketInterval}' AS "end",
      open_rows.open,
      agg.high,
      agg.low,
      close_rows.close,
      agg.volume,
      agg."quoteVolume",
      agg.trades
    FROM agg
    JOIN open_rows ON open_rows.market = agg.market AND open_rows.start = agg.start
    JOIN close_rows ON close_rows.market = agg.market AND close_rows.start = agg.start;
  `;
}

export async function createKlineViews() {
  console.log("Ensuring kline materialized views exist...");

  await sequelize.query(`
    DROP MATERIALIZED VIEW IF EXISTS klines_1m;
    DROP MATERIALIZED VIEW IF EXISTS klines_1h;
    DROP MATERIALIZED VIEW IF EXISTS klines_1w;
  `);

  await sequelize.query(buildKlineViewQuery("klines_1m", "minute", "1 minute"));
  await sequelize.query(buildKlineViewQuery("klines_1h", "hour", "1 hour"));
  await sequelize.query(buildKlineViewQuery("klines_1w", "week", "1 week"));

  await sequelize.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS klines_1m_idx ON klines_1m (market, start);
    CREATE UNIQUE INDEX IF NOT EXISTS klines_1h_idx ON klines_1h (market, start);
    CREATE UNIQUE INDEX IF NOT EXISTS klines_1w_idx ON klines_1w (market, start);
  `);

  console.log("Kline views ready");
}
