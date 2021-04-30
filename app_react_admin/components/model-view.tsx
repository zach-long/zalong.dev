import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type ModelProps = {
    model: string
}

class ModelView extends Component<ModelProps> {
    constructor(props: ModelProps) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <p>form to create new model item</p>
                <Link to='/admin'>Home</Link>
            </div>
        );
    }
}

export default ModelView;