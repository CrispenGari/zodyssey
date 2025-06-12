import { zodiacs } from "../data/zodiac";

export const getZodiacSign = (birthDate: string) => {
  const date = new Date(birthDate);
  const month = date.getMonth();
  const day = date.getDate();
  for (const zodiac of zodiacs) {
    const [startDay, startMonth] = parseDate(zodiac.approximate_start_date);
    const [endDay, endMonth] = parseDate(zodiac.approximate_end_date);
    const start = new Date(2000, startMonth, startDay);
    const end = new Date(2000, endMonth, endDay);
    const target = new Date(2000, month, day);
    if (
      (startMonth > endMonth && (target >= start || target <= end)) ||
      (target >= start && target <= end)
    ) {
      return zodiac;
    }
  }
  return null;
};

const parseDate = (str: string) => {
  const [day, monthStr] = str.split(" ");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return [parseInt(day), months.indexOf(monthStr)];
};

export const getRandomItem = <T>(notes: T[]) => {
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
};
