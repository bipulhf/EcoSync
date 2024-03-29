export const formatTime = (time: String) => {
  const [hoursStr, minutesStr] = time.split(":");
  const currentDate = new Date();
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    parseInt(hoursStr, 10),
    parseInt(minutesStr, 10)
  );
  return newDate;
};

export function getTimeFromDate(date: Date): string {
  date.setHours(date.getHours() + 6);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const amPm = date.getHours() >= 12 ? "PM" : "AM";
  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds} ${amPm}`;
}
