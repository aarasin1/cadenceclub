export interface GolfCourse {
  name: string;
  logo: string;
  location: string;
  timezone:
    | "America/New_York"
    | "America/Chicago"
    | "America/Denver"
    | "America/Los_Angeles";
}
