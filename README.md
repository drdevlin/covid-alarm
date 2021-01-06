# Covid Alarm
A concept for COVID-19 alert system.

## General Info
Displays a simple gauge of the severity of current COVID-19 infections. This is purely a concept and should not to taken to indicate any real threat level. However, the needle position is derived from real, live data from [COVID-19 Tracker Canada](https://api.covid19tracker.ca/docs/1.0/overview).

Here's what it does? The needle position is a representation of the daily, 7-day average of percentage of cases over tests. First position is 0%. Buried position is 15%.

[Deployed Here](https://cocky-swirles-4e4c68.netlify.app/)

## Technologies
* React
* Redux

## Code Examples
Calculations:
```js
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
```

## Contact
Created by [@drdevlin](mailto:drdevlin@fastmail.com) Devlin Russell  - feel free to contact me!