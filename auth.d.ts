import { DefaultSession, DefaultUser } from '@auth/core/types';


declare module '@auth/core/types' {
    interface User extends DefaulUser {
        role?: string
    }

    interface Session extends DefaultSession {
        user: User;
    }
}