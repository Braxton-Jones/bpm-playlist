import LandingPage from "./layout/pages/LandingPage";
import HomePage from "./layout/pages/Homepage";
import { useEffect, useState } from "react";
import { accessToken, logout } from "./utility/api_auth";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(accessToken);
  });
  return <>{!token ? <LandingPage /> : <HomePage />}</>;
}
