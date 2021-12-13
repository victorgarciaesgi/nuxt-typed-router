export default ({ app }, inject) => {
  const routesList = <%= options.routesList %> ;

  return {
    provide: {
      typedRouter: app.router,
      routesList
    },
  };
};
