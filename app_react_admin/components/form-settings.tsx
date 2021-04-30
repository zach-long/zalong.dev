import React, { Component, SyntheticEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import DeleteButton from './button-delete';

interface FormProps {
    createMessage: Function
}

interface FormState {
    isLoaded: boolean,
    settingsAreNew: boolean,
    settingsID: string | undefined,
    siteHeader: string,
    bio: string,
    siteFooter: string,
    active: boolean,
    formDone: any
}

interface SettingsFormJSON {
    siteHeader: string,
    bio: string,
    siteFooter: string,
    active: boolean
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class SettingsForm extends Component<FormProps, FormState, any> {
    state: FormState;
    fileInput: any;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            isLoaded: true,
            settingsAreNew: true,
            settingsID: undefined,
            siteHeader: '',
            bio: '',
            siteFooter: '',
            active: true,
            formDone: undefined
        }
    }

    componentDidMount() {
        console.log(`Component 'SettingsForm' mounted`)
        // @ts-ignore
        this.props.match.params.id ? console.log(`Received ID: ${this.props.match.params.id}`) : console.log(`No ID, creating new settings`);
        // @ts-ignore
        if (this.props.match.params.id) {
            this.setState({
                // @ts-ignore
                settingsID: this.props.match.params.id,
                settingsAreNew: false,
                isLoaded: false
            });

            // @ts-ignore
            let getURL = `/settings/${this.props.match.params.id}`;

            console.log(`Making GET request to: ${getURL}`)
            axios({
                method: 'get',
                url: getURL
            }).then((response: AxiosResponse) => {
                console.log(response);

                this.setState({
                    isLoaded: true,
                    siteHeader: response.data.siteHeader,
                    bio: response.data.bio,
                    siteFooter: response.data.siteFooter,
                    active: response.data.active
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
        const value = target.name === 'active' ? target.checked : target.value;
        const name = target.name;
        // @ts-ignore
        this.setState({ [name]: value });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let postURL = this.state.settingsAreNew ? `/settings/new` : `/settings/update/${this.state.settingsID}`;

        console.log(`Creating data from state:`);
        console.log(this.state);

        let data: SettingsFormJSON = {
            siteHeader: this.state.siteHeader,
            bio: this.state.bio,
            siteFooter: this.state.siteFooter,
            active: this.state.active
        }

        let headers = { 'Content-Type': 'application/json' };

        console.log(`Project form submit, making POST request to ${postURL}`);
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
                <form id="settings-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Site Header</label>
                        <input id="siteHeader" className="form-control" form="settings-form" name="siteHeader" type="text" placeholder="Site Header" onChange={this.handleChange} value={this.state.siteHeader} />
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea id="bio" className="form-control" form="settings-form" name="bio" placeholder="Bio" onChange={this.handleChange} value={this.state.bio} />
                    </div>
                    <div className="form-group">
                        <label>Site Footer</label>
                        <textarea id="siteFooter" className="form-control" form="settings-form" name="siteFooter" placeholder="Site Footer" onChange={this.handleChange} value={this.state.siteFooter} />
                    </div>
                    <div className="form-check">
                        <input id="active" className="form-check-input" form="settings-form" name="active" type="checkbox" onChange={this.handleChange} checked={this.state.active} />
                        <label className="form-check-label">Active</label>
                    </div>
                    
                    <div className="mt-3">
                        <button type="submit" value="Submit" className="btn btn-success mr-3">Submit</button>
                        { !this.state.settingsAreNew && <DeleteButton id={this.state.settingsID} createMessage={this.createMessage} formDone={this.formDone} assetType="settings" /> }
                    </div>
                </form>
            </div>
        );
    }
}

export default SettingsForm;