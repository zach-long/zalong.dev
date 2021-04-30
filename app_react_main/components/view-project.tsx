import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import Axios, { AxiosResponse, AxiosError } from "axios";

import Image from './image';

interface ProjectProps {
    createMessage: Function
}

interface ProjectState {
    isLoaded: boolean,
    project?: Project
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

interface Project {
    _id: string,
    title: string,
    description: string,
    image: string,
    url: string,
    active: boolean
}

class ProjectView extends Component<ProjectProps, ProjectState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        // console.log(`Component ProjectView mounted`);
        // @ts-ignore
        // this.props.match.params.id ? console.log(`Received ID: ${this.props.match.params.id}`) : console.log(`No ID`);
        // @ts-ignore
        let thisProjectID = this.props.match.params.id;

        const getURL = `/project/${thisProjectID}`;
        Axios({
            method: 'get',
            url: getURL
        }).then((response: AxiosResponse) => {
            this.setState({
                isLoaded: true,
                project: response.data
            });
        }).catch((error: AxiosError) => {
            this.props.createMessage({ type: 'error', message: `Unable to fetch Project.` });
            // console.log(error);
        });
    }

    render() {
        if (!this.state.project) {
            return (
                <section id="project-view">
                    no project
                </section>
            );
        } else {
            return (
                <section id="project-view" className="content">
                    <Link to='/'>Back</Link>
                    <div id={this.state.project._id}>
                        <Image imagePath={this.state.project.image}/>
                        <h1>{this.state.project.title}</h1>
                        <p>{this.state.project.description}</p>
                        <a href={this.state.project.url}>{this.state.project.url}</a>
                    </div>
                </section>
            );
        }
    }
}

export default ProjectView;