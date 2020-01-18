import * as path from 'path';
import * as esifycss from 'esifycss';
import * as rollup from 'rollup';
import * as pluginUtils from 'rollup-pluginutils';
import {updateBundle} from './updateBundle';
import {IPluginOptions} from './types';
import {getFirstInput} from './getFirstInput';

export const embedCSSPlugin = (
    options: IPluginOptions = {},
): rollup.Plugin => {
    const filter = pluginUtils.createFilter(options.include || './**/*.css', options.exclude);
    let session: esifycss.Session | undefined;
    let helperId = '';
    return {
        name: 'embedCSS',
        options(inputOptions) {
            const {css} = options;
            let {helper} = options;
            if (!css && !helper) {
                const firstInput = getFirstInput(inputOptions.input);
                if (firstInput) {
                    helper = path.join(path.dirname(firstInput), 'embedcss-helper.css.js');
                }
            }
            if (helper) {
                helperId = path.join(__dirname, `esifycss-helper${path.extname(helper || 's.js')}`);
            }
            session = new esifycss.Session({...options, helper: helperId, css, include: [], watch: false});
            return null;
        },
        resolveId(importee, importer) {
            if (!session) {
                throw new Error('NoSession');
            }
            const id = importer && !path.isAbsolute(importee) ? path.join(path.dirname(importer), importee) : importee;
            return id === helperId ? session.helperPath : null;
        },
        async load(id) {
            if (!session) {
                throw new Error('NoSession');
            }
            if (!filter(id)) {
                return null;
            }
            const {code} = await session.processCSS(id);
            return code;
        },
        generateBundle(_options, bundle) {
            updateBundle(bundle);
        },
    };
};
