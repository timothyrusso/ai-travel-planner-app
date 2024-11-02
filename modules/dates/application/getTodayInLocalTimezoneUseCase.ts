/**
 * Gets the current date and time adjusted to the local timezone.
 * @example
 * const localDate = todayInLocalTimezone;
 * console.log(localDate); // Outputs the current date and time in the local timezone
 */
export const getTodayInLocalTimezoneUseCase = new Date(
  new Date().getTime() - new Date().getTimezoneOffset() * 60000
);
