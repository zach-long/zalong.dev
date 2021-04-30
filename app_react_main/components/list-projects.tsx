import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';

import ProjectItem from './item-project';

interface ProjectListProps {
    createMessage: Function
}

interface ProjectListState {
    isLoaded: boolean,
    projects: Array<Project>
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

class ProjectList extends Component<ProjectListProps, ProjectListState> {
    constructor(props: ProjectListProps) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: []
        }
    }

    componentDidMount() {
        const getURL = `/project/all/active`;

        axios({
            method: 'get',
            url: getURL
        }).then((response: AxiosResponse) => {
            this.setState({
                isLoaded: true,
                projects: response.data
            });
        }).catch((error: AxiosError) => {
            this.props.createMessage({ type: 'error', message: `Unable to fetch Projects.` });
            // console.log(error);
        });
    }

    render() {
        return (
            <section id="project-list" className="project-list">
                <h1 className="bold">Projects</h1>
                {this.state.projects.map((project) => <ProjectItem id={project._id} key={project._id} title={project.title} description={project.description} stack={project.stack} url={project.url} image={project.image}/>)}
            </section>
        );
    }
}

export default ProjectList;