# Ember Flexberry Changelog
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [3.14.0-beta.1] - 2024-10-29
### Added
* The `object-list-view` component:
    * Apply sorting for hierarchycal records.

## [3.13.1] - 2024-10-21
### Fixed
* The `flexberry-objectlistview` component:
    * Child's menu item in hierarchy mode.

## [3.13.0] - 2024-08-26
### Added
* The `flexberry-multiple-lookup` component:
    * Added tag configuration by componentName.
* Added voice typing to components:
    * `flexberry-field`
    * `flexberry-textarea`
    * `flexberry-textbox`
    * Search in `flexberry-objectlistview`
* The `object-list-view` component:
    * Added limiting multilists by model field.
* Blueprints:
    * The `flexberry-model` added presence validator for not null attributes with non-standart types, including enum type.

### Fixed
* The `flexberry-file` component:
    * Fixed image preview after upload action.

## [3.12.0] - 2024-05-03
### Changed
* Update `ember-flexberry-themes` to version `0.3.0-beta.8`.
* Update `ember-flexberry-data` to version `3.12.0`.
* Set version of `ember-cli-moment-shim` to strictly `3.6.0`.
* Set version of `tmp` to strictly `0.2.1`.

### Fixed
* The `flexberry-simpledatetime` component:
    * Fixed minimum date limit.
* The `flexberry-lookup` component:
    * Fixed search reset in dropdown-mode.
* The `flexberry-multiple-lookup` component:
    * Fixed error in console.

## [3.11.0] - 2023-11-09
### Added
* Added information about updating component templates.
### Changed
* Update dependency on `ember-flexberry-data` to version `3.11.0`.
### Fixed
* Add fixable component for lookup in dropdown mode found inside the flexberry-groupedit.

## [3.11.0-beta.1] - 2023-11-02
### Changed
* Update dependency on `ember-flexberry-data` to version `3.11.0-beta.1`.

## [3.10.1] - 2023-09-15
### Added
* The `flexberry-groupedit` component:
    * Added sorting for mobile mode.

### Fixed
* The `flexberry-multiple-lookup` component:
    * Fixed tags customization on init.
* The `flexberry-lookup` component:
    * Fixed cached values when limit function changed in dropdown mode.
* The `flexberry-objectlistview` component:
    * Fixed removal of interval filters.

## [3.10.0] - 2023-08-23
### Added
* Color scheme change.
* Added `flexberry-sitemap-searchbar` component.
* Added `olv-pagination` component.
* The `flexberry-multiple-lookup` component:
    * Added tags customization.
* The `flexberry-objectlistview` component:
    * Added interval filter for dates.

## [3.9.0] - 2023-07-20
### Added
* The `flexberry-multiple-lookup` component:
    * Added `chooseComponentVisibility` property.
* The `flexberry-objectlistview` component:
    * Added functionality to embed custom components in the `olv-toolbar`.
    * Added dropdown in the filter for directories.
* The `flexberry-groupedit` component:
    * Added multiselect for details.
* The `flexberry-lookup` component:
    * Added lookup action `updateLookupValue`.
* Added ability to add custom attributes types.

### Changed
* Updated validation visibility call and add required marker.
* The `flexberry-objectlistview` component:
    * Updated flexberry-menu structure in the `olv-toolbar`.

### Fixed
* Blueprints:
    * Check existing icons in application controller.

## [3.8.0] - 2023-04-25
### Added
* `guideline-calculate` icon.
* `flexberry-simpledatetime` `onChange` function.
* `flexberry-simpledatetime` custom date format support.
* Addon order with `ember-flexberry-data`.
* The `highload-edit-form-menu` component.
* `route-history` service.
* `flexberry-groupedit`'s custom buttons in row.
* `flexberry-edit-panel` component for responsive edit panel buttons.
* Blueprints:
    * Add ability to exclude localization on generation.
    * Generate `flexberry-edit-panel` on edit form.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.8.0`.
* Generated unit tests blueprint.
* The `flexberry-objectlistview` component:
    * Moved `_conditionsByType` function with default filter conditions to utils.

### Fixed
* `modal-dialog` scrolling content class.
* `controller` usage in `list-form` route model.
* Locks creating.
* Batch save for detail on separate route.
* `flexberry-simpledatetime` current date manual enter.
* Filter for `decimal` and `between`.
* The `flexberry-objectlistview` component:
    * `simpledatetime` in filter.

## [2.8.0] - 2023-03-13
### Added
* The `flexberry-file` component:
    * Drag-and-drop support.
* The `flexberry-objectlistview` component:
    * Added property `filterProjectionName` to limit applied to properties list for filter on toolbar.
* The `flexberry-lookup` component:
    * Added support of property `filterProjectionName` of `flexberry-objectlistview` on modal window (it sets throught `lookupWindowCustomProperties`).
    * Event `lookupOnDataLoaded` for `flexberry-lookup` component to detect time of data loading completed.
* Blueprints:
    * Add generating lookups in dropdown mode.

### Changed
* Update dependency on `ember-flexberry-data` to version `2.8.0`.

### Fixed
* The `flexberry-lookup` component:
    * Default user settings usage.

## [3.7.0] - 2022-05-17
### Added
* Changes up to `2.7.0` version.
* Lookup's sidepage mode in generated app.
* Optional support for `ember-validations` addon.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.7.0`.
* If not specified, default locale would be browser's or system locale.
* En locale generates from captions.

### Fixed
* En locale for application menu.
* Filtering and sorting on list forms in generated application.
* En locale for application caption and application title.
* Settings getting in `user-setting` and `adv-limit` services.
* Work with empty current app page in `adv-limit` services.
* Dropdown value as enum with empty string element.
* Null content check in `object-list-view`.

## [2.7.0] - 2022-05-17
### Added
* The `flexberry-lookup` component:
    * Option `emptyValueAtEnd` for the dropdown mode.
* Optional `ember-cp-validations` support.
* The `fixable-component` mixin:
    * `parentComponent` property.
* The `flexberry-edit-form` blueprint supports `ember-cp-validations` addon.
* The `validationModel` property of `edit-form` controller.

### Changed
* The `flexberry-model-init` blueprint check additional options for audit and insert necessary mixin.
* The `flexberry-objectlistview` deletes only record itself and unloads its details (details are deleted on database by ORM or by adapter on offline).
* The `flexberry-objectlistview` and `flexberry-groupedit` components:
    * Rows can be selected in readonly mode.
* Update dependency on `ember-flexberry-data` to version `2.7.0`.

### Fixed
* The `flexberry-objectlistview` component:
    * Using of `perPage` setting at `developerUserSettings`.
* Validation for deleted records in `flexberry-groupedit` on `edit-form`.
* The `flexberry-groupedit` component:
    * Optimized sort function.
* The `flexberry-groupedit` component:
    * Lookup's autocomplite and dropdown groupedit container overflow.

### Breaking changes
* Deleted `custom-inflector-rules`.
* The `flexberry-datepicker` component was removed.
* The `daterangepicker` `bower`-package was removed from dependencies.
* The `moment` `bower`-package was added to dependencies.

### Deprecated
* The `validationObject` property of `edit-form` controller.

## [3.6.1] - 2021-08-19
### Fixed
* The `adv-limit` service's `init` method.

