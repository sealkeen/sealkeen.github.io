﻿import { setSidebarInputVolumeOnChange } from './Utils/Audio.js'
import urls from './api.js'
import { newQueue, _trackQueue, peekObjectsArtistsAndTitles } from './Utils/Queue.js';
import { isEmpty, containsClasses, getIdFromElementData, getWebEntityObject, 
    displayQueuedTracks, sleep, safePlay, safeSwitchTrack, GetCurrentCompositionsId } from './utilities.js';
import { transitionEnd } from './StyleHandlers/footer-handlers.js';
import colorHandlers, { toggleTopPageBackground } from './StyleHandlers/color-handlers.js'
import { closeNav, openNav } from './StyleHandlers/side-nav-handlers.js'
import { checkInputs } from './signup.js'
import { onAjaxLoadError, onAjaxSwitchPageError } from './Errors/ajax-errors.js'
import { setCurrentPageIndex, setCurrentPageManageAccount, setCurrentPageSignUp, setCurrentPageArtists, setCurrentPageCompositionByArtistID, setCurrentPageMockData, 
setCurrentPageCompositions, setCurrentPageAlbums, setCurrentPageGenres, setCurrentPageCompositionByID, setCurrentPageAlbumByID, setCurrentPageRegister, setCurrentPageLogin } 
from './Router/click-handlers.js'
import { setTitleByArtistAndTitle, setArtistSongNameAsync } from './Page/event-handlers.js'
import { getNext } from './Store/mock-data.js';

