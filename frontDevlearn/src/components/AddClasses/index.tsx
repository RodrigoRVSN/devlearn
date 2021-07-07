import React, { useState } from 'react'
import { Button } from '../Button'
import { TextField } from '@material-ui/core'
import './styles.scss'
import { api } from '../../services/api'
import { useForm } from 'react-hook-form'
import { IClasses } from '../../@types/IClasses'
import { IFunctionCallback } from '../../@types/IFunctionCallback'

export function AddClasses(props: IFunctionCallback): JSX.Element {
  const [clicked, setClicked] = useState(false)
  const [error, setError] = useState('')
  const { handleSubmit, register } = useForm()

  const onSubmit = (submitted: IClasses) => {
    const token = localStorage.getItem('token')
    async function postClasses() {
      await api
        .post(
          '/classes',
          {
            nameClass: submitted.nameClass,
            moduleId: submitted.moduleId,
            dataClass: submitted.dataClass
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setClicked(!clicked)
        })
        .catch(err => {
          console.log(err)
          setError('Você precisa fazer login!')
        })
    }
    postClasses()
    props.functionCallback()
  }

  return (
    <>
      <Button
        onClick={() => {
          setClicked(!clicked)
        }}
      >
        {clicked ? 'Fechar' : 'Adicionar aula'}
      </Button>

      {clicked && (
        <>
          <form className="form-add toDown" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              {...register('nameClass')}
              label="Nome da aula"
              type="name"
              variant="outlined"
              placeholder="SSR e SSG"
            />
            <TextField
              required
              {...register('moduleId')}
              label="ID do módulo"
              type="name"
              variant="outlined"
              placeholder="Clique no módulo para  copiar"
            />
            <TextField
              required
              {...register('dataClass')}
              type="date"
              variant="outlined"
            />

            <p>{error}</p>
            <Button type="submit">ADICIONAR AULA</Button>
          </form>
        </>
      )}
    </>
  )
}
