export interface City {
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // in hours, e.g. 5.5 for IST
}

export const CITIES: City[] = [
  // Quick Featured: Auraiya and Surrounding Regional Hubs
  { name: 'Auraiya', state: 'Uttar Pradesh', country: 'India', latitude: 26.4674, longitude: 79.5135, timezone: 5.5 },
  { name: 'Dibiyapur (Auraiya)', state: 'Uttar Pradesh', country: 'India', latitude: 26.6346, longitude: 79.6105, timezone: 5.5 },
  { name: 'Bidhuna (Auraiya)', state: 'Uttar Pradesh', country: 'India', latitude: 26.8123, longitude: 79.5168, timezone: 5.5 },
  { name: 'Etawah', state: 'Uttar Pradesh', country: 'India', latitude: 26.7769, longitude: 79.0305, timezone: 5.5 },
  { name: 'Kannauj', state: 'Uttar Pradesh', country: 'India', latitude: 27.0543, longitude: 79.9142, timezone: 5.5 },
  { name: 'Kanpur Dehat (Akbarpur)', state: 'Uttar Pradesh', country: 'India', latitude: 26.4253, longitude: 79.9547, timezone: 5.5 },
  { name: 'Jalaun (Orai)', state: 'Uttar Pradesh', country: 'India', latitude: 25.9904, longitude: 79.4526, timezone: 5.5 },
  { name: 'Mainpuri', state: 'Uttar Pradesh', country: 'India', latitude: 27.2272, longitude: 79.0274, timezone: 5.5 },
  { name: 'Farrukhabad (Fatehgarh)', state: 'Uttar Pradesh', country: 'India', latitude: 27.3826, longitude: 79.5828, timezone: 5.5 },
  { name: 'Firozabad', state: 'Uttar Pradesh', country: 'India', latitude: 27.1593, longitude: 78.3957, timezone: 5.5 },
  { name: 'Jhansi', state: 'Uttar Pradesh', country: 'India', latitude: 25.4484, longitude: 78.5685, timezone: 5.5 },

  // Spiritual & Vedic Centers
  { name: 'Varanasi (Kashi)', state: 'Uttar Pradesh', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 5.5 },
  { name: 'Ayodhya', state: 'Uttar Pradesh', country: 'India', latitude: 26.7922, longitude: 82.1998, timezone: 5.5 },
  { name: 'Prayagraj (Allahabad)', state: 'Uttar Pradesh', country: 'India', latitude: 25.4358, longitude: 81.8463, timezone: 5.5 },
  { name: 'Mathura', state: 'Uttar Pradesh', country: 'India', latitude: 27.4924, longitude: 77.6737, timezone: 5.5 },
  { name: 'Vrindavan', state: 'Uttar Pradesh', country: 'India', latitude: 27.5806, longitude: 77.6974, timezone: 5.5 },
  { name: 'Haridwar', state: 'Uttarakhand', country: 'India', latitude: 29.9457, longitude: 78.1642, timezone: 5.5 },
  { name: 'Rishikesh', state: 'Uttarakhand', country: 'India', latitude: 30.0869, longitude: 78.2676, timezone: 5.5 },
  { name: 'Ujjain', state: 'Madhya Pradesh', country: 'India', latitude: 23.1765, longitude: 75.7885, timezone: 5.5 },
  { name: 'Tirupati', state: 'Andhra Pradesh', country: 'India', latitude: 13.6288, longitude: 79.4192, timezone: 5.5 },
  { name: 'Puri', state: 'Odisha', country: 'India', latitude: 19.8135, longitude: 85.8312, timezone: 5.5 },
  { name: 'Dwarka', state: 'Gujarat', country: 'India', latitude: 22.2442, longitude: 68.9685, timezone: 5.5 },
  { name: 'Rameswaram', state: 'Tamil Nadu', country: 'India', latitude: 9.2876, longitude: 79.3129, timezone: 5.5 },

  // Major Metros & Capitals
  { name: 'New Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timezone: 5.5 },
  { name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, timezone: 5.5 },
  { name: 'Kanpur', state: 'Uttar Pradesh', country: 'India', latitude: 26.4499, longitude: 80.3319, timezone: 5.5 },
  { name: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 5.5 },
  { name: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 5.5 },
  { name: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 5.5 },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 5.5 },
  { name: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: 5.5 },
  { name: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 5.5 },
  { name: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 5.5 },
  { name: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 5.5 },
  { name: 'Patna', state: 'Bihar', country: 'India', latitude: 25.5941, longitude: 85.1376, timezone: 5.5 },
  { name: 'Bhopal', state: 'Madhya Pradesh', country: 'India', latitude: 23.2599, longitude: 77.4126, timezone: 5.5 },
  { name: 'Indore', state: 'Madhya Pradesh', country: 'India', latitude: 22.7196, longitude: 75.8577, timezone: 5.5 },
  { name: 'Gorakhpur', state: 'Uttar Pradesh', country: 'India', latitude: 26.7606, longitude: 83.3732, timezone: 5.5 },
  { name: 'Agra', state: 'Uttar Pradesh', country: 'India', latitude: 27.1767, longitude: 78.0081, timezone: 5.5 },
  { name: 'Meerut', state: 'Uttar Pradesh', country: 'India', latitude: 28.9845, longitude: 77.7064, timezone: 5.5 },
  { name: 'Noida', state: 'Uttar Pradesh', country: 'India', latitude: 28.5355, longitude: 77.3910, timezone: 5.5 },
  { name: 'Gurugram', state: 'Haryana', country: 'India', latitude: 28.4595, longitude: 77.0266, timezone: 5.5 },
  { name: 'Dehradun', state: 'Uttarakhand', country: 'India', latitude: 30.3165, longitude: 78.0322, timezone: 5.5 },
  { name: 'Chandigarh', state: 'Punjab & Haryana', country: 'India', latitude: 30.7333, longitude: 76.7794, timezone: 5.5 },

  // International Metros
  { name: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 4.0 },
  { name: 'London', state: 'England', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 0.0 },
  { name: 'New York', state: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, timezone: -5.0 },
  { name: 'Toronto', state: 'Ontario', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: -5.0 },
  { name: 'Singapore', state: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 8.0 },
  { name: 'Sydney', state: 'New South Wales', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 10.0 },
  { name: 'Kathmandu', state: 'Bagmati', country: 'Nepal', latitude: 27.7172, longitude: 85.3240, timezone: 5.75 },
];
