import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class Piece extends React.Component {

    constructor(props) {
        console.log('Piece constructor()', props);
        super(props);
        this.state = {
            move: ''
        };
        this.reset = null;
    }

    render() {
        console.log('Piece render()', this.props.type, this.state);
        let x = (this.props.position.x - 1) * 75;
        let y = (this.props.position.y - 1) * 75;
        let iconClasses = "icon " + this.state.move;

        return (
            <span style={{left: x, top: y}} className={`${this.props.type} piece`} draggable="true" onDragStart={(event) => { this.props.onDrag(event, this.props.type, this.validMove); }}>
                <FontAwesomeIcon icon={`chess-${this.props.type}`} className={iconClasses} />
            </span>
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('Piece getDerivedStateFromProps()', nextProps.type, nextProps.move, prevState.move);
        return { move: nextProps.move };
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Piece shouldComponentUpdate()', this.props.type);
        return (this.state.move === nextState.move) ? false : true;
    }

    componentDidUpdate() {
        console.log('Piece componentDidUpdate()', this.props.type, this.state);
        clearTimeout(this.reset);
        this.reset = setTimeout(() => {
            this.setState({ move: '' });
            clearTimeout(this.reset);
        }, 1000);
    }

    validMove(type, current, next) {
        var xDiff = Math.abs(current.x - next.x);
        var yDiff = Math.abs(current.y - next.y);
        if (type === 'bishop') {
            return (xDiff === yDiff);
        }
        if (type === 'knight') {
            return (xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2);
        }
    }
}
