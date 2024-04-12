export type CityItemT = {
  id?: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat?: number;
    lng?: number;
  };
};

export type CountryItemT = {
  country: string;
  emoji: string;
};

export type CityStateT = {
  isLoading: boolean;
  cities: CityItemT[];
  currentCity: CityItemT | null;
  error?: string;
};

export type ActionT = {
  type: string;
  payload?: CityItemT[] | CityItemT | string | number;
};

export type CityContextT = {
  isLoading: boolean;
  cities: CityItemT[];
  currentCity: CityItemT | null;
  error?: string;
  deleteCity?: (id: string) => void;
  createCity?: (city: CityItemT) => void;
  getCity?: (id: string) => void;
};

export type UserT = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type AuthStateT = {
  isAuthenticated: boolean;
  user?: UserT;
};

export type AuthContextT = {
  isAuthenticated: boolean;
  user?: UserT;
  login?: (email: string, password: string) => void;
  logout?: () => void;
};
