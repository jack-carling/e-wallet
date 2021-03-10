export function validate(valid) {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = Number(date.getFullYear().toString().slice(-2));
  const input = valid.split('/');
  const inputMonth = Number(input[0]);
  const inputYear = Number(input[1]);
  if (inputMonth > 12) {
    return 'Invalid month';
  }
  if (inputYear < currentYear) {
    return 'Expired';
  }
  if ((inputYear === currentYear)&&(inputMonth < currentMonth)) {
    return 'Expired';
  }
  if (inputYear > (currentYear + 10)) {
    return 'Unreasonable year';
  }
  return '';
}