const playButton = document.getElementById('button');
const audioElement = document.getElementById('audioElement');
const jokeText = document.getElementById('joke');
const jokeContainer = document.getElementById('joke-container');

// passing joke to voicerss api
function tellMe(joke) {
    // console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '022effb253754a36ad3dd11b5461b16b',
        src: joke,
        hl: 'en-us',
        v: 'Mary',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// GET jokes from API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,political,racist,sexist';
    try {
        const jokeRespone = await fetch(apiUrl);
        const data = await jokeRespone.json();
        // check if data contains 'setup'
        if ('setup' in data) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = `${data.joke}`;
        }


        jokeText.textContent = joke;
        // jokeContainer.style.display = 'block'; was needed before, now is unused

        // text-to-speech
        tellMe(joke);

        // disable button
        toggleButton();

    } catch (error) {
        console.log('as always,', error)
    }
}

// disable/enable button
function toggleButton() {
    playButton.disabled = !playButton.disabled;
}


console.log(VoiceRSS);

// event listeners
playButton.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
