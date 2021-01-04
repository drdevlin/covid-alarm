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