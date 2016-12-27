'use strict';

const lodash = require('lodash');

module.exports = {
    getContextsConfig: function (entityName, entityFields) {
        const entityNameCamelCase = lodash.camelCase(entityName);
        const entityNamePascalCase = entityNameCamelCase.charAt(0).toUpperCase() + entityNameCamelCase.slice(1);

        const entityFieldNamesCamelCase = lodash.map(
            entityFields,
            (field) => lodash.camelCase(field)
        );

        const pathsConfig = [
            {
                templatePath: 'application/models/entityModel.ejs',
                destinationPath:`server/application/models/${entityNameCamelCase}Model.js`,
                params: {
                    entityNamePascalCase: entityNamePascalCase,
                    entityFields: entityFieldNamesCamelCase
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
                    entityFields: entityFieldNamesCamelCase
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
                    entityFields: entityFieldNamesCamelCase
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
                destinationPath:`server/web/validationSchemes/${entityNameCamelCase}ValidationScheme.json`,
                params: {
                    entityFields: entityFieldNamesCamelCase
                }
            }
        ];

        return pathsConfig;
    }
};
