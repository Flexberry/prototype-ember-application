/**
  @module ember-flexberry
*/

import $ from 'jquery';
import EmberObject, { set, computed, observer } from '@ember/object';
import { guidFor, copy } from '@ember/object/internals'
import { A } from '@ember/array';
import { isBlank } from '@ember/utils';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/string';
import FlexberryBaseComponent from './flexberry-base-component';

/**
  Component for displayed one record in {{#crossLink "ObjectListViewComponent"}}{{/crossLink}}.

  @class ObjectListViewRowComponent
  @extends FlexberryBaseComponent
*/
export default FlexberryBaseComponent.extend({
  /**
    Indicates that child records are being loaded.

    @property _recordsIsLoading
    @type Boolean
    @default false
  */
  _recordsIsLoading: false,

  /**
    Flag used to display embedded records.

    @property _expanded
    @type Boolean
    @default false
    @private
  */
  _expanded: false,

  /**
    Stores the number of pixels to isolate one level of hierarchy.

    @property _hierarchicalIndent
    @type Number
    @default 20
    @private
  */
  _hierarchicalIndent: 20,

  /**
    Level nesting by default.

    @property _level
    @type Number
    @default 0
    @private
  */
  _level: 0,

  /**
    Level nesting current record.

    @property _currentLevel
    @type Number
    @default 0
    @private
  */
  _currentLevel: computed({
    get() {
      return this.get('_level');
    },
    set(key, value) {
      return this.set('_level', ++value);
    },
  }),

  /**
    Store nested records.

    @property _records
    @type Ember.NativeArray
    @default Empty
    @private
  */
  _records: computed(() => A()),

  /**
    Flag: indicates whether to show validation messages or not.

    @property showValidationMessagesInRow
    @type Boolean
    @default false
  */
  showValidationMessagesInRow: false,

  /**
    Flag used to start render row content.

    @property doRenderData
    @type Boolean
    @default false
  */
  doRenderData: false,

  /**
    Default left padding in cells.

    @property defaultLeftPadding
    @type Number
    @default 10
  */
  defaultLeftPadding: 10,

  /**
    Current record.
    - `key` - Ember GUID for record.
    - `data` - Instance of DS.Model.
    - `rowConfig` - Object with config for record.

    @property record
    @type Object
  */
  record: computed(() => ({
    key: undefined,
    data: undefined,
    rowConfig: undefined,
  })),

  /**
    Store nested records.

    @property records
    @type Ember.NativeArray
    @default Empty
  */
  records: computed({
    get() {
      return this.get('_records');
    },
    set(key, value) {
      this.set('_recordsIsLoading', true);
      value.then((records) => {
        this.get('_records').length = 0;
        records.forEach((record) => {
          let config = copy(this.get('defaultRowConfig'));
          let configurateRow = this.get('configurateRow');
          if (configurateRow) {
            assert('configurateRow must be a function', typeof configurateRow === 'function');
            configurateRow(config, record);
          }

          let newRecord = EmberObject.create({
            key: guidFor(record),
            data: record,
            rowConfig: config,
            doRenderData: true
          });

          this.get('_records').pushObject(newRecord);
        });
      }).finally(() => {
        if (!this.get('isDestroyed')) {
          this.set('_recordsIsLoading', false);
        }
      });

      return this.get('records');
    },
  }),

  /**
    Indicates whether the record displayed on this row has child records.
    See {{#crossLink "FlexberryObjectlistviewComponent/isParentRecordPropertyName:property"}}details here{{/crossLink}}.

    @property isParentRecord
    @type Boolean
    @readOnly
  */
  isParentRecord: computed('record.data', 'isParentRecordPropertyName', function () {
    return this.get(`record.data.${this.get('isParentRecordPropertyName')}`);
  }).readOnly(),

  /**
    Flag indicate whether there nested records.

    @property hasRecords
    @type Boolean
    @default false
  */
  hasRecords: computed('records.length', function() {
    return this.get('records.length') > 0;
  }),

  /**
    Hierarchical indent based on the current level of nesting.

    @property hierarchicalIndent
    @type String
    @default ''
  */
  hierarchicalIndent: computed({
    get() {
      let result = (this.get('_currentLevel')) * this.get('_hierarchicalIndent') + this.get('defaultLeftPadding');
      if (this.get('_currentLevel') === 0) {
        result = this.get('defaultLeftPadding');
      }

      return result;
    },
    set(key, value) {
      if (value !== undefined) {
        this.set('_hierarchicalIndent', +value);
      }

      return this.get('hierarchicalIndent');
    },
  }),

  hierarchicalIndentStyle: computed('_hierarchicalIndent', 'defaultLeftPadding', function() {
    let defaultLeftPadding = this.get('defaultLeftPadding');
    let hierarchicalIndent = this.get('hierarchicalIndent');
    return htmlSafe(`padding-left:${hierarchicalIndent}px !important; padding-right:${defaultLeftPadding}px !important;`);
  }),

  defaultPaddingStyle: computed('defaultLeftPadding', function() {
    let defaultLeftPadding = this.get('defaultLeftPadding');
    return htmlSafe(`padding-left:${defaultLeftPadding}px !important; padding-right:${defaultLeftPadding}px !important;`);
  }),

  /**
    Observe inExpandMode changes.
  */
  inExpandModeObserver: observer('inExpandMode', function() {
    if (!this.get('recordsLoaded')) {
      this.send('loadChildRecords');
    } else {
      this.set('_expanded', this.get('inExpandMode'));
    }
  }),

  /**
    Observe sorting changes.
  */
  sortingObserver: observer('sorting', function() {
    this.set('recordsLoaded', false);
    this.set('_expanded', false);
  }),

  /**
    Tag name for the view's outer element. [More info](https://emberjs.com/api/ember/release/classes/Component#property_tagName).

    @property tagName
    @type String
    @default ''
  */
  tagName: '',

  /**
    Flag indicates that record's hierarchy for this row is loaded.

    @property recordsLoaded
    @type Boolean
    @default false
  */
  recordsLoaded: false,

  /**
    Level of hierarchy, that already was loaded.

    @property hierarchyLoadedLevel
    @type Integer
    @default -1
  */
  hierarchyLoadedLevel: -1,

  /**
    Name of action to send out, action triggered by click on user button in row.

    @property customButtonInRowAction
    @type String
    @default 'customButtonInRowAction'
  */
  customButtonInRowAction: 'customButtonInRowAction',

  actions: {
    /**
      Handler for click by custom button in row.
      Sends action up to {{#crossLink "ObjectListViewComponent"}}`object-list-view`{{/crossLink}} component.

      @method actions.customButtonInRowAction
      @param {Function|String} action The action or name of action.
      @param {DS.Model} model Model in row.
    */
    customButtonInRowAction(action, model) {
      let actionType = typeof action;
      if (actionType === 'function') {
        action(model);
      } else if (actionType === 'string') {
        this.sendAction('customButtonInRowAction', action, model);
      } else {
        throw new Error('Unsupported action type for custom buttons in row.');
      }
    },

    /**
      Show/hide embedded records.

      @method actions.expand
    */
    expand() {
      this.toggleProperty('_expanded');
    },

    /**
      Loads and, by default, displays the records that are children of the record displayed on this row.

      @method actions.loadChildRecords
      @param {Boolean} [expand=true] If `true`, the child records will be displayed by sending the `expand` event.
    */
    loadChildRecords(expand = true) {
      const id = this.get('record.data.id');
      const currentLevel = this.get('_currentLevel');
      const hierarchyLoadedLevel = this.get('hierarchyLoadedLevel');

      this.sendAction('loadRecords', id, this, 'records', currentLevel > hierarchyLoadedLevel);
      this.set('recordsLoaded', true);

      if (currentLevel > hierarchyLoadedLevel) {
        this.set('hierarchyLoadedLevel', currentLevel);
      }

      if (expand) {
        this.send('expand');
      }
    },

    /**
      Redirect action from FlexberryLookupComponent in the controller.

      @method actions.showLookupDialog
      @param {Object} chooseData
    */
    showLookupDialog(chooseData) {
      this.get('currentController').send('showLookupDialog', chooseData);
    },

    showLookupMultiSelectDialog(chooseData) {
      this.get('currentController').send('showLookupMultiSelectDialog', chooseData);
    },

    /**
      Redirect action from FlexberryLookupComponent in the controller.

      @method actions.removeLookupValue
      @param {Object} removeData
    */
    removeLookupValue(removeData) {
      this.get('currentController').send('removeLookupValue', removeData);
    },

    /**
      Redirect action from FlexberryLookupComponent in the controller.
      @method actions.previewLookupValue
      @param {Object} previewData
    */
    previewLookupValue(previewData) {
      this.get('currentController').send('previewLookupValue', previewData);
    },

    /**
      Handles rows clicks and sends 'rowClick' action outside.

      @method actions.onRowClick
      @param {Object} record Record related to clicked row.
      @param {Object} params Additional parameters describing clicked row.
      @param {Object} params.column Column in row wich owns the clicked cell.
      @param {Number} params.columnIndex Index of column in row wich owns the clicked cell.
      @param {Object} e Click event object.
    */
    onRowClick(record, params, e) {
      if (!isBlank(e)) {
        set(params, 'originalEvent', $.event.fix(e));
      }

      this.get('rowClick')(record, params);
    }
  },

  init() {
    this._super(...arguments);
  },

  /**
    Called after a component has been rendered, both on initial render and in subsequent rerenders.
    [More info](https://emberjs.com/api/ember/release/classes/Component#event_didRender).

    @method didRender
  */
  didRender() {
    this._super(...arguments);
    if (!this.get('recordsLoaded')) {
      const id = this.get('record.data.id');
      if (id && this.get('inHierarchicalMode') && this.get('isParentRecord') === undefined) {
        this.send('loadChildRecords', false);
      }
    }
  },
});
