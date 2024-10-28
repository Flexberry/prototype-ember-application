/**
  @module ember-flexberry
*/

import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { deprecate } from '@ember/debug';
import { observer, get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import ListFormController from '../controllers/list-form';
import SortableRouteMixin from '../mixins/sortable-route';
import PredicateFromFiltersMixin from '../mixins/predicate-from-filters';
import deserializeSortingParam from '../utils/deserialize-sorting-param';

/**
  Controller to support a modal windows in FlexberryLookup component.

  @class LookupDialogController
  @extends ListFormController
  @uses SortableRouteMixin
*/
export default ListFormController.extend(SortableRouteMixin, PredicateFromFiltersMixin, {
  /**
    Current open a modal window.

    @property _openedModalDialog
    @type JQuery
    @private
  */
  _openedModalDialog: undefined,

  /**
    Title for modal window.

    @property title
    @type String
  */
  title: undefined,

  /**
    Flag which indicates that several rows were selected.
    Shows whether multiselect in groupedit is available.
  */
  isPullUpActive: false,

  /**
    Current lookup selected record.
    It is used to highlight selected record.

    @property currentLookupRow
    @type DS.Model
  */
  currentLookupRow: undefined,

  /**
    Set of properties to set for list commponent.

    @property customPropertiesData
    @type Object
  */
  customPropertiesData: undefined,

  /**
    Type of current loaded data.

    @property modelType
    @type String
  */
  modelType: undefined,

  /**
    Name of projection data were loaded by.

    @property projectionName
    @type String
  */
  projectionName: undefined,

  /**
    Predicate to limit loaded data by.

    @property predicate
    @type BasePredicate
  */
  predicate: undefined,

  /**
    Handler to call when parameters of loaded data changed (filter, currentPage, etc.).

    @property reloadDataHandler
    @type Function
  */
  reloadDataHandler: undefined,

  /**
    Context for handler of data reloading call.

    @property reloadContext
    @type Object
    @default undefined
  */
  reloadContext: undefined,

  /**
    Flag indicates whether to observe query parameters or they are not still initiated..

    @property reloadObserverIsActive
    @type Boolean
    @default false
  */
  reloadObserverIsActive: false,

  /**
    Flag indicates whether to show hierarchical button if hierarchy is available.

    @property disableHierarchicalMode
    @type Boolean
    @default false
  */
  disableHierarchicalMode: false,

  /**
    Service that triggers lookup events.

    @property lookupEventsService
    @type Service
  */
  lookupEventsService: service('lookup-events'),

  init() {
    this._super(...arguments);

    this.get('objectlistviewEventsService').on('olvRowSelected', this, this._rowSelected);
  },

  willDestroy() {
    this.get('objectlistviewEventsService').off('olvRowSelected', this, this._rowSelected);

    this._super(...arguments);
  },

  _rowSelected() {
    const multi = this.get('objectlistviewEventsService').getMultiSelectedRecords(this.get('folvComponentName'));
    let isPullUpActive = multi && multi.size;
    this.set('isPullUpActive', isPullUpActive);
  },

  actions: {
    /**
      Handlers OLV row click, Save selected row to object master property and close modal window.

      @method actions.objectListViewRowClick
      @param {Object} record Selected row.
    */
    objectListViewRowClick(record) {
      this._selectMaster(record);
      this.closeModalDialog();
    },

    /**
      Handlers create modal window action. Save created window, to have opportunity to close it later.

      @method actions.createdModalDialog
      @param {JQuery} modalDialog Created modal window.
    */
    createdModalDialog(modalDialog) {
      this.set('_openedModalDialog', modalDialog);
      this.get('lookupEventsService').lookupDialogOnVisibleTrigger(this.get('componentName'), modalDialog);
    },

    removeModalDialog() {
      scheduleOnce('afterRender', () => this.get('objectlistviewEventsService').clearMultiSelectedRecords());
      return true;
    },

    pullUpLookupValues() {
      const currentLookupRow = this.get('currentLookupRow');
      let selected = this.get('objectlistviewEventsService').getMultiSelectedRecords(this.get('folvComponentName'));
      const contextModel = this.get('reloadContext.model');
      const lookupModelName = this.get('saveTo.model.constructor.modelName');
      const relName = get(contextModel.constructor, 'relationships').get(lookupModelName)[0].name;
      let detail = contextModel.get(relName);
      if (selected) {
        if (currentLookupRow) {
          selected.forEach(({ data }) => detail.pushObject(this.store.createRecord(lookupModelName, {
            [this.saveTo.propName]: data
          })));
        } else {
          let rowValueToUpdate = [];
          selected.forEach(({ data }) => rowValueToUpdate.push(data) );
          this._selectMaster(rowValueToUpdate[0])

          for (let i = 1; i < rowValueToUpdate.length; i++) {
            detail.pushObject(this.store.createRecord(lookupModelName, {
              [this.saveTo.propName]: rowValueToUpdate[i]
            }))
          }
        }
      }
  
      this.get('objectlistviewEventsService').clearMultiSelectedRecords();
      this._closeModalDialog();
    },

    /**
      Handlers correcponding route's willTransition action.
      It closes modal window if it is opened (if Ember uses hash location type, modal window won't be closed automatically).

      @method actions.routeWillTransition
    */
    routeWillTransition() {
      this._closeModalDialog();
    },

    /**
      Save filters and refresh list.

      @method actions.applyFilters
      @param {Object} filters
    */
    applyFilters(filters) {
      this.set('filters', filters);
      this.send('refreshList');
    },

    /**
      Reset filters and refresh list.

      @method actions.resetFilters
    */
    resetFilters() {
      this.set('filters', null);
      this.send('refreshList');
    },

    /**
      Refresh list with actual parameters.

      @method actions.refreshList
    */
    refreshList() {
      let reloadDataHandler = this.get('reloadDataHandler');
      if (!reloadDataHandler) {
        throw new Error('No reload handler was defined.');
      }

      let sorting = deserializeSortingParam(this.get('sort'));
      let reloadData = {
        relatedToType: this.get('modelType'),
        projectionName: this.get('projectionName'),

        perPage: this.get('perPage'),
        page: this.get('page'),
        sorting: sorting,
        filters: this._filtersPredicate(),
        filter: this.get('filter'),
        filterCondition: this.get('filterCondition'),
        filterProjectionName: this.get('filterProjectionName'),
        predicate: this.get('predicate'),
        hierarchicalAttribute: this.get('hierarchicalAttribute'),
        hierarchyPaging: this.get('hierarchyPaging'),

        title: this.get('title'),
        saveTo: this.get('saveTo'),
        currentLookupRow: this.get('currentLookupRow'),
        customPropertiesData: this.get('customPropertiesData'),
        componentName: this.get('componentName'),
        folvComponentName: this.get('folvComponentName'),
        modalDialogSettings: {
          lookupSettings: this.get('modalDialogSettings.lookupSettings'),
        }
      };

      if (reloadData.customPropertiesData) {
        reloadData.customPropertiesData.inHierarchicalMode = this.get('inHierarchicalMode');
      }

      let folvComponentName = this.get('folvComponentName');
      if (folvComponentName) {
        let userSettingsParams = {
          sort: this.get('sort'),
        };

        let userSettingsService = this.get('userSettingsService');
        userSettingsService.setCurrentParams(folvComponentName, userSettingsParams);
      }

      reloadDataHandler(this.get('reloadContext'), reloadData);
    },

    /**
      Redirect actions into route.

      @method actions.loadRecords
      @param {String} id Record ID.
      @param {ObjectListViewRowComponent} target Instance of {{#crossLink "ObjectListViewRowComponent"}}{{/crossLink}}.
      @param {String} property Property name into {{#crossLink "ObjectListViewRowComponent"}}{{/crossLink}}.
      @param {Boolean} firstRunMode Flag indicates that this is the first download of data.
    */
    loadRecords(id, target, property, firstRunMode) {
      let params = {};
      params.hierarchicalAttribute = this.get('hierarchicalAttribute');
      params.sort = this.get('sort');
      params.modelName = this.get('customPropertiesData.modelName');
      params.projectionName = this.get('customPropertiesData.modelProjection');
      this.send('loadRecordsById', id, target, property, firstRunMode, params);
    },
  },

  /**
    It observes query parameters changing.
    If query parameter (filter, current page, etc.) is changed then displayed data are reloaded.

    @method queryParametersChanged
  */
  queryParametersChanged: observer('filter', 'page', 'perPage', 'sort', function() {
    if (this.get('reloadObserverIsActive')) {
      this.send('refreshList');
    }
  }),

  /**
    It clears current controller.
    It has to be done before each use.

    @method clear
    @param {Boolean} initialClear Flag indicates whether it is clear on first load or just on reload.
  */
  clear: function (initialClear) {
    this.set('reloadObserverIsActive', false);

    if (initialClear) {
      this.set('_openedModalDialog', undefined);
      this.set('modelProjection', undefined);
      this.set('reloadContext', undefined);
      this.set('reloadDataHandler', undefined);

      this.set('perPage', undefined);
      this.set('page', undefined);
      this.set('sort', undefined);
      this.set('filters', undefined);
      this.set('filter', undefined);
      this.set('filterProjectionName', undefined);
      this.set('filterCondition', undefined);
      this.set('predicate', undefined);

      this.set('modalDialogSettings', undefined);
    }

    this.set('saveTo', undefined);
    this.set('currentLookupRow', undefined);
    this.set('customPropertiesData', undefined);
    this.set('modelType', undefined);
    this.set('projectionName', undefined);
    return this;
  },

  /**
    Set master to corresponding property of editing object.

    @method _selectMaster
    @param {Object} master Selected master for editing property.
    @private
  */
  _selectMaster(master) {
    let saveTo = this.get('saveTo');
    if (!saveTo) {
      throw new Error('Don\'t know where to save - no saveTo data defined.');
    }

    const updateLookupAction = saveTo.updateLookupAction;
    const componentContext = saveTo.componentContext;
    const componentName = this.get('componentName');
    if (!isBlank(updateLookupAction)) {
      componentContext.send(updateLookupAction,
        {
          relationName: saveTo.propName,
          modelToLookup: saveTo.model,
          newRelationValue: master,
          componentName: componentName
        });
    } else {
      deprecate(`You need to send updateLookupAction name to saveTo object in lookup choose parameters`, false, {
        id: 'ember-flexberry.controllers.lookup-dialog',
        until: '4.0',
      });

      saveTo.model.set(saveTo.propName, master);

      // Manually make record dirty, because ember-data does not do it when relationship changes.
      saveTo.model.makeDirty();
      this.get('lookupEventsService').lookupOnChangeTrigger(componentName, master);
    }
  },

  /**
    Close current modal window if it exists.

    @method _closeModalDialog
    @private
  */
  _closeModalDialog() {
    let openedDialog = this.get('_openedModalDialog');
    if (openedDialog) {
      openedDialog.modal('hide');
      this.set('_openedModalDialog', undefined);
    }

    this.get('lookupEventsService').lookupDialogOnHiddenTrigger(this.get('componentName'));
  },
});
