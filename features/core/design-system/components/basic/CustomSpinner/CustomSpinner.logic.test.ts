import {
  clampProgress,
  spinnerDashLength,
  spinnerRadius,
  spinnerSweep,
} from '@/features/core/design-system/components/basic/CustomSpinner/CustomSpinner.logic';
import { spinnerSizes } from '@/features/core/design-system/style/dimensions/spinner';

const PRECISION = 4;

describe('spinnerRadius', () => {
  it.each([
    ['small', 8.75],
    ['medium', 16.25],
    ['large', 21.75],
  ] as const)('keeps the %s stroke inside its box', (size, expected) => {
    expect(spinnerRadius(spinnerSizes[size])).toBe(expected);
  });
});

describe('spinnerDashLength', () => {
  it.each([
    ['small', 41.2334],
    ['medium', 76.5763],
    ['large', 102.4945],
  ] as const)('draws three quarters of the %s circumference for the indeterminate arc', (size, expected) => {
    const radius = spinnerRadius(spinnerSizes[size]);

    expect(spinnerDashLength(radius, spinnerSweep())).toBeCloseTo(expected, PRECISION);
  });
});

describe('clampProgress', () => {
  it.each([
    [-0.5, 0],
    [0, 0],
    [0.01, 0.01],
    [1, 1],
    [2, 1],
  ])('clamps %p to %p', (progress, expected) => {
    expect(clampProgress(progress)).toBe(expected);
  });
});

describe('spinnerSweep', () => {
  it('sweeps 270° when no progress is given', () => {
    expect(spinnerSweep()).toBe(0.75);
  });

  it('sweeps the clamped progress when it is given', () => {
    expect(spinnerSweep(2)).toBe(1);
  });
});
