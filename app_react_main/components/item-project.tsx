import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Image from './image';

interface ProjectItemProps {
    id: string,
    title: string,
    description: string,
    stack: string,
    image: string,
    url: string
}

interface ProjectItemState {
}

class ProjectItem extends Component<ProjectItemProps, ProjectItemState> {
    constructor(props: ProjectItemProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <a className="project-link" href={this.props.url} target="_blank">
                <div id={this.props.id} key={this.props.id} className="project-preview row justify-content-flex-start align-items-flex-start">
                    <div className="project-logo-container">
                        <Image imagePath={this.props.image} width="100%" />
                    </div>
                    <div className="project-short-description pl1 pb1">
                        <h2 className="m0">{this.props.title}</h2>
                        {(this.props.stack != undefined && this.props.stack.length > 0) &&
                            <h3 className="m0 pt1 pr1 pl1">
                                <div className="project-stack pl1">{this.props.stack}</div>
                            </h3>
                        }
                        {(this.props.description != undefined && this.props.description.length > 0) &&
                            <p className="m0 pt1 pr1 pl1">{this.props.description}</p>
                        }
                    </div>
                </div>
            </a>
        );
    }
}

export default ProjectItem;