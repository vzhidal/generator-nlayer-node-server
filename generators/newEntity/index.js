const generators = require('yeoman-generator');
const lodash = require('lodash');

module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('entityName', { type: String, required: true });
        this.entityFields = [];
    },
    prompting: function promptField() {
        const self = this;

        return self.prompt(
            {
                type: 'confirm',
                name: 'isField',
                message: 'Do you want to add a field?',
                default: true
            }
        )
            .then((confirm) => {
                if (confirm.isField) {
                    return self.prompt(
                        {
                            type: 'input',
                            name: 'field',
                            message: 'Enter a field name:',
                            validate: function (input) {
                                if (input && input.length) {
                                    return true;
                                }
                                return 'Field name is not valid. Please try again...';
                            }
                        }
                    )
                        .then((input) => {
                            self.entityFields.push(input.field);
                            return promptField.apply(self);
                        })
                }
            });
    },
    writing: function () {
        const self = this;

        const entityNameCamelCase = lodash.camelCase(self.entityName);
        const entityNamePascalCase = entityNameCamelCase.charAt(0).toUpperCase() + entityNameCamelCase.slice(1);

        const entityFields = lodash.map(
            self.entityFields,
            (field) =>lodash.camelCase(field)
        );

        const pathsConfig = [
            {
                templatePath: 'application/models/entityModel.ejs',
                destinationPath:`server/application/models/${entityNameCamelCase}Model.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityFields: entityFields
                }
            },
            {
                templatePath: 'application/services/entityAppService.ejs',
                destinationPath:`server/application/services/${entityNameCamelCase}AppService.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityNameCamelCase: entityNameCamelCase
                }
            },
            {
                templatePath: 'dataAccess/mappingProfiles/entityMappingProfile.ejs',
                destinationPath:`server/dataAccess/mappingProfiles/${entityNameCamelCase}MappingProfile.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityNameCamelCase: entityNameCamelCase
                }
            },
            {
                templatePath: 'dataAccess/models/entityDataModel.ejs',
                destinationPath:`server/dataAccess/models/${entityNameCamelCase}DataModel.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityNameCamelCase: entityNameCamelCase,
                    entityFields: entityFields
                }
            },
            {
                templatePath: 'dataAccess/repositories/entityRepository.ejs',
                destinationPath:`server/dataAccess/repositories/${entityNameCamelCase}Repository.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityNameCamelCase: entityNameCamelCase
                }
            },
            {
                templatePath: 'web/mappingProfiles/entityMappingProfile.ejs',
                destinationPath:`server/web/mappingProfiles/${entityNameCamelCase}MappingProfile.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityNameCamelCase: entityNameCamelCase
                }
            },
            {
                templatePath: 'web/models/entityViewModel.ejs',
                destinationPath:`server/web/models/${entityNameCamelCase}ViewModel.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityFields: entityFields
                }
            },
            {
                templatePath: 'web/services/entityWebService.ejs',
                destinationPath:`server/web/services/${entityNameCamelCase}WebService.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityNameCamelCase: entityNameCamelCase
                }
            },
            {
                templatePath: 'web/routes/entityRoutes.ejs',
                destinationPath:`server/web/routes/${entityNameCamelCase}Routes.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityNameCamelCase: entityNameCamelCase
                }
            },
            {
                templatePath: 'web/validationSchemes/entityValidationScheme.ejs',
                destinationPath:`server/web/validationSchemes/${entityNameCamelCase}ValidationScheme.js`,
                params: {
                    entityFields: entityFields
                }
            }
        ];

        pathsConfig.forEach(function(config){
            self.fs.copyTpl(
                self.templatePath(config.templatePath),
                self.destinationPath(config.destinationPath),
                config.params
            );
        });
    }
});
