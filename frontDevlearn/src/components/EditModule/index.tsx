import React, { useState } from 'react'

import { api } from '../../services/api'

import { Button, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import './styles.scss'
import { useForm } from 'react-hook-form'
import { IModule } from '../../@types/IModule'

type ModuleProps = {
  moduleId: string[]
  functionCallback: () => void
}

const EditModule = (moduleId: ModuleProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  const { handleSubmit, register } = useForm()

  const onSubmit = (submitted: IModule) => {
    const token = localStorage.getItem('token')
    function postModules() {
      api
        .put(
          `/${moduleId.moduleId}`,
          { module: submitted.module },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setIsEditing(!isEditing)
        })
        .catch(() => {
          setError('Você precisa fazer login!')
        })
    }
    postModules()
    moduleId.functionCallback()
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
              {...register('module')}
              label="Nome do módulo"
              type="module"
              variant="outlined"
              placeholder="React"
            />

            <p>{error}</p>
            <Button type="submit">EDITAR MÓDULO</Button>
          </form>
        </>
      )}
    </>
  )
}

export default EditModule
