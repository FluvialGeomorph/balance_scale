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
  textSize.value = size.value;
  textSlope.value = slope.value;
  textSupply.value = supply.value;
  textFlow.value = flow.value;
  textManning.value = manning.value;
  calcBalance();
}

// Sets the select, and image objects to the default values - called after "reset"(1st), "set"(2nd), or the "orig"(2nd) button is clicked.
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
  selectTransport.labels[0].textContent = "Transport Coef. (m), current=" + String(localStorage.getItem('defaultTransport'));
  textDefaultSize.value = String(localStorage.getItem('defaultSize'));
  textDefaultSlope.value = String(localStorage.getItem('defaultSlope'));
  textDefaultSupply.value = String(localStorage.getItem('defaultSupply'));
  textDefaultFlow.value = String(localStorage.getItem('defaultFlow'));
  textDefaultManning.value = String(localStorage.getItem('defaultManning'));
  textDefaultTransport.value = String(localStorage.getItem('defaultTransport'));
  if (initialStatus === 'initial') {
    ctx2.clearRect(0, 0, width2, height2);
    ctx2.beginPath();
    ctx2.fillStyle = "rgb(0, 0, 0)";
    ctx2.fillRect(0, 0, width2, height2);
    const image3 = new Image();
    selectScenario.value = String(localStorage.getItem('defaultScenario'));
    image3.src = selectScenario.value;
    image3.addEventListener("load", () => ctx2.drawImage(image3, 20, 20));
    selectNotes.value = '';
    textMinSize.value = size.min;
    textMinSlope.value = slope.min;
    textMinSupply.value = supply.min;
    textMinFlow.value = flow.min;
    textMinManning.value = manning.min;
    textMaxSize.value = size.max;
    textMaxSlope.value = slope.max;
    //console.log(`textDefaultSupply.value: ${textDefaultSupply.value} tons/day`);
    //let new_max_supply = String(Math.round(Number(textDefaultSupply.value) * 10.0));
    //console.log(`new_max_supply: ${new_max_supply} tons/day`);
    //supply.setAttribute('max', String(Math.round(Number(textDefaultSupply.value) * 10.0)));
    supply.setAttribute('max', String(Math.round(Number(textDefaultSupply.value) * 2.0)));
    textMaxSupply.value = supply.max;
    flow.setAttribute('max', String(Math.round(Number(textDefaultFlow.value) * 2.0)));
    textMaxFlow.value = flow.max;
    textMaxManning.value = manning.max;
  } else {
    initialStatus = '';
  }
  // const selectTransport2 = document.querySelector('#selectTransport');
  // let textLabel2 = "Transport Coef. (m), current=" + String(localStorage.getItem('defaultTransport'));
  populateData();
}

// Populates the default values with the original values.  Called when the "Orig" button is clicked.
function populateStorageOriginal(initialStatus) {
  localStorage.setItem('defaultSize', '28.7');
  localStorage.setItem('defaultSlope', '0.300');
  localStorage.setItem('defaultSupply', '419');
  localStorage.setItem('defaultFlow', '430');
  localStorage.setItem('defaultTransport', '5.7');
  localStorage.setItem('defaultManning', '0.035');
  localStorage.setItem('defaultScenario', 'scenario1.png');
  updateObjects(initialStatus);
}

//calls updateObjects.
function resetDefault() {
  updateObjects();
}

function getViewportDimensions() {
  const width_check = window.innerWidth;
  const height_check = window.innerHeight;
  return { width_check, height_check };
}


