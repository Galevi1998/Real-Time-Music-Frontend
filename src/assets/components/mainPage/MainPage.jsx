import React from "react";
import { useUser } from "../../../context/UserContext";
import MainPageAdmin from "./MainPageAdmin";
import MainPagePlayer from "./MainPagePlayer";

export default function MainPage() {
  const user = useUser();
  return (
    <>
    {(user.user.status === "Admin") ? (
      <MainPageAdmin/>):
    (
      <MainPagePlayer/>
    )}
    </>
  );
}
