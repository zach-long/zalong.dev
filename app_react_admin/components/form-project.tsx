import React, { Component, SyntheticEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import DeleteButton from './button-delete';

interface FormProps {
    createMessage: Function
}

interface FormState {
    isLoaded: boolean,
    projectIsNew: boolean,
    projectID: string | undefined,
    title: string,
    description: string,
    stack: string,
    imageFile: any,
    imagePath: string | ArrayBuffer | null,
    url: string,
    active: boolean,
    formDone: any
}

interface ProjectFormData extends FormData {
    title: string,
    description: string,
    stack: string,
    image: string,
    url: string,
    active: string
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class ProjectForm extends Component<FormProps, FormState, any> {
    state: FormState;
    fileInput: any;

    constructor(props: FormProps) {
        super(props);
        // @ts-ignore
        this.fileInput = React.createRef();
        this.state = {
            isLoaded: true,
            projectIsNew: true,
            projectID: undefined,
            title: '',
            description: '',
            stack: '',
            imageFile: undefined,
            imagePath: '',
            url: '',
            active: true,
            formDone: undefined
        }
    }

    componentDidMount() {
        console.log(`Component 'ProjectForm' mounted`)
        // @ts-ignore
        this.props.match.params.id ? console.log(`Received ID: ${this.props.match.params.id}`) : console.log(`No ID, creating new project`);
        // @ts-ignore
        if (this.props.match.params.id) {
            this.setState({
                // @ts-ignore
                projectID: this.props.match.params.id,
                projectIsNew: false,
                isLoaded: false
            });

            // @ts-ignore
            let getURL = `/project/${this.props.match.params.id}`;

            console.log(`Making GET request to: ${getURL}`)
            axios({
                method: 'get',
                url: getURL
            }).then((response: AxiosResponse) => {
                console.log(response);

                // read image file from system based on response.data.image result and display as imagePath

                this.setState({
                    isLoaded: true,
                    title: response.data.title,
                    description: response.data.description,
                    stack: response.data.stack,
                    imagePath: response.data.image,
                    url: response.data.url,
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

    handleImageChange = (event: React.FormEvent<HTMLInputElement>): void => {
        event.preventDefault();

        this.setState({
            // @ts-ignore
            imageFile: event.currentTarget.files[0]
        });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let postURL = this.state.projectIsNew ? `/project/new` : `/project/update/${this.state.projectID}`;

        console.log(`Creating FromData from state:`);
        console.log(this.state);

        let data: ProjectFormData = new FormData() as ProjectFormData;
        data.append('title', this.state.title);
        data.append('description', this.state.description);
        data.append('stack', this.state.stack);
        data.append('image', this.state.imageFile);
        data.append('url', this.state.url);
        data.append('active', this.state.active as unknown as string);

        let headers = { 'Content-Type': 'multipart/form-data' };

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
                <form id="project-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input id="title" className="form-control" form="project-form" name="title" type="text" placeholder="Title" onChange={this.handleChange} value={this.state.title} required/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea id="description" className="form-control" form="project-form" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description}/>
                    </div>
                    <div className="form-group">
                        <label>Tech Stack</label>
                        <input id="stack" className="form-control" form="project-form" name="stack" type="text" placeholder="Stack" onChange={this.handleChange} value={this.state.stack}/>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input id="image" className="form-control-file" form="project-form" name="image" type="file" onChange={this.handleImageChange} ref={this.fileInput} required/>
                    </div>
                    <div className="form-group">
                        <label>URL</label>
                        <input id="url" className="form-control" form="project-form" name="url" type="url" placeholder="URL" onChange={this.handleChange} value={this.state.url}/>
                    </div>
                    <div className="form-check">
                        <input id="active" className="form-check-input" form="project-form" name="active" type="checkbox" onChange={this.handleChange} checked={this.state.active}/>
                        <label className="form-check-label">Active</label>
                    </div>
                    
                    <div className="mt-3">
                        <button type="submit" value="Submit" className="btn btn-success mr-3">Submit</button>
                        { !this.state.projectIsNew && <DeleteButton id={this.state.projectID} createMessage={this.createMessage} formDone={this.formDone} assetType="project" /> }
                    </div>
                </form>
            </div>
        );
    }
}

export default ProjectForm;