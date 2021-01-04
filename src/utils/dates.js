export const startDate = (daysAgo) => {
  const lengthOfDay = 86400000;
  const startDate = new Date(Date.now() - (daysAgo * lengthOfDay));
  const startDateFormatted = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
  return startDateFormatted;
}