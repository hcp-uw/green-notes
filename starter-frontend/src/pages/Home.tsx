import React, { Component } from "react";
import smile from '../assets/smileLogo.png';
import { Link } from 'react-router-dom';


type HomeProps = {

};

type HomeState = {

};

export default class Home extends Component<HomeProps, HomeState> {
    
    constructor(props: HomeProps) {
        super(props);

        this.state = {};
    }


    render = (): JSX.Element => {
        return (
            <div className = "home">
                {this.renderSmileLogo()}
                {this.renderCenterText()}
            </div>
        );
    };


    // Returns the center text and start notes button
    renderCenterText = (): JSX.Element => {
        return (
            <div className = "centText">
                <div>
                    <pre className = "cText">{'Clean. Simple.\n'}<b>Code.</b></pre>
                    <Link to={`notes`} className = "start">//start notes</Link>
                </div>
            </div>
        )
    }

    

    // Renders the background smile logo
    renderSmileLogo = (): JSX.Element => {
        return (
            <img className="smile" src={smile} />        
        )
    };
    
}
