"use client";

import { useLogoutMutation } from "@/redux/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [logOut] = useLogoutMutation();
  const user = useSelector(selectCurrentUser);

  const handleLogOut = async () => {
    try {
      await logOut().unwrap();
      router.replace("/");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };
  return (
    <>
      <h1>Welkommen {user?.email}!</h1>
      <button onClick={handleLogOut} type="button">
        Log out
      </button>
    </>
  );
}
