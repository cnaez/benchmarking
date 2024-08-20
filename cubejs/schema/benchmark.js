// cubejs/schema/Benchmarks.js
cube(`Benchmarks`, {
  sql: `SELECT * FROM benchmarks`,
  measures: {
    value: {
      type: `avg`,
      sql: `value`,
    },
  },
  dimensions: {
    metric: {
      sql: `metric`,
      type: `string`,
    },
  },
});
