// @ts-nocheck
import Vue from 'vue';
import routes from '../generated.js';

export default (ctx, inject) => {
  inject('$routeNames', routes);
};
