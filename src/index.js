"use strict";
const axios = require("axios").default;

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Use proxy for request
    const proxiedRequest = await strapi.fetch("https://www.google.com");
    console.log(proxiedRequest.status);

    const nonProxiedRequest = await axios.get("https://www.yahoo.com");
    console.log(nonProxiedRequest.status);
  },
};
