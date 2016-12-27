'use strict';

const YeomanGenerator = require('yeoman-generator');

module.exports = class extends YeomanGenerator {
    constructor(args, opts) {
        super(args, opts)

        this.argument('entityName', { type: String, required: true });
    }

    initializing() {
        this.composeWith('nlayer-server:newEntity', { arguments : [ this.options.entityName ] });
    }
};
