import "./styles.scss";
import { api } from "../../services/api";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { Button } from "@material-ui/core";
import { useModules } from "../../hooks/useModules";

type ModuleProps = {
  module_id: string[];
};

const DeleteModule = (module_id: ModuleProps) => {
  const { setIsChanged } = useModules();
  
  function handleClick() {
    const token = localStorage.getItem("token");
    async function deleteModules() {
      await api.delete(`/${module_id.module_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsChanged(true);
    }
    deleteModules();
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

export default DeleteModule;
