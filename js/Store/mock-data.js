import { setTitleByArtistAndTitle } from './../Page/event-handlers.js'

export function CreateDOMFromJSON(jsonSource) {
    console.log('jsonSource: %j', jsonSource);
    let center = document.createElement('center');
    let cardcolumns = document.createElement("div")
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center';
    display4.className = 'display-4 stroke-shadow';
    display4.innerHTML = ('Count of compositions: ' + jsonSource?.length);
    textcenter.appendChild(display4);
    center.appendChild(textcenter);

    jsonSource.forEach(element => {
        let card = document.createElement("div")
        let comp = document.createElement("div")
        let data = document.createElement("data")
        let h6 = document.createElement("h6")
        let h7 = document.createElement("h7")

        card.className = 'card';
        comp.className = 'card-body card-body-composition';
        data.setAttribute("value", element.id);
        h6.innerHTML = element.artist;
        h7.innerHTML = element.title;
        h6.className = 'card-title';
        h7.className = 'card-text';

        comp.appendChild(data);
        comp.appendChild(h6);
        comp.appendChild(h7);
        card.appendChild(comp);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}

export function ConvertToDOM(message) {
    let center = document.createElement('center');
    let cardcolumns = document.createElement("div")
    cardcolumns.className = 'card-columns';

    let textcenter = document.createElement('div');
    let display4 = document.createElement('h3');
    textcenter.className = 'text-center';
    display4.className = 'display-4 stroke-shadow';
    display4.innerHTML = message ?? 'Server unavailable. Loaded mock data (playable).';
    textcenter.appendChild(display4);
    center.appendChild(textcenter);

    let data = JSON.parse(fromBinary(takeStore()));

    data.forEach(element => {
        let card = document.createElement("div")
        let comp = document.createElement("div")
        let data = document.createElement("data")
        let h6 = document.createElement("h6")
        let h7 = document.createElement("h7")

        card.className = 'card';
        comp.className = 'card-body card-body-composition';
        data.setAttribute("value", element.p);
        h6.innerHTML = element.a;
        h7.innerHTML = element.n;
        h6.className = 'card-title';
        h7.className = 'card-text';

        comp.appendChild(data);
        comp.appendChild(h6);
        comp.appendChild(h7);
        card.appendChild(comp);
        cardcolumns.appendChild(card);
    });

    center.appendChild(cardcolumns);
    return center;
}


export function onMockDataLoaded() {
    const container = document.querySelector('#card-columns');

    container.addEventListener('click', function(e) {
        e.preventDefault();
        let target = e.target;
        if (containsClasses(target, 'card-text', 'card-title')) {
            target = e.target.parentNode;
        }
        if (target.classList.contains('card-body-composition')) {
            setMockFooterSourse(e.target)
        }
    });
}

export function setMockFooterSourse(el) {
    try {
        let source = el;
        let songInfo = el;
        if (!event.target.classList.contains('card-body')) { songInfo = el.parentNode; }
        source = songInfo.querySelector('data').value; //data
        setTitleByArtistAndTitle(el);

        let ctrl = (loc + 'GetHtmlStreamPlayer/?url=' + source);
        if ($("#player-source-element") != undefined) {
            $("#player-source-element").attr('src', source);
            $("#player-source-element").load();
            $("#player-source-element").play();
        }
    } catch (e) {
        alert(e)
    }
}

function fromBinary(binary) {
    const bytes = Uint8Array.from({ length: binary.length }, (element, i) =>
        binary.charCodeAt(i)
    );
    const charCodes = new Uint16Array(bytes.buffer);

    let result = "";
    charCodes.forEach((char) => {
        result += String.fromCharCode(char);
    });
    return result;
}

function toBinary(str) {
    const codeUnits = Uint16Array.from({ length: str.length },
        (element, i) => str.charCodeAt(i)
    );
    const charCodes = new Uint8Array(codeUnits.buffer);

    let result = "";
    charCodes.forEach((char) => {
        result += String.fromCharCode(char);
    });
    return result;
}

export function getNext(url)
{
    console.log('parsing...');
    let data = JSON.parse(fromBinary(takeStore()));
    let res = "";
    data.forEach(element => {
        console.log('element.p : ' + element.p)
        if(res !== "")
        {
            return element.p;
        }
        if(url == element.p)
        {
            res = "next";
        }
    });
    return "endOfPlayBack";
}

export function takeStore() {
    return '[\x00{\x00"\x00a\x00"\x00:\x00"\x00C\x00o\x00u\x00n\x00t\x00i\x00n\x00g\x00 \x00C\x00r\x00o\x00w\x00s\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00A\x00c\x00c\x00i\x00d\x00e\x00n\x00t\x00a\x00l\x00l\x00y\x00 \x00i\x00n\x00 \x00L\x00o\x00v\x00e\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x007\x000\x001\x008\x00E\x005\x005\x006\x00-\x005\x009\x002\x00C\x00-\x004\x008\x004\x000\x00-\x00B\x007\x009\x00D\x00-\x00A\x006\x00C\x002\x009\x009\x007\x008\x001\x00E\x002\x000\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00Z\x00O\x00k\x00H\x00S\x00S\x000\x009\x00V\x00B\x00T\x00d\x00C\x007\x00h\x00j\x00c\x001\x00z\x00F\x00c\x00s\x00r\x00w\x00Y\x007\x00X\x00v\x00n\x006\x00t\x003\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00I\x00-\x00E\x00x\x00i\x00s\x00t\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00U\x00n\x00i\x00t\x00y\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00B\x005\x002\x001\x000\x006\x001\x00E\x00-\x00C\x00A\x003\x006\x00-\x004\x00F\x002\x002\x00-\x00B\x00F\x00A\x00E\x00-\x00E\x00E\x00E\x004\x007\x00C\x002\x00F\x003\x000\x009\x00F\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00z\x00H\x008\x00d\x00f\x00c\x00O\x00b\x008\x00k\x00o\x00q\x00g\x00W\x00L\x00-\x005\x00F\x00_\x00W\x00-\x00g\x00-\x00E\x00m\x006\x00e\x00x\x00Y\x000\x00p\x005\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00D\x00e\x00a\x00d\x00 \x00b\x00y\x00 \x00A\x00p\x00r\x00i\x00l\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00A\x00n\x00y\x00t\x00h\x00i\x00n\x00g\x00 \x00a\x00t\x00 \x00A\x00l\x00l\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x008\x00A\x00C\x001\x00D\x003\x002\x005\x00-\x002\x00B\x000\x000\x00-\x004\x002\x00C\x003\x00-\x009\x004\x005\x00D\x00-\x001\x00E\x004\x00C\x005\x00E\x002\x001\x004\x00A\x009\x00C\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00h\x00r\x00v\x00q\x00G\x00e\x00L\x00z\x00m\x00A\x00I\x00e\x00_\x00r\x00M\x00g\x00g\x00Z\x00N\x00R\x00g\x00U\x00n\x00W\x00D\x00i\x00t\x00F\x006\x00N\x00B\x00l\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00T\x00h\x00e\x00 \x00B\x00i\x00r\x00t\x00h\x00d\x00a\x00y\x00 \x00M\x00a\x00s\x00s\x00a\x00c\x00r\x00e\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00A\x00l\x00w\x00a\x00y\x00s\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00C\x000\x006\x00E\x00C\x00B\x00B\x005\x00-\x00C\x002\x000\x006\x00-\x004\x000\x00E\x00C\x00-\x009\x006\x00F\x001\x00-\x001\x008\x008\x00D\x00E\x003\x000\x00D\x000\x006\x001\x00A\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00d\x00v\x002\x00G\x003\x00k\x00v\x00C\x009\x00f\x00Z\x00P\x00i\x00z\x00C\x005\x00U\x00e\x00i\x00h\x00W\x00V\x00L\x00f\x00f\x00y\x00A\x00n\x00d\x00k\x00w\x00W\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00T\x00h\x00e\x00 \x00B\x00i\x00r\x00t\x00h\x00d\x00a\x00y\x00 \x00M\x00a\x00s\x00s\x00a\x00c\x00r\x00e\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00S\x00i\x00d\x00e\x00w\x00a\x00y\x00s\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00F\x00E\x00F\x00C\x005\x009\x000\x00F\x00-\x002\x005\x006\x005\x00-\x004\x008\x002\x001\x00-\x00B\x00A\x00C\x008\x00-\x005\x008\x00D\x002\x008\x003\x007\x001\x00B\x008\x008\x00D\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00d\x00w\x00j\x008\x00F\x00J\x00M\x00n\x00_\x00Z\x00x\x00s\x003\x00C\x004\x00_\x00h\x00j\x00Y\x00v\x00b\x00V\x00Q\x00_\x002\x00A\x00H\x00V\x00R\x00Q\x00h\x00M\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00E\x00i\x00s\x00b\x00r\x00e\x00c\x00h\x00e\x00r\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00O\x00u\x00t\x00 \x00o\x00f\x00 \x00t\x00h\x00e\x00 \x00D\x00a\x00r\x00k\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00F\x001\x002\x00E\x009\x009\x000\x00B\x00-\x009\x004\x00F\x008\x00-\x004\x00D\x00E\x009\x00-\x00A\x00D\x00F\x008\x00-\x00D\x006\x00C\x002\x00C\x001\x00E\x00A\x008\x007\x007\x000\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00K\x00h\x00Z\x00T\x008\x00F\x00x\x00i\x00P\x00H\x00L\x003\x00u\x006\x00y\x00x\x00X\x00s\x00_\x00Z\x00Q\x00j\x00e\x00v\x00Y\x00F\x00Z\x00n\x00t\x00G\x00l\x00A\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00I\x00n\x00 \x00F\x00l\x00a\x00m\x00e\x00s\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00D\x00r\x00e\x00n\x00c\x00h\x00e\x00d\x00 \x00I\x00n\x00 \x00F\x00e\x00a\x00r\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x004\x00D\x004\x006\x009\x00B\x00A\x002\x00-\x003\x003\x003\x002\x00-\x004\x001\x008\x00E\x00-\x00B\x00C\x002\x009\x00-\x009\x00A\x00B\x00F\x008\x007\x00F\x00B\x006\x00B\x00A\x00D\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x008\x00L\x00b\x00L\x003\x00I\x00w\x00y\x00L\x003\x00m\x00Z\x00M\x00u\x001\x00r\x008\x00q\x00h\x00J\x000\x00P\x00Z\x005\x003\x000\x00O\x002\x00F\x00U\x00P\x00N\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00I\x00n\x00 \x00F\x00l\x00a\x00m\x00e\x00s\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00T\x00h\x00e\x00 \x00C\x00h\x00o\x00s\x00e\x00n\x00 \x00P\x00e\x00s\x00s\x00i\x00m\x00i\x00s\x00t\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x000\x003\x004\x003\x001\x00E\x00B\x007\x00-\x00D\x00B\x00A\x009\x00-\x004\x006\x001\x007\x00-\x009\x00F\x00A\x00B\x00-\x00F\x00E\x007\x003\x007\x00A\x007\x00C\x007\x007\x00D\x00D\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00S\x00K\x00-\x00L\x00t\x00Q\x00f\x00U\x009\x00N\x00i\x00E\x00Z\x00v\x00G\x00B\x00K\x00P\x00h\x00M\x00S\x00u\x00S\x00r\x00v\x00e\x00K\x009\x00j\x000\x007\x008\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00D\x00r\x00e\x00a\x00m\x00s\x00h\x00a\x00d\x00e\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00Y\x00o\x00u\x00r\x00 \x00V\x00o\x00i\x00c\x00e\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x004\x00C\x008\x000\x000\x006\x00B\x008\x00-\x005\x00C\x005\x004\x00-\x004\x004\x008\x005\x00-\x00A\x005\x000\x007\x00-\x001\x006\x008\x002\x002\x009\x008\x00E\x00E\x002\x000\x00F\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00s\x00g\x00D\x008\x00z\x00_\x004\x00G\x00O\x00l\x00l\x00F\x00O\x00l\x00f\x00S\x008\x00d\x002\x00-\x00t\x00n\x00O\x00V\x00g\x00S\x00-\x00O\x00Q\x00Y\x00R\x00H\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00D\x00r\x00e\x00a\x00m\x00s\x00h\x00a\x00d\x00e\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00P\x00h\x00o\x00t\x00o\x00g\x00r\x00a\x00p\x00h\x00s\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x009\x007\x007\x007\x008\x003\x002\x001\x00-\x002\x001\x002\x001\x00-\x004\x009\x002\x001\x00-\x00B\x000\x00C\x001\x00-\x008\x001\x00B\x002\x003\x001\x008\x00D\x003\x005\x00C\x002\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00U\x00g\x00A\x007\x00A\x007\x00l\x00U\x00f\x001\x00Y\x00Q\x00S\x00a\x00d\x00Q\x00d\x00h\x00M\x00Q\x001\x00D\x00U\x00W\x00j\x007\x007\x008\x00D\x00E\x00Y\x00i\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00D\x00r\x00e\x00a\x00m\x00s\x00h\x00a\x00d\x00e\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00T\x00h\x00e\x00 \x00G\x00i\x00f\x00t\x00 \x00O\x00f\x00 \x00L\x00i\x00f\x00e\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00C\x00C\x001\x004\x00A\x00A\x002\x00C\x00-\x007\x007\x00E\x00D\x00-\x004\x00C\x008\x00A\x00-\x00A\x004\x00C\x008\x00-\x008\x00E\x00B\x005\x005\x00C\x00E\x003\x002\x00A\x007\x002\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00S\x00O\x00q\x00Z\x00U\x00b\x00n\x008\x00N\x00R\x00S\x00a\x00k\x00W\x00O\x00X\x00c\x00w\x00P\x004\x00Q\x00C\x00o\x009\x00C\x00Z\x00v\x00E\x00_\x00G\x00e\x00c\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00D\x00r\x00e\x00a\x00m\x00s\x00h\x00a\x00d\x00e\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00W\x00a\x00n\x00t\x00s\x00 \x00&\x00 \x00N\x00e\x00e\x00d\x00s\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00D\x002\x004\x001\x006\x009\x005\x005\x00-\x00C\x00F\x003\x009\x00-\x004\x005\x00B\x00E\x00-\x00A\x00C\x006\x001\x00-\x009\x001\x00C\x006\x00D\x004\x00C\x008\x00B\x006\x002\x008\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00W\x00m\x00v\x00h\x00u\x00s\x00y\x00t\x00e\x00c\x003\x00k\x00u\x00j\x00i\x00K\x000\x00Y\x00w\x009\x00n\x00r\x00x\x00X\x00x\x00i\x00v\x00G\x00j\x00r\x00X\x00R\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00D\x00e\x00a\x00t\x00h\x00s\x00t\x00a\x00r\x00s\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00T\x00e\x00r\x00m\x00i\x00n\x00a\x00t\x00i\x00o\x00n\x00 \x00B\x00l\x00i\x00s\x00s\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x006\x002\x006\x006\x006\x000\x009\x00A\x00-\x00C\x006\x007\x001\x00-\x004\x004\x002\x009\x00-\x008\x000\x00D\x004\x00-\x001\x004\x007\x004\x003\x007\x00B\x001\x008\x003\x00A\x001\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00S\x00M\x00o\x00o\x006\x005\x00C\x00N\x003\x004\x00O\x00u\x00Z\x005\x00K\x003\x00d\x00I\x00o\x00n\x00X\x00Y\x00E\x00s\x00c\x00f\x00t\x00W\x00y\x00k\x00s\x004\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00M\x00I\x00S\x00S\x00I\x00O\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00I\x00 \x00S\x00e\x00e\x00 \x00Y\x00o\x00u\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x007\x006\x005\x00C\x002\x009\x003\x001\x00-\x007\x002\x009\x003\x00-\x004\x00F\x00D\x000\x00-\x00A\x004\x00C\x001\x00-\x00B\x007\x00B\x009\x006\x001\x002\x001\x00E\x004\x00E\x008\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x003\x00Q\x006\x00I\x005\x009\x00n\x00M\x00a\x00p\x00Z\x00U\x007\x00J\x00s\x006\x00t\x001\x00F\x007\x00K\x00t\x00S\x00F\x00b\x00j\x00U\x00H\x00o\x00h\x00X\x00G\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00H\x00a\x00l\x00s\x00e\x00y\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00D\x00e\x00v\x00i\x00l\x00 \x00I\x00n\x00 \x00M\x00e\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00A\x004\x000\x00C\x002\x007\x006\x00E\x00-\x009\x009\x007\x005\x00-\x004\x00C\x007\x00A\x00-\x009\x00E\x009\x004\x00-\x008\x005\x00D\x005\x00F\x00F\x000\x009\x008\x002\x00F\x00E\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00S\x00L\x00l\x00x\x00D\x00d\x007\x00g\x00s\x00M\x007\x00v\x00y\x00t\x00B\x000\x006\x00q\x00p\x00O\x004\x00t\x00i\x00Z\x00j\x00W\x004\x00k\x00g\x00U\x005\x00M\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00I\x00n\x00s\x00o\x00m\x00n\x00i\x00u\x00m\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00W\x00h\x00i\x00l\x00e\x00 \x00W\x00e\x00 \x00S\x00l\x00e\x00e\x00p\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00C\x000\x00E\x002\x00A\x005\x00B\x008\x00-\x001\x008\x005\x007\x00-\x004\x00E\x00D\x00D\x00-\x008\x00D\x00D\x00C\x00-\x009\x00A\x005\x006\x00A\x006\x006\x00D\x00A\x000\x00B\x001\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00m\x003\x00w\x00A\x00Y\x00c\x009\x00L\x008\x00F\x001\x00v\x00D\x00g\x00D\x00C\x00W\x00o\x00w\x00j\x009\x00j\x002\x00C\x00C\x00p\x00R\x007\x00d\x006\x00i\x00Q\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00P\x00a\x00u\x00l\x00 \x00R\x00o\x00m\x00e\x00r\x00o\x00 \x00&\x00 \x00R\x00o\x00b\x00 \x00K\x00i\x00n\x00g\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00C\x00o\x00m\x00b\x00a\x00t\x00 \x000\x004\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x006\x000\x005\x00A\x00A\x00F\x009\x001\x00-\x008\x003\x00B\x00C\x00-\x004\x004\x00B\x006\x00-\x00A\x005\x000\x007\x00-\x00C\x009\x002\x003\x005\x000\x00D\x002\x00D\x00A\x00D\x007\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00w\x00A\x00e\x00k\x00X\x00F\x008\x00h\x00_\x00N\x00-\x00d\x00E\x00c\x00Y\x00s\x00I\x00G\x00Z\x005\x00T\x00y\x00-\x00b\x00K\x00h\x003\x004\x00r\x00z\x00t\x00o\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00C\x00r\x00a\x00d\x00l\x00e\x00 \x00O\x00f\x00 \x00F\x00i\x00l\x00t\x00h\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00S\x00t\x00a\x00y\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x004\x00C\x003\x004\x00D\x006\x009\x009\x00-\x00F\x003\x002\x003\x00-\x004\x003\x006\x005\x00-\x00A\x008\x003\x007\x00-\x005\x000\x006\x00E\x00C\x000\x004\x00B\x00B\x004\x00A\x00D\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x008\x00h\x00W\x00d\x00y\x00P\x00i\x00w\x001\x00t\x00z\x00N\x009\x00r\x000\x00i\x00e\x00L\x00d\x00-\x00Z\x008\x005\x00Z\x00J\x00e\x00p\x00w\x00Y\x00q\x00Y\x00C\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00\x10\x04;\x048\x04A\x040\x04"\x00,\x00"\x00n\x00"\x00:\x00"\x00(\x045\x049\x04:\x04"\x00,\x00"\x00i\x00"\x00:\x00"\x007\x000\x00A\x005\x003\x00F\x00F\x005\x00-\x00C\x002\x00F\x006\x00-\x004\x00E\x006\x005\x00-\x009\x003\x00C\x004\x00-\x004\x007\x000\x005\x009\x00C\x001\x000\x00A\x008\x00D\x002\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x000\x002\x00b\x00k\x00M\x007\x00b\x00K\x006\x00x\x00z\x001\x00I\x00D\x00l\x00C\x00v\x00f\x007\x00O\x00n\x00G\x00d\x00T\x00V\x000\x00L\x00c\x00F\x008\x00_\x00S\x00"\x00 \x00}\x00,\x00{\x00"\x00a\x00"\x00:\x00"\x00D\x00a\x00n\x00g\x00e\x00r\x00k\x00i\x00d\x00s\x00"\x00,\x00"\x00n\x00"\x00:\x00"\x00L\x00i\x00g\x00h\x00t\x00 \x00E\x00s\x00c\x00a\x00p\x00e\x00s\x00"\x00,\x00"\x00i\x00"\x00:\x00"\x00F\x00E\x00D\x00D\x004\x00C\x006\x007\x00-\x000\x001\x002\x001\x00-\x004\x00A\x00A\x003\x00-\x009\x005\x00A\x008\x00-\x00B\x00C\x00F\x001\x005\x008\x009\x00B\x00A\x007\x00B\x00B\x00"\x00,\x00"\x00p\x00"\x00:\x00"\x00h\x00t\x00t\x00p\x00:\x00/\x00/\x00d\x00o\x00c\x00s\x00.\x00g\x00o\x00o\x00g\x00l\x00e\x00.\x00c\x00o\x00m\x00/\x00u\x00c\x00?\x00e\x00x\x00p\x00o\x00r\x00t\x00=\x00o\x00p\x00e\x00n\x00&\x00i\x00d\x00=\x001\x00w\x00h\x005\x00k\x00b\x000\x00C\x009\x00y\x00E\x00W\x00W\x00j\x00z\x00f\x00A\x00g\x001\x00D\x00q\x00q\x00z\x009\x00m\x00N\x00H\x00Z\x00B\x001\x00f\x00o\x00b\x00"\x00}\x00]\x00';
}
