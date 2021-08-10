export interface IMeal {
    id?: string;
    name?: string;
    chef?: string;
    date?: Date;
}

export const defaultMeal: Readonly<IMeal> = {};