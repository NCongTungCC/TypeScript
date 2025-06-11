export enum Role {
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user'
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export enum Status {
    BORROWED = 'borrowed',
    RETURNED = 'returned',
    PENDING = 'pending',
    OVERDUE = 'overdue'
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;