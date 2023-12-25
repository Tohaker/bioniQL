export type DbSet = {
  sku: string;
  pieces: number;
  year: number;
};

export type DbPowers = {
  kanohi: string;
  element: string;
};

export type DbMatoran = {
  name: string;
  powers: DbPowers;
  set: string;
};
