import yargs from 'yargs/yargs';
import { type Options, optionsWithDefaults, run } from './steps.js';

yargs(process.argv.slice(2))
  .scriptName('template-tag-codemod')
  .command(
    '$0',
    "Converts Ember's .hbs format to .gjs or .gts format.",
    y =>
      y
        .option('relativeLocalPaths', {
          default: optionsWithDefaults().relativeLocalPaths,
          type: 'boolean',
          describe: `When true, imports for other files in the same project will use relative paths with file extensions. This is the most compatible with modern Node ESM convensions, but it's not supported by Ember's classic build.`,
        })
        .option('extensions', {
          array: true,
          type: 'string',
          default: optionsWithDefaults().extensions,
          describe: `File extensions to search when resolving components, helpers, and modifiers inside your hbs files`,
        })
        .option('nativeRouteTemplates', {
          default: optionsWithDefaults().nativeRouteTemplates,
          type: 'boolean',
          describe: `When true, assume we can use template-tag directly in route files (requires ember-source >= 6.3.0-beta.3). When false, assume we can use the ember-route-template addon instead.`,
        })
        .option('routeTemplates', {
          array: true,
          type: 'string',
          default: optionsWithDefaults().routeTemplates,
          describe: `Controls which route template files we will convert to template tag. Provide a list of globs.`,
        })
        .option('components', {
          array: true,
          type: 'string',
          default: optionsWithDefaults().components,
          describe: `Controls which component files we will convert to template tag. Provide a list of globs.`,
        })
        .option('defaultOutput', {
          type: 'string',
          default: optionsWithDefaults().defaultOutput,
          describe: `When a .js or .ts file already exists, we necessarily convert to .gjs or .gts respectively. But when only an .hbs file exists, we have a choice of default.`,
        })
        .option('templateOnlyComponentSignature', {
          type: 'string',
          default: optionsWithDefaults().templateOnlyComponentSignature,
          describe: `Snippet of typescript to use as the type signature of newly-converted template-only components.`,
        })
        .option('routeTemplateSignature', {
          type: 'string',
          default: optionsWithDefaults().routeTemplateSignature,
          describe: `Snippet of typescript to use as the type signature of route templates.`,
        })
        .option('templateInsertion', {
          type: 'string',
          default: optionsWithDefaults().templateInsertion,
          describe: `Where should <template> be inserted inside existing class bodies? Say "beginning" or "end".`,
        }),

    async argv => {
      await run(argv as Options);
    }
  )
  .parse();
