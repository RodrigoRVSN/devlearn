import React, { useState } from 'react'
import { Button } from '../Button'
import { TextField } from '@material-ui/core'
import './styles.scss'
import { api } from '../../services/api'
import { useForm, Controller } from 'react-hook-form'
import { IModule } from '../../@types/IModule'

export function AddModule(): JSX.Element {
  const [clicked, setClicked] = useState(false)
  const [error, setError] = useState('')
  const { handleSubmit, control } = useForm()

  const onSubmit = (submitted: IModule) => {
    const token = localStorage.getItem('token')
    async function postModules() {
      await api
        .post(
          '/modules',
          { module: submitted.module },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setClicked(!clicked)
        })
        .catch(() => {
          setError('Você precisa fazer login!')
        })
    }
    postModules()
  }

  return (
    <>
      <Button
        onClick={() => {
          setClicked(!clicked)
        }}
      >
        {clicked ? 'Fechar' : 'Adicionar módulo'}
      </Button>

      {clicked && (
        <>
          <form className="form-add toDown" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="module"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  label="Nome do módulo"
                  type="name"
                  variant="outlined"
                  placeholder="React"
                />
              )}
            />

            <p>{error}</p>
            <Button type="submit">ADICIONAR MÓDULO</Button>
          </form>
        </>
      )}
    </>
  )
}
