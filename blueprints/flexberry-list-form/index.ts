/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/lodash/index.d.ts' />
/// <reference path='../typings/MetadataClasses.d.ts' />

import fs = require("fs");
import path = require('path');
import lodash = require('lodash');
const stripBom = require("strip-bom");
const skipConfirmationFunc = require('../utils/skip-confirmation');
import metadata = require('MetadataClasses');
import Locales from '../flexberry-core/Locales';
import CommonUtils from '../flexberry-common/CommonUtils';

module.exports = {
  description: 'Generates an ember list-form for flexberry.',

  availableOptions: [
    { name: 'file', type: String },
    { name: 'metadata-dir', type: String },
    { name: 'skip-confirmation', type: Boolean }
  ],

  supportsAddon: function () {
    return false;
  },

  _files: null,

  isDummy: false,

  files: function() {
    if (this._files) { return this._files; }
    this.isDummy = this.options.dummy;
    if (this.options.dummy) {
      this._files=CommonUtils.getFilesForGeneration(this, function(v) { return v === "app/templates/__name__.hbs" || v === "app/templates/__name__/loading.hbs"; });
    } else {
      this._files = CommonUtils.getFilesForGeneration(this, function (v) { return v === "tests/dummy/app/templates/__name__.hbs" || v === "tests/dummy/app/templates/__name__/loading.hbs"; });
    }
    return this._files;
  },

  afterInstall: function (options) {
    if (this.project.isEmberCLIAddon()) {
      CommonUtils.installFlexberryAddon(options, ["controller", "route"]);
    }
  },

  processFiles(intoDir, templateVariables) {
    let skipConfirmation = this.options.skipConfirmation;
    if (skipConfirmation) {
      return skipConfirmationFunc(this, intoDir, templateVariables);
    }

    return this._super(...arguments);
  },

  /**
   * Blueprint Hook locals.
   * Use locals to add custom template variables. The method receives one argument: options.
   *
   * @method locals
   * @public
   *
   * @param {Object} options Options is an object containing general and entity-specific options.
   * @return {Object} Сustom template variables.
   */
  locals: function(options) {
    let listFormBlueprint = new ListFormBlueprint(this, options);
    return lodash.defaults({
      editForm: listFormBlueprint.listForm.editForm,// for use in files\__root__\templates\__name__.hbs
      formName: listFormBlueprint.listForm.name,// for use in files\__root__\controllers\__name__.js
      entityName: options.entity.name,
      modelName: listFormBlueprint.listForm.projections[0].modelName,// for use in files\__root__\templates\__name__.hbs, files\__root__\routes\__name__.js
      modelProjection: listFormBlueprint.listForm.projections[0].modelProjection,// for use in files\__root__\routes\__name__.js
      caption: listFormBlueprint.listForm.caption,// for use in files\__root__\templates\__name__.hbs
      importFormRouteName: listFormBlueprint.importFormRoute.name,
      importFormRoutePath: listFormBlueprint.importFormRoute.path,
      importFormControllerName: listFormBlueprint.importFormController.name,
      importFormControllerPath: listFormBlueprint.importFormController.path,
      },
      listFormBlueprint.locales.getLodashVariablesProperties()// for use in files\__root__\locales\**\forms\__name__.js
   );
  }
};

class ListFormBlueprint {
  locales: Locales;
  listForm: metadata.ListForm;
  importFormRoute: any;
  importFormController: any;

  constructor(blueprint, options) {
    let listFormsDir = path.join(options.metadataDir, "list-forms");
    if (!options.file) {
      options.file = options.entity.name + ".json";
    }
    let localePathTemplate: lodash.TemplateExecutor = this.getLocalePathTemplate(options, blueprint.isDummy, path.join("forms", options.entity.name + ".js"));
    this.locales = new Locales(options.entity.name, "ru", localePathTemplate);
    let listFormFile = path.join(listFormsDir, options.file);
    let content = stripBom(fs.readFileSync(listFormFile, "utf8"));
    this.listForm = JSON.parse(content);
    this.locales.setupForm(this.listForm);

    var configsFile = path.join('vendor/flexberry/custom-generator-options/generator-options.json');
    if (fs.existsSync(configsFile)) {
        var configs = JSON.parse(stripBom(fs.readFileSync(configsFile, "utf8")));
        if (configs.listForms == undefined) {
            this.importFormRoute.name = 'ListFormRoute';
            this.importFormRoute.path = 'ember-flexberry/routes/list-form';
            this.importFormController.name = 'ListFormController';
            this.importFormController.path = 'ember-flexberry/controllers/list-form';
        } else {
            if (configs.listForms[options.entity.name] != undefined) {
                this.importFormRoute = configs.listForms[options.entity.name].baseRoute;
                this.importFormController = configs.listForms[options.entity.name].baseController;
            }
            else if (configs.listForms.defaultForm != undefined) {
                this.importFormRoute = configs.listForms.defaultForm.baseRoute;
                this.importFormController = configs.listForms.defaultForm.baseController;
            };
        };
    } else {
      this.importFormRoute.name = 'ListFormRoute';
      this.importFormRoute.path = 'ember-flexberry/routes/list-form';
      this.importFormController.name = 'ListFormController';
      this.importFormController.path = 'ember-flexberry/controllers/list-form';
    };
  }

  private getLocalePathTemplate(options, isDummy, localePathSuffix: string): lodash.TemplateExecutor {
    let targetRoot = "app"
    if (options.project.pkg.keywords && options.project.pkg.keywords["0"] === "ember-addon" ) {
      targetRoot = isDummy ? path.join("tests/dummy", targetRoot) : "addon";
    }
    return lodash.template(path.join(targetRoot, "locales", "${ locale }", localePathSuffix));
  }
}
