import React from 'react'
import './styles.scss'
import { api } from '../../services/api'

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

import { Button } from '@material-ui/core'

type ModuleProps = {
  moduleId: string[]
}

const DeleteModule = (moduleId: ModuleProps): JSX.Element => {
  function handleClick() {
    const token = localStorage.getItem('token')
    async function deleteModules() {
      await api.delete(`/${moduleId.moduleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
    deleteModules()
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
  )
}

export default DeleteModule
