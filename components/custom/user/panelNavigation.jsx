"use client";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { logout } from "@/store/reducer/authReducer";
import { toastify } from "@/lib/toastify";
import { USER_LOGIN } from "@/routes/UserRoute";
import Link from "next/link";
import { USER_DASHBOARD, USER_PROFILE, USER_HISTORY } from "@/routes/UserRoute";
import { Button } from "@/components/ui/button";

const PanelNavigation = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const onLogout = async () => {
    try {
      const { data: logoutResponse } = await axios.post("/api/auth/logout");
      if (!logoutResponse.success) {
        throw new Error(logoutResponse.message);
      }
      dispatch(logout());
      toastify("success", logoutResponse.message);
      router.push(USER_LOGIN);
    } catch (error) {
      toastify("error", error.message);
    }
  };
  return (
    <div className="shadow border rounded p-4">
      <ul>
        <li className="mb-2">
          <Link
            className={`block rounded p-2 text-sm hover:bg-primary hover:text-white ${
              pathname.startsWith(USER_DASHBOARD) && "bg-primary text-white"
            }`}
            href={USER_DASHBOARD}
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            className={`block rounded p-2 text-sm hover:bg-primary hover:text-white ${
              pathname.startsWith(USER_PROFILE) && "bg-primary text-white"
            }`}
            href={USER_PROFILE}
          >
            Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link
            className={`block rounded p-2 text-sm hover:bg-primary hover:text-white ${
              pathname.startsWith(USER_HISTORY) && "bg-primary text-white"
            }`}
            href={USER_HISTORY}
          >
            History
          </Link>
        </li>
        <li>
          <Button
            className="w-full cursor-pointer"
            variant="destructive"
            type="button"
            onClick={onLogout}
          >
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default PanelNavigation;
