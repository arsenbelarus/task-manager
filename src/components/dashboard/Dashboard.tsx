import React from 'react'
import Notifications from "./Notifications";

const Dashboard = () => {
  return (
    <div className={'dashboard container'}>
      <div className={'row'}>
        <div className={'col s12 m8'}>

        </div>
        <div className={'col s12 m3 offset-m1'}>
            <Notifications />
        </div>
      </div>
    </div>
  )
}

export default Dashboard