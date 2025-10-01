import { MenuItem, ListItemIcon } from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const ActionEdit = ({ href }) => {
  return (
    <MenuItem key="edit">
      <Link className="flex justify-center items-center gap-1" href={href}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Edit
      </Link>
    </MenuItem>
  );
};

export default ActionEdit;
