const info = (...params) =>
  console.log(`[${new Date().toLocaleString()}][INFO]`, ...params);

const error = (...params) =>
  console.error(`[${new Date().toLocaleString()}][ERROR]`, ...params);

module.exports = {
  info,
  error,
};
