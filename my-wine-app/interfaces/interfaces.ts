// interfaces.ts
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  wineLogs: WineLog[];
}

export interface Wine {
  id: number;
  name: string;
  year: number;
  type: WineType;
  varietal: Varietal;
  rating?: number | null;
  consumed: boolean;
  wineLogs: WineLog[];
}

export interface WineLog {
  id: number;
  userId: number;
  wineId: number;
  consumed: boolean;
  dateConsumed?: Date | null;
  user: User;
  wine: Wine;
}

export enum Varietal {
  CabernetSauvignon,
  Merlot,
  Shiraz,
  CheninBlanc,
  SauvignonBlanc,
  Verdelho,
  Chardonnay,
  Durif,
  Pinotage,
  Semillion,
  Syrah,
  Barbera,
  Pinotnoir,
  Carmenere,
  Gewurztraminer,
  Gamay,
  Mourvedre,
  Zinfandel,
  Carignan,
  Muscat,
  Grenache,
  Tempranillo,
  Malbec,
}

export enum WineType {
  RED,
  WHITE,
  ROSE,
  WHITE_BLEND,
  RED_BLEND,
}
