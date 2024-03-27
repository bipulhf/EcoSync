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
