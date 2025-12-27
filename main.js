//Default values for watershed drainage area (sq.mi.) and slope (%)
defaultWatershedArea = 15.0;
defaultWatershedSlope = 0.3;
/* Function to populate the default database values
for size, slope, supply, flow, and scenario with
the current slider and select values. */
//These are only changed if the following 2 conditions occur:
//(1) the default values in the database are empty (for first usage)
//(2) the "setup" button is clicked, which sets the default
//values to the current values for size,slope,supply,flow, and scenario.
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

/* Function to populate the current database values
for size, slope, supply, flow, and scenario with
the current slider and select values. */
//These values are set every time one of the current values for
//size,slope,supply,or flow change.
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

function populateDataStable() {
  localStorage.setItem('valueSize', size.value);
  localStorage.setItem('valueSlope', slope.value);
  localStorage.setItem('valueSupply', supply.value);
  localStorage.setItem('valueFlow', flow.value);
  localStorage.setItem('valueScenario', selectScenario.value);
  calcBalance("stable");
}

/* Function to set the Size, Slope, Supply, Flow & scenario 
to the default values*/
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

//calls updateObjects with the "default" argument.
function resetDefault() {
  updateObjects("default");
}

//resets objects with the default watershed parameters
//specified by defaultWatershedArea & defaultWatershedSlope
//specified in lines 2 & 3 and the size, flow, and supply
//estimated from these.
//resets the stable condition to these estimated parameters
function resetWatershedDefault() {
  slopeWatershed.value = String(defaultWatershedSlope);
  output_slopeWatershed.textContent = Number(slopeWatershed.value).toFixed(2);
  areaWatershed.value = String(defaultWatershedArea);
  output_areaWatershed.textContent = Number(areaWatershed.value).toFixed(1);
  calcWatershedEstimates();
}

//resets objects with estimated watershed parameters
//resets the stable condition to these estimated parameters
function resetOriginal() {
  //updateObjects("original");
  calcWatershedEstimates();
}

function calcWatershedEstimates() {
  const calcSlopeVal = Number(slopeWatershed.value);
  const calcAreaVal = Number(areaWatershed.value);
  const calcFlowPart1 = (calcAreaVal ** (0.356)) * 18.0;
  const calcFlowPart2 = (calcAreaVal ** (0.637)) * 93.3;
  const calcFlow = calcFlowPart2 / calcFlowPart1;
  const calcSizePart1 = ((5.15-1.94)*32.2*0.06);
  const calcSizePart2 = (calcAreaVal ** (0.265)) * 1.52;
  const calcSize = 62.4 * calcSizePart2 * (calcSlopeVal / 100.0) / calcSizePart1 * 25.4 * 12;
  const calcSupplyPart1 = (calcSize/304.8)**3.0;
  const calcSupplyPart2 = ((2.65-1)*32.2*calcSupplyPart1)**0.5;
  const calcSupplyPart3 = (3.0 / 2.0);
  const calcSupplyPart4 = (calcSize/304.8);
  const calcSupplyPart5 = (62.4*(2.65-1)*32.2*calcSupplyPart4);
  const calcSupplyPart6 = (62.2*32.2*(1.52*calcAreaVal**0.265)*calcSlopeVal/100);
  const calcSupplyPart7 = ((4*calcSupplyPart6/calcSupplyPart5)-0.188);
  const calcSupply = (calcSupplyPart7**calcSupplyPart3*calcSupplyPart2)*3600;
  size.value = String(calcSize);
  output_size.textContent = size.value;
  slope.value = String(calcSlopeVal);
  output.textContent = slope.value;
  flow.value = String(calcFlow);
  output_flow.textContent = flow.value;
  supply.value = String(calcSupply);
  output_supply.textContent = supply.value;
  populateStorage();
}


  

/* Function to pause for a specified number of milliseconds
Returns the current timestamp in milliseconds from 1970 */
function pauseAmount(milSecPause) {
  const startTime = Date.now();
  let endTime = startTime;
  while ((endTime - startTime) < milSecPause) {
    endTime = Date.now();
  }
  return endTime;
}

/* Set up the "canvas" and "canvas2"
*/
//set reference to the canvas to get the height and width
//then set referience to the context, which allows
//creating graphics on the canvas.
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

//set reference to the canvas2 to get the height and width
//then set referience to the context, which allows
//creating graphics on the canvas.
const canvas2 = document.querySelector(".myCanvas2");
const width2 = (canvas2.width);
const height2 = (canvas2.height);
const ctx2 = canvas2.getContext("2d");
ctx2.beginPath();
ctx2.fillStyle = "rgb(0, 0, 0)";
ctx2.fillRect(0, 0, width2, height2);

/* Set up the slider bars and their labels 
for the (1)bedload size, (2)slope, (3)bedload supply, and (4)water flow
Set reference to each, set the label value to the slider value,
and then add an event listener to respond to changes.
For any changes, set the label value and call the "populateData" function to 
update the current data values in the database, perform calcs, and
update the Lanes Balance Scale Chart Graphic.
*/
//bedload size
const size = document.querySelector('#size');
const output_size = document.querySelector('.size-output');
output_size.textContent = size.value;
size.addEventListener('input', function() {
  output_size.textContent = size.value;
  populateData();
});

