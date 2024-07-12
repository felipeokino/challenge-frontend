import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import Input from "components/Input";
import useAuthentication from "hooks/useAuthentication";
import { validateEmail } from "utils/string";

interface LoginForm extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
const Login = () => {
  const [errors, setErrors] = useState<Record<"email" | "password", boolean>>({
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent<LoginForm>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (validateEmail(email) && password) {
      await login(email, password).then(() => {
        if (!error) navigate("/");
      });
    } else {
      setErrors({
        email: !validateEmail(email),
        password: !password,
      });
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-700 gap-8">
      <section className=" w-1/3 bg-zinc-800 rounded-lg p-8 shadow-xl max-lg:w-2/3 max-sm:w-11/12 ">
        <p className="text-white font-semibold text-xl block w-full text-center">
          Login to your account
        </p>
        {error && (
          <div className="flex justify-center items-center">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}
        <form
          className="w-full flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            title="Email"
            titleClassName="text-white"
            type="email"
            id="email"
            error={errors.email}
            helperText="Must be a valid email"
          />
          <Input
            title="Password"
            type="password"
            titleClassName="text-white"
            id="password"
            error={errors.password}
            helperText="At least 8 characters"
          />
          <Button type="submit" variant="primary">
            Login
            {isLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full size-4 border-2 border-t-0 border-white"></div>
              </div>
            )}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Login;
