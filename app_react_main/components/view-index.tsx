import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Bio from './section-bio';
import Skills from './section-skills';
import ProjectList from './list-projects';

interface IndexProps {
    createMessage: Function
    bio: string
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class IndexView extends Component<IndexProps, any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div id="index-view" className="content">
                <Bio createMessage={this.props.createMessage} bio={this.props.bio} />
                {/* <Skills createMessage={this.props.createMessage} /> */}
                <ProjectList createMessage={this.props.createMessage} />
            </div>
        );
    }
}

export default IndexView;