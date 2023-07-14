const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2");
const jwt = require("jsonwebtoken");

module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    providers: [
      {
        uid: "azure_ad_oauth2",
        displayName: "Microsoft",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/320px-Microsoft_logo_%282012%29.svg.png",
        createStrategy: (strapi) =>
          new AzureAdOAuth2Strategy(
            {
              clientID: env("MICROSOFT_CLIENT_ID", ""),
              clientSecret: env("MICROSOFT_CLIENT_SECRET", ""),
              tenant: env("MICROSOFT_TENANT_ID", ""),
              callbackURL:
                strapi.admin.services.passport.getStrategyCallbackURL(
                  "azure_ad_oauth2"
                ),
              agent: strapi.fetch.agent,
            },
            (accessToken, refreshToken, params, profile, done) => {
              let waadProfile = jwt.decode(params.id_token, "", true);
              done(null, {
                email: waadProfile.email,
                username: waadProfile.email,
                firstname: waadProfile.given_name,
                lastname: waadProfile.family_name,
              });
            }
          ),
      },
    ],
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
});
