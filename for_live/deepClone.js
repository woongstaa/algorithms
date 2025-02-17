function deepClone(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  const entries = Object.entries(([key, value]) => {
    return [key, deepClone(value)];
  });

  return Object.fromEntries(entries);
}
