function chunk(array, size = 1) {
  if (!array.length || size < 1) {
    return [];
  }

  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

console.log(chunk([1, 2, 3, 4, 5, 7, 8], 3));
