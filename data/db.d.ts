export default function (): {
  toa: import("../src/types").DbToa[];
  turaga: import("../src/types").DbTuraga[];
  locations: import("../src/types").DbLocation[];
  sets: import("../src/types").DbSet[];
  users: { id: string; type: string }[];
};
