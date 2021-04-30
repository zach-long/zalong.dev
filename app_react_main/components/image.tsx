import React, { Component } from "react";

interface ImageProps {
    imagePath: string,
    classNames?: string,
    height?: string,
    width?: string
}

class Image extends Component<ImageProps> {
    constructor(props: ImageProps) {
        super(props);
        this.state = {}
    }

    render() {
        return <img src={this.props.imagePath.substr(6, this.props.imagePath.length)} className={this.props.classNames} height={this.props.height} width={this.props.width}/>;
    }
}

export default Image;