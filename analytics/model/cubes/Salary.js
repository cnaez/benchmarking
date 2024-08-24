cube(`Salary`, {
  sql: `SELECT * FROM Salary`,

  measures: {
    avgSalary: {
      type: `avg`,
      sql: `salaryAmount`,
      title: `Average Salary`,
    },
    totalSalary: {
      type: `sum`,
      sql: `salaryAmount`,
      title: `Total Salary`,
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },
    salaryAmount: {
      sql: `salaryAmount`,
      type: `number`,
    },
    salaryDate: {
      sql: `salaryDate`,
      type: `time`,
    },
  },

  joins: {
    Employee: {
      sql: `${CUBE}.employeeId = ${Employee}.id`,
      relationship: `belongsTo`,
    },
  },
});
