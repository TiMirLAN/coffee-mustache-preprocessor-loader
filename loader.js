const _                 = require( 'lodash' );
const loaderUtils       = require( 'loader-utils' );
let Mustache            = require( 'mustache' );

const defaultOptions = {};

Mustache.tags = ['#@', '@#'];

module.exports = function (source) {
    const { definitions, params } = loaderUtils.getLoaderConfig ( this );
    /* 'Cause I want render strings as 'string'`s */
    let context = _.reduce( definitions, ( acc, value, key ) => {
        acc[key] = _.isString(value) ? `'${value}'` : value;
        return acc;
    }, {} );

    let options = params != null ? _.assign( {}, params, defaultOptions) : defaultOptions;

    return Mustache.render( source, context, options );

};
