export const caseOverTestPercentage = (day) => {
  const cases = Number(day.change_cases);
  const tests = Number(day.change_tests);
  if (!cases || !tests) return -1;
  const percentage = Math.round(cases / tests * 100);
  return percentage;
}

export const averageCaseOverTestPercentage = (days) => {
  let errors = 0;
  const sum = days.reduce((acc, day) => {
    let dailyPercentage = caseOverTestPercentage(day);
    if (dailyPercentage < 0) {
      errors++;
      dailyPercentage = 0;
    }
    return acc + dailyPercentage;
  }, 0);
  const average = Math.round(sum / (days.length - errors));
  return average;
}

export const rollingAverage = (reports, daysAgo) => {
  if (reports.length < daysAgo + 7) return [];
  const rollingArray = [];
  for (let i = daysAgo; i >= 0; i--) {
    const start = reports.length - 7 - i;
    const end = start + 7;
    const weekSlice = reports.slice(start, end);
    const average = averageCaseOverTestPercentage(weekSlice);
    rollingArray.push(average);
  }
  return rollingArray;
}

export const needlePosition = (raw) => {
  let result = raw * 180 / 15;
  if (result > 180) result = 180;
  return result;
}