import React, { Component, SyntheticEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface DeleteButtonProps {
    id: string | undefined,
    createMessage: Function,
    formDone: Function,
    assetType: string
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class DeleteButton extends Component<DeleteButtonProps, any, any> {
    state: any;
    fileInput: any;

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    createMessage = (message: Message) => {
        this.props.createMessage(message);
    }

    handleDelete = () => {
        console.log(`Delete triggered, making POST request to '/${this.props.assetType}/delete/${this.props.id}'`)
        axios({
            method: 'post',
            url: `/${this.props.assetType}/delete/${this.props.id}`
        }).then((response: AxiosResponse) => {
            this.createMessage({ type: 'success', message: `Success` });
            this.props.formDone();
            console.log(response);
            console.log(response.data);
        }).catch((error: AxiosResponse) => {
            this.createMessage({ type: 'error', message: `Error making POST request: ${error}` });
            console.log(error);
        });
    }

    render() {
        return (
            <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
        );
    }
}

export default DeleteButton;