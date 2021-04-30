import React, { Component } from "react";

class BioContent extends Component<any, any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2 className="bold mt0">Welcome</h2>
                <p className="bio-content">{this.props.bio}</p>
            </div>
        )
    }
}

export default BioContent;