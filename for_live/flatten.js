function flatten(array, depth = Infinity) {
  if (depth > 0) {
    return array.reduce((acc, curr) => {
      const currentItem = Array.isArray(curr) ? flatten(curr, depth - 1) : curr;

      return acc.concat(currentItem);
    }, []);
  } else {
    return array.slice();
  }
}
