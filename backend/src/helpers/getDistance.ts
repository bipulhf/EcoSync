export const getDistance = async (origin: any, destination: any) => {
  const key = process.env.MAP_API_KEY as string;
  const data = await (
    await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?destination=${destination.latitude},${destination.longitude}&origin=${origin.latitude},${origin.longitude}&key=${key}`
    )
  ).json();
  let distanceInMeter = 0.0;
  let timeInSeconds = 0.0;
  data.routes[0].legs[0].steps.forEach((element: any) => {
    distanceInMeter += element.distance.value;
    timeInSeconds += element.duration.value;
  });
  return { distanceInMeter, timeInSeconds };
};
