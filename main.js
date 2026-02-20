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
  let textLabel2 = "Transport Coef. (m), current=" + String(localStorage.getItem('defaultTransport'));
  selectTransport2.labels[0].textContent = textLabel2;
  calcBalance();
}

// Sets the select, and image objects to the default values
function updateObjects(initialStatus) {
  size.value = String(localStorage.getItem('defaultSize'));
  slope.value = String(localStorage.getItem('defaultSlope'));
  supply.value = String(localStorage.getItem('defaultSupply'));
  flow.value = String(localStorage.getItem('defaultFlow'));
  manning.value = String(localStorage.getItem('defaultManning'));
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
  } else {
    initialStatus = '';
  }
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

//Declare the 5 selection boxes for Sed Size, Slope, Supply, Flow, & Roughness and their event listeners.  
//1.  Declare bedload (sediment) size selection variable and event listener.  Calls populateData.
const size = document.querySelector('#size');
for (let i = 50; i < 1000; i++) {
  const option = document.createElement("option");
  option.value = (i/1000).toFixed(3);
  option.innerHTML = (i/1000).toFixed(3);
  size.appendChild(option);
}
for (let i = 10; i < 1101; i++) {
  const option = document.createElement("option");
  option.value = (i/10).toFixed(1);
  option.innerHTML = (i/10).toFixed(1);
  size.appendChild(option);
}
size.addEventListener('change', function() {
  populateData();
});

//2.  Declare slope selection variable and event listener.  Calls populateData.
const slope = document.querySelector('#slope');
for (let i = 1; i < 1001; i++) {
  const option = document.createElement("option");
  option.value = (i/1000).toFixed(3);
  option.innerHTML = (i/1000).toFixed(3);
  slope.appendChild(option);
}
slope.addEventListener('change', function() {
  populateData();
});

//3.  Declare Bed Material Supply selection variable and event listener.  Calls populateData.
const supply = document.querySelector('#supply');
for (let i = 1; i < 10001; i++) {
  const option = document.createElement("option");
  option.value = (i).toFixed(0);
  option.innerHTML = (i).toFixed(0);
  supply.appendChild(option);
}
for (let i = 10000; i < 50001; i += 500) {
  const option = document.createElement("option");
  option.value = (i).toFixed(0);
  option.innerHTML = (i).toFixed(0);
  supply.appendChild(option);
}
for (let i = 50000; i < 250001; i += 5000) {
  const option = document.createElement("option");
  option.value = (i).toFixed(0);
  option.innerHTML = (i).toFixed(0);
  supply.appendChild(option);
}
supply.addEventListener('change', function() {
  populateData();
});

//4.  Declare water flow selection variable and event listener.  Calls populateData.
const flow = document.querySelector('#flow');
for (let i = 1; i < 10001; i++) {
  const option = document.createElement("option");
  option.value = (i).toFixed(0);
  option.innerHTML = (i).toFixed(0);
  flow.appendChild(option);
}
for (let i = 10000; i < 50001; i += 500) {
  const option = document.createElement("option");
  option.value = (i).toFixed(0);
  option.innerHTML = (i).toFixed(0);
  flow.appendChild(option);
}
for (let i = 50000; i < 205001; i += 5000) {
  const option = document.createElement("option");
  option.value = (i).toFixed(0);
  option.innerHTML = (i).toFixed(0);
  flow.appendChild(option);
}
flow.addEventListener('change', function() {
  populateData();
});

//5.  Declare manning selection variable and event listener.  Calls populateData.
const manning = document.querySelector('#manning');
for (let i = 10; i < 121; i++) {
  const option = document.createElement("option");
  option.value = (i/1000).toFixed(3);
  option.innerHTML = (i/1000).toFixed(3);
  manning.appendChild(option);
}
manning.addEventListener('change', function() {
  populateData();
});

//Declare transport coefficient selection variable.
const selectTransport = document.querySelector('#selectTransport');
const option0 = document.createElement("option");
option0.value = "";
option0.innerHTML = "";
selectTransport.appendChild(option0);
for (let i = 30; i < 61; i++) {
  const option = document.createElement("option");
  option.value = (i/10).toFixed(3);
  option.innerHTML = (i/10).toFixed(3);
  selectTransport.appendChild(option);
}

//Declare width selection variable.
// const selectWidth = document.querySelector('#selectWidth');
// const option1 = document.createElement("option");
// option1.value = "";
// option1.innerHTML = "";
// selectWidth.appendChild(option1);
// for (let i = 30; i < 61; i++) {
//   const option = document.createElement("option");
//   option.value = (i/10).toFixed(3);
//   option.innerHTML = (i/10).toFixed(3);
//   selectWidth.appendChild(option);
// }
//Declare density selection variable.
// const selectDensity = document.querySelector('#selectDensity');
// const option2 = document.createElement("option");
// option2.value = "";
// option2.innerHTML = "";
// selectDensity.appendChild(option2);
// for (let i = 30; i < 61; i++) {
//   const option = document.createElement("option");
//   option.value = (i/10).toFixed(3);
//   option.innerHTML = (i/10).toFixed(3);
//   selectDensity.appendChild(option);
// }

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