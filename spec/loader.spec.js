let loaderUtils = require( 'loader-utils' )
const loader    = require( '..' );
const _         = require( 'lodash' );

describe( "Startup test" , () => {
    it( "tests jasmine running", () => {
        expect( true ).toBe( true );
    });
});

describe( 'Loader tests', () => {
    it( 'loader is funtion', () => {
        expect( _.isFunction( loader ) ).toBeTruthy();
    });

    const simpleSource = '#@& x @#';
    it( 'simple number interpolation example', () => {
        expect( loader.call(
            {
                query: '?config=o',
                options: {
                    o: {definitions:{x:1}}
                }
            },
            simpleSource 
        ) ).toBe('1');
    } );

    it( 'simple string interpolation example', () => {
        expect( loader.call(
            {
                query: '?config=o',
                options: {
                    o: {definitions: {x:'x'} }
                }
            },
            simpleSource
        ) ).toBe("'x'");
    });

    const requiredSource = 'var app_version = #@& app_version @#;';
    it( 'required number interpolation', () => {
        expect( loader.call (
            {
                query: '?config=o',
                options: {
                    o: {definitions: {app_version: 4566} }
                }
            },
            requiredSource
        ) ).toBe('var app_version = 4566;');
    } );

    it( 'required string interpolation', () => {
        expect( loader.call (
            {
                query: '?config=o',
                options: {
                    o: {definitions: {app_version: 'zxc456'} }
                }
            },
            requiredSource
        ) ).toBe("var app_version = 'zxc456';");
    });

    const conditionalSource = '#@# vk @#let backend = new VK();#@/ vk @#';
    it( 'conditional block rendering on "true"', () => {
        expect( loader.call (
            {
                query: '?config=o',
                options: {
                    o: {definitions: {vk: true} }
                }
            },
            conditionalSource
        ) ).toBe("let backend = new VK();");
    } )
    ;
    it( 'conditional block rendering on "false"', () => {
        expect( loader.call (
            {
                query: '?config=o',
                options: {
                    o: {definitions: {vk: false} }
                }
            },
            conditionalSource
        ) ).toBe("");
    } );
});