//Main Start
//--------------------------------------------------------------------------------------------------------------------------------------------------
//SET WIDTH AND HEIGHT BASED ON THE MINIMUM SCREEN DIMENSION 20260219
let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
let width;
let height;
if (screen_height <= screen_width) {
  width = Math.round(screen_height) - 4;
  height = width;
} else {
  height = Math.round(screen_width) - 4;
  width = height;
}
if (width > 690) {
  width = 690;
  height = 690;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------
//Declare the canvas and canvas2 variables, canvas context variables, and create rectangles using the context variables.  Mod 20260219
const canvas = document.querySelector(".myCanvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "rgb(0,0,0)"
ctx.fillRect(0, 0, width, height);
let myBalanceScale = new BalanceScale(ctx,canvas.width);  //Mod 20260218 - create a BalanceScale Class Object Instance.
myBalanceScale.calc_geometry(ctx,canvas.width);
const canvas2 = document.querySelector(".myCanvas2");
const width2 = (canvas2.width);
const height2 = (canvas2.height);
const ctx2 = canvas2.getContext("2d");
ctx2.beginPath();
ctx2.fillStyle = "rgb(0, 0, 0)";
ctx2.fillRect(0, 0, width2, height2);
//--------------------------------------------------------------------------------------------------------------------------------------------------
//  Add Event Listener for Screen Resizing - Mod 20260219
//--------------------------------------------------------------------------------------------------------------------------------------------------
window.addEventListener('resize', () => {
  const updatedDimensions = getViewportDimensions();
  screen_width = updatedDimensions.width_check;
  screen_height = updatedDimensions.height_check;
  if (screen_height <= screen_width) {
    width = Math.round(screen_height) - 4;
    height = width;
  } else {
    height = Math.round(screen_width) - 4;
    width = height;
  }
  if (width > 690) {
    width = 690;
    height = 690;
  }
  canvas.width = width;
  canvas.height = height;
  myBalanceScale.calc_geometry(ctx,canvas.width); //MOD 20260219
  populateData();
});
//Declare the slider bars and their event listeners.
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
const option0 = document.createElement("option");
option0.value = "";
option0.innerHTML = "";
selectTransport.appendChild(option0);
for (let i = 20; i < 61; i++) {
  const option = document.createElement("option");
  option.value = (i/10).toFixed(3);
  option.innerHTML = (i/10).toFixed(3);
  selectTransport.appendChild(option);
}

//Declare Scenario selection variable and event listener.  Resets canvas2, calls populateData, and clears the Notes selection variable.
const selectScenario = document.querySelector('#selectScenario');
selectScenario.addEventListener('change', function() {
  ctx2.clearRect(0, 0, width2, height2);
  ctx2.beginPath();
  ctx2.fillStyle = "rgb(0, 0, 0)";
  ctx2.fillRect(0, 0, width2, height2);
  const image2 = new Image();
  image2.src = selectScenario.value;
  image2.addEventListener("load", () => ctx2.drawImage(image2, 20, 20));
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
  image5.addEventListener("load", () => ctx2.drawImage(image5, 20, 20));
  selectScenario.value = '';
});

//Declare the size,slope,supply,flow, and manning text input boxes and their event listeners
const textSize = document.querySelector('#textSize');
textSize.addEventListener("change", (event) => {
  size.value = textSize.value;
  output_size.textContent = size.value;
  populateData();
});
const textSlope = document.querySelector('#textSlope');
textSlope.addEventListener("change", (event) => {
  slope.value = textSlope.value;
  output.textContent = slope.value;
  populateData();
});
const textSupply = document.querySelector('#textSupply');
textSupply.addEventListener("change", (event) => {
  supply.value = textSupply.value;
  output_supply.textContent = supply.value;
  populateData();
});
const textFlow = document.querySelector('#textFlow');
textFlow.addEventListener("change", (event) => {
  flow.value = textFlow.value;
  output_flow.textContent = flow.value;
  populateData();
});
const textManning = document.querySelector('#textManning');
textManning.addEventListener("change", (event) => {
  manning.value = textManning.value;
  output_manning.textContent = manning.value;
  populateData();
});


//Declare the Default, Min, and Max Text Input Elements
const textDefaultSize = document.querySelector('#textDefaultSize');
const textDefaultSlope = document.querySelector('#textDefaultSlope');
const textDefaultSupply = document.querySelector('#textDefaultSupply');
const textDefaultFlow = document.querySelector('#textDefaultFlow');
const textDefaultManning = document.querySelector('#textDefaultManning');
const textDefaultTransport = document.querySelector('#textDefaultTransport');
const textMinSize = document.querySelector('#textMinSize');
const textMinSlope = document.querySelector('#textMinSlope');
const textMinSupply = document.querySelector('#textMinSupply');
const textMinFlow = document.querySelector('#textMinFlow');
const textMinManning = document.querySelector('#textMinManning');
const textMaxSize = document.querySelector('#textMaxSize');
const textMaxSlope = document.querySelector('#textMaxSlope');
const textMaxSupply = document.querySelector('#textMaxSupply');
const textMaxFlow = document.querySelector('#textMaxFlow');
const textMaxManning = document.querySelector('#textMaxManning');

//Initial check - If default values are present, calls updateObjects.  If not, call populateStorageOriginal - sets the default (stable) values to the original values.
if(localStorage.getItem('defaultSize')) {
  updateObjects('initial');
} else {
  //populateStorage('initial');
  populateStorageOriginal('initial');
}

// Declare “Set” (buttonSetup) button variable and event listener.  Sets m if selected.  Calls populateStorage - sets the default (stable) values to the current values.
const buttonSetup = document.querySelector('.buttonSetup');
buttonSetup.addEventListener("click", (event) => {
  if (selectTransport.value === '') {
    //pass
  } else {
    localStorage.setItem('defaultTransport', selectTransport.value);
    let textLabel = "Transport Coef. (m), current=" + String(localStorage.getItem('defaultTransport'));
    selectTransport.labels[0].textContent = textLabel;
    selectTransport.value = "";
  }
  populateStorage();
});

// Declare “Orig” (buttonExcel) button variable and event listener.  Calls populateStorageOriginal - sets the default (stable) and current values to the original values.
const buttonExcel = document.querySelector('.buttonExcel');
buttonExcel.addEventListener('click', populateStorageOriginal);

// Declare “Reset” (buttonReset) variable and event listener:  Calls resetDefault - calls updateObjects to set the current values to the default (stable) values.
const buttonDefault = document.querySelector('.buttonDefault');
buttonDefault.addEventListener('click', resetDefault);

// Mod 20260302 - Populate Defaults and Ranges with the text inputs (located at the bottom of the app).
const buttonSetRangesDefaultsDiv = document.querySelector('.buttonSetRangesDefaultsDiv');
buttonSetRangesDefaultsDiv.addEventListener("click", (event) => {
  localStorage.setItem('defaultSize', textDefaultSize.value);
  localStorage.setItem('defaultSlope', textDefaultSlope.value);
  localStorage.setItem('defaultSupply', textDefaultSupply.value);
  localStorage.setItem('defaultFlow', textDefaultFlow.value);
  localStorage.setItem('defaultManning', textDefaultManning.value);
  localStorage.setItem('defaultTransport', textDefaultTransport.value);
  selectTransport.labels[0].textContent = "Transport Coef. (m), current=" + String(localStorage.getItem('defaultTransport'));;
  size.min = textMinSize.value;
  slope.min = textMinSlope.value;
  supply.min = textMinSupply.value;
  flow.min = textMinFlow.value;
  manning.min = textMinManning.value;
  size.max = textMaxSize.value;
  slope.max = textMaxSlope.value;
  supply.max = textMaxSupply.value;
  flow.max = textMaxFlow.value;
  manning.max = textMaxManning.value;
  updateObjects();
});