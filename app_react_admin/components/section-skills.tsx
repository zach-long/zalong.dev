import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import DeleteButton from './button-delete';

interface SkillsSectionProps {
    createMessage: Function
}

interface SkillsSectionState {
    isLoaded: boolean,
    skills: Array<Skill>
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

interface Skill {
    _id: string,
    name: string,
    description: string,
    level: number
}

class SkillsSection extends Component<SkillsSectionProps, SkillsSectionState, any> {
    constructor(props: SkillsSectionProps) {
        super(props);
        this.state = {
            isLoaded: false,
            skills: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/skill/all'
        }).then((response: AxiosResponse) => {
            console.log(response);
            this.setState({
                isLoaded: true,
                skills: response.data
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
            <section id="skills-container" className="pt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.skills.map((skill) => <tr><td>{skill.name}</td><td>{skill.description}</td><td>{skill.level}</td><td><Link to={`/admin/skill/edit/${skill._id}`} className="btn btn-warning">Edit</Link></td></tr>)}
                    </tbody>
                </table>
                <Link to={`/admin/skill/new`} className="btn btn-primary">Add new skill</Link>
            </section>
        );
    }
}

export default SkillsSection;