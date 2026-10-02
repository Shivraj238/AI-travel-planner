import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const BASE_URL =
  "https://places.googleapis.com/v1/places:searchText";

// ✅ PLACE PHOTO URL
export const PHOTO_REF_URL =
  `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key=${API_KEY}`;

// ✅ API CONFIG
const config = {
  headers: {
    "Content-Type": "application/json",

    "X-Goog-Api-Key": API_KEY,

    // ✅ IMPORTANT FIELD MASK
    "X-Goog-FieldMask":
      "places.displayName,places.photos,places.id",
  },
};

// ✅ GET PLACE DETAILS
export const GetPlaceDetails = async (data) => {

  try {

    // ✅ VALIDATION
    if (!data?.textQuery) {

      throw new Error("textQuery is required");
    }

    // ✅ API REQUEST
    const response = await axios.post(
      BASE_URL,
      {
        textQuery: data.textQuery,
      },
      config
    );

    return response;

  } catch (error) {

    console.error(
      "Places API Error:",
      error?.response?.data || error.message
    );

    throw error;
  }
};