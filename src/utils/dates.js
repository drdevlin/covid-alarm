export const startDate = (dateNow, daysAgo) => {
  if (Number.isInteger(dateNow) && Number.isInteger(daysAgo) && daysAgo >= 0) {
    const lengthOfDay = 86400000;
    const startDate = new Date(dateNow - (daysAgo * lengthOfDay));
    const startDateFormatted = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    return startDateFormatted;
  }
}