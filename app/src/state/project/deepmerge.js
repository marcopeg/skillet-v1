import _deepmerge from "deepmerge";

const deepmergeOptions = {
  arrayMerge: (destinationArray, sourceArray, options) => sourceArray
};

export const deepmerge = (...args) => _deepmerge.all(args, deepmergeOptions);
deepmerge.all = (args) => _deepmerge.all(args, deepmergeOptions);
