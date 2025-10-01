import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Admin from "@/public/assets/icons/admin.png";
import Link from "next/link";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import ButtonLogout from "./buttonLogout";
import { ADMIN_PRODUCT, ADMIN_ORDERS } from "@/routes/AdminRoute";

const UserOptions = () => {
  const auth = useSelector((store) => store.authStore.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={Admin.src} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-32">
        <DropdownMenuLabel>
          <p className="font-semibold">{auth?.fullName}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href={ADMIN_PRODUCT}>
            <IoShirtOutline />
            Products
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href={ADMIN_ORDERS}>
            <MdOutlineShoppingBag />
            Orders
          </Link>
        </DropdownMenuItem>
        <ButtonLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptions;
