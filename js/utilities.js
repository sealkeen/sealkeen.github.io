﻿export function isEmpty (val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

export function containsClasses (node, ...classes) {
    return classes.some(cls => node?.classList?.contains(cls));
}

export function getIdFromElementData(el) {
    let id = el.target;
    //console.log('%j', el);
    //console.log('%j', el.target);
    if (!event.target.classList.contains('card-body')) {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.parentNode);//.querySelector('data'));
        console.log('%j', el.target.parentNode.querySelector('data').value);
        id = el.target.parentNode.querySelector('data').value;
        console.log('not contains card-body. el.currentTarget.parentNode.children[0].value');
    }
    else {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.querySelector('data'));
        console.log('%j', el.target.querySelector('data').value);
        id = el.target.querySelector('data').value;
        //id = el.target.children[0].value;
    }
    return id;
}

export function getWebEntityObject(el) {
    let id = el.target;
    let artist = el.target;
    let title = el.target;
    //console.log('%j', el);
    //console.log('%j', el.target);
    if (!event.target.classList.contains('card-body')) {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.parentNode);//.querySelector('data'));
        console.log('%j', el.target.parentNode.querySelector('data').value);
        id = el.target.parentNode.querySelector('data').value;
        artist = el.target.parentNode.querySelector('.card-title').innerHTML;
        title = el.target.parentNode.querySelector('.card-text').innerHTML;
        console.log('not contains card-body. el.currentTarget.parentNode.children[0].value');
    }
    else {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.querySelector('data'));
        console.log('%j', el.target.querySelector('data').value);
        id = el.target.querySelector('data').value;
        artist = el.target.querySelector('.card-title').innerHTML;
        title = el.target.querySelector('.card-text').innerHTML;
        //id = el.target.children[0].value;
    }
    return { id, artist, title };
}

export function displayQueuedTracks(_trackQueue) {
    console.log('%j', _trackQueue);
    let queue = $('#footer-track-query')[0];
    if (queue === undefined) {
        queue = document.createElement("div");
        queue.id = "footer-track-query";
        queue.className = "footer-track-query";
        queue.innerHTML = _trackQueue.peekObjectsArtistsAndTitles();
        let footer = $('.footer');
        footer[0].insertBefore(queue, footer[0].firstChild);
    } else {
        queue.innerHTML = _trackQueue.peekObjectsArtistsAndTitles();
    }
}