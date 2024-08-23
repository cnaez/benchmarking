cube(`Employees`, {
  sql: `SELECT * FROM employees`,

  joins: {
    Departments: {
      relationship: `belongsTo`,
      sql: `${CUBE}.department_id = ${Departments}.id`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [firstName, lastName, hireDate, departmentId],
    },
  },

  dimensions: {
    employeeId: {
      sql: `employee_id`,
      type: `number`,
      primaryKey: true,
    },

    firstName: {
      sql: `first_name`,
      type: `string`,
    },

    lastName: {
      sql: `last_name`,
      type: `string`,
    },

    gender: {
      sql: `gender`,
      type: `string`,
    },

    hireDate: {
      sql: `hire_date`,
      type: `time`,
    },
  },
});
