import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import LoginForm from './components/loginForm';
import Logout from './components/logout';

import Dashboard from './components/dashboard';

import ChangePassword from './components/changePassword';

import Faculty from './components/faculty/faculty';
import FacultyForm from './components/faculty/facultyForm';

import Staff from './components/staff/staff';
import StaffForm from './components/staff/staffForm';

import Department from './components/department/department';

import Leave from './components/leaves/leaves';
import HandleRecord from './components/leaves/handleLeaves';

import MailForm from './components/mail/mail';

import Notice from './components/notice/notice';
import NewNotice from './components/notice/newNotice';

import NotFound from './components/not-found';

import NavBar from './components/common/navbar';

import auth from './services/authService';

class App extends React.Component {
    state = {}

    render() {

        const emp = auth.getCurrentEmployee();
        const empType = auth.getCurrentEmployeeType();

        return (
            <React.Fragment>

                <NavBar emp={emp} />

                <div className="webpage">
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />

                        {emp && <Route path="/dashboard" component={Dashboard} />}

                        {emp && <Route path="/change_password" component={ChangePassword} />}

                        {emp && emp.isAdmin && <Route path='/faculty/new' component={FacultyForm} />}
                        {emp && emp.isAdmin && <Route path='/faculty/edit/:id' component={FacultyForm} />}
                        {emp && <Route path='/faculty' component={Faculty} />}

                        {emp && emp.isAdmin && <Route path='/staff/new' component={StaffForm} />}
                        {emp && emp.isAdmin && <Route path='/staff/edit/:id' component={StaffForm} />}
                        {emp && <Route path='/staff' component={Staff} />}

                        {emp && <Route path='/department' component={Department} />}

                        {emp && emp.isAdmin && <Route path='/leaves/handle'
                            render={props => <HandleRecord {...props} empType={empType} />} />}
                        {emp && <Route path='/leaves' component={Leave} />}

                        {emp && <Route path="/mail" component={MailForm} />}

                        {emp && <Route path="/notices" component={Notice} />}
                        {emp && <Route path="/notice/new" component={NewNotice} />}

                        <Route path="/not-found" component={NotFound} />

                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default App;