document.addEventListener('transitionend', function() { transitionEnd() });
document.querySelector('#navbar-logo-title')?.addEventListener('click', setCurrentPageIndex);
document.querySelector('#nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
document.querySelector('#nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
document.querySelector('#nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
document.querySelector('#nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
document.querySelector('#nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
document.querySelector('#nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
document.querySelector('#nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
document.querySelector('#nav-lnk-background')?.addEventListener('click', colorHandlers.toggleBodyBackground);

document.querySelector('.nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
document.querySelector('.nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
document.querySelector('.nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
document.querySelector('.nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
document.querySelector('.nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
document.querySelector('.nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
document.querySelector('.nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
document.querySelector('.nav-lnk-background')?.addEventListener('click', colorHandlers.toggleBodyBackground);

const loc = urls.getLocation();

$(document).ready(function () {
    bindPlayerButtons();
    toggleTopPageBackground(false);
    //addButtonOnClickHandlers();
    _trackQueue.onchange = () => {
        displayQueuedTracks(_trackQueue);
    };
    const container = document.querySelector('.body');

    container.onmousedown = () => {
        if (!containsClasses('ctxmenu', 'ctxmenu-button')) {
            $('#ctxmenu').innerHTML = '';
        }
    }

    container.addEventListener('click', function (e) {
        // But only alert for elements that have an alert-button class
        //if (containsClasses(e.target, 'card-body', 'card-text', 'card-title', 'card-body-composition')) {
        let target = e.target;
        if (containsClasses(target, 'card-text', 'card-title')) {
            target = e.target.parentNode;
        }
        if (target.classList.contains('card-body-composition')) {
            setFooterPlayerSourse(e.target)
            if (e.which === 3) {/* Right Mouse Click */
                //onCompositionRightMouseDown(); 
            }
        }
        if (target.classList.contains('album-card-div')) {
            setCurrentPageCompositionByID(e.target);
        }
        if (target.classList.contains('genre-card-div')) {
            setCurrentPageAlbumByID(e.target);
        }
        if (target.classList.contains('artist-card-div')) {
            setCurrentPageCompositionByArtistID(e.target);
        }
        if (target.classList.contains('btn-default')) {
            //$('.btn-default').onclick = (e) => { e.preventDefault(); };
            //urls.getInDevelopmentMessage();
        }
    });
    setSidebarInputVolumeOnChange();
});

document.oncontextmenu = function (e) {
    let target = e.target;
    if (containsClasses(target, 'card-text', 'card-title')) {
        target = e.target.parentNode;
    }

    if (target.classList.contains('card-body-composition')) {
        e.preventDefault();
        onCompositionRightMouseDown(e);
    }
    if (target.classList.contains('album-card-div')) { }
    if (target.classList.contains('genre-card-div')) { }
    if (target.classList.contains('artist-card-div')) { }
}

export function onCompositionRightMouseDown(e) {
    try {
        let menu = document.createElement("div")
        let cmiQueueSelected = document.createElement("p")
        cmiQueueSelected.id = 'ctxmenu-button';
        cmiQueueSelected.innerHTML = "Enqueue";
        menu.id = "ctxmenu";

        cmiQueueSelected.onclick = () => { _trackQueue.enqueue(getWebEntityObject(e)); };
        menu.onfocusout = () => menu.outerHTML = '';
        menu.onmouseleave = () => menu.outerHTML = ''
        menu.appendChild(cmiQueueSelected)
        
        console.log(e.target)
        let insertTarget = {};
        if(e.target.classList.contains('card-body'))
            insertTarget = e.target.parentElement;
        if(e.target.classList.contains('card'))
            insertTarget = e.target;
        if(containsClasses(e.target, 'card-text', 'card-title'))
            insertTarget = e.target.parentElement.parentElement;
        
        insertTarget.appendChild(menu);

        // setTimeout(() => {
        //     menu.style.opacity = 0;
        // }, 1500); 
        
        // e.target.appendChild(menu);
        // var timeout = setTimeout(function () {
        //     $('#ctxmenu').remove();
        // }, 4500);
    } catch (err) {
        console.log(err)
    }
}

export function bindPlayerButtons() {
    console.log('binding player buttons...');
    document.querySelector('.footer-next-track-btn')?.addEventListener("click", (e) => {
        console.log("clicked");

        let id = "nextTrackId";
        if (_trackQueue.isEmpty()) {
            console.log('Empty');
            id = GetCurrentCompositionsId();
        }
        else {
            console.log('Not Empty');
        }
        setNextComposition(id);
    });
}



export function setNextComposition(compId) {
    try {
        if (compId === undefined || compId === null)
            return;
        if(compId.includes('docs.google') || compId.includes(':')) {
            if(_trackQueue.isEmpty()) {
                console.log('setNextComposition: Query=empty');
                compId = getNext(compId);
            } else {
                console.log('setNextComposition: Query NOT empty');
                compId = _trackQueue.dequeue().id;
            }
            console.log('calling load Direct');
            loadDirect(compId);
            return;
        }
        let path = 'GetHtmlNextTrackPlayer/?id=';
        if (!_trackQueue.isEmpty()) {
            compId = _trackQueue.dequeue().id;
            path = 'GetHtmlStreamPlayer/?url=';
        }
        let ctrl = (loc + path + compId);
        if ($("#player-source-element") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    console.log('setNextComposition: Ajax returned key count: ' + Object.keys(response).length);
                    $("#player-audio-div").html('');
                    $("#player-audio-div").append(response);
                    let plr = $("#player-audio-element").get(0);
                    plr.play();
                    bindPlayerButtons();
                    setArtistSongNameAsync();
                    displayQueuedTracks(_trackQueue);
                    setSidebarInputVolumeOnChange();
                    //setTitleByArtistAndTitle(el);
                    plr.onended = function () {
                        let id = GetCurrentCompositionsId() ?? compId;
                        console.log('id is :' + id);
                        setNextComposition(id); 
                    };
                },
                error: async function (error_) {
                    document.title = 'Medweb';
                    onAjaxSwitchPageError(compId, error_, safeSwitchTrack);
                }
            });
        }
    } catch (e) {
        console.log(e);
    } 
}

export async function loadDirect(source)
{
    if(source.includes(':')) {
        console.log('loadDirect: $("#player-audio-element")[0] is %j', $("#player-audio-element")[0]);
        //$("#player-audio-element")[0].pause();
        $("#player-source-element")[0].setAttribute('src', source);
        let loadPromise = await $("#player-audio-element")[0].load();
        if (loadPromise !== undefined) {
            loadPromise.then(() => {
                $("#player-audio-element")[0].play()
                return true;
            }).catch((error) => {
                if (error.name === "NotAllowedError") {
                    console.log('Load audio promise failure. NotAllowed Error.');
                } else {
                    console.log('Load or playback error. ' + error);
                }
            });
        }
    }
    return Promise.resolve(false);
}

export async function setFooterPlayerSourse(el)
{
    try {
        let source = el;
        let songInfo = el;
        if (!el.classList.contains('card-body')) { songInfo = el.parentNode; }
            source = songInfo.querySelector('data').value; //data
        setTitleByArtistAndTitle(el);
        let direct = await loadDirect(source);
        if(direct != null && direct == true)
            return;

        let ctrl = (loc + 'GetHtmlStreamPlayer/?url=' + source);
        if ($("#player-source-element") != undefined) {
            await $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    console.log('setFooterPlayerSourse: Ajax returned key count: ' + Object.keys(response).length);
                    $("#player-audio-div").html('');
                    $("#player-audio-div").append(response);
                    let plr = $("#player-audio-element").get(0);
                    plr.play();
                    bindPlayerButtons();
                    displayQueuedTracks(_trackQueue);
                    setSidebarInputVolumeOnChange(plr[0]);
                    plr.onended = function () {
                        console.log('Calling get next composition from ID: ', source);
                        setNextComposition(source);
                    };
                },
                error: async function (error_) {
                    document.title = 'Medweb';
                    onAjaxLoadError(source, error_, safePlay);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
}
