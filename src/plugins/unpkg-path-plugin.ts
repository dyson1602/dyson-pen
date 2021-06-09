import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

(async () => {
  await fileCache.setItem('color', 'red');

  const color = await fileCache.getItem('color');

  console.log(color);
})();

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `http://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react'
            `,
          };
        }
        //Checks for search result in cache
        const cachedResult = await fileCache.getItem(args.path);

        //If result is in the cache, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        //If not, fetch the data
        const { data, request } = await axios.get(args.path);

        //Set cache
        const result = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        //Return results after caching them
        return result;
      });
    },
  };
};
