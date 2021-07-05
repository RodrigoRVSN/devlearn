import "./styles.scss";
import { api } from "../../services/api";

import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

type ModuleProps = {
  class_id: string[];
};

const EditClass = (class_id: ModuleProps) => {
  function handleClick() {
    const token = localStorage.getItem("token");
    function editClass() {
      api.delete(`/${class_id.class_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    editClass();
  }

  return (
    <>
      <Button
        variant="contained"
        id="button-edit"
        color="primary"
        onClick={handleClick}
      >
        <EditIcon />
      </Button>
    </>
  );
};

export default EditClass;
