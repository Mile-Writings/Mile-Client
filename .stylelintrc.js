const { propertyOrdering, selectorOrdering } = require('stylelint-semantic-groups');

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/order': selectorOrdering, // to fine-tune configuration use selectorOrderFactory
    'order/properties-order': propertyOrdering,
  },
};
