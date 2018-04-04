import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Components
import Board from './Board';

// Styles
import style from "../styles/chess.scss";

// Font awesome
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeSolids from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(FontAwesomeSolids);

export default class Chess extends React.Component {

    constructor(props) {
        console.log('Chess constructor()', props);
        super(props);
    }

    render() {
        return (
            <div id="chess">
                <Board />
            </div>
        );
    }

}