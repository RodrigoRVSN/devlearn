import React from 'react'
import { Grid } from '@material-ui/core'
import './styles.scss'
import { IClasses } from '../../@types/IClasses'
import DeleteClass from '../../components/DeleteClass'
import EditClass from '../../components/EditClass'

type ClassesProps = {
  classes: IClasses[]
}

const ClassesAdminMap = ({ classes }: ClassesProps): JSX.Element => {
  return (
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
        {classes?.map((item, index) => {
          return (
            <Grid key={index} item xs={10} md={6} lg={5}>
              <div className="class-card toDown">
                <h3>{item.moduleClass.module}</h3>
                <h3>{item.nameClass}</h3>
                <h3>{item.dataClass}</h3>
                <div className="button-container">
                  <DeleteClass classId={item.id} />
                  <EditClass classId={item.id} />
                </div>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default ClassesAdminMap
