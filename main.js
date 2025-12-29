// main.js

// Populates the default values with the current slider and select values.  Called when (1) default values are empty (1st usage); OR (2) the "Set" button is clicked.
function populateStorage(initialStatus) {
  localStorage.setItem('defaultSize', size.value);
  localStorage.setItem('defaultSlope', slope.value);
  localStorage.setItem('defaultSupply', supply.value);
  localStorage.setItem('defaultFlow', flow.value);
  localStorage.setItem('defaultManning', manning.value);
  localStorage.setItem('defaultScenario', selectScenario.value);
  if (localStorage.getItem('defaultTransport')) {
    //pass
  } else {
    localStorage.setItem('defaultTransport', String(5.7));
  }
  if (initialStatus === 'initial') {
    updateObjects("initial");
  } else {
    updateObjects();
  }
}

// Populates current values.  Called when a slider or select value changes.
function populateData() {
  localStorage.setItem('valueSize', size.value);
  localStorage.setItem('valueSlope', slope.value);
  localStorage.setItem('valueSupply', supply.value);
  localStorage.setItem('valueFlow', flow.value);
  localStorage.setItem('valueTransport', String(localStorage.getItem('defaultTransport')));
  localStorage.setItem('valueManning', manning.value);
  localStorage.setItem('valueScenario', selectScenario.value);
  const selectTransport2 = document.querySelector('#selectTransport');
  let textLabel2 = "Transport Coef. (3=bedload, 6=susp., current=" + String(localStorage.getItem('defaultTransport')) + ")";
  selectTransport2.labels[0].textContent = textLabel2;
  calcBalance();
}

// Sets the slider, select, and image objects to the default values
function updateObjects(initialStatus) {
  size.value = String(localStorage.getItem('defaultSize'));
  output_size.textContent = size.value;
  slope.value = String(localStorage.getItem('defaultSlope'));
  output.textContent = slope.value;
  supply.value = String(localStorage.getItem('defaultSupply'));
  output_supply.textContent = supply.value;
  flow.value = String(localStorage.getItem('defaultFlow'));
  output_flow.textContent = flow.value;
  manning.value = String(localStorage.getItem('defaultManning'));
  output_manning.textContent = manning.value;
  if (initialStatus === 'initial') {
    ctx2.clearRect(0, 0, width2, height2);
    ctx2.beginPath();
    ctx2.fillStyle = "rgb(0, 0, 0)";
    ctx2.fillRect(0, 0, width2, height2);
    const image3 = new Image();
    selectScenario.value = String(localStorage.getItem('defaultScenario'));
    image3.src = selectScenario.value;
    image3.addEventListener("load", () => ctx2.drawImage(image3, 70, 20));
    selectNotes.value = '';
  } else {
    initialStatus = '';
  }
  populateData();
}

// Populates the default values with the original values.  Called when the "Orig" button is clicked.
function populateStorageOriginal() {
  localStorage.setItem('defaultSize', String(28.66));
  localStorage.setItem('defaultSlope', String(0.3));
  localStorage.setItem('defaultSupply', String(9.02));
  localStorage.setItem('defaultFlow', String(11.1));
  localStorage.setItem('defaultTransport', String(5.7));
  localStorage.setItem('defaultManning', String(0.035));
  localStorage.setItem('defaultScenario', String("scenario1.png"));
  updateObjects();
}

//calls updateObjects.
function resetDefault() {
  updateObjects();
}

//Main Start

//Declare the canvas and canvas2 variables, canvas context variables, and create rectangles using the context variables.
const canvas = document.querySelector(".myCanvas");
const width = (canvas.width);
const height = (canvas.height);
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, width, height);
ctx.strokeStyle = "rgb(255, 255, 255)";
ctx.lineWidth = 5;
ctx.strokeRect(25, 25, 640, 640);
const canvas2 = document.querySelector(".myCanvas2");
const width2 = (canvas2.width);
const height2 = (canvas2.height);
const ctx2 = canvas2.getContext("2d");
ctx2.beginPath();
ctx2.fillStyle = "rgb(0, 0, 0)";
ctx2.fillRect(0, 0, width2, height2);

