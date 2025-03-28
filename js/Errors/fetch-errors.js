import Debug from "../Extensions/cs-debug.js";

export function createErrorMessage(message, timeout = 5000) {
    createMessage(message, 'error', timeout)
}

export function createInfoMessage(text, timeout = 5000)
{
    createMessage(text, 'info', timeout)
}

function createMessage(message, type, timeout = 5000)
{
    const errorMessage = document.createElement("div");
    errorMessage.classList.add(type === 'error' ? "error-message" : "info-message");
    
    // Get the position of the page-body-container element
    const pageBodyContainer = document.querySelector("#page-body-container");
    const pageBodyContainerRect = pageBodyContainer.getBoundingClientRect();
    const pageBodyContainerTop = pageBodyContainerRect.top + window.pageYOffset;
    
    Debug.WriteLine(`fetch-errors.js/createMessage() | type === error : ${type==='error'}, type : ${type} `);
    // Set the top position of the error message to the top of the page-body-container element
    // if there are no existing error messages, otherwise position it below the previous messages
    const existingErrorMessages = document.querySelectorAll(".error-message, .info-message") ;
    let topPosition;
    if (existingErrorMessages.length === 0) {
      topPosition = pageBodyContainerTop;
    } else {
      const lastErrorMessage = existingErrorMessages[existingErrorMessages.length - 1];
      const lastErrorMessageRect = lastErrorMessage.getBoundingClientRect();
      topPosition = lastErrorMessageRect.bottom + 15; // adjust 10 to desired spacing between error messages
      console.log('[INF] topPosition before: ' + topPosition)
      topPosition = (topPosition > window.innerHeight) ? pageBodyContainerTop : topPosition;
      console.log('[INF] topPosition after: ' + topPosition)
    }
    errorMessage.style.top = `${topPosition}px`;
    errorMessage.style.left = `15px`;
      
    errorMessage.textContent = message;

    document.body.appendChild(errorMessage);
    
    // Remove the error message after 5 seconds
    setTimeout(() => {
      errorMessage.remove();
    }, timeout);
}

window.createInfoMessage = createInfoMessage;