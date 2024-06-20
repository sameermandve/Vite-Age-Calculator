import { CountUp } from "countup.js";

const submitBtn = document.querySelector("#arrow-btn");
const day = document.querySelector("#day-input");
const month = document.querySelector("#month-input");
const year = document.querySelector("#year-input");
const yearOutputCount = document.querySelector("#year-output-count");
const monthOutputCount = document.querySelector("#month-output-count");
const dayOutputCount = document.querySelector("#day-output-count");

submitBtn.addEventListener("click", () => {
  isValidDate();
  if (isValidDate()) {
    const age = countAge(
      year.value.trim(),
      month.value.trim(),
      day.value.trim()
    );
    animateCount(age);
  }
});

const SetError = (element, message) => {
  const inputControl = element;
  const errorMsg = element.nextElementSibling;
  const errorLabel = element.previousElementSibling;

  inputControl.style.borderColor = "hsl(0, 100%, 67%)";
  errorLabel.style.color = "hsl(0, 100%, 67%)";
  errorMsg.style.display = "block";
  errorMsg.innerText = message;
};

const SetSuccess = (element) => {
  const inputControl = element;
  const errorMsg = element.nextElementSibling;
  const errorLabel = element.previousElementSibling;

  inputControl.style.borderColor = "hsl(0, 0%, 86%)";
  errorLabel.style.color = "hsl(0, 1%, 44%)";
  errorMsg.style.display = "none";
};

const isValidDate = () => {
  const dayValue = day.value.trim();
  const monthValue = month.value.trim();
  const yearValue = year.value.trim();

  // This function for different no. of days in different month validation
  const daysInMonth = (year, month) => {
    let dayOfMonth = new Date(year, month, 0).getDate();
    if (dayValue > dayOfMonth) {
      return false;
    } else {
      return true;
    }
  };

  // This is to get current year
  const date = new Date();
  let currentYear = date.getFullYear();

  let errorCount = 0;

  if (dayValue === "") {
    SetError(day, "This field is required");
    errorCount = errorCount + 1;
  } else if (dayValue <= 0) {
    SetError(day, "Must be a valid day");
    errorCount = errorCount + 1;
  } else if (!daysInMonth(yearValue, monthValue)) {
    SetError(day, "Must be a valid day");
    errorCount = errorCount + 1;
  } else {
    SetSuccess(day);
  }

  if (monthValue === "") {
    SetError(month, "This field is required");
    errorCount = errorCount + 1;
  } else if (monthValue > 12) {
    SetError(month, "Must be a valid month");
    errorCount = errorCount + 1;
  } else if (monthValue < 1) {
    SetError(month, "Must be a valid month");
    errorCount = errorCount + 1;
  } else {
    SetSuccess(month);
  }

  if (yearValue === "") {
    SetError(year, "This field is required");
    errorCount = errorCount + 1;
  } else if (yearValue > currentYear) {
    SetError(year, "Must be in the past");
    errorCount = errorCount + 1;
  } else {
    SetSuccess(year);
  }

  if (errorCount == 0) {
    return true;
  }
  return false;
};

const countAge = (yearValue, monthValue, dayValue) => {
  let presentDate = new Date();
  let countYears = presentDate.getFullYear() - yearValue;
  let countMonths = presentDate.getMonth() + 1 - monthValue;
  let countDays = presentDate.getDate() - dayValue;

  if (countDays < 0) {
    countMonths -= 1;
    countDays += new Date(
      presentDate.getFullYear(),
      presentDate.getMonth(),
      0
    ).getDate();
  }

  if (countMonths < 0) {
    countYears -= 1;
    countMonths += 12;
  }

  // yearOutputCount.innerText = countYears;
  // monthOutputCount.innerText = countMonths;
  // dayOutputCount.innerText = countDays;

  return {
    yearOutputCount: countYears,
    monthOutputCount: countMonths,
    dayOutputCount: countDays,
  };
};

const animateCount = (age) => {
  const yearCountUp = new CountUp(yearOutputCount, age.yearOutputCount);
  const monthCountUp = new CountUp(monthOutputCount, age.monthOutputCount);
  const dayCountUp = new CountUp(dayOutputCount, age.dayOutputCount);

  if (!yearCountUp.error) {
    yearCountUp.start();
  } else {
    console.error(yearCountUp.error);
  }

  if (!monthCountUp.error) {
    monthCountUp.start();
  } else {
    console.error(monthCountUp.error);
  }

  if (!dayCountUp.error) {
    dayCountUp.start();
  } else {
    console.error(dayCountUp.error);
  }
};
