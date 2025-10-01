import { MenuItem, ListItemIcon } from "@mui/material";
import Link from "next/link";
import { RemoveRedEye } from "@mui/icons-material";

const ActionView = ({ href }) => {
  return (
    <MenuItem key="view">
      <Link className="flex justify-center items-center gap-1" href={href}>
        <ListItemIcon>
          <RemoveRedEye />
        </ListItemIcon>
        View
      </Link>
    </MenuItem>
  );
};

export default ActionView;
