import { resolver } from './resolver.js';
import { hbs } from './hbs.js';
import { scripts } from './scripts.js';
import { templateTag } from './template-tag.js';
import { optimizeDeps } from './optimize-deps.js';
import { compatPrebuild } from './build.js';
import { assets } from './assets.js';
import { contentFor } from './content-for.js';
import { babel } from '@rollup/plugin-babel';
import { type ConfigEnv, type UserConfig, type Plugin } from 'vite';

export const extensions = ['.mjs', '.gjs', '.js', '.mts', '.gts', '.ts', '.hbs', '.json'];

export default function ember(): Plugin[] {
  return [
    {
      name: 'vite-plugin-ember',
      enforce: 'pre',
      config(config: UserConfig, env: ConfigEnv) {
        return {
          resolve: {
            extensions,
            ...config.resolve,
          },
          optimizeDeps: {
            ...optimizeDeps(),
            ...config.optimizeDeps,
          },
          server: {
            port: 4200,
            ...config.server,
          },
          build: {
            outDir: 'dist',
            rollupOptions: {
              input: {
                main: 'index.html',
                ...(shouldBuildTests(env.mode) ? { tests: `tests/index.html` } : undefined),
              },
            },
            ...config.build,
          },
        };
      },
    },
    hbs(),
    templateTag(),
    scripts(),
    resolver(),
    compatPrebuild(),
    assets(),
    contentFor(),

    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ];
}

function shouldBuildTests(mode: string) {
  return mode !== 'production' || process.env.FORCE_BUILD_TESTS;
}