//Declare the 5 slider bar and slider bar label variables and their event listeners.  
//1.  Declare bedload (sediment) size slider variables.  Updates the label and calls populateData.
const size = document.querySelector('#size');
const output_size = document.querySelector('.size-output');
output_size.textContent = size.value;
size.addEventListener('input', function() {
  output_size.textContent = size.value;
  populateData();
});

//2.  Declare slope slider variables and event listener.  Updates the label and calls populateData.
const slope = document.querySelector('#slope');
const output = document.querySelector('.slope-output');
output.textContent = slope.value;
slope.addEventListener('input', function() {
  output.textContent = slope.value;
  populateData();
});

//3.  Declare bedload (sediment) supply variables and event listener.  Updates the label and calls populateData.
const supply = document.querySelector('#supply');
const output_supply = document.querySelector('.supply-output');
output_supply.textContent = supply.value;
supply.addEventListener('input', function() {
  output_supply.textContent = supply.value;
  populateData();
});

//4.  Declare water flow slider variables and event listener.  Updates the label and calls populateData.
const flow = document.querySelector('#flow');
const output_flow = document.querySelector('.flow-output');
output_flow.textContent = flow.value;
flow.addEventListener('input', function() {
  output_flow.textContent = flow.value;
  populateData();
});

//5.  Declare manning slider variables and event listener.  Updates the label and calls populateData.
const manning = document.querySelector('#manning');
const output_manning = document.querySelector('.manning-output');
output_manning.textContent = manning.value;
manning.addEventListener('input', function() {
  output_manning.textContent = manning.value;
  populateData();
});

//Declare transport coefficient selection variable.
const selectTransport = document.querySelector('#selectTransport');

//Declare Scenario selection variable and event listener.  Resets canvas2, calls populateData, and clears the Notes selection variable.
const selectScenario = document.querySelector('#selectScenario');
selectScenario.addEventListener('change', function() {
  ctx2.clearRect(0, 0, width2, height2);
  ctx2.beginPath();
  ctx2.fillStyle = "rgb(0, 0, 0)";
  ctx2.fillRect(0, 0, width2, height2);
  const image2 = new Image();
  image2.src = selectScenario.value;
  image2.addEventListener("load", () => ctx2.drawImage(image2, 70, 20));
  populateData();
  selectNotes.value = '';
});

//Declare Notes selection variable and event listener.  Resets canvas2 and clears the Scenario selection variable.
const selectNotes = document.querySelector('#selectNotes');
selectNotes.addEventListener('change', function() {
  ctx2.clearRect(0, 0, width2, height2);
  ctx2.beginPath();
  ctx2.fillStyle = "rgb(0, 0, 0)";
  ctx2.fillRect(0, 0, width2, height2);
  const image5 = new Image();
  image5.src = selectNotes.value;
  image5.addEventListener("load", () => ctx2.drawImage(image5, 70, 20));
  selectScenario.value = '';
});

//Initial check - If default values are present, calls updateObjects.  If not, calls populateStorage. 
if(localStorage.getItem('defaultSize')) {
  updateObjects();
} else {
  populateStorage('initial');
}

// Declare “Set” (buttonSetup) button variable and event listener.  Calls populateStorage.
const buttonSetup = document.querySelector('.buttonSetup');
buttonSetup.addEventListener("click", (event) => {
  populateStorage();
});

// Declare “Orig” (buttonExcel) button variable and event listener.  Calls populateStorageOriginal.
const buttonExcel = document.querySelector('.buttonExcel');
buttonExcel.addEventListener('click', populateStorageOriginal);

// Declare “Reset” (buttonReset) variable and event listener:  Calls resetDefault.
const buttonDefault = document.querySelector('.buttonDefault');
buttonDefault.addEventListener('click', resetDefault);

// Declare “SetTransport” (buttonSetTransport) button variable and event listener.  
// If a value is selected, sets the transport default value, updates the label, calls resetDefault, and clears the selected value.
const buttonSetTransport = document.querySelector('.buttonSetTransport');
buttonSetTransport.addEventListener("click", (event) => {
  if (selectTransport.value === '') {
    //pass
  } else {
    localStorage.setItem('defaultTransport', selectTransport.value);
    resetDefault();
    let textLabel = "Transport Coef. (3=bedload, 6=susp., current=" + String(localStorage.getItem('defaultTransport')) + ")";
    selectTransport.labels[0].textContent = textLabel;
    selectTransport.value = "";
  }
});