const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create Departments
  const hrDepartment = await prisma.department.create({
    data: {
      departmentName: "HR",
    },
  });

  const engineeringDepartment = await prisma.department.create({
    data: {
      departmentName: "Engineering",
    },
  });

  const salesDepartment = await prisma.department.create({
    data: {
      departmentName: "Sales",
    },
  });

  // Create Employees
  const john = await prisma.employee.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      birthDate: new Date("1985-01-15"),
      hireDate: new Date("2010-06-01"),
      departmentId: engineeringDepartment.id,
      jobTitle: "Software Engineer",
    },
  });

  const jane = await prisma.employee.create({
    data: {
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      birthDate: new Date("1990-07-22"),
      hireDate: new Date("2015-04-21"),
      departmentId: hrDepartment.id,
      jobTitle: "HR Manager",
    },
  });

  const emily = await prisma.employee.create({
    data: {
      firstName: "Emily",
      lastName: "Davis",
      gender: "Female",
      birthDate: new Date("1983-03-10"),
      hireDate: new Date("2012-08-11"),
      departmentId: salesDepartment.id,
      jobTitle: "Sales Executive",
    },
  });

  // Create Salaries
  await prisma.salary.createMany({
    data: [
      {
        employeeId: john.id,
        salaryAmount: 85000,
        salaryDate: new Date("2023-01-01"),
      },
      {
        employeeId: jane.id,
        salaryAmount: 75000,
        salaryDate: new Date("2023-01-01"),
      },
      {
        employeeId: emily.id,
        salaryAmount: 65000,
        salaryDate: new Date("2023-01-01"),
      },
    ],
  });

  // Create Performance Reviews
  await prisma.performanceReview.createMany({
    data: [
      {
        employeeId: john.id,
        reviewDate: new Date("2023-06-01"),
        rating: 4,
        reviewer: "Manager A",
      },
      {
        employeeId: jane.id,
        reviewDate: new Date("2023-06-01"),
        rating: 5,
        reviewer: "Manager B",
      },
      {
        employeeId: emily.id,
        reviewDate: new Date("2023-06-01"),
        rating: 3,
        reviewer: "Manager C",
      },
    ],
  });

  // Create Turnover
  await prisma.turnover.create({
    data: {
      employeeId: emily.id,
      turnoverDate: new Date("2023-07-01"),
      reason: "Personal Reasons",
    },
  });

  // Create Hiring
  await prisma.hiring.create({
    data: {
      position: "Sales Executive",
      departmentId: salesDepartment.id,
      hireDate: new Date("2023-08-01"),
      hiredCandidateId: null, // Will be filled once a candidate is hired
    },
  });
}

main()
  .then(() => console.log("Database seeded!"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
