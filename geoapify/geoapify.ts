import axios from "axios";

const getcoords = async (startLocation: any, endLocation: any) => {
  const url = `https://api.geoapify.com/v1/routing?waypoints=${startLocation.latitude},${startLocation.longitude}|${endLocation.latitude},${endLocation.longitude}&mode=drive&apiKey=5bc79942863c4b7eb2d7136014c50c20`;
  console.log("----------------");
  try {
    const response = await axios.get(url);
    const features = response.data.features;
    if (features.length > 0) {
      const geometry = features[0].geometry;
      const coordinates = geometry.coordinates[0].map((coord: any) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
      return coordinates;
    }
  } catch (error) {
    console.error("Error fetching route:", error);
  }
};
export default getcoords;
