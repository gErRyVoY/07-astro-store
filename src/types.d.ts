interface User {
    email: string;
    name: string;
    // TODO:
}

declare namespace App {
    interface Locals {
        isLoggedIn: boolean;
        isAdmin: boolean;
        user: User | null;
    }
}