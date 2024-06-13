import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { RenameBoard } from "./schema";

export type InputType = z.infer<typeof RenameBoard>;
export type ReturnType = ActionState<InputType, Board>;
