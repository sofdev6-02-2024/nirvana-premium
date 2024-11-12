interface RegistrationData {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  role: "developer" | "recruiter";
  email: string;
}
