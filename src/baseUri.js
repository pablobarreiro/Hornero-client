export const baseUri = process.env.REACT_APP_CORS_URL ?? ''

export const prependBaseUri = (path) => baseUri+path