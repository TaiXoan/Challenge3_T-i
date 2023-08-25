// //INPUT

// //Output


// function validate() {
//   // Lấy giá trị từ các trường ngày, tháng, năm nhập vào
//   const dayInp = parseInt(document.getElementById("dayInp").value);
//   const monthInp = parseInt(document.getElementById("monthInp").value);
//   const yearInp = parseInt(document.getElementById("yearInp").value);

//   // Lấy năm hiện tại
//   const currentYear = new Date().getFullYear();

//   // Xóa thông báo lỗi cũ
//   document.getElementById("day-error").innerHTML = "";
//   document.getElementById("month-error").innerHTML = "";
//   document.getElementById("year-error").innerHTML = "";

//   // Kiểm tra ngày
//   if (dayInp > 31 || dayInp < 1) {
//     document.getElementById("day-error").innerHTML = "Invalid day!";
//   } else if (monthInp > 12 || monthInp < 1) {
//     document.getElementById("month-error").innerHTML = "Invalid month!";
//   } else if (yearInp > currentYear) {
//     document.getElementById("year-error").innerHTML = "Invalid year!";
//   } else {
//     // Kiểm tra số ngày trong tháng
//     const month31 = [1, 3, 5, 7, 8, 10, 12];
//     const month30 = [4, 6, 9, 11];
//     let validDay = false;

//     if (month31.includes(monthInp)) { // nếu trong mảng month31 có chứa tháng nhập vào thì tức là tháng đó có 31 ngày, ví dụ tháng 5 có 31 ngày
//       validDay = dayInp <= 31;  // kiểm tra xem nếu ngày nhập vào < 31 ngày thì là đúng, nhập 31 ngày là đúng
//     } else if (month30.includes(monthInp)) { // nếu trong mảng month30 có chứa tháng nhập vào thì tháng đó có 30 ngày, ví dụ:
//       validDay = dayInp <= 30; // nếu tháng 4 mà mình nhập 31 ngày là sai, vì tháng 4 có 30 ngày
//     } else if (monthInp === 2) {
//       // Tháng 2 có 28 hoặc 29 ngày (nếu là năm nhuận)
//       const isLeapYear = (yearInp % 4 === 0 && yearInp % 100 !== 0) || yearInp % 400 === 0; // kiểm tra xem nó có phải là năm nhuận hay không
//       // điều kiện năm nhuận là năm đó chia hết cho 4 và không chia hết cho 100. Ví dụ 2020 là năm nhuận vì chia hết cho 4 mà không chia hết cho 100.
//       // thêm nữa là năm nhuận là năm chia hết cho 400, ví dụ năm 2000 là năm nhuận mặc dù nó chia hết cho 100. Nhưng vì nó chia hết cho 400 nên nó là năm nhuận
//       validDay = (isLeapYear && dayInp <= 29) || (!isLeapYear && dayInp <= 28); // check xem nếu isLeapYear là true, tức là năm nhập vào là năm nhuận
//       // thì kiểm tra thêm dayInp xem có bé hơn hoặc bằng 29 ngày không
//       // hoặc là check xem isLeapYear là false, tức là năm không nhuận thì kiểm tra thêm ngày dayInp có < hoặc = 28 hay không. 
      
//     }
//     if (!validDay) {
//       document.getElementById("day-error").innerHTML = "Invalid day for the selected month!";
//     }
//   }
// }



function validate() {
  // Get value from input date, month, year fields
  const dayInp = parseInt(document.getElementById("day").value);
  const monthInp = parseInt(document.getElementById("month").value);
  const yearInp = parseInt(document.getElementById("year").value);

  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Return value is from 0-11, need +1 to convert to 1-12
  const currentDay = currentDate.getDate();

  // Remove the old error message
  document.getElementById("day-error").innerHTML = "";
  document.getElementById("month-error").innerHTML = "";
  document.getElementById("year-error").innerHTML = "";

  // Check the date, month and year entered
  if (dayInp < 1 || dayInp > 31) {
    document.getElementById("day-error").innerHTML = "Invalid day!";
  } else if (monthInp < 1 || monthInp > 12) {
    document.getElementById("month-error").innerHTML = "Invalid month!";
  } else if (yearInp < 1000 || yearInp > currentYear) {
    document.getElementById("year-error").innerHTML = "Invalid year!";
  } else if (yearInp === currentYear && monthInp > currentMonth) {
    document.getElementById("month-error").innerHTML = "Invalid month!";
  } else if (yearInp === currentYear && monthInp === currentMonth && dayInp > currentDay) {
    document.getElementById("day-error").innerHTML = "Invalid day!";
  } else {
    const month31 = [1, 3, 5, 7, 8, 10, 12];
    const month30 = [4, 6, 9, 11];

    let validDay = false;

    if (month31.includes(monthInp)) {
      validDay = dayInp <= 31;
    } else if (month30.includes(monthInp)) {
      validDay = dayInp <= 30;
    } else if (monthInp === 2) {
      const isLeapYear = (yearInp % 4 === 0 && yearInp % 100 !== 0) || yearInp % 400 === 0;
      validDay = (isLeapYear && dayInp <= 29) || (!isLeapYear && dayInp <= 28);
    }

    if (!validDay) {
      document.getElementById("day-error").innerHTML = "Invalid day!";
    } else {
      // Calculate age and display results
      const age = calculateAge(dayInp, monthInp, yearInp);
      document.getElementById("years-result").innerHTML = age.years;
      document.getElementById("months-result").innerHTML = age.months;
      document.getElementById("days-result").innerHTML = age.days;
    }
  }
}

function calculateAge(dayInp, monthInp, yearInp) {
  // Get the current date
  const currentDate = new Date();

  //Get the date of birth
  const birthDate = new Date(yearInp, monthInp - 1, dayInp);

  // Age calculation
  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const birthMonth = birthDate.getMonth() + 1;

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
    ageInYears--;
  }

  // Months and days remaining Calculation
  let ageInMonths = currentMonth - birthMonth;
  if (ageInMonths < 0) {
    ageInMonths += 12;
  }

  let ageInDays = currentDate.getDate() - birthDate.getDate();
  if (ageInDays < 0) {
    const daysInLastMonth = new Date(yearInp, monthInp, 0).getDate();
    ageInDays = daysInLastMonth + ageInDays;
    ageInMonths--;
  }

  return { years: ageInYears, months: ageInMonths, days: ageInDays };
}

// event submit of form
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Block default form submission
  validate(); // Check the date entered
});
