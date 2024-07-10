export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserResponse = {
  user: User;
  token: string;
};
