﻿import urls from './api.js'
import {isGitHub} from './api.js'

export function LogMessageRequest(message) {
    if(isGitHub())
        return;
        
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        type: 'POST',
        // make sure you respect the same origin policy with this url:
        // http://en.wikipedia.org/wiki/Same_origin_policy
        url: urls.loc + 'api/Logger',
        success: function (msg) {
            //alert('wow' + msg);
        },
        data:
            JSON.stringify({ "message": message })
    });
}