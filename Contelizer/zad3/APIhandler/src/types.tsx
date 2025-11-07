export default interface User {
  id: number;
  name: string;
  email: string;
  gender?: "male" | "female" | string;
  status?: "active" | "inactive" | string;
}
