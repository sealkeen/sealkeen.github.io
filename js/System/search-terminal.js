
import { Terminal } from '../System/Terminal.js';
export function addSearchTerminal()
{
    try {
        if(document.getElementById('terminal-container') != null)
            return;
            
        let text = document.getElementsByClassName("text-center");
            if(text[0]) {
                text[0].insertAdjacentHTML("afterend",
                `
                <div id="terminal-container">
                <p>Search by artist: </>
                    <div class="output"></div>
                    <div id="command-form"></div>
                </div>
                `);
                let trm = new Terminal("?artist=", "terminal-container"); 
                trm.setButtonText('Search');
            }
    } catch (e) {
        console.error(e);
    }
}