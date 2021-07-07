/* eslint-disable indent */
import { Grid } from '@material-ui/core'
import { api } from '../../services/api'

import React, { useEffect, useState } from 'react'
import { IClasses } from '../../@types/IClasses'
import { useModules } from '../../hooks/useModules'

import { AddModule } from '../../components/AddModule'
import { AddClasses } from '../../components/AddClasses'
import { Button } from '../../components/Button'
import EditModule from '../../components/EditModule'
import DeleteModule from '../../components/DeleteModule'
import ClassesAdminMap from '../../components/ClassesAdminMap'
import Loading from '../../components/Loading'
import HomeIcon from '@material-ui/icons/Home'
import './styles.scss'
import { useHistory } from 'react-router-dom'

export function Admin(): JSX.Element {
  const [classes, setClasses] = useState<IClasses[]>()
  const { modules, loading, isChanged, setIsChanged } = useModules()
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      history?.push('/')
    }
  }, [history, loading, modules])

  /* Pega as aulas do módulo clicado */

  function classesInModule(moduleId: string[]) {
    async function getClasses() {
      await api.get(`/${moduleId}/classes`).then(res => {
        res.data.sort(function (a: IClasses, b: IClasses) {
          if (a.nameClass < b.nameClass) return -1
          if (a.nameClass > b.nameClass) return 1
          return 0
        })
        setClasses(res.data)
      })
    }
    getClasses()
  }

  /* Copia o ID ao clicar no botão COPIAR ID */

  function copyId(moduleId: string[]) {
    navigator.clipboard.writeText(moduleId.toString())
  }

  function reRenderCallbackFunction(): void {
    setIsChanged(!isChanged)
  }

  /* Renderização da página */

  return (
    <>
      <div id="home-page">
        <Button onClick={() => history.push('/')}>
          <HomeIcon />
        </Button>
        <h2>PÁGINA DE ADMINISTRAÇÃO</h2>
        <h4>
          Obs: Basta clicar no botão COPIAR ID para o ID do respectivo módulo ir
          automaticamente para a sua área de transferência.
        </h4>
        <AddModule functionCallback={reRenderCallbackFunction} />
        <AddClasses />
        {loading ? (
          <>
            <Grid
              spacing={4}
              container
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              {modules?.map((item, index) => {
                return (
                  <Grid key={index} item xs={11} md={4} lg={3}>
                    <div
                      className="module-card toLeft"
                      onClick={() => classesInModule(item.id)}
                    >
                      <h2>{item.module}</h2>
                      <Button onClick={() => copyId(item.id)}>COPIAR ID</Button>
                      <h3>
                        {item.amount === 0
                          ? 'Não há aulas aqui'
                          : item.amount === 1
                          ? '1 aula'
                          : `${item.amount} aulas`}
                      </h3>
                      <div className="button-container">
                        <DeleteModule moduleId={item.id} />
                        <EditModule moduleId={item.id} />
                      </div>
                    </div>
                  </Grid>
                )
              })}
            </Grid>
          </>
        ) : (
          <Loading />
        )}
        <span id="spacer">AULAS</span>
        {classes && <ClassesAdminMap classes={classes} />}
      </div>
    </>
  )
}
