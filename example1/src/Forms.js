import { getForms } from './getForms'
import React, { Component } from 'react'

export default class Forms extends Component {

    constructor(props) {
        super(props);
        this.state = { forms: [] }
        getForms().then(data => {this.setState({ forms: data }) })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.forms.map((form,index) => <li key={index}>{form}</li>)}
                </ul>
            </div>
        )
    }
}
