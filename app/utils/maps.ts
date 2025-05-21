export interface Coordinates {
  location: {
    lat: number;
    lng: number;
  };
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

interface TravelTime {
  hours: number;
  minutes: number;
}

function calculateTime(
  distance: number,
  type: "public" | "drive" | "walk"
): TravelTime {
  const averageSpeeds = {
    public: 30, // km/h
    drive: 60, // km/h
    walk: 5, // km/h
  };

  const speed = averageSpeeds[type];
  const timeInHours = distance / speed;
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);

  return { hours, minutes };
}
function calculateDistance(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): number {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  const dLat = degreesToRadians(destination.lat - origin.lat);
  const dLng = degreesToRadians(destination.lng - origin.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(origin.lat)) *
      Math.cos(degreesToRadians(destination.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c; // Distance in kilometers

  return distance;
}

// Function to convert degrees to radians
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export { calculateDistance, calculateTime, deg2rad };
