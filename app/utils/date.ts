function formatDate(inputDate: string | undefined, short?: boolean): string {
  if (inputDate == null) {
    return ""; // You can return an empty string or any default value
  }

  // Convert the input string to a Date object
  const date = new Date(inputDate.replace(/IST/, "GMT+0530"));

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const monthFormat = short ? "short" : "long";

  // Format the date string with the desired format
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: monthFormat }).format(
    date
  );
  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;

  return formattedDate;
}
function formatDateDDMMYYYY(inputDate: string | undefined): string {
  if (!inputDate) {
    return ""; // You can return an empty string or any default value
  }
  // Convert the input string to a Date object
  const date = new Date(inputDate.replace('IST',"+530"));
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  // Format the date string with the desired format
  const result = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", }).format(date)
  const formattedDate = result.replaceAll(" ","-")
  return formattedDate;
}

function convertDateToMonthYear(dateString: string | undefined): string {
  if (!dateString) {
    return "Invalid Date";
  }
  const parts: string[] = dateString.split("/");
  if (parts.length !== 3) {
    return "Invalid Date Format";
  }

  const day: number = parseInt(parts[0], 10);
  const month: number = parseInt(parts[1], 10);
  const year: number = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return "Invalid Date";
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return "Invalid Date";
  }

  // const monthNames: string[] = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  if (month < 1 || month > 12 || year < 0) {
    return "Invalid Date";
  }

  // const monthName: string = monthNames[month - 1];
  // return `${monthName}, ${year}`;

  return `${year}`;
}

export { formatDate, formatDateDDMMYYYY, convertDateToMonthYear };
