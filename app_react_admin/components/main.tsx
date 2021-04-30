import React, { Component } from 'react';

import SettingsSection from './section-settings';
import SkillsSection from './section-skills';
import ProjectsSection from './section-projects';

interface MainProps {
    createMessage: Function
}

class Main extends Component<MainProps, any, any> {
    constructor(props: MainProps) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="pt-5">
                <SettingsSection createMessage={this.props.createMessage}/>
                <ProjectsSection createMessage={this.props.createMessage}/>
                {/* <SkillsSection createMessage={this.props.createMessage}/> */}
            </div>
        );
    }
}

export default Main;