const fabric = require("@umijs/fabric");

module.exports = {
  ...fabric.eslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    REACT_APP_ENV: true,
    page: true
  }
};
