export type Coord = {
  lat: number;
  lng: number;
};

export const toRad = (number: number) => {
  return (number * Math.PI) / 100;
};

// Calculate the distance between 2 points and return result in metre
export default function HaversineDistance(pointA: Coord, pointB: Coord) {
  const R = 6371; // km
  //has a problem with the .toRad() method below.
  const x1 = pointB.lat - pointA.lat;
  const dLat = toRad(x1);
  const x2 = pointB.lng - pointA.lng;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(pointA.lat)) *
      Math.cos(toRad(pointB.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
