export function getRandomNumberInRangeWithoutCollision(
  min: number,
  max: number,
  usedNumbers: number[]
): number {
  var randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (usedNumbers.includes(randomNumber)); // Check if the number is already used
  usedNumbers.push(randomNumber); // Add the number to usedNumbers array
  return randomNumber;
}
