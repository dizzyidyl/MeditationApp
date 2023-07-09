const app = () => {
    const sound = document.querySelector(".sound");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time Display
    const timeDisplay = document.querySelector(".time-display");
    //Selecting timer
    const timeSelect = document.querySelectorAll(".time-select button");
    //Get length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //Duration
    let fakeDuration = 1800;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Picking different sounds
    sounds.forEach(effect =>{
        effect.addEventListener("click", function(){
            sound.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(sound);
        });

    });

    //Playing Sounds
    play.addEventListener('click', () => {
        //const audio = document.querySelector('.sound')
        //audio.play();
        checkPlaying(sound);
    });

    //Select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60
                )}`
        });
    });

    //function specific to play and pause the sound effects
    const checkPlaying = sound => {
        if (sound.paused) {
            sound.play();
            video.play();
            play.src = "./images/pause.png";
        }
        else
        {
            sound.pause();
            video.pause();
            play.src = "./images/play.png";
        }
    };

    //Animating the circle
    sound.ontimeupdate = () => {
        let currentTime = sound.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate text
        timeDisplay.textContent = `${minutes}:${seconds}`;
    
        if (currentTime >= fakeDuration){
            sound.pause();
            sound.currentTime = 0;
            play.src = "./images/play.png";
            video.pause();
        }
    };

    
}; 


app();