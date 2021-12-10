export default ({ app }, inject) => {
  // inject('typedRouter', app.router);

  return {
    provide: {
      typedRouter: app.router,
    },
  };
};
