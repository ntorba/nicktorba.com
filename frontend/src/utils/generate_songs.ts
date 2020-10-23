
export function generate_songs() {
    var songs = [];
    var i;
    var title = "song_title";
    var artist = "artist";
    for (i = 0; i < 3; i++) {
        var i_title = title + i.toString()
        var i_artist = artist + i.toString()
        var i_voteCount = getRandomIntInclusive(0, 10);
        const i_song: Song = {
            songTitle: i_title,
            artist: i_artist,
            voteCount: i_voteCount,
            id: "id-" + i.toString()
        }
        songs.push(i_song);
    }
    return songs;
}

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

export interface Song {
    songTitle: string;
    artist: string;
    voteCount: number;
    id: string;
}


