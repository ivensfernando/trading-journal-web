export type UserIdentity = {
    id: string | number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phoneNumber?: string;
    timezone?: string;
    createdAt?: string;
    updatedAt?: string;
};
