import React, { useState } from 'react'
import './styles.scss'
import { api } from '../../services/api'

import EditIcon from '@material-ui/icons/Edit'
import { TextField, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import CloseIcon from '@material-ui/icons/Close'
import { IClasses } from '../../@types/IClasses'

type ClassProps = {
  classId: string[]
  functionCallback: () => void
}

const EditClass = (classId: ClassProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  const { handleSubmit, register } = useForm()

  const onSubmit = (submitted: IClasses) => {
    const token = localStorage.getItem('token')
    function editClass() {
      api
        .put(
          `/modules/${classId.classId}`,
          {
            moduleId: submitted.moduleId,
            nameClass: submitted.nameClass,
            dataClass: submitted.dataClass
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setIsEditing(!isEditing)
        })
        .catch(() => {
          setError('Você precisa fazer login!')
        })
    }
    editClass()
    classId.functionCallback()
  }

  return (
    <>
      <Button
        variant="contained"
        id="button-edit"
        color="primary"
        onClick={() => {
          setIsEditing(!isEditing)
        }}
      >
        {isEditing ? <CloseIcon /> : <EditIcon />}
      </Button>
      {isEditing && (
        <>
          <form className="form-edit toDown" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('moduleId')}
              label="ID do módulo"
              type="name"
              variant="outlined"
              placeholder="React"
            />
            <TextField
              {...register('nameClass')}
              label="Nome da aula"
              type="name"
              variant="outlined"
              placeholder="React"
            />
            <TextField
              {...register('dataClass')}
              type="Date"
              variant="outlined"
            />

            <p>{error}</p>
            <Button type="submit">EDITAR AULA</Button>
          </form>
        </>
      )}
    </>
  )
}

export default EditClass
