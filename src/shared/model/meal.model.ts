export interface IMeal {
    name?: string;
    chef?: string;
    date?: Date;
}

export const defaultMeal: Readonly<IMeal> = {};