import React, { Component, SyntheticEvent } from 'react';

interface FlashMessageProps {
    messages: Array<StateMessage>
    deleteMessage: Function
}

interface StateMessage {
    id: Number,
    type: string,
    message: string
}

interface FlashMessageItemProps extends StateMessage {
    deleteMessage: Function
}

class FlashMessage extends Component<FlashMessageProps, any, any> {
    constructor(props: FlashMessageProps) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        
    }

    parseMessages = async (messageProps: Array<StateMessage>) => {
        return messageProps.map((messageObject) => {
            return (
                <FlashMessageItem id={messageObject.id} type={messageObject.type} message={messageObject.message} deleteMessage={this.props.deleteMessage}/>
            )
        });
    }

    render() {
        return (
            <div id="notifications">
                {this.props.messages.map((messageObject) => <FlashMessageItem id={messageObject.id} type={messageObject.type} message={messageObject.message} deleteMessage={this.props.deleteMessage}/>
                )}
            </div>
        );
    }
}

class FlashMessageItem extends Component<FlashMessageItemProps, any, any> {
    constructor(props: FlashMessageItemProps) {
        super(props);
        this.state = {}
    }

    deleteMessage = (event: SyntheticEvent) => {
        event.preventDefault();
        this.props.deleteMessage(this.props.id);
    }

    render() {
        return (
            <div key={this.props.id as unknown as string} id={this.props.id as unknown as string} className={this.props.type}>
                {this.props.message}
                <button onClick={this.deleteMessage}>x</button>
            </div>
        )
    }
}

export default FlashMessage;