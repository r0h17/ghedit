/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'assert', 'vs/base/node/env'], function (require, exports, assert, env) {
    'use strict';
    suite('Env', function () {
        test('Parses multi-line environment variables at end of env', function (done) {
            var vars = env.parseEnvOutput('a=first\nb=multiple\nlines');
            assert.equal(Object.keys(vars).length, 2);
            assert.equal(vars['a'], 'first');
            assert.equal(vars['b'], 'multiple\nlines');
            done();
        });
        test('Parses multi-line environment variables at start of env', function (done) {
            var vars = env.parseEnvOutput('a=multiple\nlines\nb=second');
            assert.equal(Object.keys(vars).length, 2);
            assert.equal(vars['a'], 'multiple\nlines');
            assert.equal(vars['b'], 'second');
            done();
        });
        test('Parses complex multi-line environment variables', function (done) {
            var vars = env.parseEnvOutput('a=1\nb=\n23 =4\n_5c=56\n d=7\nE =8');
            assert.equal(Object.keys(vars).length, 3);
            assert.equal(vars['a'], '1');
            assert.equal(vars['b'], '\n23 =4');
            assert.equal(vars['_5c'], '56\n d=7\nE =8');
            done();
        });
    });
});
//# sourceMappingURL=env.test.js.map