const baseUrl = import.meta.env.BASE_URL

export function sitePath(path = '') {
  return `${baseUrl}${String(path).replace(/^\//, '')}`
}

export function assetPath(path) {
  return typeof path === 'string' && path.startsWith('/') ? sitePath(path) : path
}
