module.exports = {
  extends: ["abdt"],
  env: {
    jest: true,
  },
  rules: {
    "no-unused-vars": 0,
    "no-shadow": [2, { builtinGlobals: false, hoist: "functions", allow: [] }],
  },
};
