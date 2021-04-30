import React, { Component, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FlashMessage from './components/flash-messages';
import Main from './components/main';
// import ModelView from './components/model-view';
import SettingsForm from './components/form-settings';
import SkillForm from './components/form-skill';
import ProjectForm from './components/form-project';

interface StateMessage {
    id: Number,
    type: 'success' | 'warning' | 'error',
    message: string
}

interface AppState {
    messages: Array<StateMessage>
}

interface Message {
    type: 'success' | 'warning' | 'error',
    message: string
}

class App extends Component<any, AppState, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: []
        }
    }

    createMessage = (message: Message) => {
        console.log(`Function called: 'createMessage()'`);
        let messagesArray = this.state.messages;

        let id = Date.now();
        let newMessage: StateMessage = {
            id: id,
            type: message.type,
            message: message.message
        }

        console.log(`Creating Message: ${JSON.stringify(newMessage)}`);
        messagesArray.push(newMessage);

        this.setState({ messages: messagesArray });
    }

    deleteMessage = (id: number) => {
        console.log(`Function called: 'deleteMessage()'`);
        let messagesArray = this.state.messages;
        let deletedMessageIndex;
        messagesArray.map((messageObject, i) => {
            if (messageObject.id == id) {
                deletedMessageIndex = i
                messagesArray.splice(deletedMessageIndex, 1);
                console.log(`Deleting message at index ${deletedMessageIndex} from Array ${JSON.stringify(messagesArray)}`);
                this.setState({ messages: messagesArray });
            }
        });
        
    }

    render() {
        return (
            <div>
                <FlashMessage messages={this.state.messages} deleteMessage={this.deleteMessage}/>
                <Router>
                    <Route exact path='/admin' render={() => <Main createMessage={this.createMessage}/>}/>
                    <Route path='/admin/settings/new' render={(props) => <SettingsForm {...props} createMessage={this.createMessage}/>}/>
                    <Route path='/admin/settings/edit/:id' render={(props) => <SettingsForm {...props} createMessage={this.createMessage}/>}/>
                    <Route path='/admin/skill/new' render={(props) => <SkillForm {...props} createMessage={this.createMessage}/>}/>
                    <Route path='/admin/skill/edit/:id' render={(props) => <SkillForm {...props} createMessage={this.createMessage}/>}/>
                    <Route path='/admin/project/new' render={(props) => <ProjectForm {...props} createMessage={this.createMessage}/>}/>
                    <Route path='/admin/project/edit/:id' render={(props) => <ProjectForm {...props} createMessage={this.createMessage}/>}/>
                </Router>
            </div>
            
        );
    }
}

const app = document.getElementById('admin-app');
ReactDOM.render(<App />, app);
