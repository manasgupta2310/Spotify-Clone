import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = {
      email,
      password,
    };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.error) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 items-center flex flex-col justify-center">
        <div className="font-bold mb-4">To continue, login in to Spotify</div>
        <TextInput
          placeholder="Enter email or username"
          label="Email address or username"
          className="my-2"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex items-center justify-end my-8">
          <button
            className="bg-green-400 font-semibold p-3 px-10 rounded-full"
            onClick={(event) => {
              login();
            }}
          >
            Log In
          </button>
        </div>
        <div className="border border-solid border-gray-300 w-full"></div>
        <div className="my-6 font-semibold text-lg">Don't have an account?</div>
        <div className="border border-gray-500 text-gray-500 font-bold w-full flex items-center justify-center rounded-full py-3">
          <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
