/**
  @module ember-flexberry
*/

import Mixin from '@ember/object/mixin';
import RSVP from 'rsvp';
import $ from 'jquery';
import { isNone } from '@ember/utils';
import { set } from '@ember/object';
import { A, isArray } from '@ember/array';
import Builder from 'ember-flexberry-data/query/builder';
import deserializeSortingParam from '../utils/deserialize-sorting-param';

/**
  Mixin for [Route](https://www.emberjs.com/api/ember/release/classes/Route) to support hierarchical mode into {{#crossLink "FlexberryObjectlistviewComponent"}}{{/crossLink}}.

  @class FlexberryObjectlistviewHierarchicalRouteMixin
  @uses <a href="https://www.emberjs.com/api/ember/release/classes/Mixin">Mixin</a>
*/
export default Mixin.create({

  actions: {
    /**
      Set in `property` for `target` promise that load nested records.

      @method actions.loadRecordsById
      @param {String} id Record ID.
      @param {ObjectListViewRowComponent} target Instance of {{#crossLink "ObjectListViewRowComponent"}}{{/crossLink}}.
      @param {String} property Property name into {{#crossLink "ObjectListViewRowComponent"}}{{/crossLink}}.
      @param {Boolean} firstRunMode Flag indicates that this is the first download of data.
      @param {Object} recordParams Record params such as modelName, modelProjection and hierarchicalAttribute.
    */
    loadRecordsById(id, target, property, firstRunMode, recordParams) {
      let params = recordParams || {};
      let hierarchicalAttribute = params.hierarchicalAttribute || this.controllerFor(this.routeName).get('hierarchicalAttribute');
      let sorting = deserializeSortingParam(params.sort || this.controllerFor(this.routeName).get('sort'));
      let modelName = params.modelName || this.get('modelName');

      if (firstRunMode) {
        let projectionName = params.projectionName || this.get('modelProjection');
        let builder = new Builder(this.store)
          .from(modelName)
          .selectByProjection(projectionName)
          .where(hierarchicalAttribute, 'eq', id);

        if (isArray(sorting)) {
          sorting = sorting.filter(i => i.direction !== 'none').map(i => `${i.propName} ${i.direction}`).join(',');
          if (sorting) {
            builder.orderBy(sorting);
          }
        }

        set(target, property, this.store.query(modelName, builder.build()));
      } else {
        let store = this.get('store');
        let records = store.peekAll(modelName);
        let recordsArray = records.content;
        let sortRecordsArray = A();
        for (let i = 0; i < recordsArray.length; i++) {
          let record = store.peekRecord(modelName, recordsArray[i].id);

          if (record && (!isNone(record.get(hierarchicalAttribute))) && (record.get(hierarchicalAttribute).id === id)) {
            sortRecordsArray.push(record);
          }
        }

        if (sortRecordsArray.length === 0) {
          this.send('loadRecordsById', id, target, property, true, recordParams);
        } else {
          let recordsArrayinPromise = new RSVP.Promise((resolve) => {
            resolve(sortRecordsArray);
          });

          set(target, property, recordsArrayinPromise);
        }
      }
    },

    objectListViewRowClick(record, params) {
      // Prevent transition to edit form if click target is hierarchy expand button.
      if (params && params.originalEvent && $(params.originalEvent.target).hasClass('hierarchy-expand')) {
        params.goToEditForm = false;
      }

      this._super(...arguments);
    }
  },
});
