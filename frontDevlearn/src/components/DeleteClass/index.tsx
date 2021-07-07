import React from 'react'
import './styles.scss'
import { api } from '../../services/api'

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

import { Button } from '@material-ui/core'

type ClassProps = {
  classId: string[]
  functionCallback: () => void
}

const DeleteClass = (classId: ClassProps): JSX.Element => {
  function handleClick() {
    const token = localStorage.getItem('token')
    function deleteClass() {
      api.delete(`/modules/${classId.classId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
    deleteClass()
    classId.functionCallback()
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

export default DeleteClass
