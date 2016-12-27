'use strict';

const YeomanGenerator = require('yeoman-generator');
const contextManager = require('./contextManager');

class NLayerGenerator extends YeomanGenerator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('entityName', { type: String, required: true });
        this.entityFields = [];
    }

    prompting(){
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
                            return self.prompting.apply(self);
                        })
                }
            });
    }

    writing() {
        const self = this;

        const contextsConfig = contextManager.getContextsConfig(self.options.entityName, self.entityFields);

        contextsConfig.forEach(function(config){
            self.fs.copyTpl(
                self.templatePath(config.templatePath),
                self.destinationPath(config.destinationPath),
                config.params
            );
        });
    }
}

module.exports = NLayerGenerator;
