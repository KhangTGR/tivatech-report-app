const AccountRouter = require("./accountRoutes.js");

const routes = (app) => {
  // Account routes
  app.use("/api/account", AccountRouter);

  // User routes

  // Admin routes
};

module.exports = routes;
