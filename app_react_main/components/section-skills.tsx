import React, { Component } from "react";
import axios, { AxiosResponse, AxiosError } from 'axios';

import SkillItem from './item-skill';

interface SkillListProps {
    createMessage: Function
}

interface SkillListState {
    isLoaded: boolean,
    skills: Array<Skill>
}

interface Skill {
    _id: string,
    name: string,
    description: string,
    level: string | number
}

class Skills extends Component<SkillListProps, SkillListState, any> {
    constructor(props: SkillListProps) {
        super(props);
        this.state = {
            isLoaded: false,
            skills: []
        }
    }

    componentDidMount() {
        const getURL = `/skill/all`;

        axios({
            method: 'get',
            url: getURL
        }).then((response: AxiosResponse) => {
            this.setState({
                isLoaded: true,
                skills: response.data
            });
        }).catch((error: AxiosError) => {
            this.props.createMessage({ type: 'error', message: `Unable to fetch Skills.` });
            // console.log(error);
        });
    }

    render() {
        return (
            <section id="skills">
                <h1 className="bold">Skills</h1>
                <div className="row wrap justify-content-space-between">
                    {this.state.skills.map((skill) => <SkillItem id={skill._id} key={skill._id} name={skill.name} description={skill.description} level={skill.level}/>)}
                </div>
            </section>
        )
    }
}

export default Skills;