# Forcing the passport library to accept an http agent

Due to an issue in the `passport-oauth2` library not having an option to set the proxy agent this example application shows how to apply a patch to this package so that the agent can be specified for the SSO options to pass in the Strapi proxy agent.

## Setting up patch-package

In order for this to work you will need `patch-package` installed in your project.

### npm

```bash
npm install patch-package postinstall-postinstall
```

### yarn

```bash
yarn add patch-package postinstall-postinstall
```

Then you will need to add the postinstall script to your package.json as you can see in [this example](./package.json).

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

## Applying the patch

You can copy the [following patch](./patches/passport-oauth2+1.7.0.patch) to your `patches` directory and it will be applied when you run `npm install` or `yarn install`.

## Setting the Strapi agent in your SSO configuration

Depending if your passport package is properly handing down custom configuration options you can set the agent in your SSO configuration like this:

```javascript
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
```

This example was built for the Azure AD OAuth2 strategy but it should work for any strategy that uses the `passport-oauth2` library and allows passing down custom configuration options.

## Examples

In the below image we can now see that the SSO request to fetch the user data is properly going through the proxy (in this example it's a squid proxy).

![sso auth](./images/sso_auth.png)

And in this image we can see a custom request being made with `strapi.fetch()` to also request data through the proxy. You can also see in this image a custom http library being used that is not proxying the requests.

![proxied request](./images/proxied_request.png)
