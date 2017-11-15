export interface User {
  id?: string;
  email: string;
  name?: string;
  password?: string;
  avatar?: string;
  dateOfBirth?: string;
  projectIds: string[];
}
