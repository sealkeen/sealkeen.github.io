import urls from './../api.js'
import Debug from '../Extensions/cs-debug.js';
import LocalizationService from './../Services/Localization/localization-service.js';

const lS = LocalizationService.getInstance();

// color-handlers.js 
const imageDiv = '.background-image-div'
const classNames = 'background-image-div gradient-'
function setGradientEarlyMidnightBackground() { setCertainImage( 'early-midnight');}
function setGradientMediumMidnightBackground() { setCertainImage('medium-midnight'); }
function setGradientLateMidnightBackground() { setCertainImage('late-midnight'); }
function setGradientEarlyMorningBackground() { setCertainImage('early-morning'); }
function setGradientLateMorningBackground() { setCertainImage('late-morning'); }
function setGradientDaylightBackground() { setCertainImage('daylight'); }
function setGradientEarlyAfternoonBackground() { setCertainImage('early-afternoon'); }
function setGradientLateAfternoonBackground() { setCertainImage('late-afternoon'); }
function setGradientEarlyEveningBackground() { setCertainImage('early-evening'); }
function setGradientLateEveningBackground() { setCertainImage('late-evening'); }

function setCertainImage(name)
{
    $(imageDiv)[0].className = (classNames + name); console.log(classNames + name);
}

export async function setBackgroundOpacityInterval()
{
    let elts = document.getElementsByClassName('background-image-div');
    if(elts != null && elts[0] != null)
    {
        console.log('[INF] Transform-Increase opacity ...')
        elts[0].style.opacity = 1
    } 
}

function customSleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

export function onClickBodyBackground() {
    const bodyClass = $(imageDiv)[0].className;
    let el = document.getElementsByClassName('background-image-div')[0]
    el.style.opacity = 0;
    switch (bodyClass) {
        case classNames + 'late-evening':
            setGradientEarlyMidnightBackground(); break;
        case classNames + 'early-midnight':
            setGradientMediumMidnightBackground(); break;
        case classNames + 'medium-midnight':
            setGradientLateMidnightBackground(); break;
        case classNames + 'late-midnight':
            setGradientEarlyMorningBackground(); break;
        case classNames + 'early-morning':
            setGradientLateMorningBackground(); break;
        case classNames + 'late-morning':
            setGradientDaylightBackground(); break;
        case classNames + 'daylight':
            setGradientEarlyAfternoonBackground(); break;
        case classNames + 'early-afternoon':
            setGradientLateAfternoonBackground(); break;
        case classNames + 'late-afternoon':
            setGradientEarlyEveningBackground(); break;
        case classNames + 'early-evening':
            setGradientLateEveningBackground(); break;
        default:
        break;
    }
    setTimeout(() => {
        el.style.opacity = 1;
    }, (2500)); 
}

export function toggleBodyBackground() {
    setBackgroundOpacityInterval();

    window.toggleBodyBackground = toggleBodyBackground;
    
    const hours = new Date().getHours();
    let greetingKey = '';
    if (hours >= 22 || hours <= 7) {
        setGradientEarlyMidnightBackground();
        greetingKey = 'greeting_midnight';
    } else if (hours > 7 && hours < 11) {
        setGradientLateMorningBackground();
        greetingKey = 'greeting_morning';
    } else if (hours >= 11 && hours <= 13) {
        setGradientDaylightBackground();
        greetingKey = 'greeting_day';
    } else if (hours > 13 && hours < 16) {
        setGradientEarlyAfternoonBackground();
        greetingKey = 'greeting_early_afternoon';
    } else if (hours >= 16 && hours <= 18) {
        setGradientLateAfternoonBackground();
        greetingKey = 'greeting_late_afternoon';
    } else if (hours > 18 && hours < 20) {
        setGradientEarlyEveningBackground();
        greetingKey = 'greeting_early_evening';
    } else if (hours >= 20 && hours < 22) {
        setGradientLateEveningBackground();
        greetingKey = 'greeting_late_evening';
    }
    
    window.translateGreetings(greetingKey);
}

function noOp() { Debug.WriteLine('no-op') }

export function toggleTopPageBackground(on)
{
    if (on)
    {   
        try {
            document.getElementById("top-page-container").style.opacity = 1;
            document.getElementById("top-page-container").style.backgroundRepeat= 'no-repeat';
            document.getElementById("top-page-container").style.backgroundPosition = 'center top';
            document.getElementById("top-page-container").style.backgroundSize= '50rem 38rem';
            let hostRoot =  urls.isGithub() ? `../${urls.getPostfix()}` : `${urls.getLocation()}`;
            hostRoot = urls.isNodeJSHost() ? urls.getHostRootPath() : hostRoot;

            document.getElementById("top-page-container").style.backgroundImage = `url(${hostRoot}Images/WebPack/loading-transparent.gif)`;
        } finally {
            document.getElementsByClassName("container")[0].style.opacity = 0;
        }
    } else {
        try {
            document.getElementById("top-page-container").style.backgroundRepeat= 'no-repeat';
            document.getElementById("top-page-container").style.backgroundPosition = 'center center';
            document.getElementById("top-page-container").style.backgroundSize= '0rem 0rem';
        } finally {
            document.getElementById("top-page-container").style.opacity = 0;
            document.getElementsByClassName("container")[0].style.opacity = 1;
        }
    }
}