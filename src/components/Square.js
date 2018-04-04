import React from 'react';

export default class Square extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span
                className="chess-square"
                onDrop={(e) => { this.props.onDrop(e, this.props.x, this.props.y); }}
                onDragOver={this.props.onDragOver}
                x={this.props.x}
                y={this.props.y}
            >
            </span>
        );
    }
}
