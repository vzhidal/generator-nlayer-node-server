const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('entityName', { type: String, required: true });
    },
    initializing: function () {
        this.composeWith('nlayer-server:newEntity', { args: [ this.entityName ] });
    }
});
