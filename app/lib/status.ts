/**
 * Services shown on /status. Each one is checked live from the server
 * (see app/api/status/route.ts) with a plain HTTP request.
 *
 * Add a service by appending an entry; `group` decides which list it lands in.
 */

export type ServiceGroup = "Eigensu" | "Client sites";

export type MonitoredService = {
  id: string;
  name: string;
  url: string;
  group: ServiceGroup;
  note?: string;
};

export const SERVICES: MonitoredService[] = [
  { id: "eigensu",   name: "eigensu.in",          url: "https://eigensu.in",                 group: "Eigensu", note: "This website" },
  { id: "dishpatch", name: "DishPatch",           url: "https://restobuzz.eigensu.in",       group: "Eigensu", note: "Restaurant CRM" },
  { id: "recruiter", name: "Recruiter",           url: "https://binge.eigensu.in",           group: "Eigensu", note: "Recruitment pipeline" },

  { id: "sacredwalks",   name: "The Sacred Walks",    url: "https://thesacredwalks.in",          group: "Client sites" },
  { id: "soraia",        name: "Soraia",              url: "https://www.soraia.in",              group: "Client sites" },
  { id: "fielia",        name: "Fielia",              url: "https://fielia.in",                  group: "Client sites" },
  { id: "sweeney",       name: "Sweeney",             url: "https://sweeneybombay.in",           group: "Client sites" },
  { id: "scarletthouse", name: "Scarlett House",      url: "https://scarletthousebombay.com",    group: "Client sites" },
  { id: "walle",         name: "Wall-E Arena",        url: "https://wallearena.com",             group: "Client sites" },
  { id: "blended",       name: "The Blended Stories", url: "https://theblendedstories.in",       group: "Client sites" },
  { id: "justlovedit",   name: "Just Lovedit",        url: "https://justlovedit.com",            group: "Client sites" },
  { id: "lafete",        name: "La Fête",             url: "https://la-fete-frontend.vercel.app", group: "Client sites" },
];

export type CheckState = "up" | "slow" | "down";

export type CheckResult = {
  id: string;
  name: string;
  host: string;
  group: ServiceGroup;
  note?: string;
  state: CheckState;
  statusCode: number | null;
  latencyMs: number | null;
  checkedAt: string;
};

/** Responses slower than this count as "slow" rather than "up". */
export const SLOW_MS = 4000;
