const urls = {
    getLocation() {
        if(this.isGithub()) {
            return 'https://0590-95-24-222-140.ngrok-free.app/';
        } else if ( this.isRemoteWorkspace() ) {
            return 'https://localhost:443/';
        } else if ( !this.isNodeJSHost() || this.isNgrok() ) {
            return `${location.protocol}//${location.host}/`;
        } else
            return 'https://localhost:5001/';
    },
    getPostfix() {
        if (window.location.href.indexOf("github.io/Sealkeen") > -1)
            return 'Sealkeen/'
        else
            return ''
    },
    isGithub: () => (window.location.href.indexOf("github.io") > -1),
    isLocalhost: () => (window.location.href.indexOf('localhost:') > -1),
    isRemoteWorkspace: () => window.location.href.indexOf(':65000') > -1,
    isNodeJSHost: ()  =>
        ( window.location.href.indexOf('localhost:808') > -1
        || window.location.href.indexOf('127.0.0.1:808') > -1
        || window.location.href.indexOf(':8081') > -1 ),
    isNgrok: () => (window.location.href.indexOf('ngrok.io') > -1) 
        || (window.location.href.indexOf('ngrok-free.app') > -1),
    getHostRootPath: () => `${location.protocol}//${location.host}/`,
    isLocationReachable: async () => await getLocationResponse(),
    isHomePage : () => { return window.location.origin + "/" + urls.getPostfix() == window.location.href }
}; export default urls;

export async function getLocationResponse() {
    return $.ajax({
        url: (urls.getLocation() + 'PerformPublicHandShake'),
        type: 'GET',
        contentType:'text/html',
        success: function (response) {
            return true;
        },
        error: function (err) {
            console.log('location was not reachable, returning false.')
            return false;
        }
    });
};

// if-url-exist.js v1
export function ifUrlExist(url, callback) {
    let request = new XMLHttpRequest;
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Accept', '*/*');
    request.onprogress = function(event) {
        let status = event.target.status;
        let statusFirstNumber = (status).toString()[0];
        switch (statusFirstNumber) {
            case '2':
                request.abort();
                return callback(true);
            default:
                request.abort();
                return callback(false);
        };
    };
    request.send('');
};

export async function pushHistoryState(url)
{
    try {
        if( urls.isGithub() || urls.isNodeJSHost() || urls.isRemoteWorkspace() )
            return; // throw new NotImplementedException();

        console.log('History state URL:' + url);
        console.log('prevstate not null');
        let loc = `${location.protocol}//${location.host}/`;
        window.history.pushState({ prevUrl: window.location.href }, null, loc + urls.getPostfix() + url); 
    } catch(e) {
        console.log(e);
    }
}

export async function redirectIfServerIsReachable(path) // : String
{
    if (await urls.isLocationReachable() ) 
    {
        window.location = urls.getLocation() + path;
        return true;
    } 
    else 
        return false;
}