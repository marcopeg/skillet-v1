import _deepmerge from "deepmerge";

const deepmergeOptions = {
  arrayMerge: (destinationArray, sourceArray, options) => sourceArray
};

export const deepmerge = (...args) => _deepmerge(...args, deepmergeOptions);
