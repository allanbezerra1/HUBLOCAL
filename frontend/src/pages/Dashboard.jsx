import React from 'react'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'

const Dashboard = () => {
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