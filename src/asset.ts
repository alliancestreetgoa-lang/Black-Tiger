/** Bump when images or videos in /public are replaced, so browsers drop their week-long cached copies. */
const ASSET_VERSION = '20261030'

/** Resolves a file in /public against the deploy base (e.g. /Black-Tiger/ on GitHub Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}?v=${ASSET_VERSION}`
