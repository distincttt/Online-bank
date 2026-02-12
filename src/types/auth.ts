export type AuthMode = "login" | "registration";

export type AuthState = {
   token: string | null;
};

export type AuthUser = {
   email: string;
   password: string;
};

export type FirebaseAuthResponse = {
   idToken: string;
};
