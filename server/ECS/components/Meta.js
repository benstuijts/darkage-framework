'use strict';
const Meta = function( options ) {
    if(!options) options = {};
    const component = {
        _name : 'meta',
        name: options.name || "",
        description: options.description || "",
        keywords: options.keywords || "",
    }; 
    return component;
};

module.exports = Meta;