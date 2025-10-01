import { MenuItem, ListItemIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ActionDelete = ({ row, deleteType, onDelete }) => {
  return (
    <MenuItem
      key="delete"
      onClick={() => onDelete([row.original._id], deleteType)}
    >
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      Delete
    </MenuItem>
  );
};

export default ActionDelete;
