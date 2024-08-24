cube(`Employee`, {
  sql: `SELECT * FROM Employee`,

  measures: {
    averageSalary: {
      type: `avg`,
      sql: `${Salary.salaryAmount}`,
      title: `Average Salary`,
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },
    firstName: {
      sql: `firstName`,
      type: `string`,
    },
    lastName: {
      sql: `lastName`,
      type: `string`,
    },
    departmentId: {
      sql: `departmentId`,
      type: `number`,
    },
  },

  joins: {
    Salary: {
      sql: `${CUBE}.id = ${Salary}.employeeId`,
      relationship: `hasMany`,
    },
  },

  refresh_key: {
    every: `1 second`,
  },
});
