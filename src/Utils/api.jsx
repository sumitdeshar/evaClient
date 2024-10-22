const Default_URL = "https://eva-r97t.onrender.com";
// const Default_URL = "http://127.0.0.1:8000";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || Default_URL;

console.log(API_BASE_URL);
