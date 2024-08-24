cube(`Employee`, {
  sql: `SELECT * FROM Employee`,

  joins: {
    Department: {
      sql: `${CUBE}.departmentId = ${Department}.id`,
      relationship: `belongsTo`,
    },
    Salary: {
      sql: `${CUBE}.id = ${Salary}.employeeId`,
      relationship: `hasMany`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, firstName, lastName],
    },
    averageSalary: {
      type: `avg`,
      sql: `${Salary}.salaryAmount`,
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
    jobTitle: {
      sql: `jobTitle`,
      type: `string`,
    },
    hireDate: {
      sql: `hireDate`,
      type: `time`,
    },
    departmentId: {
      sql: `departmentId`,
      type: `number`,
    },
  },
});
