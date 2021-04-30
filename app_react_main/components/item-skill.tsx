import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Image from './image';

interface SkillItemProps {
    id: string,
    name: string,
    description: string,
    level: string | number
}

interface SkillItemState {
}

class SkillItem extends Component<SkillItemProps, SkillItemState> {
    constructor(props: SkillItemProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        let skillBoxClasses = `skill-fill fill-${this.props.level}`;

        return (
            <div className="skill-group row no-wrap justify-content-space-between align-items-center w45 mb1">
                <div className={skillBoxClasses}></div>
                <div className="skill-name">{this.props.name}</div>
                <div className="skill-score">{this.props.level}</div>
            </div>
        );
    }
}

export default SkillItem;