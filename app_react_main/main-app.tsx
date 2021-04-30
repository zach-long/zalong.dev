import React, { Component, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';

import FlashMessage from './components/flash-messages';
import IndexView from './components/view-index';
import ProjectView from './components/view-project';

interface StateMessage {
    id: Number,
    type: 'success' | 'warning' | 'error',
    message: string
}

interface AppState {
    settingsLoaded: boolean,
    messages: Array<StateMessage>,
    settings: Array<Setting>
}

interface Setting {
    _id: string,
    siteHeader: string,
    bio: string
    siteFooter: string,
    active: boolean
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class App extends Component<any, AppState, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            settingsLoaded: false,
            messages: [],
            settings: []
        }
    }

    createMessage = (message: Message) => {
        // console.log(`Function called: 'createMessage()'`);
        let messagesArray = this.state.messages;

        let id = Date.now();
        let newMessage: StateMessage = {
            id: id,
            type: message.type,
            message: message.message
        }

        // console.log(`Creating Message: ${JSON.stringify(newMessage)}`);
        messagesArray.push(newMessage);

        this.setState({ messages: messagesArray });
    }

    deleteMessage = (id: number) => {
        // console.log(`Function called: 'deleteMessage()'`);
        let messagesArray = this.state.messages;
        let deletedMessageIndex;
        messagesArray.map((messageObject, i) => {
            if (messageObject.id == id) {
                deletedMessageIndex = i
                messagesArray.splice(deletedMessageIndex, 1);
                // console.log(`Deleting message at index ${deletedMessageIndex} from Array ${JSON.stringify(messagesArray)}`);
                this.setState({ messages: messagesArray });
            }
        });
        
    }

    componentDidMount() {
        const getURL = `/settings/all/active`;

        axios({
            method: 'get',
            url: getURL
        }).then((response: AxiosResponse) => {
            this.setState({
                settingsLoaded: true,
                settings: response.data
            });
        }).catch((error: AxiosError) => {
            this.props.createMessage({ type: 'error', message: `Unable to fetch Settings.` });
            // console.log(error);
        });
    }

    render() {
        let siteHeader = this.state.settings[0] != undefined ? this.state.settings[0].siteHeader : '';
        let bio = this.state.settings[0] != undefined ? this.state.settings[0].bio : '';
        let siteFooter = this.state.settings[0] != undefined ? this.state.settings[0].siteFooter : '';

        return (
            <main>
                <header id="frame">
                    <aside id="sidebar">
                        <div id="intersect-box"></div>
                    </aside>
                    <div id="topbar">
                        <div>
                            <h1 className="m0">{siteHeader}</h1>
                        </div>
                    </div>
                </header>
                <FlashMessage messages={this.state.messages} deleteMessage={this.deleteMessage}/>
                <IndexView createMessage={this.createMessage} bio={bio} />
                <footer id="footer" className="column justify-content-center align-items-center pt1 pb1">
                    <h4 className="mt0 mb0">{siteFooter}</h4>
                </footer>
            </main>
            
        );
    }
}

const app = document.getElementById('main-app');
ReactDOM.render(<App/>, app);
