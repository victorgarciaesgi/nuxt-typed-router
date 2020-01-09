import Vue from 'vue';

export default (ctx, inject) => {
  inject('typedRouter', ctx.app.router);
  inject('typedRoute', ctx.route);
};
