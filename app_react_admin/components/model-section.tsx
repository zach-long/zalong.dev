import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface ModelProps {
    model: string,
    createMessage: Function
}

interface ModelState {
    isLoading: boolean
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class ModelSection extends Component<ModelProps, any, any> {
    constructor(props: ModelProps) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/project/all'
        }).then((response: AxiosResponse) => {
            this.createMessage({ type: 'success', message: `GOT PROJECTS! see log` });
            console.log(response);
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
            <section id={`${this.props.model}-container`} className="container">
                <p>settings section for {this.props.model}</p>
                {/* get request to settings */}
                {this.props.model != 'settings' &&
                    <Link to={`/admin/project/new`}>+</Link>
                }
            </section>
        );
    }
}

export default ModelSection;