## [3.6.0] - 2021-08-16
### Added
* Changes from [`2.6.0`](#260---2021-06-16) and [`2.6.1`](#261---2021-07-02) versions.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.6.0`.
* Add some improvements for UI of generated application.

### Fixed
* The `flexberry-lookup` component in dropdown mode wrong calculate position.

## [2.6.1] - 2021-07-02
### Fixed
* The `flexberry-model` blueprint generated wrong model mixin when project contains `ember-cp-validations` dependency.

### Changed
* Update dependency on `ember-flexberry-data` to version `2.6.0`.

## [2.6.0] - 2021-06-16
### Added
* The `flexberry-file` component:
    * Added upload/download file options for mobile component's menu.
* The `flexberry-objectlistview` component:
    * The `hierarchyAttribute` property.
    * Default test selector.
    * Button to clear the filter in a column.
* The `flexberry-lookup` component:
    * Support for component's block form, which was previously only available in the mobile version.
    * The `lookupOnChange` event in the `LookupEvents` service, called when the value in the component changes.
    * The `autocompleteDirection` property to set direction of autocomplete window.
* Support of `errors` property change for `flexberry-validationsummary`.
* The `indeterminate` mode for `flexberry-checkbox` by setting `isNullable`.
* The `isDesktop` and `isMobile` methods for `device` service.
* Ability to define default user settings for the type of models to be used in the lists.
* The `hasShadow` and `hasBorder` properties for `flexberry-toggler` component.
* The `validationObject` property, `validate` and `saveModel` methods for `edit-form` controller.
* The localization of the `loading` template.

### Fixed
* The `device` service:
    * `isTv` method.
* The `edit-form-new` route:
    * Returning promise in model.
* The `default-user-setting` blueprint:
    * Init component path.
* The `flexberry-objectlistview` component:
    * Check all rows with respect to `rowConfig.canBeSelected` option.
    * Add ability to on and off hierarchical mode when component is in hierarchical mode initially.
* Show save notifications on the edit form.
* The `updateLookupAction` action in the `flexberry-lookup` component is not called when a value is selected in a modal window.
* The `index` route is no longer generated in the `flexberry-application` blueprint. Because of this, some of the application regeneration methods did not work.
* In the row click handler, in the `flexberry-objectlistview` component, async operations outside the ember run loop were used. Now you can just do `click(row)` in your tests.

### Changed
* Replace `semantic-ui-daterangepicker` dependency with `daterangepicker` 3.0.5.
* Replace test models localization with separated classes.
* Now the `flexberry-objectlistview` component is generated with the `showCheckBoxInRow` option set to `true` value on the list form.
* The `flexberry-acceptance-test` blueprint:
    * An `[AGAT]` tag is added to the name of each test module, which can be used to run the desired test suite. For example `ember test --filter="AGAT"`.
    * Tests are now generated in the `acceptance\flexberry` directory and are overwritten by default on every generation.
    * Now the generated test covers several more scenarios.

### Deprecated
* The `run.after` method, which is added by the `ember-run-after` initializer.

### Breaking changes
* The `flexberry-lookup` component:
    * Removed mobile template.
    * An exception will be thrown when trying to use the block form of the component with `autocomplete` or `dropdown` options.

## [3.5.0] - 2020-09-17
### Added
* Changes from [`2.5.0`](#250---2020-09-10) version.

### Fixed
* Generating and displaying validations in edit forms.
* Some problems with the styles of the `ui-message` component. Add `@flexberry-uimessage: 'YOUR_THEME';` and replace `@message: 'default';` with `@message: 'YOUR_THEME';` in your application's `theme.config` file.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.5.0`.

## [2.5.0] - 2020-09-10
### Added
* The `flexberry-file` component:
    * Type checking for files selected using the component. Use the `accept` property and the `isValidTypeFileCustom` action to configure.
    * When limiting the file size, the ability to specify the units of measurement in the `maxUploadFileSizeUnit` property.
* In all components of lists:
    * Mobile version of the export to `Excel` and configure list window.
    * The ability to return promises from the `confirmDeleteRow` and `confirmDeleteRows` actions, now you can not toil with the `beforeDeleteRecord` action.
    * The `confirmDeleteRow` action gets the record to be deleted as the first parameter.
* The `useOkButton` and `useCloseButton` properties in the `flexberry-error` component to customize nested the `modal-dialog` component.
* The `flexberry-menu` component:
    * The ability to add buttons to menu items.
    * The `settings` property for the dropdown from `Semantic UI`.
* The `flexberry-objectlistview` component:
    * The ability to optimize the loading of the hierarchical list ([learn more](https://flexberry.github.io/en/fe_setting-lists.html#configuring-a-hierarchical-list)).
    * Page number input field to go to it.
    * Menu for selecting rows and displaying sorting in the mobile version of the component.
* The `flexberry-acceptance-test` blueprint for generating tests for your application.
* Config update on install for dummy app of addon in default blueprint.

### Fixed
* Attributes with selectors for testing are not generated correctly in the generated application.
* Saving on the edit form is not performed in offline mode.
* The `flexberry-groupedit` component:
    * When component has only one row, the menu for that row is displayed as if it were the last row.
    * Duplicate rows when an array other than `DS.ManyArray` is used as content.
* The `flexberry-file` component:
    * Without the related model, the component cannot be used.
    * Not displaying correctly when deleting the file in the related model from the controller.
* The `flexberry-lookup` component:
    * The modal window settings specified in the `lookupSettings.modalDialogSettings` property of the controller were not applied.
    * The modal window settings specified through the `modalDialogSettings` property are lost when switching pages.
    * Clicking on `...` in the results for autocomplete inserts `...` into the component.
    * Pagination in the results for autocomplete.
* Double loading of data on the list ([PR#1150](https://github.com/Flexberry/ember-flexberry/pull/1150)).
* Some filtering issues in modal window in `flexberry-objectlistview` component ([PR#1144](https://github.com/Flexberry/ember-flexberry/pull/1144)).
* Generation of locales for dummy app of the generated addon.

### Changed
* Design of an element for customizing the sorting of columns, in the export to `Excel` and configure list window. Symbols are replaced with a description.
* For all the `button` elements used in templates, the `type` attribute with the `button` value is added.
* In the mobile version of the `flexberry-objectlistview` component, the pagination block is now above the list and shows fewer pages.
* Now the default value of the `searchForContentChange` property in the `flexberry-groupedit` component is `true`.
* Update dependency on `ember-flexberry-data` to version `2.5.0`.

### Breaking changes
* Removed the `parse-cols-config-sorting` helper.

## [3.4.0] - 2020-07-10
### Added
* Changes from [`2.4.0`](#240---2020-05-18) version.
* A new theme with the name `ghost` and beautiful design, when generating, add the `--new-theme` parameter with the value `true` to get the application with the new theme.
* The `flexberry-simpledatetime` component:
    * The `calendarContext` property for the ability to change the root element for a `flatpickr` calendar.
    * A button inside the value input field to open the calendar.
* The `flexberry-objectlistview` component:
    * The `columnsResizeMode` property for passing as the `resizeMode` option to the `colResizable` plugin.
    * The ability to go to a given page by simply entering its number in the input field.
* The `modal-dialog` component:
    * The `scrolling` class for the `DIV` element with nested content.
    * The `useSidePageMode` property to open the modal window to the right of the screen, instead of the classic mode.
* The `useSidePageMode` property in the `flexberry-objectlistview`, `flexberry-groupedit`, and `flexberry-lookup` components to configure the modal windows used by the components.
* The `settings` property in the `flexberry-menu` component for specifying settings from the `SemanticUI`.
* Setting the `useSidePageMode`, `showAsteriskInRow`, and `calendarContext` properties for the components `flexberry-objectlistview`, `flexberry-groupedit`, `flexberry-lookup`, and `flexberry-simpledatetime` from the application configuration.
* Dependencies in the generated application on the `npm`-packages `autoprefixer` and `ember-flexberry-themes`.

### Fixed
* The `flexberry-lookup` component:
    * Clicking on `...` in the results for autocomplete inserts `...` into the component.
    * Switch pages in the results for autocomplete.
    * In the mobile version of the component, in the `dropdown` mode, the list of values is not loaded.
* The name of the selected file is not displayed in the `flexberry-file` component when working in the `Internet Explorer` browser.
* Validation is not performed before saving the model in the `edit-form` controller.
* The value in the `flexberry-dropdown` component does not change the first time it is selected.
* Imports are not generated for enumerations in the `flexberry-model` blueprint.
* Using the `parentParameters` object to pass the `parentRoute` and `parentRouteRecordId` parameters in the `flexberry-objectlistview` component and the `edit-form` controller.
* Errors when working with property names in some methods in the services `objectlistview-events` and `user-settings`.

### Changed
* The nested content of the `modal-dialog` component no longer wraps in an additional `DIV` element with the `description` class.
* The markup of modal windows in the `flexberry-file` component has been changed, now they look like ordinary modal windows instead of simplified ones.
* In the generated application, the markup in the `error.hbs` template and in the edit form in the `flexberry-edit-form` blueprint are changed.
* The value of the `tableStriped` property in the `flexberry-groupedit` component has been changed to `false`.
* The `flexberry-objectlistview` component:
    * Buttons for selecting all rows are replaced by a similar menu.
    * To display the sort order and direction in a column, instead of `unicode` characters, font icons are used.
    * In the mobile version of the component, the values of the `showCheckBoxInRow` and `tableStriped` properties are changed to `false`.
* The order of the `choose` and `remove` buttons in the `flexberry-lookup` component has been changed.
* Update dependency on `SemanticUI` to version `2.4.1`.
* Update dependency on `ember-flexberry-data` to version `3.4.0`.

## [2.4.0] - 2020-05-18
### Added
* Attributes with selectors for testing in the generated application.
* Support for `base64` values in the `flexberry-file` component ([learn more](https://flexberry.github.io/en/ef_file.html#working-with-files-in-the-base64-format)).
* The `displayCaptions` mode for the `flexberry-dropdown` component.
* The `showFiltersInModal` property in the `flexberry-objectlistview` component for displayng filters in a modal window.
* The `flexberry-objectlistview` and `flexberry-simpleolv` components:
    * Ability to set an icon (`iconClasses` property) for a button using the `customButtons` property in components of lists.
    * Localization of filter conditions.
    * Additional conditions for filters (empty, not empty, not contains, between).
    * The `componentForFilterByCondition` action to customize filter component.
    * A parameter that describes the attribute in the `componentForFilter` and `conditionsByType` actions for which it is called.
* The `LogService` service:
    * The `errorMessageFilterActive` and `errorMessageFilters` properties for manage the filtering of errors.
    * The `applicationLogModelName` property, to specify the model for storing logs.

### Fixed
* Saving on the edit form when only one detail was changed.
* The `flexberry-dropdown` component incorrectly determines the direction after the first opening.
* When using limits in the `flexberry-simpledatetime` component with the type of `date`, it is impossible to enter a value equal to the `min` or `max` limits.
* Window resize event handlers added by the `flexberry-objectlistview` and `flexberry-simpleolv` components are not deleted.
* The `flexberry-lookup` component:
    * In `autocomplete` mode does not clear the input field when the value is not selected.
    * The error with button blocking after closing the columns settings window for the `flexberry-objectlistview` component was repeated if the `folvComponentName` property was specified.
* The `flexberry-groupedit` component:
    * Displaying menu in rows.
    * When using the `fixedHeader` property, the component does not work.
    * If the `searchForContentChange` property is set to `true`, an error occurs when deleting the aggregator.
* The `flexberry-objectlistview` component:
    * Displaying menu in rows.
    * Switching pages when several components are placed on the form and the mobile version is used.
    * The `configurateRow` action is not called for nested rows in hierarchical mode.
    * Buttons for editing and prototyping in the row for the mobile template that were once lost are added to the data column.
* Overridden methods in the `LogService` now return promises, as described in the [documentation](https://flexberry.github.io/en/ef_log-service.html).

### Changed
* The delete button in row for the mobile template of the `flexberry-objectlistview` component has been moved from the first column to the data column.
* Properties initialization of `log` service moved to the service's init hook (instead of reopening service in app).
* Update dependency on `ember-flexberry-data` to version `2.4.0`.

### Breaking changes
* Changed markup and action for the sidebar toggler in the generated app.
* Removed `!important` rule for the `display` property from the `hidden` class in addon styles.
* When building a query for export to Excel, the encoding for columns names is used, which allows you to use special characters in them. For compatibility, use the package `NewPlatform.Flexberry.ORM.ODataService` version [`5.1.0-beta16`](https://www.nuget.org/packages/NewPlatform.Flexberry.ORM.ODataService/5.1.0-beta16) or higher.

## [3.3.0] - 2020-03-23
### Added
* Changes from [`2.3.0`](#230---2020-03-10) version.

### Fixed
* An error occurs when changing the model property using the `flexberry-lookup` component in dropdown mode and customize it using the `dropdownSettings` property.
* Old import style in `flexberry-core-offline` blueprint.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.3.0`.

## [2.3.0] - 2020-03-10
### Added
* The `fixedHeader` property for the `flexberry-groupedit` component.
* `flexberry-lookup` component:
    * The `modalDialogSettings` property for configuring the modal window in the component.
    * The `usePaginationForAutocomplete` property to enable pagination in the results for autocomplete.

### Fixed
* An error occurs when applying the saved user settings to the list, if attributes were removed from the projection of this list.
* Displaying fixed header in the `flexberry-objectlistview` component for some browsers (#982).
* Some errors in the `perf` service.
* The state of the move buttons in the `flexberry-groupedit` now depends on the selected rows.
* `flexberry-lookup` component:
    * Loading an extra record in the results for autocomplete.
    * Clicking on `...` in the results for autocomplete inserts `...` into the component.
    * The load icon on the choose button applied to all components built into the `flexberry-groupedit` component.
    * After closing the columns settings window for the `flexberry-objectlistview` component with the close button (`X`), buttons of the component remained disabled.

### Changed
* Blueprints:
    * In list form templates, the model name is generated as a property of the controller.
    * In templates of edit forms for the dates the `flexberry-simpledatetime` component is generated instead of `flexberry-datepicker`.
* Now the `flexberry-simpledatetime` component hides the calendar when scrolling the window.
* Update dependency on `ember-flexberry-data` to version `2.3.0`.

## [3.2.1] - 2020-01-28
### Added
* Changes from 2.2.1.

## [3.2.0] - 2019-12-26
### Added
* Changes from 2.2.0.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.2.0`.
* Update dependency on `flatpickr` to version `4.6.1`.

### Fixed
* Blueprints:
    * Fix require promise in offline-blueprints;

## [3.1.0] - 2019-04-30
### Added
* Changes from 2.1.0.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.1.0`.

### Removed
* `flexberry-button` component:
    * Remove `DomActionsMixin`.

## [3.0.1-beta.0] - 2018-12-24
### Added
* Blueprints:
    * Add skip-confirmation property for overwriting files without confirmation.

### Fixed
* Blueprints:
    * Fix validations generation in model blueprint.

## [3.0.0] - 2018-12-13
### Added
* `flexberry-sidebar` component, simple component for use sidebar from `Semantic UI`.
* `flexberry-sitemap` component, component for render sitemap by object with links.
* Dependency on `ember-cp-validations@~3.5.2` addon.
* Dependency on `ember-i18n-cp-validations@~3.1.0` addon.
* The `ModelLocales` class in `flexberry-core` blueprint generate locales with model attributes for validations.
* Blueprints:
    * Additive merging of generated localization files with existing localozation files.

### Changed
* Update dependency on `ember-flexberry-data` to version `3.0.0`.
* `flexberry-dropdown` component:
    * Does not use `ui-dropdown` component from `semantic-ui-ember` addon.
* `modal-dialog` component:
    * Does not use `ui-modal` component from `semantic-ui-ember` addon.
* `run.after` function renamed to `runAfter` and replaced from initializer to utils.
* `dynamic-actions` mixins: : mixins don't override `sendAction` method to add some custom logic, they add custom logic in method `sendDynamicAction`.
* `required-actions` mixins: mixins don't override `sendAction` method to add some custom logic, they add custom logic in method `sendDynamicAction`.
* `flexberry-validationsummary` component:
    * The `headerText` property renamed to `header`.
    * Added wrapper `DIV` with `header` CSS-class for passed `header`.
* The `pointing` property in `flexberry-validationmessage` component now have default value `pointing`.
* The `edit-form` controller runs validations before attempting save the model.
* Template for model in `flexberry-model-init` blueprint:
    * Added import of default validation rules (you can override or extend them) from regenerated model file and build validations mixin.
    * Fixed code style.
* The `flexberry-model` blueprint:
    * Generation of default validation rules with using syntax from `ember-cp-validations` addon in separate object.
    * Fixed code style in regenerated model file.
* `flexberry-objectlistview-on-edit-form-controller` mixin:
    * Property `customFolvContent` can't have Promise as a value.

### Fixed
* Blueprints:
    * Fix line length JSCS error on model generation.
    * Fix duplication of some existing files on regeneration.
* Fix unlock edit form in `edit-form` route and `lock-route`.
* `flexberry-objectlistview-route` mixin:
    * Fix set current controller during the transition on edit form.
* Fix getting controller for list form.
* Nested togglers now work correctly.
* `flexberry-lookup` component:
    * Fix hierarchical mode settings for `lookup dialog`.
    * Fixed semantic dropdown initialization for dropdown mode.
* `flexberry-objectlistview` component:
    * Fix localization switching for mobile mode.
    * Fix `recordsTotalCount` in mobile mode.
* `modal-dialog` component:
    * Fix settings initialization.
* `olv-toolbar` component:
    * Fix styles of `export excel` and `cols config` buttons.
* `dynamic-actions` mixin:
    * Fix `classNames` property computing.
* `flexberry-file` component:
    * Fix preview click action.
* `colsconfig-dialog-content` component:
    * Fix sorting dropdown.

### Removed
* The following templates: `sitemap`, `sitemap-node` (and mobile), `sitemap-node-content`.
* `sitemap-node` controller from app.
* `flexberry-simpleolv` component.
* `flexberry-datepicker` component. Please use `flexberry-simpledatetime` component instead or create an own component.
* Dependency on `ember-validations@~2.0.0-alpha.4` addon.

### Breaking changes
* `flexberry-objectlistview` component:
    * Property `customParameters` for passing custom query parameters to edit form transition, passes each parameter separately (before this change parameters were passed in single object `customParameters`).
* Delete `semantic-ui-ember` dependency.
* Update dependency on `semantic-ui` to version `2.3.1`.
* Validations was fully changed, after upgrade to this version you need regenerate your application.
* `flexberry-lookup` component:
    * In templates `items` property must be before `value` property.
    * In dropdown mode instead of many properties one `dropdownSettings` property for manage `Semantic UI` settings.
* `flexberry-dropdown` component:
    * Instead of many properties one `settings` property for manage `Semantic UI` settings.

## [2.2.1] - 2020-01-15
### Added
* `flexberry-lookup` controller:
    * Add ability to specify modal dialog settings.

### Fixed
* `flexberry-simpledatetime` component:
    * Fix styles when inside OLV filters in mobile mode.
* `flexberry-lookup` controller:
    * Fix lookup olv reload.

## [2.2.0] - 2019-12-26
### Added
* `flexberry-lookup` component:
    * Add preview button in mobile mode.
    * Add `autocompleteOrder` in dropdown mode.
    * Add select first autocomplete result by enter click.
    * Add dropdown class to `flexberry-lookup` at drodpdown mode.
    * Add limitFunction in groupedit row to lookup limit by other component.
* `flexberry-text-cell` component:
    * Add `flexberry-text-cell` for displaying limited text in olv component.
* `flexberry-objectlistview` component:
    * Add hierarchy paging option.
    * Add advlimit config dialog for editing and applying limits.
    * Add creating record by prototype.
* Blueprints:
    * Add setting offline database name.
    * Add check for file exist in `model-offline`.
    * Add offline option.
    * Add skip-confirmation option.
* Add `cut-string-by-length` util for cutting string by specified length.
* `offline-globals`:
  * Add `getOfflineSchema` method for get offline schema.
* `flexberry-file` component:
    * Add ability to change file preview's modal dialog settings.
* Add mixins for multi list mode.

### Changed
* `object-list-view-cell` component:
    * Component template was changed. If it's redefined in your project, you need to change it to support new features.
* `flexberry-lookup` component:
    * In `readonly` mode now has disabled class.
* Update dependency on the `jquery-minicolors` bower package to version `2.3.4`.
* Update dependency on `ember-flexberry-data` to version `2.2.0`.

### Fixed
* Blueprints:
    * Fix call generate method for `model-offline` in `flexberry-group`.
    * Fix offline schema setting in store service.
* `errorable-route` mixin:
    * Add `_super` call to `resetController` method.
* `flexberry-simpleolv` component:
    * Fix `fixedHeader` mode in mobile.
* `flexberry-lookup` component:
    * Fix ellipsis in lookup `autocomplete` results.
    * Fix `autocomplete` for numeric properties.
    * Fix `autocomplete` results after toogle readonly mode.
    * Fix select `autocomplete` result by enter click.
* `olv-toolbar` component:
    * Fix styles of `export excel` and `cols config` buttons.
* `colsconfig-dialog-content` component:
    * Fix set sorting method.
* `flexberry-objectlistview` component:
    * Fix paging and expand in hierarchical mode at mobile.
    * Fix columns header text format.
    * Fix filter input cursor when `fixedHeader` is true.
    * Fix filters applying by `Enter` click.
* `offline-globals`:
    * Fix `getOfflineSchema` method.
* `user-settings` service:
    * Fix perPage from developerUserSettings on reloading.
* Creating a prototype record when a prototype is not loaded into store.

### Breaking changes
* Backend needs NewPlatform.Flexberry.UserSettingsService 3.1.0-beta01 or higher.
* Creating models on new forms and in the `{{flexberry-groupedit}}` component is performed with `id`.
* If possible, saving changes to the edit form is done using the `batchUpdate` method from `store`.
* Removed `flexberry-objectlistview-on-edit-form-controller` mixin from `edit-form` route. Use new mixins for multilists or include old mixin in yours forms with olv on edit form.

## [2.1.0] - 2019-04-30
### Added
* Blueprints:
    * Add index property generation for projection attributes.
* `flexberry-lookup` component:
    * Add preview button.
    * Add persist value mode for autocomplete.
    * Add optional projection for autocomplite (`autocompleteProjection` property).
    * Add property `autofillByLimit`.
* `flexberry-file` component:
    * Added the ability to open files instead of downloading.
* List components:
    * Add option to hide default sorting button.
    * Add option to fix table header (`fixedHeader`).
* `flexberry-groupedit` component:
    * Add text and icon custom buttons in toolbar.
    * Add check all at page button.
    * Sorting by ordered property.

### Changed
* `flexberry-lookup` component:
    * Dropdown mode uses projection from `projection` property.
* Update dependency on `ember-flexberry-data` to version `2.1.0`.

### Fixed
* `reload-list-mixin` mixin:
    * Fix `DatePredicate`'s normalize, when condition equals `neq` and value is `null`.
    * Fix filter by `null` for `string`, `number` and `date` data types.
* `flexberry-groupedit` component:
    * Fix ordered property computing when `modelProjection` are string.
* `flexberry-file` component:
    * Fix spinner for preview when component is in modal.

### Deprecated
* Specific behavior for the `computedProperties` property in the `dynamic-properties` mixin.

## [2.0.0] - 2018-12-07
### Added
* `flexberry-objectlistview-route` mixin:
    * Specifying model name via query params on transition to edit-form. It is needed in case of inherited models are displaying on list form.
* `edit-form` and `edit-form-new` routes:
    * Model name is now taken from query params if it is specified there. Custom query parameters can be passed to edit form via `customParameters` property of `options` parameter in `objectListViewRowClick` action.
* Blueprints:
    * Add `componentName` generation for lookups.
* `flexberry-simpledatetime` component:
    * `defaultHour` and `defaultMinute` properties.
* `flexberry-objectlistview` and `flexberry-simpleolv` components:
    * The property `disabled` to control the state of custom buttons.
* `flexberry-file` component:
    * Headers attribute, which will be added to the file download request.

### Changed
* Update dependency on `ember-flexberry-data` to version `2.0.0`.
* `colsconfig-dialog-content` component refactoring.
* `flexberry-menu` component:
    * By default handles click and `touchstart` events.

### Fixed
* `flexberry-objectlistview-route` mixin and `edit-form` route:
    * Fix return to parentRoute, when olv on edit-form.
* `list-form` route:
    * Fix unnecessary transition in model with same query params.
* `lock-route` mixin:
    * Fix lock deleting when leaving `edit-form`.
* List components:
    * Fix possibility to call actions of disabled buttons by focusing and pressing `Enter`.
    * Fix filter by date type columns.
    * Fix usersettings apply, when query params doesn't change.
* `flexberry-objectlistview` component:
    * Fix error when creating new record in separate route with `flexberry-groupedit` component.
    * Fix pager block resizing in hierarchy mode.
* `flexberry-file` component:
    * Fix mobile file component menu.
    * Fix file preview style in `flexberry-groupedit` in mobile mode.
    * Fix file opening instead of download when clicking download button after file was deleted.
* `colsconfig-dialog-content` component:
    * Fix column names saving in export excel mode.
* `olv-toolbar` component:
    * Fix usersettings copy dialog selectors.
* `flexberry-menu` component:
    * Fix setting bordered icon style.
* `flexberry-simpledatetime` component:
    * Fix time after clearing component's value.
    * Date dialog opening when clear button was clicked.
* `flexberry-tab-bar` component:
    * Fix tabs `active` class adding.

## [0.13.0-beta.0] - 2018-09-17
### Added
* The `flexberry-model` blueprint generates the exported function to define the namespace of the model, if it is not empty.
* The `flexberry-model-init` blueprint generates an import and call of function to define the namespace in the model file, if it is not empty.
* The `flexberry-model` blueprint generates a valid default value for enumerations.

## [0.12.3] - 2018-09-18
### Fixed
* `flexberry-lookup` component:
    * Fix list's hierarchy when several lookups on page.
* `list-form` route:
    * Fix transition to list-form with custom query params.

## [0.12.2] - 2018-08-28
### Fixed
* Missing of calling `_super` method in ember hooks inside addon.

## [0.12.1] - 2018-08-22
### Added
* The `AppStateService` - service is used to control the state of the application.
* Blueprints:
    * Additive merging of generated localization files with existing localozation files.

### Fixed
* Blueprints:
    * Fix line length JSCS error on model generation.
    * Fix duplication of some existing files on regeneration.
* `flexberry-objectlistview-route` mixin:
    * Fix setting current controller during the transition on edit form.
* `colsconfig-dialog-content` component:
    * Fix setting save messages visibility.
* `flexberry-toggler` component:
    * Nested togglers now work correctly.
* `flexberry-dropdown` component:
    * Fix null values handling in items array.
* List components:
    * Fix incorrect footer width in Internet Explorer.
    * Incorrect resets the load state.
* `flexberry-objectlistview` component:
    * Fix user-settings service activity toggle.
* Fix unlock edit form in `edit-form` route and `lock-route`.
* Fix getting controller for list form.

### Deprecated
* The `loadingState` property and the `setLoadingState` method in the `ObjectlistviewEvents` service are obsolete, use the `AppStateService` service.

## [0.12.0] - 2018-06-08
### Added
* `flexberry-toggler` component:
    * Saving status in user settings (`componentName` must be specified).
* `flexberry-objectlistview` component:
    * `customButtonsInRow` property for adding buttons into rows (analog of `customButtons` property).
    * Ability to pass function in `buttonAction` property inside `customButtons` and `customButtonsInRow` properties.
    * Renaming columns when exporting to Excel.
* `flexberry-error` component and `error` template:
    * Translating of error messages support if `messageLocaleKey` property is specified in error.
* List components:
    * Deleting records when "all on all pages" is selected. Now `beforeDeleteAllRecords` action could be overriden in list form controller for processing custom actions and possible cancel of deleting when trying to delete all records on all pages. It is also required `DeleteAllSelect` action to be implemented in OData-backend to make this functionality avaliable. __`beforeDeleteAllRecords` parameter with passing corresponding action should be added to all list components in application (it could be "default" action with same name from `list-form` controller), otherwise all records from all pages in some list form could be deleted by user permanently without any confirmation or notication!__.

### Changed
* Update dependency on `ember-flexberry-data` to version `0.12.0`.
* List components:
    * Sorting applied by clicking on the column header, is saving in user settings now.
* Downgrade `ember-data` version to `2.4.3` when installing or updating addon using `ember install ember-flexberry` command.

### Fixed
* `flexberry-simpleolv`:
    * Hightliting of resert sorting and reset selecting buttons is now applying on active instead of hover in mobile template.
* `flexberry-objectlistview` component:
    * Buttons in rows when the component is in hierarchical mode.
    * Fix behavior of `singleColumnHeaderTitle` in mobile mode.
    * Displaying of button for showing/hiding nested records after disable hierarchical mode in mobile mode.
* List components:
    * Displaying spinner when appying user settings using user settings dialog.
* `flexberry-lookup` component:
    * Word breaking when displaying value is longer than component width in mobile mode.
* `flexberry-simpledatetime` component:
    * Inability to choose extreme values of date range when min or max values are set.

## [0.11.0] - 2018-02-20
### Added
* `flexberry-groupedit` component:
    * Add column widths saving in usersettings.
    * Add restore default usersettings button.
    * Add clear sorting button.
* `flexberry-lookup` component:
    * User settings support, use parameter `notUseUserSettings` to disabling.
    * `perPage` parameter.
    * Hierarchy mode support.
    * User settings support. Use parameter `developerUserSettings` to apply sorting instead of `orderBy` parameter in template.
* `flexberry-objectlistview` component:
    * Now computed properties could be passed via `dynamicProperties` for embedded components in cells.
* Edit form's logic:
    * Scrolling to the top of form if saving errors are occured (to see error messages).

### Changed
* Update dependency on [`ember-flexberry-data`](https://github.com/Flexberry/ember-flexberry-data) to version 0.11.0.
* For compatibility with `Ember Inspector`, `tagName` for application view has been restored, and sidebar moved into this block (see more [here](https://github.com/Flexberry/ember-flexberry/commit/0d4de9aa95b506c37e31e0b99f2e8bb534f85fba) and [here](https://github.com/Flexberry/ember-flexberry/commit/d555c3f0fc4e070a66c0e18403fc721398593d40)).
* `log` service:
    * Now `processName` field contains application name from `ENV.modulePrefix` of `environment.js`.
* Edit form's logic:
    * It is available to handle errors for each detail in `onSaveActionRejected` method during saving of aggregator model.
* Change export excel modal dialog title.

### Fixed
* List components:
    * Fix using `readonly` property from `componentProperties` for dynamic components.
    * Fix displaying error about server unavailability. It was made more appropriate for perception.
* `blue-sky` theme:
    * Actual width for `flexberry-checkbox` was set.
    * Displaying placeholders in IE.
* `flexberry-simpleolv` component:
    * "Show settings" menu for user settings.
* `flexberry-lookup` component:
    * View is update on `displayAttributeName` property was changed.
    * Fix lookup list's component name.
* `flexberry-groupedit` component:
    * Fix validation error message when `editOnSeparateRoute` and `saveOnRouteLeave` is true.
    * Fix availability to resize columns when `allowColumnResize` property was changed dynamically.
* `flexberry-file` component:
    * Fix buttons disabling in mobile mode.
    * Fix displaying errors in mobile mode.
    * Fix displaying text for non-image file preview in IE.
* `flexberry-modal` component:
    * Fix dimmer hiding on close button click.
* Blueprints:
    * Fix generation of translations and assets into addon.
* `flexberry-objectlistview` component:
    * Fix hierarchy loading on first load and when records has been already loaded.
    * Fix toolbar width in mobile mode.
* `colsconfig-dialog-content` component:
    * Fix invisible cells content in Google Chrome (some content was disappeared during resize of browser window).
* `flexberry-simpledatetime` component:
    * Clear button worked in readonly mode in IE.
* Hanging up on list forms and edit forms when connection is unavailable.
* Fix `usersettings` for `new` forms.

### Removed
* `flexberry-objectlistview` component:
    * `columnsWidthAutoresize` attribute in mobile version of component.
* `flexberry-lookup` component:
    * `orderBy` ordering condition for list of records to choose.

## [0.10.0] - 2018-01-26
### Added
* `flexberry-error` component for errors displaying.
* `flexberry-simpledatetime` component:
    * Add remove value button.
    * Add localization support.
* `flexberry-datepicker` component:
    * Support `drops` option.
* List components:
    * Check all records on page operation, check all records on alls pages operation, clear sorting operation.
    * Saving and restoring previously selected records on reloading (including filtering, refreshing, etc. except changing of page number temporarily).
    * Optional edit button in row.
* `flexberry-objectlistview` component:
    * Add collapse/expand all button for hierarchy mode.
    * Increased performance when working in hierarchical mode by reducing number of queries to backend on rendering top-level nodes.
    * Calling `onDeleteActionStarted`, `onDeleteActionFulfilled`, `onDeleteActionRejected` and `onDeleteActionAlways` methods from `ListFormController` in process of deleting the record.
* `flexberry-validationsummary` component:
    * Add `header` property.
* `flexberry-lookup` component:
    * Add localization for autocomplete empty result.
    * Add sorting settings for autocomplete result list.
    * Supporting filters when component is displaying via `flexberry-objectlistview` component.
* Blueprints:
    * Add model's default property values generation.
* `flexberry-field` and `flexberry-textbox` components:
    * Add `maxlength` attribute.

### Changed
* Update dependency on [`ember-flexberry-data`](https://github.com/Flexberry/ember-flexberry-data) to version 0.10.0.
* Errors on list and edit forms are displaying via `flexberry-error` component now.
* List components:
    * Checkbox is used to display boolean values.
    * Now filters calls `predicateForFilter` method even if filter pattern is undefined.
    * Added `like` condition for filters (for `string` type fields). It will be applied by default when condition is not set.
    * Now filters can apply on Enter click.
    * `beforeDeleteRecord` method now support asynchronous mode, i.e. it is possible to return promises as result value.
* Getting of current user name is able now by calling `getCurrentUserName` from [`user` service](https://github.com/Flexberry/ember-flexberry-data/blob/develop/addon/services/user.js#L37) (declared in `ember-flexberry-data` addon).
* `flexberry-datepicker` component
    * Add class `flexberry-datepicker` in `classNames`.
    * Changed readonly attribute.

### Fixed
* `flexberry-objectlistview` component:
    * Fix hierarchy collapse and expand.
    * Now `allowColumnResize` property apllying properly.
    * Filtering by all fields is now applying by pressing `Enter` in IE.
    * Clicking on child rows in hierarchical mode.
* `flexberry-simpleolv` component:
    * Set default user settings.
* List components:
    * Fix `neq` filter when value isn't null.
    * Row clicks are working correctly now in mobile mode.
    * Fix reset of loading state when model promise was rejected.
* `log` service:
    * Now log does not attempt to save undefined errors.
* `flexberry-simpledatetime` component:
    * Fix using browser input instead of mobile input for `flatpickr` in mobile mode.
    * Fix displaying in readonly mode.
    * Change related model value after clearing date when value was set programmatically.
    * Fix user's date input.
* Reset `page` in `LimitedController` mixin when change or reset filters.
* `blue-sky` theme:
    * Fix header height for mobile version.
    * Fix styles for modal dialogs.
    * Fix sidebar and page content height.
* `flexberry-checkbox` component:
    * Fix `checked` property to support IE.
* `flexberry-tree` component:
    * Fix `get-with-dynamic-actions` helper.
* Fix locale dropdown for IE in `application.hbs`.
* Blueprints:
    * Fix generation of `flexberry-groupedit` component template on edit forms. Now translations of field's captions should be applied.

### Known issues
* Filtering on lists works wrong for `date` type fields in case of `DateTime?` type is used in corresponding property of model at backend.
* `flexberry-datepicker` component is not recommended for using in production, because it has memory and some other issues so it works slowly and it slows down the application.
* Some issues with styles in `blue-sky` theme especially in mobile mode of application.
* Lookup with hierarchy is not working on edit new record.

## [0.9.1] - 2017-09-29
### Changed
* Update dependency on `ember-flexberry-data` to version 0.9.0.

## [0.9.0] - 2017-09-28
### Added
* Add semantic ui themes support.
* Add `blue-sky` theme.
* Blueprints:
    * Add support ember objects and transforms generation (from classes with "type" stereotype in Flexberry Designer's class diagrams).
    * Add support reexport for addon.
    * Add generation non-stored properties of models.
    * Add generation offline serializers.
    * Add generation mobile templates.
    * Add some files to generation for `offline` support.
    * Add generation of `blue-sky` theme for applications. This theme will be used as default theme for generated applications.
    * Add generation of `orange` theme for applications.
* `olv-toolbar` component:
    * Add default value for `modelController`. It's needed when using `olv-toolbar` component separately (apart from list components).
* `flexberry-toogler` component:
    * Add `hasResizableOLV` flag indicates when component need to initialize `colResizable` plugin.
    * Manage animation of `flexberry-toggler` component through `duration` property.
* Add titles for component's buttons.
* `flexberry-simpledatetime` component:
    * Add date and time validation when focus is changing.
    * Add user input for `flexberry-simpledatetime`.
* Add `edit-form-controller-operations-indication` and `edit-form-route-operations-indication` mixins for edit forms controllers and routes.
* List components:
    * Add export excel feature for list components.
    * Add spinner for searching in list components.
    * Add spinner for list components when redirecting to `editFormRoute`.
    * Add `fixed` setting for columns in `developerUserSettings` for list components.
    * Add localization for sort order in list components.
    * Add `readonly-cell` helper. It can specify `readonly` property for each cell of list components.
    * Add ability to set width for fixed columns in list components.
    * Add `minAutoColumnWidth` property (minimum column width, if width isn't defined in `userSettings`).
    * Add `columnsWidthAutoresize` property (indicates whether or not autoresize columns for fit the container width).
    * Add `overflowedComponents` property for list's components (list of component names, which can overflow table cell, `flexberry-dropdown` and `flexberry-lookup` by default).
    * Now list components use `DatePredicate` for filtering dates.
    * Add filters applying spinner.
* Added components:
    * `flexberry-button`.
    * `flexberry-colorpicker`.
    * `flexberry-ddau-checkbox`.
    * `flexberry-ddau-slider`.
    * `flexberry-dialog`.
    * `flexberry-icon`.
    * `flexberry-jsonarea`.
    * `flexberry-tab-bar`.
    * `flexberry-tree`.
    * `flexberry-treenode`.
* Add `yield` block for `flexberry-dropdown` component.

### Changed
* Blueprints:
    * Now serializers are generating correctly in case of inheriting of models.
    * Changed regular expression in `flexberry-core` for cyrillic support.
    * Now `custom-inflector-rules` generates capitalized plural words.
* Update `jquery.colResizable` plugin to version 1.6.
* `ui-message` component: `onShow` & `onHide` actions now sent on every change in visible property.
* Now locks gets userName from `UserSettingsService`.
* Own loader from `object-list-view` and `flexberry-simpleolv` components replaced by loader on route template level.
* Page content width changing when sidebar is toggling.
* When sidebar is visible, it isn't blocking page content.
* Flexberry componets styles were moved to semantic default theme folder.
* Form's loading state now stored in `objectlistview-events` service.

### Fixed
* Blueprints:
    * Fix wrong path of tempates generation when process was started with `--dummy` option.
    * Fix generation to addon errors.
    * Fix master fields caption generation on `edit-forms`.
    * Fix `offline-serializers` generation.
    * Fix `custom-inflector-rules` generation (sorting and no duplicates).
    * Generation of applications containing external entities (forms and models):
      * At generation application by `flexberry-application` blueprint, skip entities containing key `external` with `true` value.
      * At generation entity by own blueprint (for example `flexberry-model`) it will be generated in any case.
    * Fix new controllers/routes generation for addon.
* Localization:
    * Now default locale set in `environment.js` is not ignored.
    * If application is not support current browser languale (when default locale is not set) then `en` locale will be used for application.
* `user-settings` service:
    * Fix `userSettings` updating.
* `flexberry-simpleolv` component:
    * Fix columns width applying from `userSettings`.
* `olv-toolbar` component:
    * Fix `userSettings` names getting on first render.
* `reload-list` mixin:
    * Сontroller is unaccessible in some cases inside `reloadList` method. So we added corresponding checks.
* `flexberry-simpledatetime` component:
    * Fix wrong timezone storing when using component to choose date without time.
* `colsconfig-dialog-content` component:
    * Fix semantic styles for sort direction dropdown.
* Fix menu sidebar script to not apply on other sidebars.
* Fix delete button disabling after deletion on lists.
* Fix dropdown's overflow on list components.
* Fix groupEdit's adding new row on separate route.
* Fix transition to `editForm` in FireFox.
* Fix filter columns shifts to left, when filter result is empty.
* Fix vertical scroll in list's components.
* Fix list's components width computing.
* When typing in the input field to search the `flexberry-simpleolv` component, `didRender` method that is problematic for the component is called.
* Fix `flexberry-groupedit` sorting.
* Fix hierarchy expand for `flexberry-objectlistview` on edit form.
* Fix operation indication on edit form when new record added.
* Fix `chooseText` for lookups in `flexberry-groupedit`.
* Fix list's `refresh` and `delete` buttons styles for Firefox.
* Fix `onRowClick` action for `object-list-view-row`.
* Fix `lookupWindowCustomProperties` for lookups in `flexberry-groupedit`.
* Fix `lock-route`: deleting a blocking object for single-model routes.

### Removed
* `ui-message` component: attribute `title`.

### Breaking changes
* Search localisation for models in `flexberry-objectlistview` and `flexberry-simpleolv` components:
  * Before: `models.modelName.projections.projectionName.attributePath.caption`
  * After: `models.modelName.projections.projectionName.attributePath.__caption__`
  * There are several solutions:
    * Carefully regenerate the application.
    * Find and replace in `Visual Studio Code`, files to include: `locales/en/models, locales/ru/models`, find: `(^\s+)(caption)`, replace: `$1__$2__`.

### Known issues
* Now there is no way for filtering by timeless date in backend requests, therefore timeless date fields on backend must have 11:00:00.000 time in UTC.
* `flexberry-datepicker` component is not recommended for using in production, because it has memory and some other issues so it works slowly and it slows down the application.

## [0.8.6] - 2017-02-09
### Changed
* Update dependency on `ember-flexberry-data` to version 0.8.4.

## [0.8.5] - 2017-02-09
### Changed
* Update dependency on `ember-flexberry-data` to version 0.8.3.

### Fixed
* `flexberry-lookup` component:
    * Fix `placeholder` in dropdown mode.

## [0.8.4] - 2017-02-07
### Changed
* Update dependency on `ember-flexberry-data` to version 0.8.2.

### Fixed
* `flexberry-groupedit` component:
    * Fix check `hasMany` relationships changes on route leave.

## [0.8.3] - 2017-01-31
### Fixed
* `flexberry-simpledatetime` component:
    * Fix infinite click in mobile mode.

## [0.8.2] - 2017-01-26
### Changed
* Update dependency on `ember-flexberry-data` to version 0.8.1.

### Fixed
* `flexberry-dropdown` component:
    * Fix hanging in IE when change `perPageValue`.
* `flexberry-objectlistview` component:
    * Fix selected rows count reset on `init`.
* `flexberry-simpleolv` component:
    * Fix `colResizable` plugin init when `model` was overrided.

## [0.8.1] - 2017-01-18
### Added
* `flexberry-objectlistview` component:
    * Add hierarchy support on `edit-form`.
    * Add `defaultLeftPadding` property as padding value in each level of hierarchy (in pixels).

### Changed
* `flexberry-objectlistview` component:
    * Change hierarchy indent setting (`hierarchicalIndent` property) to `Number` type (in pixels).
* Update `flatpickr-calendar` dependency to 2.3.4.

### Fixed
* `flexberry-simpledatetime` component:
    * Fix `readonly` mode.
* `flexberry-objectlistview` component:
    * Fix columns compute when `modelProjection` is `undefined`.

## [0.8.0] - 2016-12-31
### Added
* `flexberry-simpleolv` component which renders it's content faster then `flexberry-objectlistview`. Component is inherited from `flexberry-objectlistview` component and has same functionality.
* `Ember.run.after` extension method into `Ember.run` namespace. Adds ability to rone some logic some after specified condition will be fulfilled.
* `object-list-view` component:
    * `showValidationMessagesInRow` option. Option is `false` by default in `object-list-view` & `flexberry-objectlistview`, but is `true` by default in `flexberry-groupedit`. If `true` then validation message will be shown in each cell containing invalid value.
    * `active` CSS-class to rows when component was clicked.
    * Delayed call to async logic using `Ember.run.after` to allow browser to apply changed styles first.
    * Async loading & rendering support of records.
    * Locales support for headers of `object-list-view` component.
* `flexberry-objectlistview` component:
    * Loader appearing after clicking on the head of column to sort records.
    * `filterByAnyWord` & `filterByAllWords` options. They can be used to configurate `filterByAnyMatch` logic.
    * `configurateSelectedRows` method to configure selected records.
    * Ability to display records total count.
* `flexberry-lookup` component:
    * Locks preventing from multiple subsequent clicks leading to data-requests.
    * `active` CSS-class when component was clicked or taped.
    * Delayed call to async logic using `Ember.run.after` to allow browser to apply changed styles first.
    * Support for `relatedModel` change in runtime.
    * `lookup-events` service containing `lookupDialogOnShowTrigger`, `lookupDialogOnVisibleTrigger`, `lookupDialogOnHiddenTrigger` methods to comunicate with `flexberry-lookup` components. **NOTE**:  `componenName` property must be defined for `flexberry-lookup` (usually in template).
    * Locks preventing from multiple data-requests when user press choose button several times in succession.
    * Semantic-ui settings for dropdown mode.
    * Ability to set default ordering using `orderBy` property (support same values format as in URL).
* `flexberry-menu` component:
    * `localeKey` property to each item.
* `flexberry-dropdown` component:
    * Semantic-ui settings.
`flexberry-groupedit` component:
    * Now `flexberry-groupedit` supports sorting.
    * Support of `developerUserSettings` for `flexberry-groupedit` component placed on `edit-form`.
    * `configurateSelectedRows` method to configure selected records.
* `object-list-view-cell` component:
    * `yield` content support.
`list-form` route:
    * Model loading hook-methods: `onModelLoadingStarted`, `onModelLoadingFulfilled`, `onModelLoadingRejected`, `onModelLoadingAlways`.
* User settings service:
    * Saving of records per page count in user setings for `flexberry-objectlistview`.
* Blueprints:
  * `sourceType` property generation into `flexberry-enum` transforms.
  * `ember-cli-sass` addon instalation into default blueprint.
* `form-load-time-tracker` service to track formsload & render time and `form-load-time-tracker` component to view data from `form-load-time-tracker` service.
* `perf` service to make performance bottlenecks visible in console timeline.
* `get-formatted` helper to get formatted values of simple types (`boolean` and `date` for now).

### Changed
* Update dependency on `ember-flexberry-data` to version 0.8.0.
* `flexberry-groupedit` component:
    * Restore ability to add menu items in row using `menuInRowAdditionalItems` property. Now this behavior is similar to `customButtons` property for toolbar.
    * Reduce width of filter button.
* `flexberry-objectlistview` component:
    * Restore ability to add menu items in row using `menuInRowAdditionalItems` property. Now this behavior is similar to `customButtons` property for toolbar.
    * Reduce width of filter button.
* `object-list-view` component:
    * Rename `headerClickable` property into `orderable`.
    * Now header's hint visible only when `orderable` = `true`.
* `edit-form` controller:
    * Add `rollBackModel` parameter to `close` method (as it's optional second parameter). Setting this parameter to `true` allows to rollback model after leaving route (applicable for detail's edit forms).
    * Add `skipTransition` parameter to `delete` method (as it's optionsl first parameter). Setting this parameter to `true` allows to skip technological call of `transitionToRoute` method.
    * Add `skipTransition` parameter to `saveAndClose`, `close` and `delete` actions (as their optionsl first parameter). Setting this parameter true allows to skip technological call of `transitionToRoute` method.
    * Add `skipTransition` parameter to `save` method (as it's second optional parameter) and `close` method (as its first optional parameter). Setting this parameter to `true` allows to skip technological call of `transitionToRoute` method.
* `detail-edit-form` controller:
    * Add `rollBackModel` parameter to `close` method (as it's optional second parameter). Setting this parameter to `true` allows to rollback model after leaving route (applicable for detail's edit forms).
    * Add `skipTransition` parameter to `saveAndClose`, `close` and `delete` actions (as their optionsl first parameter). Setting this parameter true allows to skip technological call of `transitionToRoute` method.
* `log` service:
    * Overriden methods of `Ember.Logger` now trigger corresponding events (`error`, `warn` etc.) instead of returning promises.
* Resolver:
    * Now, by default, only `component`, `template` and `view` types will be resolved accordingly to current device. If necessary, list of device-related types can be specified in `deviceRelatedTypes` property of application resolver. Also by default, device-related types will be searched only in 'mobile' subfolders, this behavior can be changed through `prefixForPlatformAndType`, `prefixForOrientation`, `prefixForType` properties of `device` service. This is for performance reasons.
* User settings service:
    * Replace alerts in `colsconfig-dialog` with `ui-messages`.
    * Now `colsconfig-dialog` has default cols width values.
    * Changed cursor style for `colsconfig-dialog-content`.
    * `col-config-menu` service:
        * Move `resetMenu`, `addNamedSetting` and `sort` methods into `olv-toolbar` and `flexberry-objectlistview`.
        * `sort` method is renamed into `sortNamedSetting`.
* `Ember.Logger.xxx` changed to `Ember.xxx` calls and throwing errors. So redundant messages will not display in console in production.

### Fixed
* `object-list-view` component:
    * `rowConfig` usage  in mobile mode.
    * Displaying of deletion errors if record deletion was unsuccessful.
    * Fix behavior with `filter` parameter added to route's url when `flexberry-lookup`'s list dialog is also opened.
    * Displaying of `flexberry-lookup` value when desktop version of `object-list-view` component is used in mobile mode.
    * Displaying of sorting indicator in `object-list-view` component.
    * Cells borders, now text doesn't fall outside of them.
    * Menu in row errors.
* `object-list-view-row` component:
    * Deprecation warnings which appears after content update.
* `flexberry-objectlistview` component:
    * Fix behavior when it is placed on `edit-form`.
    * Infinite loading after same per page value is selected.
    * Displaying of deletion errors if record deletion was unsuccessful.
    * Search by `number`, `decimal` and `boolean` values.
    * Rollback logic for unsuccessful delete operations.
    * Inability to resize columns if `tableStriped`, `rowClickable` or `customTableClass` property was changed.
* `flexberry-groupedit` component:
    * Inability to resize columns if `tableStriped`, `rowClickable` or `customTableClass` property was changed.
* `flexberry-lookup` component:
    * Readonly-mode when autocomplete is enabled.
    * Multiple words search mode in `flexberry-lookup` modal dialogs.
    * Double clicks sensivity.
    * Loader behavior in mobile mode.
    * Displaying of `flexberry-lookup` choosed value when lookup is embeded into new detail's row of `flexberry-groupedit` component.
`flexberry-file` component:
    * File download when `uploadUrl` property was changed.
`flexberry-menu` component:
    * Component was not responded to changing properties for root items.
* Base `flexberry` components:
    * `flexberry-textbox` and `flexberry-field` readonly mode.
* `flexberry-validationsummary` component:
    * Fix (with temporally solution) ember problem that causes an error. Problem also was fixed in [this PR](https://github.com/emberjs/ember.js/pull/13333) so temporally solution must be removed after update to ember 2.5.1 or higher.
* `flexberry-datepicker` component:
    * Shift date one day ahead when saving model after choosing date.
* `flexberry-simpledatetime` component:
    * Fix problems with absence of placeholder.
    * Fix behavior in IE and FF.
    * Fix two way binding problems in IE and FF.
    * Fix readonly mode in IE and FF.
* User settings service:
    * Sorting in `colsconfig-dialog` if form url has `sort` parameter.
    * `cols-config-menu` sensivity to multiple locale changes.
    * Named settings displaying in `cols-config-menu`.
    * Fix behavior of user settings dialog when `enableFilters` property of list components is enabled.
* List form's logic:
    * `filterCondition` query param when refreshing page.
    * `list-form` pagination in offline mode when offline storage doesn't contain any data.
    * Wrong getting of page number for lists of records if records count is zero.
* Edit form's logic:
    * `id` param receiveing on transition to parent route after saving and/or changing deatil modes of 2nd level.
    * Transition to detail model's edit form route form agregator's edit form route when agregator's model is not valid and `saveBeforeRouteLeave` option is `true`.
    * `detail-interaction` service behavior when closing detail model's edit form.
    * Detail model's saving logic in offline mode.
    * Detail model's delete logic in offline mode.
    * Rollback logic for unsuccessful delete operations.
    * Transition to parent route logic in `detail-edit-form` controller.
    * Aggregator model's reloading if detail model was modified.
    * Transition to edit form route when editing record has an `id` and `new` postfix at the same time.
    * Opening of `detail-edit-form` in `readonly` mode from `edit-form` in `readonly` mode, if `editOnSeparateRoute` setting is enabled in `flexberry-groupedit` component.
    * Redundant saving of agregator when transitioning to detail edit form.
* `log` service:
    * Fix `log` service settings initialization from application config.
    * Now throwing errors and promise errors are handling separately.
* User settings service:
  * Various `developerUserSettings` errors.
  * Reduntant confirm dialog in `colsconfig-dialog`.
* Fix `i-i-s-caseberry-logging-objects-application-log-l` and `new-platform-flexberry-services-lock-list` templates for use `recordsTotalCount` parameter.

### Removed
* `object-list-view` component:
    * `_attributeChanged` observer.
* `flexberry-objectlistview` and `olv-toolbar` components:
    * `createSettitingTitle`, `useSettitingTitle`, `editSettitingTitle`, `removeSettitingTitle`, `setDefaultSettitingTitle`, `showDefaultSettitingTitle` properties.
* `object-list-view-header-cell` component.
* `new-platform-flexberry-services-lock-edit` form.

### Known issues
* Changes in per page records count in `flexberry-objectlistview` component leads to it's hanging in IE.
* Incomprehensible one-way binding of `flexberry-lookup` `value` property in a new detail inside `flexberry-groupedit`.
* Changes in `showCheckBoxInRow` or `showDeleteButtonInRow` properties after adding new record in `flexberry-groupedit` leads to IE crashing.
* Current `page` URL parameter is not reset when deleting all records in list.
* Only one `flexberry-objectlistview` or `flexberry-groupedit` component could be used on particular form.
* List of values of `flexberry-dropdown` component are not showing over scroll bar when the component is embedded into `flexberry-groupedit` and there is not enough space to show these values over table rows.
* `flexberry-datepicker` eats too much memory, working slowly and slows down the application (especially when using multiple `flexberry-datepicker` components on form).
* Blueprints are not generating inheritance of serializers correctly. Also blueprints are not generating stuff for supporting offline mode in application.

## [0.6.1] - 2016-09-16
### Removed
* Remove `localforage` and `ember-localforage-adapter` from package dependencies and default blueprint. Now used only  `dexie` for IndexedDB access.

### Changed
* Updated dependency on `ember-flexberry-data` addon to v0.6.1. There fixed offline store adapter errors.

## [0.6.0] - 2016-09-14
### Added
* `flexberry-lookup` component:
    * Sorting direction for `autocomplete` and `dropdown` mode, use `sorting` property for specify direction.
    * Possibility reset value for `dropdown` mode, if `required` property not equals `true`.
    * Add property `dropdownIsSearch`. Now can be turned off autocomplete in dropdown mode.
* `flexberry-field` component:
    * Now support explicit html type definition. Default type is `text`.
* `flexberry-textbox` component:
    * Now support explicit html type definition. Default type is `text`.
* `flexberry-groupedit` component:
    * Add support of `configurateRow` method.
* `object-list-view` component:
    * Add observer `attributeChanged` that calls the `configurateRow` method. Now needs to use Ember.set(), to add custom class or show/hide buttons in menu items for record config.
* Support locks for `edit-form` route. Locks are not used by default, use [application config](https://github.com/Flexberry/ember-flexberry/blob/1fa9130c55a0dc07b0939f6499d97d98af0002e3/tests/dummy/config/environment.js#L41) to configure it.

### Changed
* Renamed `olv-toolbar-mixin` mixin to `olv-toolbar-controller`.
* Renamed `flexberry-lookup` mixin to `flexberry-lookup-controller`.
* Blueprint will no longer generate old top validator for properties in hbs templates.

### Fixed
* `flexberry-lookup` component not specify properties for select on `autocomplete` and `dropdown` mode.
* Now resolver is working correctly in IE.
* `flexberry-objectlistview` component:
    * Now for filter by any matches using all attributes of "master" model instead of one attribute with `displayMemberPath` option in projection.
    * If projection used for filter by any matches contains `hasMany` relationship, then that relationship will be skipped.
* Blueprints:
    * Generate correct `getCellComponent` function, if model has many "detail" models which refers to same "master" model.
    * Fix generation of validation rules inheritance in models.
    * Blueprint for hbs now generate clearly formatted code.
* Fixed wrong generation of columns list for user setting's dialog.
* Building filters in `object-list-view` component.
* Now `inflection` package installing along with `ember-flexberry` addon.
* Now `Save` and `Save and close` buttons on `detail-edit-form` after transition from new route working correctly.

### Removed
* Remove `base.js` from `models`. Now used the base model from `ember-flexberry-data` addon.

## [0.5.0] - 2016-09-05
### Added
* Blueprints:
    * Add support generation into ember addon.
* Resolver:
    * It is possible now to specify resources that should be resolved with origin resolving path (without considering device type detection).
* `flexberry-textarea` component:
    * Added support of HTML attributes.

### Changed
* Updated dependency on `ember-flexberry-data` addon to v0.5.0.
* Now performing transition to `edit-form` route after saving new model.
* `flexberry-file` component:
    * Renamed property for input element: `class` property was renamed to `inputClass`.

### Fixed
* `flexberry-checkbox` component:
    * Now if `flexberry-checkbox` was unchecked it doest'n has checked class.
* `flexberry-dropdown` component:
    * Fixed displaying of enums with empty values.
* `log` service will write error messages to console along with sending it to server if error would be handled in `Ember.onerror` or `Ember.RSVP.on('error')` events.
* Blueprints:
    * Fixed decimal fields generation on edit-forms (it will generate `flexberry-field` instead of `flexberry-dropdown`).
* `flexberry-checkbox` component:
    * `flexberry-checkbox` doesn't have `checked` class in unchecked state.
* `edit-form` controller: add сomponentProperties for `flexberry-file`.
* Now `flexberry-file`'s download button is disabled after deleting selected file and saving model.
* Filters for `flexberry-objectlistview` are working now (there was a code that was accidentally deleted during merges).
* `flexberry-toggler` component:
    * Now `expanded` property is not private & work.
    * Added `iconClass` property.
* Incorrect setting of first columns's width in `object-list-view` component.
* Wrong assertion for user setting's `width` property when creating a new detail in separate route.
* Rolling back `isDeleted` state of model if errors occurrs during destroying of the model.
* Now creating and editing of user settings are working properly on list forms.
* Fixed localization of column names displayed in column settings window.

### Removed
* Removed outdated style in `object-list-view` styles component.
* `flexberry-file` component:
    * Remove `fluid` CSS-class from component's defaults for `flexberry-file` component.

### Deprecated
* `edit-form` controller:
    * `rollbackHasManyRelationships` method was deprecated, use model's `rollbackHasMany` method instead.

### Known issues
* `flexberry-file` works improperly inside `flexberry-groupedit` when upload and delete file before saving model. Download button is active and it's possible to download deleted file after saving model and applying mentioned actions before saving.
* Only one `flexberry-objectlistview` or `flexberry-groupedit` component could be used on particular form.
* No items of context menu for rows of `flexberry-objectlistview` component are shown when `showEditMenuItemInRow` or `showDeleteMenuItemInRow` property of component has been dynamically changed.
* List of values of `flexberry-dropdown` component are not showing over scroll bar when the component is embedded into `flexberry-groupedit` and there is not enough space to show these values over table rows.
* If there's not enough space in window for displaying submenu of `flexberry-menu` component on bottom then submenu shows on top only first time. Then it shows on bottom.
* Formatted message field of log object fills differently in IE11/Safari and Chrome/Firefox.
* `flexberry-datepicker` eats too much memory, working slowly and slows down the application (especially when using multiple `flexberry-datepicker` components on form).
* "TransitionAborted" error get thrown when adding query params (callback is called once for each query param if `refreshModel: true` is set).
* `flexberry-datapicker` displays the next day when date with time is '00:00:00'.

## [0.4.0] - 2016-08-15
### Added
* Blueprints:
    * Add localization support for generated ember entities.
    * Add generation of explicit inflection rules. Rules for inflector are declared in `custom-inflector-rules.js` file inside `models` folder.
* `flexberry-dropdown` component:
    * Add support object type for `items` property.
    * Add support empty values for generated enums.

### Changed
* Transforms:
    * Moved transforms to [`ember-flexberry-data`](https://github.com/Flexberry/ember-flexberry-data) addon.
* Enums:
    * Moved enum initializer to [`ember-flexberry-data`](https://github.com/Flexberry/ember-flexberry-data) addon.
    * Renamed `enum-captions` helper to `flexberry-enum`.
* Changed dependency on `ember-flexberry-data` addon to [`v0.4.0`](https://github.com/Flexberry/ember-flexberry-data/releases/tag/0.4.0).

### Fixed
* `flexberry-objectlistview` component:
    * Incorrect work of pagination for large lists.

### Known issues
* Same as in previous release except issues in blueprints.

## [0.3.0] - 2016-07-29
### Added
* Custom internationalized captions for boolean type in `object-list-view-cell` component.
* Blueprints:
    * Add regeneration for models and serializers. Now models and serizlizers generates into separate regeneratable mixins, model and serializer classes will not be replaced during regeneration.
    * Add new `flexberry-group` blueprint for generation of group of entities by one blueprint.
    * Add generate of default comments for `flexberry-list-form` blueprint.
* Support of `flexberry-lookup` component in dropdown mode for mobile devices.
* `flexberry-objectlistview` component:
    * Add filtering by attribute of number type.
    * Add filtering by "master" attributes.
    * Add [`predicateForAttribute` method](http://flexberry.github.io/Documentation/master/classes/ListFormRoute.html#method_predicateForAttribute) for filtering customization in application.
    * Add filtering for each column.
    * Add hierarchical mode:
      * Autodetect availability of hierarchical mode by default.
      * Use [`hierarchyByAttribute` property](http://flexberry.github.io/Documentation/master/classes/FlexberryObjectlistview.html#property_hierarchyByAttribute) for building hierarchy.
      * Use [`disableHierarchicalMode` property](http://flexberry.github.io/Documentation/master/classes/FlexberryObjectlistview.html#property_disableHierarchicalMode)to disable hierarchical mode.
* `object-list-view` component:
    * Add localization support for model captions in projections.
* `flexberry-menu` component:
    * Added [`collapseMenuOnItemClick` property](http://flexberry.github.io/Documentation/master/classes/FlexberryMenu.html#property_collapseMenuOnItemClick) and related logic.
* Add `getValueFromLocales` helper function.
* Refactoring of user setting service:
    * User setting service now supports in-memory saving the settings of all `object-list-view` components for all pages. This allows:
        * Maintain user setting service on mode `APP.useUserSettingsService: false` without saving them to backend;
        * Store and appy (in future) settings for multiple components on a page;
        * Store an unlimited number of settings (default and named) for each `object-list-view` component;
        * Store (define) all the information on defaut or named setting (columns order, sorting order, columns width and other) in single object (property, backend record);
        * Customize the column widths manually by mouse or by specifying digital values;
        * Enable or disable the settings column widths;
        * Avoid repated access to the backend's usersetting service when you return to the already loaded page.
    * Support three levels of setting:
        * Defined by developer;
        * Defined by users and stored in usersetting's backend;
        * Temporary settings defined by users specified in the URL-parameters (`sort`, etc...).
        * Support user setting service for developer. After adjusting component developer can display current default and named settings and save them in [`developerUserSettings` property](http://flexberry.github.io/Documentation/master/classes/UserSettingsService.html#property_developerUserSettings)(see also [this](http://flexberry.github.io/Documentation/master/classes/IISCaseberryLoggingObjectsApplicationLogLRoute.html#property_developerUserSettings)) of `app/routes/{{pageRouteName}}.js` as default settings.

### Changed
* **Important**: now [`ember-flexberry`](https://github.com/Flexberry/ember-flexberry) depends on [`ember-flexberry-data@0.3.1`](https://github.com/Flexberry/ember-flexberry-data/releases/tag/0.3.1) that has [api changes](https://github.com/Flexberry/ember-flexberry-data/blob/master/CHANGELOG.md#changed). So it is necessary to make corresponding changes in application source code after updating vesrion of [`ember-flexberry`](https://github.com/Flexberry/ember-flexberry)!
* `flexberry-file`:
    * Removed collapsing menu logic.
    * Added [`collapseMenuOnItemClick` property](http://flexberry.github.io/Documentation/master/classes/FlexberryMenu.html#property_collapseMenuOnItemClick) to appropriate .hbs file (template).
* Blueprints:
    * `editFormRoute` property was moved to controller.

### Fixed
* Blueprints:
    * Speed up generation process.
    * Fixed adapter generation in `flexberry-core` blueprint.
* Fixed selection of value for `flexberry-lookup` component in dropdown mode.
* Fixed displaying of column settings buttons if user settings service is off or menu items list for column settings is empty.
* Fixed sorting by clicking on table header of `flexberry-objectlistview` or `flexberry-groupedit` component in Firefox.
* Fixed blueprints dependency for generation of application prototype for hide the sidebar with sitemap after click on sitemap-node.
* Fixed `flexberry-menu` for configuration of columns settings in `flexberry-objectlistview` component after changing current locale for internationalization to another language and back again.
* Now [`displayAttributeName` property](http://flexberry.github.io/Documentation/master/classes/FlexberryLookup.html#property_displayAttributeName) is required for only autocomplete and dropdown modes in `flexberry-lookup` component.

### Known issues
* Only one `flexberry-objectlistview` or `flexberry-groupedit` component could be used on particular form.
* It is not possible to open any route for generated application prototype (in case of generation of whole application prototype) because of wrong generation of internationalization mechanism. Also probably lookup components on edit forms of generated application prototype may not work.
* It is not possible to sort list of models by property of "master" model if property of another "master" model from used projection has the same name.
* No items of context menu for rows of `flexberry-objectlistview` component are shown when `showEditMenuItemInRow` or `showDeleteMenuItemInRow` property of component has been dynamically changed.
* List of values of `flexberry-dropdown` component are not showing over scroll bar when the component is embedded into `flexberry-groupedit` and there is not enough space to show these values over table rows.
* Formatted message field of log object fills differently in IE11/Safari and Chrome/Firefox.
* `flexberry-datepicker` eats too much memory, working slowly and slows down the application (especially when using multiple `flexberry-datepicker` components on form).
* "TransitionAborted" error get thrown when adding query params (callback is called once for each query param if `refreshModel: true` is set).
* `flexberry-datapicker` displays the next day when date with time is '00:00:00'.
* Placeholder text localization for `flexberry-dropdown` component works improperly when `readonly` property changes dynamically. Also placeholder text is not localize in all browsers except Google Chrome.
* Some text is not localized in user settings dialog.
* There are some problems with displaying styles of user settings dialog.
* Drop-down menu for configuration of columns settings in `flexberry-objectlistview` component stops working properly after deleting of user setting or changing page on list form.

## [0.2.1] - 2016-07-07
### Changed
* Updated information about [release process in README.md](https://github.com/Flexberry/ember-flexberry/blob/master/README.md#releasing)

### Fixed
* Fixed wrong dependency from [`ember-flexberry-data`](https://github.com/Flexberry/ember-flexberry-data) addon.
* Fixed wrong import of `register-version.js`.

## [0.2.0] - 2016-07-06 [YANKED]
### Added
* New components based on `object-list-view` component to work with lists of models on list forms and edit forms (see more details below):
    * `flexberry-objectlistview` - usually used on list forms to work with list of "base" models loaded in route.
    * `flexberry-groupedit` - used on edit forms to work with list of models, referenced by "base" model using hasMany relationship ("detail" models).
* Support of setting conditions ("limits") on form's routes for loading data. Limits can be set with client query language ([LINQ-like](https://msdn.microsoft.com/en-us/library/bb397926.aspx) language) defined in [ember-flexberry-data](https://github.com/Flexberry/ember-flexberry-data) addon.
* Support of any backend types. It is necessary to implement adapter for client query language to support a particular backend type. The adapter should translate query object into request specific to corresponding backend. There are several adapters implemented in [ember-flexberry-data](https://github.com/Flexberry/ember-flexberry-data) addon:
    * Adapter for [OData-based](http://www.odata.org/) backends.
    * Adapter for querying arrays of JavaScript objects (like [LINQ to Objects](https://msdn.microsoft.com/en-us/library/bb397919.aspx)).
    * Adapter for [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (using to support queries in offline mode).
* Components based on [Semantic UI](http://semantic-ui.com/) framework:
    * `flexberry-base-component` - base component for most of other flexberry components. It should not be used independently.
    * `flexberry-checkbox` - wrapper for base checkbox component.
    * `flexberry-datepicker` - renamed `datetime-picker` component for choose date and time. Added features:
        * Ability of specifying min and max date for displaying range.
    * `flexberry-dropdown` - renamed `drop-down` component for select value from list. Now it is based on [Semantic UI Dropdown](http://semantic-ui.com/modules/dropdown.html) component.
    * `flexberry-field` - component for displaying input with label.
    * `flexberry-file` - component for upload and download files to/from backend. Backend should include corresponding web service to ensure that the component works. Basic features:
        * Configurable upload URL and other parameters.
        * Choose file to upload.
        * Reset uploading file.
        * Download previously uploaded file.
        * Show preview for images (with showing full-size image in modal window when click on preview).
        * Store file metadata in specified model property.
        * Separate template for mobile devices.
    * `flexberry-groupedit` - component for displaying list of "detail" models within table and performing opertaions with these models such as create, edit and delete. It composed by `groupedit-toolbar` and `object-list-view` components. It should be used on edit forms to work with "detail" models. Basic features:
        * Add "detail" model directly in component.
        * Edit "detail" model directly in component.
        * Edit "detail" model on edit form that opens in separate route by click on particular table row. This feature allows to edit "detail" models of 2nd and further levels.
        * Optional saving of "detail" models before leaving route.
        * Select rows with "detail" models.
        * Delete selected or particular "detail" models.
        * Support of embedding another components in table cells to display and edit specific field of the "detail" model.
        * Sorting list of models my clicking on table headers.
        * Resizing columns of the table.
        * Separate template for mobile devices.
    * `flexberry-lookup` - renamed `lookup-field` component for select related model, referenced by "base" model using belongsTo relationship ("master" models). Added features:
        * Displaying list of "master" models with `flexberry-objectlistview` component instead of `object-list-view` component with ability to set custom properties for `flexberry-objectlistview` component.
        * Autocomplete mode.
        * Dropdown mode (without opening list of "master" models list in modal window).
        * Adding custom css classes for buttons.
        * Setting conditions ("limits") on displaying list of "master" models with client query language.
    * `flexberry-menu` - component for displaying multilevel menu. Basic features:
        * Configurable set of menu items.
        * Setting icons for menu items.
        * Setting handler for clicking on menu items.
    * `flexberry-objectlistview` - component for displaying list of "base" or "detail" models within table and performing opertaions with these models such as create, edit and delete. It composed by `olv-toolbar` and `object-list-view` components and also including markup for pagination. Usually it should be used on list forms to work with "base" models. Basic features:
        * Add  model on edit form that opens in separate route by click on corresponding button in toolbar.
        * Edit model on edit form that opens in separate route by click on particular table row.
        * Select rows with models.
        * Delete selected models.
        * Using pagination with ability of specifying record count per page.
        * Adding custom buttons in toolbar.
        * Resizing columns of the table.
        * Filtering list of models by searching specified string in all string properties of models.
        * Sorting list of models my clicking on table headers.
        * Configuring column settings including sorting, order of columns, visibility and ability to save configured settings with specified name on backend.
        * Setting conditions ("limits") on displaying list of models with client query language.
        * Showing customizable context menu for each row by clicking on corresponding button.
        * Ability to place component on edit form including to work with "detail" models.
        * Supporting promise for specifying displaying list of models.
        * Separate template for mobile devices.
    * `flexberry-simpledatetime` - component for for choose date and time based on HTML5 capabilities.
    * `flexberry-textarea` - wrapper for base textarea component.
    * `flexberry-textbox` - wrapper for base input component.
    * `flexberry-toggler` - component for collapsing and expanding inner content (components and markup). Basic features:
        * Collapsing and expanding inner content.
        * Setting title for component.
    * `flexberry-validationmessage` - component for displaying message of validation error on edit form for particular property of model. Basic features:
        * Specifying model property for displaying validation error.
        * Specifying pointing for component's appearance.
    * `flexberry-validationsummary` - component for displaying list of validation errors of model on edit form.
    * `groupedit-toolbar` - toolbar for `flexberry-groupedit` component. Support displaying of add and delete buttons. It should not be used independently.
* Improved resolver to support substitution of source files for different device types (e.g. handlebars templates, .js files etc.). Device type detection based on [devicejs](https://github.com/matthewhudson/device.js) library. There are several component templates for mobile platforms that available out of the box (i.e. these components should look different on mobile devices):
    * Template for `flexberry-file` component.
    * Template for `flexberry-lookup` component.
    * Template for `object-list-view` component (used inside `flexberry-objectlistview` and `flexberry-groupedit` components).
* Logging service for saving errors and warnings on backend. Can be used optionally.
* List and edit forms for displaying saved logs.
* User settings service for storing component's settings for current user on backend.
* Internationalization engine based on [ember-i18n](https://github.com/jamesarosen/ember-i18n).
* Validator for `date` type of model properties.
* Transform to support using `file` type in models.
* Blueprints for generation of application prototype or its parts. Generation is based on using application metadata that could be creadted manually or using [Flexberry Designer](http://flexberry.ru/Flexberry/ForDevelopers/FlexberryDesigner) from corresponding UML class diagramms. Available blueprints:
    * `flexberry-application` - blueprint for generation of whole application prototype.
    * `flexberry-core` - blueprint for generation of base structure of application prototype
    * `flexberry-edit-form` - blueprint for generation of controller, route and template for specified edit form.
    * `flexberry-enum` - blueprint for generation of transform and file with definition for specified enumeration.
    * `flexberry-list-form` - blueprint for generation of controller, route and template for specified list form.
    * `flexberry-model` - blueprint for generation of specified model and serializer with corresponding tests.

### Changed
* Upgraded `ember-cli` from @1.13.8 to @2.4.3. Ember 1.13 is no longer supported.
* `object-list-view` and `olv-toolbar` components are no longer used independently. It is necessary to use `flexberry-objectlistview` component or `flexberry-groupedit` component instead.
* Renamed `datetime-picker` component to `flexberry-datepicker`.
* Renamed `drop-down` component to `flexberry-dropdown`.
* Renamed `lookup-field` component to `flexberry-lookup`.
* Base adapter and serializer for communication with backend via [OData protocol](http://www.odata.org/) was moved to [ember-flexberry-data](https://github.com/Flexberry/ember-flexberry-data) addon (this addon was formerly named as `ember-flexberry-projections`). So now [`ember-flexberry`](https://github.com/Flexberry/ember-flexberry) depends on [`ember-flexberry-data@0.2.0`](https://github.com/Flexberry/ember-flexberry-data/releases/tag/0.2.0)
* Redesigned enumerations support.

### Deprecated
* `ui-message` component:
    * `title` property is deprecated, use `caption` property instead.

### Removed
* Authenticator, authorizer, login route and controller for support of token based authentication were removed. Authentication is not supported for now.

### Fixed
* Fixed saving model logic on edit forms so that corresponding OData-queries is now making following the [standard](http://www.odata.org/documentation/).
* Fixed setting of date in binded model property when typing date manually using `flexberry-datepicker` component.
* Fixed support of embedding components in table cell of `object-list-view` component to display and edit specific field of the model.

### Known issues
* Only one `flexberry-objectlistview` or `flexberry-groupedit` component could be used on particular form.
* Internationalization is not implemented for captions in model projections.
* It is not possible to open any route for generated application prototype (in case of generation of whole application prototype) because of wrong generation of internationalization mechanism.
* It is not possible to sort list of models by property of "master" model if property of another "master" model from used projection has the same name.
* Some items of context menu for rows of `flexberry-objectlistview` component are disappearnig when `showEditMenuItemInRow` or `showDeleteMenuItemInRow` property of component has been dynamically changed.
* Sorting by clicking on table header of `flexberry-objectlistview` or `flexberry-groupedit` component is not working in Firefox.
* List of values of `flexberry-dropdown` component are not showing over scroll bar when the component is embedded into `flexberry-groupedit` and there is not enough space to show these values over table rows.
* Logs for rejected promises are not saving on backend.
* Formatted message field of log object fills differently in IE11/Safari and Chrome/Firefox.
* `flexberry-datepicker` eats too much memory, working slowly and slows down the application (especially when using multiple `flexberry-datepicker` components on form).
* Drop-down menu for configuration of columns settings in `flexberry-objectlistview` component stops working after changing current locale for internationalization to another language and back again.
* Drop-down menu for configuration of columns settings in `flexberry-objectlistview` component stops working properly after saving user setting on backend.
* Saving user settings for `flexberry-groupedit` component and for `flexberry-objectlistview` that shows for choosing value for `flexberry-lookup` component doesn't work correctly. It is possible to use `notUseUserSettings` property for `flexberry-objectlistview` component to turn off user settings for these cases as workaround.

## [0.1.0] - 2015-12-05
### Added
* Base list form route and controller with support of pagination and sorting for data placed in `object-list-view` component.
* Base edit form route and controller with support of `save`, `delete` and `close` actions.
* Base adapter and serializer for communication with backend via [OData protocol](http://www.odata.org/).
* Components based on [Semantic UI](http://semantic-ui.com/) framework:
    * `datetime-picker` - component for choose date and time based on [semantic-ui-daterangepicker](https://github.com/milimetric/semantic-ui-daterangepicker) component.
    * `drop-down` - component for select value from list (based on `select` html element).
    * `lookup-field` - component for select related model, referenced by "base" model using belongsTo relationship ("master" models). Basic features:
        * Displaying list of related models in `object-list-view` component, that is shown in modal dialog window, by clicking on choose button.
        * Displaying of specified property of related model for choosed value.
        * Reset choosed value by clicking on remove button.
        * Support of changing text displayed on buttons.
    * `modal-dialog` - component for showing templates in modal dialog window, based on [Modal] (http://semantic-ui.com/modules/modal.html) Semantic UI module.
    * `object-list-view` - component for displaying list of records that are instances of the models. Component can be used on list forms and edit forms (one component per form for now). Basic features:
        * List of table headers is based on model projections that are defined in the models. Model projections support is implemented in [ember-flexberry-projections](https://github.com/Flexberry/ember-flexberry-data) addon.
        * Change sorting order by clicking on the table headers.
        * Transition to edit form for particular model by clicking on table row.
        * Support of embedding components in table cells to display specific field of the model.
        * Support of displaying list of models, referenced by "base" model using hasMany relationship ("detail" models), on edit form.
    * `olv-toolbar` - toolbar for `object-list-view` component. Support displaying of add and refresh buttons.
    * `ui-message` - component for displaying success and error messages (e.g. on edit form when fail to save model).
* Support of validation rules that can be defined in models (using [ember-validations](https://github.com/DockYard/ember-validations) addon).
* Transforms to support using `enum` type in models.
* Sitemap template for displaying application menu.
* Authenticator, authorizer, login route and controller for support of token based authentication (using [ember-simple-auth](https://github.com/simplabs/ember-simple-auth) library).
