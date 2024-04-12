import { CityItemT } from "../type";

const BASE_URL = "http://localhost:8002";

export async function fetchCities() {
  const res = await fetch(`${BASE_URL}/cities`);
  return await res.json();
}

export async function fetchDeleteCity(id: string) {
  await fetch(`${BASE_URL}/cities/${id}`, {
    method: "DELETE",
  });
}

export async function fetchAddCity(city: CityItemT) {
  const res = await fetch(`${BASE_URL}/cities`, {
    method: "POST",
    body: JSON.stringify(city),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function fetchGetCity(id: string) {
  const res = await fetch(`${BASE_URL}/cities/${id}`);
  return await res.json();
}
