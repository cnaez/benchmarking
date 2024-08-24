import { z } from "zod";
import axios from "axios";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export const employeeRouter = router({
  // Query to fetch all employees with related data
  getAllEmployees: procedure.query(async () => {
    try {
      return await prisma.employee.findMany({
        include: {
          department: true,
          salaries: true,
          reviews: true,
        },
      });
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  }),

  getAverageSalaryByDepartment: procedure
    .input(
      z.object({
        departmentId: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await axios.get(
          "http://localhost:4000/cubejs-api/v1/load",
          {
            params: {
              measures: ["Employee.averageSalary"],
              filters: [
                {
                  dimension: "Employee.departmentId",
                  operator: "equals",
                  values: [input.departmentId],
                },
              ],
            },
            headers: {
              Authorization: `Bearer YOUR_CUBEJS_API_TOKEN`, // Use your Cube.js API token
            },
          }
        );

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch average salary");
      }
    }),

  // Query to fetch  salary by department
  getSalaryByDepartment: procedure
    .input(
      z.object({
        departmentId: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        return await prisma.salary.findMany({
          where: {
            employee: {
              departmentId: input.departmentId,
            },
          },
        });
      } catch (error) {
        throw new Error("Failed to fetch average salary");
      }
    }),

  // // Query to fetch average salary by department
  // getAverageSalaryByDepartment: procedure
  //   .input(
  //     z.object({
  //       departmentId: z.number(),
  //     })
  //   )
  //   .query(async ({ input }) => {
  //     try {
  //       return await prisma.salary.aggregate({
  //         _avg: {
  //           salaryAmount: true,
  //         },
  //         where: {
  //           employee: {
  //             departmentId: input.departmentId,
  //           },
  //         },
  //       });
  //     } catch (error) {
  //       throw new Error("Failed to fetch average salary");
  //     }
  //   }),

  // Query to fetch employees by department ID
  getEmployeesByDepartment: procedure
    .input(
      z.object({
        departmentId: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        return await prisma.employee.findMany({
          where: {
            departmentId: input.departmentId,
          },
          include: {
            salaries: true,
            reviews: true,
          },
        });
      } catch (error) {
        throw new Error(
          `Failed to fetch employees for department ID: ${input.departmentId}`
        );
      }
    }),

  // Query to fetch an employee by ID
  getEmployeeById: procedure
    .input(
      z.object({
        employeeId: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        return await prisma.employee.findUnique({
          where: {
            id: input.employeeId,
          },
          include: {
            department: true,
            salaries: true,
            reviews: true,
          },
        });
      } catch (error) {
        throw new Error(
          `Failed to fetch employee with ID: ${input.employeeId}`
        );
      }
    }),

  // Mutation to create a new employee
  createEmployee: procedure
    .input(
      z.object({
        name: z.string(),
        departmentId: z.number(),
        position: z.string(),
        salaryAmount: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const newEmployee = await prisma.employee.create({
          data: {
            name: input.name,
            departmentId: input.departmentId,
            position: input.position,
          },
        });

        if (input.salaryAmount) {
          await prisma.salary.create({
            data: {
              employeeId: newEmployee.id,
              salaryAmount: input.salaryAmount,
            },
          });
        }

        return newEmployee;
      } catch (error) {
        throw new Error("Failed to create employee");
      }
    }),

  // Mutation to update an existing employee's data
  updateEmployee: procedure
    .input(
      z.object({
        employeeId: z.number(),
        name: z.string().optional(),
        departmentId: z.number().optional(),
        position: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.employee.update({
          where: {
            id: input.employeeId,
          },
          data: {
            name: input.name,
            departmentId: input.departmentId,
            position: input.position,
          },
        });
      } catch (error) {
        throw new Error(
          `Failed to update employee with ID: ${input.employeeId}`
        );
      }
    }),

  // Mutation to delete an employee
  deleteEmployee: procedure
    .input(
      z.object({
        employeeId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.employee.delete({
          where: {
            id: input.employeeId,
          },
        });
      } catch (error) {
        throw new Error(
          `Failed to delete employee with ID: ${input.employeeId}`
        );
      }
    }),
});

// Export type definition of the API
export type EmployeeRouter = typeof employeeRouter;
