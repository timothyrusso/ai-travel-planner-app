// @ts-check
'use strict';

// RuleTester spec, run via `npm run test:eslint-rules`. NOT named `*.test.js`: the jest-expo preset
// can't run RuleTester, so these must stay outside jest's testMatch.

const { RuleTester } = require('eslint');
const tsParser = require('@typescript-eslint/parser');
const rule = require('../rules/prefer-viewmodel');

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

const TSX = 'SelectDatesPage.tsx';
const IMPORT = "import { useSelectDatesPageLogic } from '@/features/x/SelectDatesPage.logic';";

module.exports = function run() {
  ruleTester.run('prefer-viewmodel', rule, {
    valid: [
      // Calls only its own ViewModel hook, once.
      {
        filename: TSX,
        code: `${IMPORT}
        export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          return null;
        };`,
      },
      // No `.logic` import => presentational component, exempt even if it calls hooks.
      {
        filename: TSX,
        code: `import { useState } from 'react';
        export const Dumb = () => { const [x] = useState(0); return null; };`,
      },
      // Test files are exempt even if they mix hooks freely.
      {
        filename: 'SelectDatesPage.test.tsx',
        code: `${IMPORT}
        import { useState } from 'react';
        export const SelectDatesPage = () => { const [x] = useState(0); return null; };`,
      },
      // The `.logic` import is hoisted below the component; classification in Program:exit still
      // recognizes the ViewModel hook, so no false foreign-hook is reported.
      {
        filename: TSX,
        code: `export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          return null;
        };
        ${IMPORT}`,
      },
      // Allowlisted foreign hook is permitted.
      {
        filename: TSX,
        code: `${IMPORT}
        import { useGlassmorphism } from '@/features/core/design-system';
        export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          const cls = useGlassmorphism();
          return null;
        };`,
        options: [{ allow: ['useGlassmorphism'] }],
      },
    ],
    invalid: [
      // Calls a foreign hook alongside its ViewModel.
      {
        filename: TSX,
        code: `${IMPORT}
        import { useState } from 'react';
        export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          const [x] = useState(0);
          return null;
        };`,
        errors: [{ messageId: 'foreignHook' }],
      },
      // Member-expression / namespace-qualified foreign hook (React.useState) must not bypass the rule.
      {
        filename: TSX,
        code: `${IMPORT}
        import * as React from 'react';
        export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          const [x] = React.useState(0);
          return null;
        };`,
        errors: [{ messageId: 'foreignHook' }],
      },
      // A member call whose property name matches the ViewModel import is a different binding, so it
      // is foreign (not conflated with the imported hook, which would wrongly read as calledTwice).
      {
        filename: TSX,
        code: `${IMPORT}
        import * as hooks from '@/hooks';
        export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          hooks.useSelectDatesPageLogic();
          return null;
        };`,
        errors: [{ messageId: 'foreignHook' }],
      },
      // Calls its ViewModel hook twice.
      {
        filename: TSX,
        code: `${IMPORT}
        export const SelectDatesPage = () => {
          const a = useSelectDatesPageLogic();
          const b = useSelectDatesPageLogic();
          return null;
        };`,
        errors: [{ messageId: 'calledTwice' }],
      },
      // Another View's ViewModel (imported from a different-basename `.logic` module) is foreign.
      {
        filename: TSX,
        code: `${IMPORT}
        import { useSelectGuestsPageLogic } from '@/features/x/SelectGuestsPage.logic';
        export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          const { state: guests } = useSelectGuestsPageLogic();
          return null;
        };`,
        errors: [{ messageId: 'foreignHook' }],
      },
      // Foreign ViewModel call plus the own hook called twice => both violations reported.
      {
        filename: TSX,
        code: `${IMPORT}
        import { useSelectGuestsPageLogic } from '@/features/x/SelectGuestsPage.logic';
        export const SelectDatesPage = () => {
          const a = useSelectDatesPageLogic();
          const { state: guests } = useSelectGuestsPageLogic();
          const b = useSelectDatesPageLogic();
          return null;
        };`,
        errors: [{ messageId: 'foreignHook' }, { messageId: 'calledTwice' }],
      },
      // Foreign hook not covered by the allowlist.
      {
        filename: TSX,
        code: `${IMPORT}
        import { useGlassmorphism } from '@/features/core/design-system';
        export const SelectDatesPage = () => {
          const { state } = useSelectDatesPageLogic();
          const cls = useGlassmorphism();
          return null;
        };`,
        errors: [{ messageId: 'foreignHook' }],
      },
    ],
  });
};
