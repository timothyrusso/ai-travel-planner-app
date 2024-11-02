/**
 * Adjusts the given date to the local timezone.
 *
 * This function takes a date object and adjusts it to the local timezone
 * by subtracting the timezone offset in milliseconds.
 *
 * @param {Date} date - The date to be adjusted to the local timezone.
 * @returns {Date} The adjusted date in the local timezone.
 * @example
 * const date = new Date('2024-10-31T11:00:00.000Z');
 * const localDate = getTimezoneFormattedDateUseCase(date);
 * console.log(localDate); // Outputs the date adjusted to the local timezone
 */
export const getTimezoneFormattedDateUseCase = (date: Date): Date =>
  date && new Date(date.getTime() - date.getTimezoneOffset() * 60000);
