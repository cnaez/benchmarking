cube(`Department`, {
  sql: `SELECT * FROM Department`,

  joins: {
    Employee: {
      sql: `${CUBE}.id = ${Employee}.departmentId`,
      relationship: `hasMany`,
    },
  },

  measures: {
    employeeCount: {
      type: `count`,
      sql: `${Employee}.id`,
      title: `Employee Count`,
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },
    departmentName: {
      sql: `departmentName`,
      type: `string`,
    },
  },
});
