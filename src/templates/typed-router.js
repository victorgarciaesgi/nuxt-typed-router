export default ({ app }, inject) => {
  inject('typedRouter', app.router);
};
