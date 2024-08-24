import { router } from "../trpc";
import { employeeRouter } from "./employeeRouter";

// Combine your individual routers into the main application router
export const appRouter = router({
  employee: employeeRouter,
  // Add other routers here as your app grows
});

export type AppRouter = typeof appRouter;
