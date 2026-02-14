import { Task, User } from "@/generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      task?: Task;
      token?: {
        id: string;
        email: string;
        role: Role;
      };
    }
  }
}
