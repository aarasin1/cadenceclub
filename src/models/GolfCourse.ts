export interface GolfCourse {
  name: string;
  logo: string;
  imageUrl: string;
  generalLocation: string;
  address: string;
  timezone:
    | "America/New_York"
    | "America/Chicago"
    | "America/Denver"
    | "America/Los_Angeles";
}
