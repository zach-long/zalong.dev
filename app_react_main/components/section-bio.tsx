import React, { Component } from "react";

import BioContent from './content-bio';

class Bio extends Component<any, any, any> {
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
            <section id="bio">
                <div className="row justify-content-flex-start align-items-flex-start">
                    {/* <div className="profile-image-container mr3">
                        <Image imagePath="public/images/hermes_head.jpg" width="200px"/>
                    </div>
                    <div className="ml3"> */}
                    <BioContent bio={this.props.bio} />
                </div>
            </section>
        )
    }
}

export default Bio;