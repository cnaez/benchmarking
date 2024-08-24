cube(`Department`, {
  sql: `SELECT * FROM Department`,

  measures: {
    employeeCount: {
      type: `count`,
      sql: `${Employee.id}`,
      // Use the appropriate relationship
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

  joins: {
    Employee: {
      sql: `${CUBE}.id = ${Employee}.departmentId`,
      relationship: `hasMany`,
    },
  },
});
