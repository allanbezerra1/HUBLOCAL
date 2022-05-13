import React from 'react'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import axios from 'axios';
import { API } from '../configs';
import config from '../components/rules/headers/headers'

const Dashboard = () => {

    const liveness = axios.get(API.liveness, config)
        .then((response) => {
            console.log('User Logado', response?.data)
        })
        .catch((error) => {
            window.location.href = '/login'
        })
    console.log(liveness)

    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <div className="col-8 col-md-12">
                        <div className="row">
                            <div className="title mb">Codesh main</div>
                        </div>
                    </div>
                </div>
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <div className="title mb">Codesh sideBar Right</div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Dashboard