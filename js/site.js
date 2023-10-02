﻿import { setNextComposition, setFooterPlayerSourse } from './Utils/Audio.js';
import { _trackQueue } from './Utils/Queue.js';
import { containsClasses, fromJQueryObject, 
    displayQueuedTracks, GetCurrentCompositionsId } from './utilities.js';
import { toggleTopPageBackground, toggleBodyBackground } from './StyleHandlers/color-handlers.js';
import { addSideNavElements, addSidenavEventListeners } from './StyleHandlers/side-nav-handlers.js';
import { addEventHandlersOnBody, setCurrentPageCompositionByArtistID, setCurrentPageCompositionByID, setCurrentPageAlbumByID } 
from './Router/click-handlers.js';
import { fireOnInputValueChange } from './Page/event-handlers.js';
import { runBackgroundHandShakes, onSiteLoadIfAuthorized } from './Router/testing.js';
import { initializeKeyboardHook } from './Loading/keyboard-hook.js';
import Debug from './Extensions/cs-debug.js'
import MusicAPI from './Page/url-decoding.js'
import TrackAPI from './Page/track-decoding.js'
import { FillLocalizationStore } from './Services/Localization/fill-localization-store.js';
import { appendSideNavigationBars } from './Page/Components/side-navigations.js';
import { appendHorizontalVolumeControl } from './Page/Components/volume-controls.js';
import { addSearchTerminal } from './System/search-terminal.js';
import { onTransitionEnd } from './StyleHandlers/footer-handlers.js';

document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");

/// On document loaded event
$(document).ready(function () {
    try {
        addSearchTerminal();
        window.isAuthorized = (window.isAuthorized === true) ? true : false;
        appendSideNavigationBars();
        FillLocalizationStore();
        runBackgroundHandShakes();
        addSideNavElements(); addSidenavEventListeners();
        addEventHandlersOnBody();
        toggleBodyBackground(); bindPlayerButtons();
        toggleTopPageBackground(false); initializeKeyboardHook();
        appendHorizontalVolumeControl();
        onSiteLoadIfAuthorized();
        
        let urlHandler = new MusicAPI();
        // set interval for load
        setTimeout(() => { let trackhandler = new TrackAPI(setNextComposition) }, 1000);
        
        _trackQueue.onchange = () => {
            displayQueuedTracks(_trackQueue);
        };
        const container = document.querySelector('body');

        container.onmousedown = (e) => {
            Debug.WriteLine('site.js/onmousedown | ' + e.target.id + ' ' + e.target.className + ' | e.which: ' + e.which);
            if (!containsClasses('ctxmenu', 'ctxmenu-button')) {
                $('#ctxmenu').innerHTML = '';
            }
        }

        container.addEventListener('click', function (e) {
            Debug.WriteLine('site.js/onclick(): ' + e.target.id + ' ' + e.target.className);
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
            }
            if (target.id == 'ctxmenu') {
                document.querySelector('#ctxmenu').outerHTML = "";
            }
        });
        
        /// Mobile devices: toggle context menu through touch-end event (touch and scroll to see track's menu)
        document.querySelector('.container')?.addEventListener('touchend', function (e) {
            setTimeout( () => {
                Debug.WriteLine('site.js/touchend' + e.target.id + ' ' + e.target.className);
                const highlightedItems = document.querySelectorAll("#ctxmenu");
                highlightedItems.forEach((userItem) => {
                    userItem.outerHTML = "";
                });
                onCardTapped(e)
            }, 75);
        });

        /// Toggle change volume by mouse wheel for scroll on footer / absolute volume control
        document.onwheel = (e) =>
        {        
            if (containsClasses(e.target, 'footer-volume-control', 'volume-control-absolute', 'player-audio-element') === true) {
                let target = e.target;
                
                let value = target.value
                if(value > 3) {
                    if(-(e.deltaY) > 0)
                        target.value *= 1.2;
                    else
                        target.value *= 0.8;
                } else {
                    if(-(e.deltaY) > 0)
                        target.value += 1;
                    else
                        target.value -= 1;
                }
                fireOnInputValueChange(target);
            }
        }

        document.querySelector('.container').oncontextmenu = (e) => {
            Debug.WriteLine('site.js/onContentMenu' + e.target.id + ' ' + e.target.className);
            e.preventDefault();
            let target = e.target;
            if (containsClasses(target, 'card-text', 'card-title')) {
                target = e.target.parentNode;
            }
            if (target.classList.contains('card-body-composition')) {
                onCompositionRightMouseDown(e);
            }
        }
    } catch (e) {
        console.log(e);
    } finally {
        onTransitionEnd();
    }
});


export function onCardTapped(e)
{
    let target = e.target;
    if (containsClasses(target, 'card-text', 'card-title')) {
        target = e.target.parentNode;
    }
    if (target.classList.contains('card-body-composition')) {
        onCompositionRightMouseDown(e);
    }
}

export function createPushListItem(e) { 
    let push = document.createElement("p");
    push.className = 'ctxmenu-button';
    push.innerHTML = "Add first";
    push.onclick = () => { _trackQueue.push_front(fromJQueryObject(e)); };
    return push
}
export function createQueueListItem(e) { 
    let queue = document.createElement("p")
    queue.className = 'ctxmenu-button';
    queue.innerHTML = "Add last";
    queue.onclick = () => { _trackQueue.enqueue(fromJQueryObject(e)); };
    return queue
}

export function onCompositionRightMouseDown(e) {
    try {
        let menu = document.createElement("div")
        menu.onfocusout = () => menu.outerHTML = '';
        menu.onmouseleave = () => menu.outerHTML = ''
        menu.className = "ctxmenu"

        let push = createPushListItem(e)

        let queue = createQueueListItem(e)

        menu.appendChild(push)
        menu.appendChild(queue)

        console.log(e.target)
        let insertTarget = {};
        if(e.target.classList.contains('card-body'))
            insertTarget = e.target.parentElement;
        if(e.target.classList.contains('card'))
            insertTarget = e.target;
        if(containsClasses(e.target, 'card-text', 'card-title'))
            insertTarget = e.target.parentElement.parentElement;
        
        insertTarget.appendChild(menu);

    } catch (err) {
        console.log(err)
    }
}

export function bindPlayerButtons() {
    Debug.WriteLine('binding player buttons...');
    document.querySelector('.footer-next-track-btn')?.addEventListener("click", (e) => {
        Debug.WriteLine("clicked");

        let id = "nextTrackId";
        if (_trackQueue.isEmpty()) {
            Debug.WriteLine('.footer-next-track-btn.click() : Track Query is Empty.');
            id = GetCurrentCompositionsId();
        }
        else {
            Debug.WriteLine('.footer-next-track-btn.click() : Track Query is Not Empty.');
            id = _trackQueue.peek().id;
            Debug.WriteLine('.footer-next-track-btn.click() : peeked item. Elts len: ' + _trackQueue.elts.length); 
        }
        setNextComposition(id);
    });
}