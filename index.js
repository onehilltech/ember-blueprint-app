'use strict';

module.exports = {
  name: require('./package').name,

  contentFor (type, config) {
    this._super (...arguments);

    const blueprintConfig = config['ember-blueprint-app'] || {};
    const { enabled = !!process.env.npm_package_name } = blueprintConfig;

    if (enabled) {
      if (type === 'head') {
        return `{{>blueprint.head}}`;
      }
    }
  }
};
