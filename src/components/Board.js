import React from 'react';

// Components
import Square from './Square';
import Piece from './Piece';

export default class Board extends React.Component {

    constructor(props) {
        console.log('Board constructor()', props);
        super(props);
        this.state = {
            bishop: { x: 1, y: 1, move: '' },
            knight: { x: 8, y: 8, move: '' }
        };
        this.onDrop = this.onDrop.bind(this);
    }

    render() {
        console.log('Board render()', this.state);
        let i = 1;
        let squares = [];
        while (i <= 64) {
            let x = (i % 8 === 0) ? 8 : i % 8;
            let y = Math.ceil(i / 8);
            squares.push(<Square key={i} x={x} y={y} onDragOver={this.onDragOver} onDrop={this.onDrop} />);
            i++;
        }
        return (
            <div className="chess-board">
                {squares}
                <Piece type="bishop" position={this.state.bishop} onDrag={this.onDrag} move={this.state.bishop.move} />
                <Piece type="knight" position={this.state.knight} onDrag={this.onDrag} move={this.state.knight.move} />
            </div>
        );
    }

    isOccupied(position) {
        let bishopOccupied = (position.x === this.state.bishop.x && position.y === this.state.bishop.y);
        let knightOccupied = (position.x === this.state.knight.x && position.y === this.state.knight.y);
        return (bishopOccupied || knightOccupied);
    }

    onDrop(event, x, y) {
        event.preventDefault();
        let state = {
            bishop: { x: this.state.bishop.x, y: this.state.bishop.y, move: '' },
            knight: { x: this.state.knight.x, y: this.state.knight.y, move: '' }
        };
        let pieceType = event.dataTransfer.getData('piece');
        let validatorTxt = event.dataTransfer.getData('validator');
        let validator = new Function( 'return (' + validatorTxt + ')' )();

        let position = {
            x: parseInt(event.target.getAttribute('x')),
            y: parseInt(event.target.getAttribute('y'))
        };

        let isValidMove = validator(pieceType, this.state[pieceType], position);
        let isOccupied = this.isOccupied(position);

        if (isValidMove && !isOccupied) {
            position.move = 'success';
            state[pieceType] = position;
        } else {
            let obj = this.state[pieceType];
            obj.move = 'error';
            state[pieceType] = obj;
        }

        this.setState(state);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrag(event, pieceType, validator) {
        event.dataTransfer.setData('piece', pieceType);
        event.dataTransfer.setData('validator', validator);
    }
}
