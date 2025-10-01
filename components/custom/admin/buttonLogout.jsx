import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { logout } from "@/store/reducer/authReducer";
import { toastify } from "@/lib/toastify";
import { USER_LOGIN } from "@/routes/UserRoute";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FiLogOut } from "react-icons/fi";

const ButtonLogout = () => {
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
    <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
      <div className="flex items-center gap-2">
        <FiLogOut color="red" />
        Logout
      </div>
    </DropdownMenuItem>
  );
};

export default ButtonLogout;
