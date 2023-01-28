import urls, { pushHistoryState } from './../api.js'
import { toggleTopPageBackground, toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { setDevelopmentMessages } from '../Development/news-data.js';

export function onDevelopmentCardClick()
{
    if(document.querySelector('#development-body') === null) {
        let developmentBody = document.createElement('div')
        developmentBody.id = 'development-body';
        document.querySelector('#page-body-container').appendChild(developmentBody)
    }
    setDevelopmentMessages();
}
export async function fetchContentCrossOrigin(path) {
    try {
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + path);
        if ($("#page-body-container") != undefined) {
            let response = await fetch(ctrl, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            });

            if (!response.ok) {
                throw new Error('Fetch error.');
            }
            let responseText = await response.text();
            $("#page-body-container").html('');
            $("#page-body-container").append(responseText);
            console.log('fetch response key count: ' + Object.keys(responseText).length);
            pushHistoryState(urls.getPostfix());
        }
    } catch (e) {
        console.log(e);
    } finally {
        toggleTopPageBackground(false);
        toggleBodyBackground();
    }
}