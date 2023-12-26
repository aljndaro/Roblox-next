
## Roblox-Next
### A Roblox OpenCloud/OAuth2 Provider For NextAuth.

- - -

install:
```
npm i roblox-next
```

- - - 

example usage:
```js
import { RobloxProvider, RobloxProviderCallbacks_Jwt } from "roblox-next"

export const authOptions = {
  providers: [
    RobloxProvider({
      clientId: process.env.ROBLOX_ID,
      clientSecret: process.env.ROBLOX_SECRET,
      redirectUri: process.env.ROBLOX_REDIRECT,
      scopes: ["openid", "profile"],
      include: ["name", "displayName", "avatar"]
    })
  ],

  callbacks: RobloxProviderCallbacks_Jwt
}
```
(You can replace `RobloxProviderCallbacks_Jwt` with `RobloxProviderCallbacks_Database` if you are using database based sessions) 

- - -

Roblox Provider Settings

`clientId`: string - Your roblox oauth2 client id.

`clientSecret`: string - Your roblox oauth2 client secret.

`scopes`: array - The permissions that your oauth2 app needs.

`include`: array - The data that will be saved to a session.
Defaults to `["name", "displayName", "avatar"]`.
Valid values are `name`, `displayName`, `avatar`, `description`, `created` and `hasVerifiedBadge`. (the users RobloxID is always included so theres no need to define it here).

`redirectUri`: string - The url to redirect to.

`checks`: array - The security checks to perform during OAuth. defaults to `['pkce', 'state']`. It is not advised to change this setting unless you know what you are doing.

- - -

If you want to add more callbacks as well you can do the following:

```js
export const authOptions = {
  ...

  callbacks: {
    ...RobloxProviderCallbacks_Jwt,

    // example of another callback
    async redirect() {
      return 
    },
  },

  ...
}
```

- - -

If you want to add more functionality to the callbacks used by `roblox-next` then you can do the following

```js
import { RobloxProvider, RobloxProviderJwtCallback, RobloxProviderSessionCallback } from "roblox-next"

export const authOptions = {
  ...

  callbacks: {
    async jwt({ token, user }) {
      token = await RobloxProviderJwtCallback(token, user)

      // add your code here

      return token
    },
  
    async session({ session, token }) {
      session = await RobloxProviderSessionCallback(session, token)

      // add your code here

      return session
    }
  },

  ...
}
