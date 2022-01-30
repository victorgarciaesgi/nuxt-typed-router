import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/_nuxt/_id_-16a76741.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.634Z",
    "path": "../public/_nuxt/_id_-16a76741.mjs"
  },
  "/_nuxt/_id_-e0fc8f55.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.633Z",
    "path": "../public/_nuxt/_id_-e0fc8f55.mjs"
  },
  "/_nuxt/_slug_-c74fa3e1.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.632Z",
    "path": "../public/_nuxt/_slug_-c74fa3e1.mjs"
  },
  "/_nuxt/activate-08b5127e.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.632Z",
    "path": "../public/_nuxt/activate-08b5127e.mjs"
  },
  "/_nuxt/bootstrap-5ea194cf.mjs": {
    "type": "application/javascript",
    "etag": "\"1b6e7-KArZoJD4OHJfY9UbKX5CEB71e5I\"",
    "mtime": "2022-01-30T01:55:18.631Z",
    "path": "../public/_nuxt/bootstrap-5ea194cf.mjs"
  },
  "/_nuxt/child-one-545f9fc5.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.631Z",
    "path": "../public/_nuxt/child-one-545f9fc5.mjs"
  },
  "/_nuxt/child-two-97ddb66a.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.630Z",
    "path": "../public/_nuxt/child-two-97ddb66a.mjs"
  },
  "/_nuxt/entry-9062d9e3.mjs": {
    "type": "application/javascript",
    "etag": "\"65-HdQVwPpEvGO/RlVatjcPWUUix2A\"",
    "mtime": "2022-01-30T01:55:18.630Z",
    "path": "../public/_nuxt/entry-9062d9e3.mjs"
  },
  "/_nuxt/index-2f309a14.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.629Z",
    "path": "../public/_nuxt/index-2f309a14.mjs"
  },
  "/_nuxt/index-4631b65b.mjs": {
    "type": "application/javascript",
    "etag": "\"4dc-Q0dtd82zRjDyCVrrINcJv/b9z08\"",
    "mtime": "2022-01-30T01:55:18.629Z",
    "path": "../public/_nuxt/index-4631b65b.mjs"
  },
  "/_nuxt/index-4833183b.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.628Z",
    "path": "../public/_nuxt/index-4833183b.mjs"
  },
  "/_nuxt/index-6033fea7.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.628Z",
    "path": "../public/_nuxt/index-6033fea7.mjs"
  },
  "/_nuxt/index-7f9b91d6.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.627Z",
    "path": "../public/_nuxt/index-7f9b91d6.mjs"
  },
  "/_nuxt/index-7fb9b604.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.627Z",
    "path": "../public/_nuxt/index-7fb9b604.mjs"
  },
  "/_nuxt/index-8852f4a4.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.626Z",
    "path": "../public/_nuxt/index-8852f4a4.mjs"
  },
  "/_nuxt/index-c7e1c8b2.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.625Z",
    "path": "../public/_nuxt/index-c7e1c8b2.mjs"
  },
  "/_nuxt/index-f4df83f4.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.624Z",
    "path": "../public/_nuxt/index-f4df83f4.mjs"
  },
  "/_nuxt/index-f8b40767.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.624Z",
    "path": "../public/_nuxt/index-f8b40767.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"1151-ezBgPwOqhe8TYaTpeCdarJWw15o\"",
    "mtime": "2022-01-30T01:55:18.623Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/profile-47fd4035.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.622Z",
    "path": "../public/_nuxt/profile-47fd4035.mjs"
  },
  "/_nuxt/rootPage-17764c8e.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.622Z",
    "path": "../public/_nuxt/rootPage-17764c8e.mjs"
  },
  "/_nuxt/user-ec45adfc.mjs": {
    "type": "application/javascript",
    "etag": "\"21-9spEOGVcmW89hqFrYBxSkrRDzAU\"",
    "mtime": "2022-01-30T01:55:18.621Z",
    "path": "../public/_nuxt/user-ec45adfc.mjs"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/Users/victorgarcia/Desktop/projects/nuxt-typed-router/playground/dist" + "/" + "1643507715";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
