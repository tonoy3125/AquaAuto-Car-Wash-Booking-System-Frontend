export const days = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const; // "as const" ensures the type is a tuple of literals.
export type Day = (typeof days)[number];

export type TDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
