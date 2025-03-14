export { Packager, PackagerConstructor, Variant, applyVariantToBabelConfig, getPackagerCacheDir } from './packager';
export { HTMLEntrypoint, BundleSummary } from './html-entrypoint';
export { default as Stage } from './stage';
export { default as Options, optionsWithDefaults } from './options';
export { default as WaitForTrees, OutputPaths } from './wait-for-trees';
export { compile as jsHandlebarsCompile } from './js-handlebars';
export { todo, unsupported, warn, debug, expectWarning, throwOnWarnings } from './messages';
export { Resolver } from './module-resolver';
export { ModuleRequest, type Resolution, type RequestAdapter, type RequestAdapterCreate } from './module-request';
export type { Options as ResolverOptions } from './module-resolver-options';
export { ResolverLoader } from './resolver-loader';
export { virtualContent, type VirtualResponse } from './virtual-content';
export type { Engine } from './app-files';

// this is reexported because we already make users manage a peerDep from some
// other packages (like embroider/webpack and @embroider/compat
export * from '@embroider/shared-internals';
