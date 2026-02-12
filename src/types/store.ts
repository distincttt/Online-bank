import { TitleMap } from "./components";

export type RootState = {
   message: Message | null;
   sidebar: boolean;
};

export type Message = {
   value: string;
   type: keyof TitleMap; // "danger" | "primary" | "warning"
} | null;
