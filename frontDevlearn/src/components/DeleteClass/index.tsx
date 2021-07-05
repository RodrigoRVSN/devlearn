import "./styles.scss";
import { api } from "../../services/api";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { Button } from "@material-ui/core";

type ClassProps = {
  class_id: string[];
};

const DeleteClass = (class_id: ClassProps) => {
  
  function handleClick() {
    const token = localStorage.getItem("token");
    function deleteClass() {
      api.delete(`/modules/${class_id.class_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    deleteClass();
  }

  return (
    <>
      <Button
        variant="contained"
        id="button-delete"
        color="secondary"
        onClick={handleClick}
      >
        <DeleteOutlinedIcon />
      </Button>
    </>
  );
};

export default DeleteClass;
