export function initialize(application) {
  application.inject ('route', 'preload', 'service:preload');
  application.inject ('controller', 'preload', 'service:preload');
}

export default {
  initialize
};
