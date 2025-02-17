function diff(obj1, obj2) {
  if (obj1 === obj2) {
    return {};
  }

  if (
    obj1 === null || //
    obj2 === null ||
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object'
  ) {
    return { before: obj1, after: obj2 };
  }

  const diffs = {};

  const keys = new Set([...Object.keys(obj1), ...Object.keys[obj2]]);

  for (const key of keys) {
    const a = obj1[key];
    const b = obj2[key];

    if (
      typeof a === 'object' && //
      typeof b === 'object' &&
      a !== null &&
      b !== null
    ) {
      const nestedDiffs = diff(a, b);

      Object.entries(nestedDiffs).forEach(([nestedKey, value]) => {
        diffs[`${key}.${nestedKey}`] = value;
      });
    } else if (a !== b) {
      diff[key] = { before: a, after: b };
    }

    return diffs;
  }
}
