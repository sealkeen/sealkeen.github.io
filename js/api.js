export default {
    loc: 'https://8a2b-37-144-215-79.eu.ngrok.io/',
    getLocation() {
        if (!(window.location.href.indexOf("github.io") > -1))
        {
            return 'https://localhost:443/'
        } else 
            return 'https://8a2b-37-144-215-79.eu.ngrok.io/'
    }
}