//slope
const slope = document.querySelector('#slope');
const output = document.querySelector('.slope-output');
output.textContent = slope.value;
slope.addEventListener('input', function() {
  output.textContent = slope.value;
  populateData();
});

//bedload supply
const supply = document.querySelector('#supply');
const output_supply = document.querySelector('.supply-output');
output_supply.textContent = supply.value;
supply.addEventListener('input', function() {
  output_supply.textContent = supply.value;
  populateData();
});

//water flow
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

//drainage area
//const areaWatershed = document.querySelector('#areaWatershed');
//const output_areaWatershed = document.querySelector('.areaWatershed-output');
//output_areaWatershed.textContent = Number(areaWatershed.value).toFixed(1);
//areaWatershed.addEventListener('input', function() {
//  output_areaWatershed.textContent = Number(areaWatershed.value).toFixed(1);
//});

//watershed slope
//const slopeWatershed = document.querySelector('#slopeWatershed');
//const output_slopeWatershed = document.querySelector('.slopeWatershed-output');
//output_slopeWatershed.textContent = Number(slopeWatershed.value).toFixed(2);
//slopeWatershed.addEventListener('input', function() {
//  output_slopeWatershed.textContent = Number(slopeWatershed.value).toFixed(2);
//});

//Declare transport coefficient selection variable.
const selectTransport = document.querySelector('#selectTransport');

/* Set up the select input for the scenario selection. 
*/
//object reference to the select input, which allows selecting
//one of 4 scenarios.
const selectScenario = document.querySelector('#selectScenario');

/* Load the default scenario image into the Canvas2. */
//The scenario is determined from the value of the select input,
//which allows selecting 1 of 4 scenarios.
//Not sure if the 7 lines below are needed - might be duplicated later
//as the updateObjects or populateStorage functions are called on page load
//Wierd behavior 20231105:
//if the last scenario is loaded and the web page is reloaded
//with the first scenario as the default, the bottom of the last scenarios
//border show up below scenario 1. 
//this behavior is not replicated with the resetDefault or resetOriginal buttons
//commenting out the 7 lines below removed the wierd behavior.
//ctx2.clearRect(0, 0, width2, height2);
//ctx2.beginPath();
//ctx2.fillStyle = "rgb(0, 0, 0)";
//ctx2.fillRect(0, 0, width2, height2);
//const image = new Image();
//image.src = selectScenario.value;
//image.addEventListener("load", () => ctx2.drawImage(image, 70, 20));

/* Event listener to change the scenario image if a new scenario is selected.*/
//responds to changes in the selected scenario in the select input object
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

//for the notes select box
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

//For initial loading of the web page
//If "defaultSize" exists in localStorage,
//calls "updateObjects", which sets the current values to the default values and
//sets the stable condition to the default values. 
//If "defaultSize" does not exist,
//calls "populateStorage" which sets the default values to the current values and
//calls "populateDataStable" which sets the database values to the current values and
//sets the stable condition to the currrent values.
if(localStorage.getItem('defaultSize')) {
  updateObjects('initial');
} else {
  populateStorage('initial');
}

/* Get reference to the "Set Stable" button and 
adds an Event listener and function for the "setup" button click event.
Calls the "populateStorage" function, which sets the default values in the database.
*/
const buttonSetup = document.querySelector('.buttonSetup');
buttonSetup.addEventListener("click", (event) => {
  populateStorage();
});

/* Populate 3 input text boxes upon opening the web page - with timestamp values.
The 4th is populated in the "updateObjects" function with the updated
size,slope,supply,flow, and scenario
*/
//const date0 = new Date();
//const dateText1 = document.querySelector('.dateText1');
/* dateText1.value = date0[Symbol.toPrimitive]('string'); */
//dateText1.value = date0.toLocaleString()
//const dateText2 = document.querySelector('.dateText2');
/* dateText2.value = Date(); */
//dateText2.value = date0.toISOString();
//const dateText3 = document.querySelector('.dateText3');
/* dateText3.value = date0.toString(); */
//const strValue3 = String(date0.getTime()) + ';     ' + String(pauseAmount(10));
//const strValue3 = '1'
//dateText3.value = strValue3;
//const dateText4 = document.querySelector('.dateText4');
//dateText4.value = pauseAmount(10);

//sets reference to the "reset default" button
//calls the "resetDefault" function
// const buttonReset = document.querySelector('.buttonReset');
// buttonReset.addEventListener('click', resetDefault);

//sets reference to the "Reset Original" button
//calls the "populateStorageOriginal" function
const buttonExcel = document.querySelector('.buttonExcel');
buttonExcel.addEventListener('click', populateStorageOriginal);

//sets reference to the "Reset Stable" button
//calls the "resetDefault" function
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