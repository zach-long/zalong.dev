import React, { Component, SyntheticEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import DeleteButton from './button-delete';

interface FormProps {
    createMessage: Function
}

interface FormState {
    isLoaded: boolean,
    skillIsNew: boolean,
    skillID: string | undefined,
    name: string,
    description: string,
    level: number | undefined,
    formDone: any
}

interface SkillFormJSON {
    name: string,
    description: string,
    level: number | undefined,
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class SkillForm extends Component<FormProps, FormState, any> {
    state: FormState;
    fileInput: any;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            isLoaded: true,
            skillIsNew: true,
            skillID: undefined,
            name: '',
            description: '',
            level: undefined,
            formDone: undefined
        }
    }

    componentDidMount() {
        console.log(`Component 'SkillForm' mounted`)
        // @ts-ignore
        this.props.match.params.id ? console.log(`Received ID: ${this.props.match.params.id}`) : console.log(`No ID, creating new skill`);
        // @ts-ignore
        if (this.props.match.params.id) {
            this.setState({
                // @ts-ignore
                skillID: this.props.match.params.id,
                skillIsNew: false,
                isLoaded: false
            });

            // @ts-ignore
            let getURL = `/skill/${this.props.match.params.id}`;

            console.log(`Making GET request to: ${getURL}`)
            axios({
                method: 'get',
                url: getURL
            }).then((response: AxiosResponse) => {
                console.log(response);
                this.setState({
                    isLoaded: true,
                    name: response.data.name,
                    description: response.data.description,
                    level: response.data.level
                });
            }).catch((error: AxiosResponse) => {
                this.createMessage({ type: 'error', message: `Error making GET request - ${error}`});
                console.log(error);
            });
        }

    }

    componentDidUpdate() {
        console.log(`State updated:`);
        console.log(this.state);
    }

    handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;
        // @ts-ignore
        this.setState({ [name]: value });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let postURL = this.state.skillIsNew ? `/skill/new` : `/skill/update/${this.state.skillID}`;

        console.log(`Creating FromData from state:`);
        console.log(this.state);

        let data: SkillFormJSON = {
            name: this.state.name,
            description: this.state.description,
            level: this.state.level
        }

        let headers = { 'Content-Type': 'application/json' };

        console.log(`Skill form submit, making POST request to ${postURL}`);
        axios({
            method: 'post',
            url: postURL,
            data: data,
            headers: headers
        }).then((response: AxiosResponse) => {
            this.setState({ formDone: true });
            this.createMessage({ type: 'success', message: `Success` });
            console.log(response);
            console.log(response.data);
        }).catch((error: AxiosResponse) => {
            this.createMessage({ type: 'error', message: `Error making POST request: ${error}` });
            console.log(error);
        });
        
    }

    createMessage = (message: Message) => {
        this.props.createMessage(message);
    }

    formDone = () => {
        this.setState({ formDone: true });
    }

    render() {
        const { formDone } = this.state;

        if (formDone) {
            return (
                <Redirect to='/admin'/>
            );
        }

        return (
            <div>
                <form id="skill-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input id="name" className="form-control" form="skill-form" name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name} required/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea id="description" className="form-control" form="skill-form" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description}/>
                    </div>
                    <div className="form-group">
                        <label>Level</label>
                        <input id="level" className="form-control" form="skill-form" name="level" type="number" placeholder="Level" onChange={this.handleChange} value={this.state.level} max="5" min="1"/>
                    </div>
                    
                    <div className="mt-3">
                        <button type="submit" value="Submit" className="btn btn-success mr-3">Submit</button>
                        { !this.state.skillIsNew && <DeleteButton id={this.state.skillID} createMessage={this.createMessage} formDone={this.formDone} assetType="skill" /> }
                    </div>
                </form>
            </div>
        );
    }
}

export default SkillForm;