let requestControllerList = [] as AbortController[];

export function getWeatherIcon(wmoCode: number) {
  const icons = new Map([
    [[0], '☀️'],
    [[1], '🌤'],
    [[2], '⛅️'],
    [[3], '☁️'],
    [[45, 48], '🌫'],
    [[51, 56, 61, 66, 80], '🌦'],
    [[53, 55, 63, 65, 57, 67, 81, 82], '🌧'],
    [[71, 73, 75, 77, 85, 86], '🌨'],
    [[95], '🌩'],
    [[96, 99], '⛈'],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return 'NOT FOUND';
  return icons.get(arr);
}

function convertToFlag(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function formatDay(dateStr: string) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
  }).format(new Date(dateStr));
}

type GeoDataT = {
  results: {
    latitude: number;
    longitude: number;
    timezone: string;
    name: string;
    country_code: string;
  }[];
};
export type WeatherDataT = {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weathercode: number[];
};
export async function fetchWeather(location: string) {
  requestControllerList.forEach((controller) => controller.abort());
  requestControllerList = [];
  try {
    // 1) Getting location (geocoding)
    const geoController = new AbortController();
    const { signal: geoSignal } = geoController;
    requestControllerList.push(geoController);
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`, {
      signal: geoSignal,
    });
    const geoData = (await geoRes.json()) as GeoDataT;
    if (!geoData.results) throw new Error('Location not found');
    const { latitude, longitude, timezone, name, country_code } = geoData.results[0];

    // 2) Getting actual weather
    const weatherController = new AbortController();
    const { signal: weatherSignal } = weatherController;
    requestControllerList.push(weatherController);
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
      {
        signal: weatherSignal,
      }
    );
    const weatherData = (await weatherRes.json()) as {
      daily: WeatherDataT;
    };

    // 3) Format data
    return {
      displayLocation: `${name} ${convertToFlag(country_code)}`,
      weatherData: weatherData.daily,
    };
  } catch (err) {
    console.log(err);
  }
}
