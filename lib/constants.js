// if (!process.env.SUPABASE_URL) {
//   console.log('constants.ts', 'Make sure you have a `.env` file to populate your variables.')
// }

export const SUPABASE_URL = "https://txxjtlrnmxsxpnwaemti.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzkxMjAzNCwiZXhwIjoxOTQzNDg4MDM0fQ.vxGyYCwLx5RaGF8UZbLxWv1ccZIiT4cwVTxss3nF0y4";

export const Styles = {
  fontNormal: 20,
  fontMedium: 28,
  fontLarge: 34,
  fontExtraLarge: 40,
  colorPrimary: "black",
  spacing: 12,
};

export const Gender = [
  { key: 1, value: "Male" },
  { key: 2, value: "Female" },
];

export const UniversitiesList = [
  { key: 1, value: "University of Kelaniya" },
  { key: 2, value: "University of Colombo" },
  { key: 3, value: "University of Moratuwa" },
  { key: 4, value: "University of J'Pura" },
  { key: 5, value: "University of Peradeniya" },
  { key: 6, value: "University of Ruhuna" },
  { key: 7, value: "University of Rajarata" },
  { key: 8, value: "University of Uwa-Wellassa" },
];

export const UserTypes = [
  { key: 1, value: "Admin" },
  { key: 2, value: "User" },
];

export const tabKeyColorsGlobal = {
  activeColor: "#134717",
  nonActiveColor: "#338a3e",
};
