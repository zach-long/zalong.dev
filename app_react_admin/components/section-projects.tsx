import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import DeleteButton from './button-delete';

interface ProjectsSectionProps {
    createMessage: Function
}

interface ProjectsSectionState {
    isLoaded: boolean,
    projects: Array<Project>
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

interface Project {
    _id: string,
    title: string,
    description: string,
    stack: string,
    image: string,
    url: string,
    active: boolean
}

class ProjectsSection extends Component<ProjectsSectionProps, ProjectsSectionState, any> {
    constructor(props: ProjectsSectionProps) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/project/all'
        }).then((response: AxiosResponse) => {
            console.log(response);
            this.setState({
                isLoaded: true,
                projects: response.data
            });
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
            <section id="projects-container" className="pt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Stack</th>
                            <th scope="col">URL</th>
                            <th scope="col" className="text-center">Active</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project) => <tr><td>{project.title}</td><td>{project.description}</td><td>{project.stack}</td><td>{project.url}</td><td className="text-center">{project.active ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>}</td><td><Link to={`/admin/project/edit/${project._id}`} className="btn btn-warning">Edit</Link></td></tr>)}
                    </tbody>
                </table>
                <Link to={`/admin/project/new`} className="btn btn-primary">Add new project</Link>
            </section>
        );
    }
}

export default ProjectsSection;