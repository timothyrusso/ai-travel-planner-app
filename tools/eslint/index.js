// @ts-check
'use strict';

// Local ESLint plugin `holidai` — the View↔ViewModel contract rules. See wiki/docs/ARCHITECTURE.md.

const viewmodelReturnShape = require('./rules/viewmodel-return-shape');
const preferViewmodel = require('./rules/prefer-viewmodel');

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  rules: {
    'viewmodel-return-shape': viewmodelReturnShape,
    'prefer-viewmodel': preferViewmodel,
  },
};

module.exports = plugin;
