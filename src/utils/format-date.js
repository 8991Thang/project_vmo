export const formatDate = date => {
  const dateFormat = new Date(date);
  const day = dateFormat.getDay();
  const count = day < 10 ? "0" : "";
  const month = dateFormat.getMonth() + 1;
  const year = dateFormat.getFullYear();
  const newDate = count + day + "/" + month + "/" + year;
  return newDate;
};
