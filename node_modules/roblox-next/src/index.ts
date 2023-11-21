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

export const RobloxProvider = (options: RobloxProviderOptions) => {
  const {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scopes: SCOPES,
    redirectUri: REDIRECT_URI,
    checks: CHECKS = ['pkce', 'state'],
    rest: REST,
  } = options;

  return {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    id: 'roblox',
    name: 'Roblox',
    type: 'oauth',
    wellKnown: 'https://apis.roblox.com/oauth/.well-known/openid-configuration',
    authorization: { params: { scope: SCOPES.join(' '), redirect_uri: REDIRECT_URI } },
    idToken: true,
    checks: CHECKS,

    client: {
      authorization_signed_response_alg: 'ES256',
      id_token_signed_response_alg: 'ES256',
    },

    profile(profile: any) {
      return {
        type: 'roblox',
        id: profile.sub,
        robloxId: profile.sub,
        name: profile.preferred_username,
        displayName: profile.nickname,
        picture: profile.picture
      };
    },

    ...REST,
  };
};

export const RobloxProviderJwtCallback = async (token: any, user: any) => {
  if (!user) return token;
  if (!(user?.type === 'roblox')) return token;

  token.id = user.id;
  token.robloxId = user.robloxId
  token.name = user.name,
  token.displayName = user.displayName
  token.picture = user.picture
  token.type = "roblox"

  return token;
};

export const RobloxProviderSessionCallback = async (session: any, tokenOrUser: any) => {
  if (!(tokenOrUser?.type === 'roblox')) return session;

  session.user.id = tokenOrUser.id;
  session.user.robloxId = tokenOrUser.robloxId;
  session.user.name = tokenOrUser.name;
  session.user.displayName = tokenOrUser.displayName;
  session.user.picture = tokenOrUser.picture;

  return session;
};

export const RobloxProviderCallbacks_Jwt = {
  async jwt({ token, user }: { token: any; user: any }) {
    return await RobloxProviderJwtCallback(token, user);
  },

  async session({ session, token }: { session: any; token: any }) {
    return await RobloxProviderSessionCallback(session, token);
  },
};

export const RobloxProviderCallbacks_Database = {
  async session({ session, user }: { session: any; user: any }) {
    return await RobloxProviderSessionCallback(session, user);
  },
};