type ValidScopes = 'openid' | 'profile' | "universe-messaging-service:publish" | "asset:read" | "asset:write" | "user.inventory-item:read" | "group:read" | "universe-messaging-service:publish" | 'email' | 'verification' | 'credentials' | 'age' | 'premium' | 'roles';
type ValidChecks = 'pkce' | 'state';
interface RobloxProviderOptions {
    clientId: string | undefined;
    clientSecret: string | undefined;
    redirectUri: string;
    scopes: ValidScopes[];
    checks?: ValidChecks;
    rest?: any;
}
export declare const RobloxProvider: (options: RobloxProviderOptions) => any;
export declare const RobloxProviderJwtCallback: (token: any, user: any) => Promise<any>;
export declare const RobloxProviderSessionCallback: (session: any, tokenOrUser: any) => Promise<any>;
export declare const RobloxProviderCallbacks_Jwt: {
    jwt({ token, user }: {
        token: any;
        user: any;
    }): Promise<any>;
    session({ session, token }: {
        session: any;
        token: any;
    }): Promise<any>;
};
export declare const RobloxProviderCallbacks_Database: {
    session({ session, user }: {
        session: any;
        user: any;
    }): Promise<any>;
};
export {};