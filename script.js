// initializing the variables

let songs = [
    { name: "ElectroLight Symbolism Trap [NCS]", filepath: "songs/1.mp3", coverpath: "cover/img1.jpg" },
    { name: "Different Heaven Drumstep [NCS]", filepath: "songs/2.mp3", coverpath: "cover/img2.jpeg" },
    { name: "Disfigure Blank Melodic Dubstep [NCS]", filepath: "songs/3.mp3", coverpath: "cover/img3.jpeg" },
    { name: "ElectroLight Symbolism Trap [NCS]", filepath: "songs/4.mp3", coverpath: "cover/img4.jpeg" },
    { name: "Cartoon Why We Lose Trapp DnB [NCS]", filepath: "songs/5.mp3", coverpath: "cover/img5.jpeg" },
    { name: "Julius Dreisig Zeus Trap [NCS] ", filepath: "songs/6.mp3", coverpath: "cover/img6.jpeg" },
    { name: "Lost Sky Fearless ptII Trap [NCS] ", filepath: "songs/7.mp3", coverpath: "cover/img7.jpeg" },
    { name: "Spektrem Shine Progressive House [NCS] ", filepath: "songs/8.mp3", coverpath: "cover/img8.jpeg" },
    { name: "Unknown Brain Superhero Trap [NCS]", filepath: "songs/9.mp3", coverpath: "cover/img9.jpeg" },
    { name: "Warriyo Mortals  Trap [NCS] ", filepath: "songs/10.mp3", coverpath: "cover/img10.jpeg" }
];

// iterating the array in html 
let songboxes = Array.from(document.getElementsByClassName("songbox"));

for (let i = 0; i < songboxes.length; i++) {
    ImgElements = songboxes[i].getElementsByClassName("coverimg");
    spanElements = songboxes[i].getElementsByClassName("songname");

    ImgElements[0].src = songs[i].coverpath;
    spanElements[0].innerText = songs[i].name;
};


let playBtn = document.getElementById("playbtn");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let range = document.getElementById("range");
let audio = new Audio(songs[0].filepath);
let songIndex = 0;
let CurrentSong = document.getElementById("currentsong");
let songbox = Array.from(document.getElementsByClassName("songbox"));
let GifElements = Array.from(document.getElementsByClassName("rm"));
let AllSpan = Array.from(document.getElementsByClassName("songname"));



// Functionns


// Master Play (default play)

MasterPlay = () => {
    if (audio.paused) {
        audio.play();
        if (audio.src.includes(songs[0].filepath)) {
            let FirstSpan = document.getElementById("0");
            FirstSpan.style.color = "red";
            CurrentSong.innerText = songs[1].name;
        }
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    }
    else {
        audio.pause();
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    };
};

// Previous Button
PlayPrevious = () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    audio.src = songs[songIndex].filepath;
    audio.play();

    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");

    // Change Span Color and Playing Gif
    ChangeAllSpan(AllSpan);
    let getSpan = document.getElementById(`${songIndex}`);
    getSpan.style.color = "red";

    RemoveAll(GifElements);
    let getGif = document.getElementById(`${songIndex + 10}`);
    getGif.style.opacity = "1";

};

// Next Button
PlayNext = () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audio.src = songs[songIndex].filepath;
    audio.play();

    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");

    // Change Span Color and Playing Gif
    ChangeAllSpan(AllSpan);
    let getSpan = document.getElementById(`${songIndex}`);
    getSpan.style.color = "red";

    RemoveAll(GifElements);
    let getGif = document.getElementById(`${songIndex + 10}`);
    getGif.style.opacity = "1";

};


// Song Selection
SelectSongFunc = (element) => {
    element.addEventListener("click", () => {
        let playingGifClass = (element.children[2].className);
        let getGif = document.getElementsByClassName(`${playingGifClass}`)[0];
        let spanId = element.children[1].children[0].id;
        let getSpan = document.getElementById(`${spanId}`);

        // Getting Song Index
        songIndex = parseInt(spanId);

        // Show the Playing Gif
        RemoveAll(GifElements);
        getGif.style.opacity = "1";

        // Change Span Color
        ChangeAllSpan(AllSpan);
        getSpan.style.color = "red"

        // Change Audio and Play
        audio.src = songs[songIndex].filepath;
        audio.play();
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    });
};

// Seeking Song 
AudioSeek = () => {
    audio.currentTime = (range.value * audio.duration) / 100;
    if (range.value >= 100) {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    };
};

// Updating Seekbar
SeekBarUpdate = () => {
    progress = parseInt((audio.currentTime / audio.duration) * 100);
    range.value = progress;
    if (range.value >= 100) {
        PlayNext();
    };
};

// Extra Functions

let RemoveAll = (GifElements) => {
    GifElements.forEach(element => {
        element.style.opacity = "0";
    });
};
let ChangeAllSpan = (AllSpan) => {
    AllSpan.forEach(element => {
        element.style += element.style.color = "white"
    });
};



//  Play/Pause Handle

audio.addEventListener('play', function () {
    main.style.border = ".1rem solid red";
    let getGif = document.getElementById(`${songIndex + 10}`);
    getGif.style.opacity = "1";
    CurrentSong.innerText = songs[`${songIndex}`].name;
});

audio.addEventListener('pause', function () {
    main.style.border = ".1rem solid white";
    RemoveAll(GifElements);
});

window.addEventListener("keypress", (event) => {
    if (event.charCode === 32) {
        MasterPlay();
    };
});


// Listening to Events

// Master Play
playBtn.addEventListener("click", () => MasterPlay());
// Updating Seekbar
audio.addEventListener("timeupdate", () => SeekBarUpdate());
// Seeking Song 
range.addEventListener("change", () => AudioSeek());
// Previous Button
previous.addEventListener("click", () => PlayPrevious());
// Next Button
next.addEventListener("click", () => PlayNext());
// Song Selection
songbox.forEach(e => SelectSongFunc(e))

// Play With Space bar

// Done

// time 

const time = new Date();
document.getElementById("copy").innerText = `\xa9 RJ Software & co. ${time.getFullYear()}`;
// Done
