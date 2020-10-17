import React, { useState } from 'react';
import { generate_songs, Song } from '../utils/generate_songs';

interface MyProps {
    // using `interface` is also ok
    message: string
};
interface MyState {
    songs: Array<Song>;
};

var songs = generate_songs();

export class SongTable extends React.Component<MyProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        songs: songs,
    };

    upVoteSong = (index: number) => {
        // TODO: LOOKUP LEGIT WAY TO UPDATE STATE... PROBABLY WITH HOOKS.. 
        const newCharacters = this.state.songs;
        newCharacters[index]["voteCount"] = newCharacters[index]["voteCount"] + 1;
        this.setState({
            songs: newCharacters
        });
    };

    render() {
        return (
            <div className="SongTable">
                <table className="table is-hoverable is-fullwidth is-striped">
                    <SongTableHeader />
                    <SongTableBody songData={songs} upVoteSong={this.upVoteSong} />
                </table>
            </div>
        )
    }

}

const SongTableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Vote Count</th>
                <th>ID</th>
                <th>Upvote Song</th>
            </tr>
        </thead>
    );
}

type SongTableBodyProps = {
    songData: Array<Song>,
    upVoteSong: any,
}

const SongTableBody = ({ songData, upVoteSong }: SongTableBodyProps) => {
    const rows = songData.sort((a, b) => b['voteCount'] - a['voteCount']).map((row, index) => {
        return (
            <TableItem
                key={row.id}
                index={index}
                id={row.id}
                songTitle={row.songTitle}
                artist={row.artist}
                voteCount={row.voteCount}
                upVoteSong={upVoteSong}
            />
        );
    });
    return <tbody>{rows}</tbody>;
};

type TableItemProps = {
    id: string;
    songTitle: String;
    artist: String;
    voteCount: number;
    index: number;
    upVoteSong: any;
}

const TableItem = ({ id, songTitle, artist, voteCount, index, upVoteSong }: TableItemProps) => {
    return (
        <tr key={id}>
            <td>{songTitle}</td>
            <td>{artist}</td>
            <td>{voteCount}</td>
            <td>{id}</td>
            <td>
                <button className="button is-small" onClick={() => upVoteSong(index, id)}>UpVote^</button>
            </td>
        </tr>
    )
}


