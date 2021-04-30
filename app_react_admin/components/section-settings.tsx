import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface ProjectsSectionProps {
    createMessage: Function
}

interface ProjectsSectionState {
    isLoaded: boolean,
    settings: Array<Setting>
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

interface Setting {
    _id: string,
    siteHeader: string,
    bio: string
    siteFooter: string,
    active: boolean
}

class SettingsSection extends Component<ProjectsSectionProps, ProjectsSectionState, any> {
    constructor(props: ProjectsSectionProps) {
        super(props);
        this.state = {
            isLoaded: false,
            settings: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/settings/all'
        }).then((response: AxiosResponse) => {
            console.log(response);
            this.setState({
                settings: response.data
            })
        }).catch((error: AxiosResponse) => {
            this.createMessage({ type: 'error', message: `Error making GET request - ${error}`});
            console.log(error);
        });
    }

    createMessage = (message: Message) => {
        this.props.createMessage(message);
    }

    render() {
        return (
            <section id="settings-container" className="pt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Site Header</th>
                            <th scope="col">Bio</th>
                            <th scope="col">Site Footer</th>
                            <th scope="col" className="text-center">Active</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.settings.map((setting) => <tr><td>{setting.siteHeader}</td><td>{setting.bio}</td><td>{setting.siteFooter}</td><td className="text-center">{setting.active ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>}</td><td><Link to={`/admin/settings/edit/${setting._id}`} className="btn btn-warning">Edit</Link></td></tr>)}
                    </tbody>
                </table>
                <Link to={`/admin/settings/new`} className="btn btn-primary">Add new settings</Link>
            </section>
        );
    }
}

export default SettingsSection;