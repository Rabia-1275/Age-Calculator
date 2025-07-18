let userinput = document.getElementById("date");
userinput.max = new Date().toISOString().split("T")[0];

const calculateAge = () => {
  const today = new Date();
  const inputDate = new Date(document.getElementById("date").value);

  const birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const { years, months, days } = ageCalculate(
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
  );

  displayResult(days, months, years);
};

const ageCalculate = (birthDetails, currentYear, currentMonth, currentDate) => {
  let years = currentYear - birthDetails.year;
  let months, days;

  if (currentMonth < birthDetails.month) {
    years--;
    months = 12 - (birthDetails.month - currentMonth);
  } else {
    months = currentMonth - birthDetails.month;
  }

  if (currentDate < birthDetails.date) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);

    days = daysInLastMonth - (birthDetails.date - currentDate);
  } else {
    days = currentDate - birthDetails.date;
  }

  return { years, months, days };
};

const getDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);

  const getDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return getDaysInMonth[month - 1];
};

const displayResult = (bdate, bMonth, bYear) => {
  document.getElementById("years").textContent = bYear;
  document.getElementById("Months").textContent = bMonth;
  document.getElementById("Days").textContent = bdate;
};

document.getElementById("calc-age-btn").addEventListener("click", calculateAge);
