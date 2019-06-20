const letter = document.querySelector('.letter');
const topFold = document.querySelector('.top-fold');
const bottomFold = document.querySelector('.bottom-fold');
const textarea = document.getElementById('thoughts');

const button = document.querySelector('.release');
button.addEventListener('click', handleClick);

let folded, sent, received;

function fetchStationery() {
  return new Promise((resolve, reject) => {
    letter.classList.remove('sent');
    textarea.disabled = true;
    textarea.value = '';
    sent = false;

    button.innerText = 'Release This Thought';
    resolve(true);
  });
}

async function handleClick(event) {
  if (sent) {
    received = await fetchStationery();
    folded = await unfoldLetter();
    if (!folded) {
      window.setTimeout(() => {
        textarea.disabled = false;
        textarea.placeholder = 'Click here and write down a thought you want to let go of.';
        textarea.focus();
      }, 250);
    }
  }
  else {
    folded = await foldLetter();
    if (folded) {
      button.innerText = 'Send another';
      sent = await sendLetter();
    }
  }
}

function foldLetter() {
  return new Promise((resolve, reject) => {
    bottomFold.classList.add('bottom-folded');
    window.setTimeout(() => {
      topFold.classList.add('top-folded');
      resolve(true);
    }, 750);
  });
}

function unfoldLetter() {
  return new Promise((resolve, reject) => {
    topFold.classList.remove('top-folded');
    textarea.placeholder = '';
    window.setTimeout(() => {
      bottomFold.classList.remove('bottom-folded');
      resolve(false);
    }, 750);
  });
}

function sendLetter() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      letter.classList.add('sent');
      received = false;
      resolve(true);
    }, 500);
  });
}

window.addEventListener('resize', fitAppToWindow);

function fitAppToWindow() {
  // First, get the viewport height and multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

fitAppToWindow();