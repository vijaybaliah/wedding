export const ignoreEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const toString = (any) => {
  if (typeof any === 'string') return any;
  if (any === undefined || any === null) return '';
  return JSON.stringify(any);
};

export const toArray = (any) => {
  if (Array.isArray(any)) return any;
  if (any === undefined || any === null) return [];
  return [any];
};
