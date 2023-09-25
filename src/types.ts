export type DbSet = {
  sku: string;
  pieces: number;
  year: number;
};

export type DbPowers = {
  kanohi: string;
  element: string;
};

export type DbToa = {
  name: string;
  powers: DbPowers;
  set: DbSet;
};
