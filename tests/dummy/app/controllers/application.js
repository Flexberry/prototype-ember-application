import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import config from '../config/environment';
import { isNone } from '@ember/utils';
import $ from 'jquery';

const version = config.APP.version;

export default Controller.extend({
  /**
    Service that triggers objectlistview events.

    @property objectlistviewEventsService
    @type Service
  */
  objectlistviewEventsService: service('objectlistview-events'),

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: service(),

  router: service(),

  actions: {
    /**
      Call `updateWidthTrigger` for `objectlistviewEventsService`.

      @method actions.updateWidth
    */
    updateWidth() {
      this.get('objectlistviewEventsService').updateWidthTrigger();
    },

    /**
      Toggles application sitemap's side bar.

      @method actions.toggleSidebar
    */
    toggleSidebar() {
      let sidebar = $('.ui.sidebar.main.menu');
      sidebar.sidebar('toggle');
      sidebar.toggleClass('sidebar-mini');

      let $sitemapSearchInput = $('.sitemap-search-input');

      if (sidebar.hasClass('sidebar-mini')) {
        $sitemapSearchInput.addClass('hidden');
      } else {
        $sitemapSearchInput.removeClass('hidden');
      }

      $('.full.height').toggleClass('content-opened');

      $('.sidebar.icon .text_menu').toggleClass('hidden');
      $('.sidebar.icon').toggleClass('text-menu-show');
      $('.sidebar.icon').toggleClass('text-menu-hide');
      $('.bgw-opacity').toggleClass('hidden');
      $('.icon-guideline-search').toggleClass('visible');

      // For reinit overflowed tabs.
      $(window).trigger('resize');
    },

    /**
      Toggles application sitemap's side bar in mobile view.

      @method actions.toggleSidebarMobile
    */
    toggleSidebarMobile() {
      $('.ui.sidebar.main.menu').sidebar('toggle');

      $('.sidebar.icon').toggleClass('text-menu-show');
      $('.sidebar.icon').toggleClass('text-menu-hide');
      $('.sidebar.icon').toggleClass('hidden-text');
      $('.bgw-opacity').toggleClass('hidden');

      if (!this.get('_hideEventIsAttached')) {
        $('.ui.sidebar.main.menu').sidebar('attach events', '.ui.sidebar.main.menu .item a', 'hide');
        this.set('_hideEventIsAttached', true);
      }
    },

    /**
      Осуществляет выход текущего пользователя из приложения и переход к логин-форме.

      @method actions.logout
    */
    logout() {
      this.transitionToRoute('login');
    },

    onMenuItemClick(e) {
      let namedItemSpans = $(e.currentTarget).find('span');
      if (namedItemSpans.length <= 0) {
        return;
      }

      let i18n = this.get('i18n');
      let namedSetting = namedItemSpans.get(0).innerText;

      switch (namedSetting) {
        case i18n.t('forms.application.header.logout.caption').toString(): {
          this.send('logout');
          break;
        }
      }
      return null;
    },

    /**
      Select themes.
      @method actions.changeTheme
    */
    changeTheme(value) {
      let sheet = document.querySelector('#theme');
      if (!sheet) {
        return;
      }

      let rootURL = this.get('router.location.location.origin') + config.rootURL;
      sheet.setAttribute('href', `${rootURL}assets/${value}.css`);
    }
  },

  /**
    Flag: indicates that form to which controller is related designed for acceptance tests &
    all additional markup in application.hbs mustn't be rendered.

    @property isInAcceptanceTestMode
    @type Boolean
    @default false
  */
  isInAcceptanceTestMode: false,

  /**
    Currernt addon version.

    @property addonVersion
    @type String
  */
  addonVersion: version,

  /**
    Link to GitHub commit related to current addon version.

    @property addonVersionHref
    @type String
  */
  addonVersionHref: computed('addonVersion', function() {
    let addonVersion = this.get('addonVersion');
    let commitSha = addonVersion.split('+')[1];

    return 'https://github.com/Flexberry/ember-flexberry/commit/' + commitSha;
  }),

  /**
    Flag: indicates whether current browser is internet explorer.

    @property browserIsInternetExplorer
    @type Boolean
  */
  browserIsInternetExplorer: computed(function() {
    let userAgent = window.navigator.userAgent;

    return userAgent.indexOf('MSIE ') > 0 || userAgent.indexOf('Trident/') > 0 || userAgent.indexOf('Edge/') > 0;
  }),

  /**
    Locales supported by application.

    @property locales
    @type String[]
    @default undefined
  */
  locales: undefined,

  /**
    Themes supported by application.
    @property themes
    @type String[]
    @default ['purple', 'dark', 'default']
  */
  themes: undefined,

  /**
    Handles changes in userSettingsService.isUserSettingsServiceEnabled.

    @method _userSettingsServiceChanged
    @private
  */
  _userSettingsServiceChanged: observer('userSettingsService.isUserSettingsServiceEnabled', function() {
    this.send('onRefresh');
  }),

  /**
    Initializes controller.
  */
  init() {
    this._super(...arguments);

    this.set('themes', ['purple', 'dark', 'default']);

    let i18n = this.get('i18n');
    if (isNone(i18n)) {
      return;
    }

    // Add locales.
    this.set('locales', ['ru', 'en']);

    // If i18n.locale is long value like 'ru-RU', 'en-GB', ... this code will return short variant 'ru', 'en', etc.
    let shortCurrentLocale = this.get('i18n.locale').split('-')[0];
    let availableLocales = A(this.get('locales'));

    // Force current locale to be one of available,
    // if browser's current language is not supported by dummy application,
    // or if browser's current locale is long value like 'ru-RU', 'en-GB', etc.
    if (!availableLocales.includes(shortCurrentLocale)) {
      i18n.set('locale', 'en');
    } else {
      i18n.set('locale', shortCurrentLocale);
    }
  },

  /**
    Application sitemap.

    @property sitemap
    @type Object
  */
  sitemap: computed('i18n.locale', function() {
    let i18n = this.get('i18n');

    return {
      nodes: [{
        link: 'index',
        caption: i18n.t('forms.application.sitemap.index.caption'),
        title: i18n.t('forms.application.sitemap.index.title'),
        icon: 'icon-guideline-user',
        children: null
      }, {
        link: null,
        caption: i18n.t('forms.application.sitemap.application.caption'),
        title: i18n.t('forms.application.sitemap.application.title'),
        icon: 'icon-guideline-grid',
        children: [{
          link: 'ember-flexberry-dummy-application-user-list',
          caption: i18n.t('forms.application.sitemap.application.application-users.caption'),
          title: i18n.t('forms.application.sitemap.application.application-users.title'),
          children: null
        }, {
          link: 'ember-flexberry-dummy-localization-list',
          caption: i18n.t('forms.application.sitemap.application.localizations.caption'),
          title: i18n.t('forms.application.sitemap.application.localizations.title'),
          children: null
        }, {
          link: 'ember-flexberry-dummy-suggestion-list',
          caption: i18n.t('forms.application.sitemap.application.suggestions.caption'),
          title: i18n.t('forms.application.sitemap.application.suggestions.title'),
          children: null
        }, {
          link: 'ember-flexberry-dummy-suggestion-type-list',
          caption: i18n.t('forms.application.sitemap.application.suggestion-types.caption'),
          title: i18n.t('forms.application.sitemap.application.suggestion-types.title'),
          children: null
        }, {
          link: 'ember-flexberry-dummy-multi-list',
          caption: i18n.t('forms.application.sitemap.application.multi.caption'),
          title: i18n.t('forms.application.sitemap.application.multi.title'),
          children: null
        }, {
          link: 'ember-flexberry-dummy-suggestion-file-list',
          caption: i18n.t('forms.application.sitemap.application.suggestion-file.caption'),
          title: i18n.t('forms.application.sitemap.application.suggestion-file.title'),
          children: null
        }]
      }, {
        link: null,
        caption: i18n.t('forms.application.sitemap.log-service-examples.caption'),
        title: i18n.t('forms.application.sitemap.log-service-examples.title'),
        icon: 'icon-guideline-edit-note',
        children: [{
          link: 'i-i-s-caseberry-logging-objects-application-log-l',
          caption: i18n.t('forms.application.sitemap.log-service-examples.application-log.caption'),
          title: i18n.t('forms.application.sitemap.log-service-examples.application-log.title'),
          children: null,
          icon: 'icon-guideline-edit-note'
        }, {
          link: 'log-service-examples/settings-example',
          caption: i18n.t('forms.application.sitemap.log-service-examples.settings-example.caption'),
          title: i18n.t('forms.application.sitemap.log-service-examples.settings-example.title'),
          children: null,
          icon: 'icon-guideline-setting'
        }, {
          link: 'log-service-examples/clear-log-form',
          caption: i18n.t('forms.application.sitemap.log-service-examples.clear-log-form.caption'),
          title: i18n.t('forms.application.sitemap.log-service-examples.clear-log-form.title'),
          children: null,
          icon: 'icon-guideline-delete'
        }]
      }, {
        link: null,
        caption: i18n.t('forms.application.sitemap.lock.caption'),
        title: i18n.t('forms.application.sitemap.lock.caption'),
        icon: 'icon-guideline-lock',
        children: [{
          link: 'new-platform-flexberry-services-lock-list',
          caption: i18n.t('forms.application.sitemap.lock.title'),
          title: i18n.t('forms.application.sitemap.lock.title'),
          children: null
        }]
      }, {
        link: null,
        caption: i18n.t('forms.application.sitemap.components-examples.caption'),
        title: i18n.t('forms.application.sitemap.components-examples.title'),
        icon: 'icon-guideline-date',
        children: [{
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-button.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-button.title'),
          children: [{
            link: 'components-examples/flexberry-button/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-button.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-button.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-checkbox.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-checkbox.title'),
          children: [{
            link: 'components-examples/flexberry-checkbox/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-checkbox.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-checkbox.settings-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-checkbox/three-state-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-checkbox.three-state-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-checkbox.three-state-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-ddau-checkbox.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-ddau-checkbox.title'),
          children: [{
            link: 'components-examples/flexberry-ddau-checkbox/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-ddau-checkbox.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-ddau-checkbox.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.title'),
          children: [{
            link: 'components-examples/flexberry-dropdown/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.settings-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-dropdown/conditional-render-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.conditional-render-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.conditional-render-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-dropdown/empty-value-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.empty-value-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.empty-value-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-dropdown/items-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.items-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-dropdown.items-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-field.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-field.title'),
          children: [{
            link: 'components-examples/flexberry-field/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-field.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-field.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-file.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-file.title'),
          children: [{
            link: 'components-examples/flexberry-file/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-file.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-file.settings-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-file/flexberry-file-in-modal',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-file.flexberry-file-in-modal.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-file.flexberry-file-in-modal.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.title'),
          children: [{
            link: 'components-examples/flexberry-groupedit/model-update-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.model-update-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.model-update-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/custom-buttons-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.custom-buttons-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.custom-buttons-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/groupedit-with-multiselect-list',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.groupedit-with-multiselect.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.groupedit-with-multiselect.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/dynamic-groupedit',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.dynamic-groupedit.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.dynamic-groupedit.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.settings-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/configurate-row-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.configurate-row-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.configurate-row-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/ember-flexberry-dummy-suggestion-list-groupedit-with-lookup-with-computed-atribute',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.groupedit-with-lookup-with-computed-atribute.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.groupedit-with-lookup-with-computed-atribute.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/ember-flexberry-dummy-suggestion-list-readonly-columns-by-configurate-row-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.readonly-columns-by-configurate-row-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.readonly-columns-by-configurate-row-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-groupedit/field-readonly-status-depend-on-another-field-value',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.field-readonly-status-depend-on-another-field-value.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-groupedit.field-readonly-status-depend-on-another-field-value.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.title'),
          children: [{
            link: 'components-examples/flexberry-lookup/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.settings-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/customizing-window-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.customizing-window-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.customizing-window-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/hierarchy-olv-in-lookup-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.hierarchy-olv-in-lookup-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.hierarchy-olv-in-lookup-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/limit-function-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.limit-function-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.limit-function-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/limit-function-through-dynamic-properties-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.limit-function-through-dynamic-properties-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.limit-function-through-dynamic-properties-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/lookup-block-form-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.lookup-block-form-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.lookup-block-form-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/lookup-in-modal',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.lookup-in-modal.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.lookup-in-modal.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/lookup-in-modal-autocomplete',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.lookup-in-modal-autocomplete.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.lookup-in-modal-autocomplete.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/dropdown-mode-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.dropdown-mode-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.dropdown-mode-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/default-ordering-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.default-ordering-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.default-ordering-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/autocomplete-order-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.autocomplete-order-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.autocomplete-order-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/autocomplete-in-gropedit-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.autocomplete-in-groupedit-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.autocomplete-in-groupedit-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/compute-autocomplete/compute-autocomplete-list',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.compute-autocomplete.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.compute-autocomplete.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/numeric-autocomplete',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.numeric-autocomplete.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.numeric-autocomplete.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/autofill-by-limit-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.autofill-by-limit-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.autofill-by-limit-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-lookup/user-settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.user-settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-lookup.user-settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-multiple-lookup.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-multiple-lookup.title'),
          children: [{
            link: 'components-examples/flexberry-multiple-lookup/multiple-lookup',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-multiple-lookup.multiple-lookup.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-multiple-lookup.multiple-lookup.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-multiple-lookup/configurate-tags',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-multiple-lookup.configurate-tags.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-multiple-lookup.configurate-tags.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-menu.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-menu.title'),
          children: [{
            link: 'components-examples/flexberry-menu/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-menu.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-menu.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.title'),
          children: [{
            link: 'components-examples/flexberry-objectlistview/limit-function-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.limit-function-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.limit-function-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/inheritance-models',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.inheritance-models.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.inheritance-models.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.settings-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/toolbar-custom-buttons-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.toolbar-custom-buttons-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.toolbar-custom-buttons-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/on-edit-form',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.on-edit-form.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.on-edit-form.title'),
          }, {
            link: 'components-examples/flexberry-objectlistview/list-on-editform',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.list-on-editform.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.list-on-editform.title'),
          }, {
            link: 'components-examples/flexberry-objectlistview/custom-filter',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.custom-filter.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.custom-filter.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/edit-form-with-detail-list',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.edit-form-with-detail-list.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.edit-form-with-detail-list.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/hierarchy-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.hierarchy-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.hierarchy-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/hierarchy-paging-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.hierarchy-paging-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.hierarchy-paging-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/configurate-rows',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.configurate-rows.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.configurate-rows.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/downloading-files-from-olv-list',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.downloading-files-from-olv-list.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.downloading-files-from-olv-list.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/selected-rows',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.selected-rows.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.selected-rows.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/object-list-view-resize',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.object-list-view-resize.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.object-list-view-resize.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/return-with-query-params/ember-flexberry-dummy-suggestion-return-with-query-params-list',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.return-from-ediform.title'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.return-from-ediform.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/lock-services-editor-view-list',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.lock-services-editor-view-list.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.lock-services-editor-view-list.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/limited-text-size-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.limited-text-size-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.limited-text-size-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-objectlistview/toolbar-custom-components-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.toolbar-custom-components-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-objectlistview.toolbar-custom-components-example.title'),
            children: null
          }
        ]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-simpledatetime.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-simpledatetime.title'),
          children: [{
            link: 'components-examples/flexberry-simpledatetime/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-simpledatetime.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-simpledatetime.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-tab-bar.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-tab-bar.title'),
          children: [{
            link: 'components-examples/flexberry-tab-bar/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-tab-bar.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-tab-bar.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-text-cell.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-text-cell.title'),
          children: [{
            link: 'components-examples/flexberry-text-cell/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-text-cell.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-text-cell.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-textarea.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-textarea.title'),
          children: [{
            link: 'components-examples/flexberry-textarea/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-textarea.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-textarea.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-textbox.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-textbox.title'),
          children: [{
            link: 'components-examples/flexberry-textbox/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-textbox.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-textbox.settings-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.title'),
          children: [{
            link: 'components-examples/flexberry-toggler/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.settings-example.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-toggler/settings-example-inner',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.settings-example-inner.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.settings-example-inner.title'),
            children: null
          }, {
            link: 'components-examples/flexberry-toggler/ge-into-toggler-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.ge-into-toggler-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-toggler.ge-into-toggler-example.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.flexberry-tree.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.flexberry-tree.title'),
          children: [{
            link: 'components-examples/flexberry-tree/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.flexberry-tree.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.flexberry-tree.settings-example.title'),
            children: null
          }]
        }, {
          link: 'components-examples/highload-edit-form-menu/index',
          caption: i18n.t('forms.application.sitemap.components-examples.highload-edit-form-menu.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.highload-edit-form-menu.title'),
          children: null
        }, {
          link: 'components-examples/modal-dialog',
          caption: i18n.t('forms.application.sitemap.components-examples.modal-dialog.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.modal-dialog.title'),
          children: null
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.components-examples.ui-message.caption'),
          title: i18n.t('forms.application.sitemap.components-examples.ui-message.title'),
          children: [{
            link: 'components-examples/ui-message/settings-example',
            caption: i18n.t('forms.application.sitemap.components-examples.ui-message.settings-example.caption'),
            title: i18n.t('forms.application.sitemap.components-examples.ui-message.settings-example.title'),
            children: null
          }]
        }]
      }, {
        link: null,
        caption: i18n.t('forms.application.sitemap.integration-examples.caption'),
        title: i18n.t('forms.application.sitemap.integration-examples.title'),
        icon: 'icon-guideline-group-plus',
        children: [{
          link: null,
          caption: i18n.t('forms.application.sitemap.integration-examples.edit-form.caption'),
          title: i18n.t('forms.application.sitemap.integration-examples.edit-form.title'),
          children: [{
            link: 'integration-examples/edit-form/readonly-mode',
            caption: i18n.t('forms.application.sitemap.integration-examples.edit-form.readonly-mode.caption'),
            title: i18n.t('forms.application.sitemap.integration-examples.edit-form.readonly-mode.title'),
            children: null
          }, {
            link: 'integration-examples/edit-form/validation',
            caption: i18n.t('forms.application.sitemap.integration-examples.edit-form.validation.caption'),
            title: i18n.t('forms.application.sitemap.integration-examples.edit-form.validation.title'),
            children: null
          }, {
            link: 'integration-examples/edit-form/theming-components',
            caption: i18n.t('forms.application.sitemap.integration-examples.edit-form.theming-components.caption'),
            title: i18n.t('forms.application.sitemap.integration-examples.edit-form.theming-components.title'),
            children: null
          }]
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.integration-examples.odata-examples.caption'),
          title: i18n.t('forms.application.sitemap.integration-examples.odata-examples.title'),
          children: [{
            link: null,
            caption: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.caption'),
            title: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.title'),
            children: [{
              link: 'integration-examples/odata-examples/get-masters/ember-flexberry-dummy-sotrudnik-l',
              caption: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.sotrudnik.caption'),
              title: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.sotrudnik.title'),
              children: null
            }, {
              link: 'integration-examples/odata-examples/get-masters/ember-flexberry-dummy-departament-l',
              caption: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.departament.caption'),
              title: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.departament.title'),
              children: null
            }, {
              link: 'integration-examples/odata-examples/get-masters/ember-flexberry-dummy-vid-departamenta-l',
              caption: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.vid-departamenta.caption'),
              title: i18n.t('forms.application.sitemap.integration-examples.odata-examples.get-masters.vid-departamenta.title'),
              children: null
            }]
          }]
        }, {
          link: 'integration-examples/ember-flexberry-icons',
          caption: i18n.t('forms.application.sitemap.integration-examples.icons.caption'),
          title: i18n.t('forms.application.sitemap.integration-examples.icons.title'),
          children: null
        }]
      }, {
        link: null,
        caption: i18n.t('forms.application.sitemap.user-setting-forms.caption'),
        title: i18n.t('forms.application.sitemap.user-setting-forms.title'),
        icon: 'icon-guideline-setting',
        children: [{
          link: 'user-setting-forms/user-setting-delete',
          caption: i18n.t('forms.application.sitemap.user-setting-forms.user-setting-delete.caption'),
          title: i18n.t('forms.application.sitemap.user-setting-forms.user-setting-delete.title'),
          children: null
        }]
      }]
    };
  }),

  /**
    Application usermenu.

    @property itemsUserMenu
    @type Object
  */
  itemsUserMenu: computed('i18n.locale', function() {
    let i18n = this.get('i18n');
    let rootItem = {
      icon: 'dropdown icon',
      title: i18n.t('forms.application.header.profile.caption'),
      iconAlignment: 'right',
      items: []
    };
    let device = this.get('device');
    if (device.type() === 'phone') {
      rootItem = {
        icon: '',
        title: '',
        iconAlignment: 'right',
        items: []
      };
    }

    let itemsUserMenu = {
      title: i18n.t('forms.application.header.logout.caption'),
      items: null
    };

    rootItem.items[rootItem.items.length] = itemsUserMenu;
    return [rootItem];
  }),
});
