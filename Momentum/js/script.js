import playList from './playList.js';

let timerDate = new Date().getDate();
let language = '';
let imgTag = '';
let bgSource = '';

let timer = document.querySelector('.time');
let dater = document.querySelector('.date');

setInterval(watchTime, 1000);
setInterval(watchDay, 1000);
setInterval(watchGreeting, 1000);

//clock
function watchTime() {

    let timerHour = new Date().getHours();
    let timerMinute = new Date().getMinutes();
    let timerSecond = new Date().getSeconds();
    
    if (timerHour < 10) {timerHour = '0' + timerHour};
    if (timerMinute < 10) {timerMinute = '0' + timerMinute};
    if (timerSecond < 10) {timerSecond = '0' + timerSecond};
        
    let currentTime = timerHour + ':' + timerMinute + ':' + timerSecond;
    
    timer.innerHTML = currentTime;
}

function watchDay() {

    let Days = [];
    let Month = [];
    if(language == 'en') { 
        Days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
        };
    if(language == 'ru') { 
        Days = ['Восресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
        Month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];
    };
    let timerDay = new Date().getDay();
    let timerMonth = new Date().getMonth();
        
    let currentDay = Days[timerDay] + ', ' + Month[timerMonth] + ' ' + timerDate;
    dater.innerHTML = currentDay;
}

//Greetings
let greeter = document.querySelector('.greeting');
let userName = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('lang', language);
  localStorage.setItem('bg', bgSource);
  localStorage.setItem('imgTag', imgTag);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) { userName.value = localStorage.getItem('name'); }
    if (localStorage.getItem('lang')) { language = localStorage.getItem('lang'); }
    if (localStorage.getItem('lang') === '') { language = 'en'}
    if (localStorage.getItem('city')) { city.value = localStorage.getItem('city'); }
    if (localStorage.getItem('bg')) { bgSource = localStorage.getItem('bg'); }
    if (localStorage.getItem('bg') === '') { bgSource = 'GitHub'}
    if (localStorage.getItem('imgTag')) { imgTag = localStorage.getItem('imgTag'); }
    if (localStorage.getItem('imgTag') === "") { imgTag = 'nature';}
    if (bgSource === 'GitHub') {imageTag.classList.add('hideTag');}
    
    if (language === 'en') {
        userName.placeholder='Your Name';
        city.placeholder='Your City';
        todoHead.textContent='ToDo List';
        todoAdd.textContent='Add';
        settingsHead.textContent='Settings';
        todoInput.placeholder='Enter activity';
        tongue.textContent='Language: eng';
        if (localStorage.getItem('city') == '') { city.value = 'Minsk'}
        if (localStorage.getItem('city') == 'Минск') { city.value = 'Minsk'}
        if (imgTag === 'film') { 
            imageTag.textContent ='    Tag: Films'
        } else {
            imageTag.textContent ='    TagNature'
        }
    }
    if (language === 'ru') {
        userName.placeholder='Ваше имя';
        city.placeholder='Ваш город';
        todoHead.textContent='Список дел';
        todoAdd.textContent='Доб.';
        settingsHead.textContent='Настройки';
        todoInput.placeholder='Новое дело';
        tongue.textContent='Язык: русский';
        if (localStorage.getItem('city') == '') { city.value = 'Минск';}
        if (localStorage.getItem('city') == 'Minsk') { city.value = 'Минск'}
        if (imgTag === 'film') { 
            imageTag.textContent ='    Тема: фильмы'
        } else {
            imageTag.textContent ='    Тема: природа'
        }
    }

    trackProgress.textContent = '0:00 / 0:00'
    imgText();
    getWeather();
    getQuotes();
    watchTime();
    watchDay();
    watchGreeting();
    setBg();
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', langSetup);

function watchGreeting() {
    let timerHour = new Date().getHours();
    let greet = '';
    let currentGreeting = '';

    if (language == 'en') {
        if (timerHour < 18) {greet = 'Afternoon,'}
            if (timerHour < 12) {greet = 'Morning,'}
                if (timerHour < 6) {greet = 'Night,'}
                    else {greet = 'Evening,'}
        currentGreeting = 'Good ' + greet;
            }
    if (language == 'ru') {
        if (timerHour < 18) {greet = 'ый день,'}
            if (timerHour < 12) {greet = 'ое утро,'}
                if (timerHour < 6) {greet = 'ой ночи,'}
                    else {greet = 'ый вечер,'}
        currentGreeting = 'Добр' + greet;
    }
    greeter.textContent = currentGreeting;
}

//weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
let city = document.querySelector('.city');

async function getWeather() { 
    let url = ``;
    if (language == 'en') {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a930528912396a5ecf6b0001ff49f152&units=metric`;
    }
    if (language == 'ru') {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=a930528912396a5ecf6b0001ff49f152&units=metric`;
    }

    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    
    temperature.textContent = Math.round(`${data.main.temp}`) + '°C';
    weatherDescription.textContent = data.weather[0].description;
    if (language == 'en') {
        wind.textContent = 'Wind speed: ' + Math.round(`${data.wind.speed}`) + ' m/s';
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
    if (language == 'ru') {
        wind.textContent = 'Скорость ветра: ' + Math.round(`${data.wind.speed}`) + ' м/с';
        humidity.textContent = `Влажность: ${data.main.humidity}%`;
        }
    }
window.addEventListener('change', getWeather)


//quotes
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteChanger = document.querySelector('.change-quote');

async function getQuotes() {  
    let quotes = '';
    if (language == 'en') {
        quotes = '../js/quotesEn.json';
    }
    if (language == 'ru') {
        quotes = '../js/quotesRu.json';
    }

    const res = await fetch(quotes);
    const data = await res.json();

    let i = Math.floor(Math.random() * (data.length-1)) + 1;
    
    quote.textContent = `${data[i].quoteText}`;
    author.textContent = `${data[i].quoteAuthor}`;
}

quoteChanger.addEventListener('click', getQuotes);


//imageSlider
let body = document.querySelector('body');
let slideNext = document.querySelector('.slide-next');
let slidePrev = document.querySelector('.slide-prev');
let randomNum  = getRandomNum(20);

function getRandomNum(x) {
    return (Math.floor(Math.random() * x) + 1)
}

function setBg() {

    if (bgSource == 'GitHub') {
        let timerHour = new Date().getHours();
        let link = ''
        const img = new Image();
        let bgNum = randomNum.toString()
        if (bgNum < 10) { bgNum = '0' + bgNum};

        let timeOfDay = ''
        if (timerHour < 18) {timeOfDay = 'afternoon'}
            if (timerHour < 12) {timeOfDay = 'morning'}
                if (timerHour < 6) {timeOfDay = 'night'}
                    else {timeOfDay = 'evening'}

        link = 'url(' + `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg` + ')';
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`; 

        img.onload = () => {      
            body.style.backgroundImage = link;
          }; 
          return
    }

    if (bgSource == 'Unsplash') {
        unsplashImg()
        return
    }

    if (bgSource == 'Flickr') {
        FlickrImg()
        return
    }
}

async function unsplashImg() { 
    let link = ''
    const img = new Image();
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${imgTag}&client_id=pFDs4nnBG3bNHg8oPFhe2wBy3uaqH3F-FBKzQEqcRA4`;
    const res = await fetch(url);
    const data = await res.json();
    link = data.urls.regular;
    img.src = link;
    link = 'url(' + link + ')';
    img.onload = () => {      
        body.style.backgroundImage = link;
      }; 
}

async function FlickrImg() { 
    let link = ''
    const img = new Image();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=085fb19ab395b39f6cdf4866a393374e&tags=${imgTag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    let i = getRandomNum(data.photos.photo.length)
    link = data.photos.photo[i].url_l;
    img.src = link;
    link = 'url(' + link + ')';
    img.onload = () => {      
        body.style.backgroundImage = link;
      }; 
}

function getSlideNext() {
    if (randomNum < 20) {
        randomNum++;
    }
    else {
        randomNum=1;
    }
    setBg();
}

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum--;
    }
    else {
        randomNum=20;
    }
    setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


//audioPlayer
let isPlay = false;
let isMute = false;
let playNum = 0;
const button = document.querySelector('.play');
const playNextTrack = document.querySelector('.play-next');
const playPrevTrack = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const trackName = document.querySelector('.trackName');
const volumeButton = document.querySelector('.muteButton')
let trackProgress = document.querySelector('.trackProgress');
let audioProgressBar = document.querySelector('.audioProgressBar');
const audioProgressBarBg = document.querySelector('.audioProgressBarBg');
let volumeBar = document.querySelector('.volumeProgressBar');
let customVolume = document.querySelector('.volumeProgressBarBg');
const volumeWidth = window.getComputedStyle(customVolume).width;
const audioWidth = window.getComputedStyle(audioProgressBarBg).width;
let vol = .30;
volumeBar.style.width = vol * 100 + '%';

let audioPauseTime = 0;
let trackLength = '';
const audio = new Audio();
audio.currentTime = 0;

let li = [];

for (let i = 0; i < playList.length; i++) {
    li[i] = document.createElement('li');
    li[i].classList.add('playItem');
    li[i].classList.add('inactive');
    playListContainer.append(li[i]);
    li[i].textContent = playList[i].title;
    }

function toggleBtn() {
    button.classList.toggle('pause');
}

function playAudio() {
    if (isPlay === true) {
        audioPauseTime = audio.currentTime;
        audio.pause();
        isPlay = false;
    } else {
        audio.src = playList[playNum].src;
        audio.currentTime = audioPauseTime;

        li[playNum].classList.remove('inactive');
        li[playNum].classList.add('active');
        audio.play();
        
        isPlay = true;
        trackLength = playList[playNum].duration;
        trackProgress.textContent = '0:00 / ' + minSec(trackLength)     ;
        setInterval (audioBar, 1000);
        trackName.textContent = playList[playNum].title;
    }
}

function minSec(time) {
    if (time <= 9) {
        return time = '0:0' + Math.round(time)
    }
    if (time < 60) {
        return time = '0:' + Math.round(time)
    } else {
        if (Math.round(time % 60) < 10) {
            return time = Math.floor(time / 60) +':0' + Math.round(time % 60)
        } else {
            return time = Math.floor(time / 60) +':' + Math.round(time % 60)
        }
    }
}

function mute() {
    if (isMute === true) {
        audio.volume = vol;
        volumeButton.classList.remove('off');
        volumeButton.classList.add('on');
        isMute = false;
        volumeBar.style.width = 100 * audio.volume + '%'
        return
    }
    if (isMute === false) {
        audio.volume = 0;
        volumeButton.classList.remove('on');
        volumeButton.classList.add('off');
        isMute = true
        volumeBar.style.width = 100 * audio.volume + '%'
        return
    }
}

function volumeSetting(point) {
    vol = point.offsetX / parseInt(volumeWidth);
    audio.volume = vol;
    volumeBar.style.width = vol * 100 + '%';
    if (isMute === true) {
        mute();
    }
}

function audioProgressSetting(point) {
    let current = point.offsetX / parseInt(audioWidth);
    audio.currentTime = current * trackLength;
    audioBar();
}

function audioBar() {
    let trackTime = audio.currentTime;
    if (trackTime >= trackLength) {
        playNext();
        return
    }
    audioProgressBar.style.width = 100 * trackTime/ trackLength  + '%';
    trackProgress.textContent = minSec(trackTime) + ' / ' + minSec(trackLength);
}

function playNext() {
    if (isPlay === false) {
        toggleBtn();
    }
    if (playNum < playList.length-1) {
        li[playNum].classList.remove('active');
        li[playNum].classList.add('inactive');
        playNum++;
    }
    else {
        li[playNum].classList.remove('active');
        li[playNum].classList.add('inactive');
        playNum = 0;
    }
    audio.currentTime = 0;
    audioPauseTime = 0;
    isPlay = false;
    playAudio();
}

function playPrev() {
    if (isPlay === false) {
        toggleBtn();
    }
    if (playNum > 0) {
        li[playNum].classList.remove('active');
        li[playNum].classList.add('inactive');
        playNum--;
    }
    else {
        li[playNum].classList.remove('active');
        li[playNum].classList.add('inactive');
        playNum = playList.length-1;
    }
    audio.currentTime = 0;
    audioPauseTime = 0;
    playAudio();
}

function clickAudio(elem) {
    if (li.indexOf(elem.target) === playNum) {
        toggleBtn();
        playAudio();
        return
    } else {

        li[playNum].classList.remove('active');
        li[playNum].classList.add('inactive');
        playNum = li.indexOf(elem.target);
        audio.currentTime = 0;
        audioPauseTime = 0;
        if (isPlay === false) {
            toggleBtn();
        }
        if (isPlay === true) {
            isPlay = false
        }
        playAudio();
    }
}

playListContainer.addEventListener('click', clickAudio)
audioProgressBarBg.addEventListener('click', audioProgressSetting);
customVolume.addEventListener('click', volumeSetting);
volumeButton.addEventListener('click', mute);
button.addEventListener('click', playAudio);
button.addEventListener('click', toggleBtn);
playNextTrack.addEventListener('click', playNext);
playPrevTrack.addEventListener('click', playPrev);

//language changer 
const tongue = document.querySelector('.language');

function changeLanguage() {
    if (language == 'en') {
        language = 'ru';
        userName.placeholder='Ваше имя';
        city.placeholder='Ваш город';
        todoHead.textContent='Список дел'
        todoInput.placeholder='Новое дело'
        todoAdd.textContent='Доб.';
        settingsHead.textContent='Настройки';
        tongue.textContent='Язык: русский';
        settingImage.textContent='Источник фона: ' + bgSource;
        if (imgTag === 'film') { 
            imageTag.textContent ='    Тема: фильмы'
        } else {
            imageTag.textContent ='    Тема: природа'
        }
        }
    else  {
        language = 'en'
        userName.placeholder='Your Name';
        city.placeholder='Your City';
        todoHead.textContent='ToDo List'
        todoInput.placeholder='Enter activity'
        todoAdd.textContent='Add';
        settingsHead.textContent='Settings';
        tongue.textContent='Language: eng';
        settingImage.textContent='Backgroung source: ' + bgSource;
        if (imgTag === 'film') { 
            imageTag.textContent ='    Tag: Films'
        } else {
            imageTag.textContent ='    Tag: Nature'
        }
    }
    watchGreeting();
    getWeather();
    watchDay();
    getQuotes();
}

function langSetup() {
    if (language == 'en') {
        tongue.textContent='Language: eng' 
        return }
    if (language == 'ru') {
        tongue.textContent='Язык: русский'
        return}
}

tongue.addEventListener('click', changeLanguage);

//todo
const todoHead = document.querySelector('.todoHead');
const todoInput = document.querySelector('.todoInput');
const todoAdd = document.querySelector('.todoAdd');
const todoList = document.querySelector('.todoList');

function createActivity() {
    let act = document.createElement('li');
    todoList.append(act);
    act.classList.add('todoActivity');
    act.textContent = todoInput.value;
}

function removeActivity(elem) {
    let currentElem = elem.target;
    if (currentElem.classList.contains('done')) {
        currentElem.remove();
    } else {
        currentElem.classList.add('done')
    }
}

todoAdd.addEventListener('click', createActivity);
todoList.addEventListener('click', removeActivity);

//settings
const settingsHead = document.querySelector('.settingsHead');
const settingImage = document.querySelector('.image');
let imageTag = document.querySelector('.imageTag');

function changeImageSource() {
    if (bgSource === 'GitHub') {
        bgSource = 'Unsplash';
        imageTag.classList.remove('hideTag');
        imgText();
        setBg();
        return
    }
    if (bgSource === 'Unsplash') {
        bgSource = 'Flickr';
        imgText();
        setBg();
        return
    }
    if (bgSource === 'Flickr') {
        bgSource = 'GitHub';
        imageTag.classList.add('hideTag');
        imgText();
        setBg();
        return
    }
}

function imgText(){
    if (language === 'ru') { 
        settingImage.textContent='Источник фона: ' + bgSource;
        if (imgTag === 'film') { 
            imageTag.textContent ='Тема: фильмы'
        } else {
            imageTag.textContent ='Тема: природа'
        }
        return
    }
    if (language === 'en') { 
        settingImage.textContent='Backgroung source: ' + bgSource;
        if (imgTag === 'film') { 
            imageTag.textContent ='Tag: Films'
        } else {
            imageTag.textContent ='Tag: Nature'
        }
        return
    }
}

function changeImageTag() {
    if (imgTag === 'nature') {
        imgTag = 'film';
        if (language === 'en') { 
            imageTag.textContent = 'Tag: Films'
        } else {
            imageTag.textContent ='Тема: фильмы'
        }
        setBg();
        return
    } 
    if (imgTag === 'film') {
        imgTag = 'nature';
        if (language === 'en') { 
            imageTag.textContent = 'Tag: Nature'
        } else {
            imageTag.textContent ='Тема: природа'
        }
        setBg();
        return
    } 
}

settingImage.addEventListener('click', changeImageSource);
imageTag.addEventListener('click', changeImageTag);


















