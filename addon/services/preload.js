import Service, { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

/**
 * @class PreloadService
 *
 * The preload service is a Store that searches its local cache for a model before
 * making a remote request.
 *
 */
export default class PreloadService extends Service {
  constructor () {
    super (...arguments);
    this._initStoreFromDocument ();
  }

  @service
  store;

  /**
   * Find all the records of a given model type.
   *
   * @param modelName
   * @param options
   * @param fallbackToRemote
   * @return {*}
   */
  findAll (modelName, options, fallbackToRemote = false) {
    const models = this.store.peekAll (modelName);

    if (isPresent (models) || !fallbackToRemote) {
      return models;
    }

    return this.store.findAll (modelName, options);
  }

  /**
   * Find a single record of a given model type.
   *
   * @param modelName
   * @param id
   * @param options
   * @param fallbackToRemote
   * @return {*}
   */
  findRecord (modelName, id, options, fallbackToRemote = false) {
    const record = this.store.peekRecord (modelName, id);

    if (isPresent (record) || !fallbackToRemote) {
      return record;
    }

    return this.store.findRecord (modelName, id, options);
  }

  /**
   * Initialize the store from the models in the document.
   *
   * @private
   */
  _initStoreFromDocument () {
    const meta = window.document.head.querySelector ('meta[name="model"]');

    if (isPresent (meta) && isPresent (meta.content)) {
      // Decode the preload model content, and then parse the string. If we are able
      // to reconstruct a object from the content, then we can add the models to the
      // store.

      const decoded = decodeURIComponent (meta.content);

      if (isPresent (decoded)) {
        const models = JSON.parse (decoded);

        if (isPresent (models)) {
          this.store.pushPayload (models);
        }
      }
    }
  }
}
