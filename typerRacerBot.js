var minDelay = 100;
var maxDelay = 150;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function emulateTyping(inputElement, text) {
  var delay = 125; // Adjust the delay between key presses if needed

  async function typeCharacter(character) {
    // Create a new Event for each character
    var event = new Event('input', { bubbles: true });

    // Set the input value to the current text
    inputElement.value = inputElement.value + character;

    // Dispatch the input event
    inputElement.dispatchEvent(event);

    // Wait for a short delay before typing the next character
    delay = randomIntFromInterval(minDelay, maxDelay);
    console.log("The delay is", delay);
    await wait(delay);
  }

  async function typeText() {
    // Iterate through each character in the text
    for (var i = 0; i < text.length; i++) {
      await typeCharacter(text[i]);
    }

    // Emulate pressing the Enter key
    var enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
  }

  // Focus on the input element
  inputElement.focus();

  // Start typing the text
  typeText();
}


// Helper function to create a delay using async/await
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

delay = randomIntFromInterval(minDelay, maxDelay);
console.log("The delay is", delay);

try {
  let foundElement;

  for (var id = 0; id <= 999; id++) {
    const element = getElementByXpath(`//*[@id="gwt-uid-${id}"]`);

    if (element) {
      foundElement = element;
      break; // Exit the loop once the element is found
    }
  }

  if (foundElement) {
    // Element found, do something with it
    var parentElement = foundElement.innerHTML;
    console.log("Found element!", "ID:", id);
  } else {
    console.log("Element not found");
  }
} catch (error) {
  console.log("An error occurred:", error);
}

var beginningLetter = getElementByXpath(`//*[@id="gwt-uid-${id}"]/table/tbody/tr[2]/td/table/tbody/tr[1]/td/table/tbody/tr[1]/td/div/div/span[1]/text()`).textContent;
var restOfSentence = getElementByXpath(`//*[@id="gwt-uid-${id}"]/table/tbody/tr[2]/td/table/tbody/tr[1]/td/table/tbody/tr[1]/td/div/div/span[2]/text()`).textContent;

var doSentence2 = false;

try{
  var restOfSentence2 = getElementByXpath(`//*[@id="gwt-uid-${id}"]/table/tbody/tr[2]/td/table/tbody/tr[1]/td/table/tbody/tr[1]/td/div/div/span[3]`).textContent;
  doSentence2 = true;
} catch (error) {
  if (error) {
    console.log("Error occurred!");

    var sentence = `${beginningLetter}${restOfSentence}`;
    console.log(sentence);

    var prompt = getElementByXpath(`//*[@id="gwt-uid-${id}"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/input`);

    emulateTyping(prompt, sentence);
  }
}

if(doSentence2 == true){
  var sentence2 = `${beginningLetter}${restOfSentence}${restOfSentence2}`;


  console.log(sentence2);


  var prompt = getElementByXpath(`//*[@id="gwt-uid-${id}"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/input`);

  emulateTyping(prompt, sentence2);
}
