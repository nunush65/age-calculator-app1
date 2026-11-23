const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const dayLabel = document.getElementById('day-label');
const monthLabel = document.getElementById('month-label');
const yearLabel = document.getElementById('year-label');

const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');

const myForm = document.getElementById('age-form');

const onlyNumbers = (input) => {
    input.addEventListener('input', function () {
        input.value = input.value.replace(/[^0-9]/g, '');
    });
};

onlyNumbers(day);
onlyNumbers(month);
onlyNumbers(year);

myForm.addEventListener('submit', function (forms) {
    //"submit" — runs when the form is submitted.
    forms.preventDefault(); //event.preventDefault() — prevents the page from refreshing.
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';

    if (!day.value) {
        dayError.textContent = 'This field is required';
        dayLabel.classList.add('text-red-500');
        day.classList.add('border-red-500');
    }

    if (!month.value) {
        monthError.textContent = 'This field is required';
        monthLabel.classList.add('text-red-500');
        month.classList.add('border-red-500');
    }

    if (!year.value) {
        yearError.textContent = 'This field is required';
        yearLabel.classList.add('text-red-500');
        year.classList.add('border-red-500');
    }

    if (!day.value || !month.value || !year.value) {
        return;
    }
    const dayNumber = Number(day.value);
    const monthNumber = Number(month.value);
    const yearNumber = Number(year.value);

    //   console.log(typeof(yearNumber));

    if (dayNumber < 1 || dayNumber > 31) {
        dayError.textContent = 'Must be a valid day';
        dayLabel.classList.add('text-red-500');
        day.classList.add('border-red-500');
        return;
    }

    if (monthNumber < 1 || monthNumber > 12) {
        monthError.textContent = 'Must be a valid month';
        monthLabel.classList.add('text-red-500');
        month.classList.add('border-red-500');
        return;
    }
    if (yearNumber < 1) {
        yearError.textContent = 'Must be a valid year';
        yearLabel.classList.add('text-red-500');
        year.classList.add('border-red-500');
        return;
    }

    //   console.log(day.value);
    //   console.log(month.value);
    //   console.log(year.value);

    const birthDate = new Date(yearNumber, monthNumber - 1, dayNumber);

    const today = new Date();

    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; //gets the month (0–11), so we add 1.
    const currentYear = today.getFullYear();
    if (birthDate > today) {
     yearError.textContent = "Must be in the past";
yearLabel.classList.add("text-red-500");
year.classList.add("border-red-500");

        return;
    }
    if (
        birthDate.getDate() !== dayNumber ||
        birthDate.getMonth() !== monthNumber - 1 ||
        birthDate.getFullYear() !== yearNumber
    ) {
        dayError.textContent = 'must be a valid date';
        dayLabel.classList.add("text-red-500");
day.classList.add("border-red-500");
        return;
    }

    // console.log(currentDay);
    // console.log(currentMonth);
    // console.log(currentYear);

    let ageDay = currentDay - dayNumber; //we use let because we will change the value of ageDay later. We need to borrow days from the previous month.
    let ageMonth = currentMonth - monthNumber;
    let ageYear = currentYear - yearNumber;

    if (ageDay < 0) {
        ageMonth--;
        ageDay += new Date(currentYear, currentMonth - 1, 0).getDate();
    }
    if (ageMonth < 0) {
        ageYear--;
        ageMonth += 12;
    }

    // console.log(ageDay , ageMonth , ageYear);

    const yearsResult = document.getElementById('years');
    const monthsResult = document.getElementById('months');
    const daysResult = document.getElementById('days');

    yearsResult.textContent = ageYear;
    monthsResult.textContent = ageMonth;
    daysResult.textContent = ageDay;
});
