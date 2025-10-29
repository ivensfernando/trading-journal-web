import 'ra-core';

declare module 'ra-core' {
    interface UserIdentity {
        username: string;
        email: string;
        firstName?: string;
        lastName?: string;
        fullName?: string;
        phoneNumber?: string;
        timezone?: string;
        createdAt?: string;
        updatedAt?: string;
    }
}
