import React from 'react';
import ReactMarkdown from 'react-markdown';
import { readFile } from 'fs'

interface MyState {
    text: string;
};

var fpath = "/Users/ntorba605/Documents/GitHub/nicktorba.com/frontend/src/posts/post1.md";

export class Posts extends React.Component<{}, MyState> {
    state = { text: "not set" };
    componentDidMount() {
        console.log("running fetch!")
        fetch('https://raw.githubusercontent.com/ntorba/writing/master/_posts/2020-07-17-seldon-super-series.md')
            .then(response => response.text())
            .then(text => {
                console.log(text);
                this.setState({ text: text });
            })
    };
    render() {
        return (
            <div className="posts" >
                <ReactMarkdown
                    source={this.state.text}
                    escapeHtml={true}
                />
            </div>
        )
    }
}


// fetch('/Users/ntorba605/Documents/GitHub/nicktorba.com/frontend/src/posts/post1.md')
//             .then(response => response.text())
//             .then(text => {
//                 console.log(text);
//                 this.setState({ text: text });
//             })


// readFile("https://raw.githubusercontent.com/ntorba/writing/master/_posts/2020-07-17-seldon-super-series.md", 'utf8', (err: any, data: any) => {
//     console.log(data)
//     // this.setState({ text: data.toString() });
// });

