export const action = (type, payload = {}) => {
  if (typeof type === 'string') {
    return { type, payload };
  }
}
