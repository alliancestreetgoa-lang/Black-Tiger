/** Resolves a file in /public against the deploy base (e.g. /Black-Tiger/ on GitHub Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
