export interface CityData {
  cityName: string;
  cityId: string;
}
export interface DefaultCityResponse {
  data: {
    city?: string;
    cityId?: string;
  };
  status: boolean;
}
