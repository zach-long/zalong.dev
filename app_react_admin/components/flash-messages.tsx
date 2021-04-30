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
        let classes = this.props.type + ' ' + 'toast';
        return (
            <div key={this.props.id as unknown as string} id={this.props.id as unknown as string} className={classes} role="alert" aria-atomic="true">
                <div className="toast-header">
                    <strong className="mr-auto">{this.props.type}</strong>
                    <button type="button" className="ml-2 mb-1 close" onClick={this.deleteMessage}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    {this.props.message}
                </div>
            </div>
        )
    }
}

export default FlashMessage;