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
function populateStorage() {
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
  populateDataStable();
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
  localStorage.setItem('valueManning', manning.value);
  localStorage.setItem('valueScenario', selectScenario.value);
  localStorage.setItem('valueTransport', String(localStorage.getItem('defaultTransport')));
  calcBalance("nonStable");
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
function updateObjects(defaultOriginal) {
  /* 20231104 The "click" event for the button type "reset" did not seem to work.
  changed the button type "reset" to a button type "button"
  and called this function on its click events  */
  /* const timeStamp0 = pauseAmount(2000); */
  /* dateText1.value = defaultValues[0]; */
  /* dateText2.value = defaultValues[1]; */
  /* dateText3.value = defaultValues[2]; */
  /* dateText4.value = defaultValues[3]; */
  const defaultValues2 = [];
  if (defaultOriginal === 'original') {
    defaultValues2.push(String(28.66));
    defaultValues2.push(String(0.3));
    defaultValues2.push(String(9.02));
    defaultValues2.push(String(11.1));
    defaultValues2.push(String("scenario1.png"));
    defaultValues2.push(String(0.035));
  } else {
    defaultValues2.push(String(localStorage.getItem('defaultSize')));
    defaultValues2.push(String(localStorage.getItem('defaultSlope')));
    defaultValues2.push(String(localStorage.getItem('defaultSupply')));
    defaultValues2.push(String(localStorage.getItem('defaultFlow')));
    defaultValues2.push(String(localStorage.getItem('defaultScenario')));
    defaultValues2.push(String(localStorage.getItem('defaultManning')));
  }
  size.value = String(defaultValues2[0]);
  output_size.textContent = size.value;
  slope.value = String(defaultValues2[1]);
  output.textContent = slope.value;
  supply.value = String(defaultValues2[2]);
  output_supply.textContent = supply.value;
  flow.value = String(defaultValues2[3]);
  output_flow.textContent = flow.value;
  manning.value = String(defaultValues2[5]);
  output_manning.textContent = manning.value;
  //output_slopeWatershed.textContent = Number(slopeWatershed.value).toFixed(2);
  //output_areaWatershed.textContent = Number(areaWatershed.value).toFixed(1);
  ctx2.clearRect(0, 0, width2, height2);
  ctx2.beginPath();
  ctx2.fillStyle = "rgb(0, 0, 0)";
  ctx2.fillRect(0, 0, width2, height2);
  const image3 = new Image();
  selectScenario.value = String(defaultValues2[4]);
  image3.src = selectScenario.value;
  image3.addEventListener("load", () => ctx2.drawImage(image3, 70, 20));
  selectNotes.value = '';
  ///////////////////////////
  //20231104 - I am not sure why I couldn't reference dateText4,
  //which was defined as a constant, while the slider, labels, and select
  //did not need to be redefined.
  ///////////////////////////
  //const dateText4b = document.querySelector('.dateText4');
  //let strValue4 = defaultValues2.join(';  ');
  //strValue4 = 'D50,S,Qs,Qw:  ' + strValue4;
  //dateText4b.value = strValue4;
  populateDataStable();
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

function degToRad(degrees) {
  return degrees * Math.PI / 180;
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

function calcBalance(stableOption) {
  //perform calculations and set database values here
  //writing the current values to a form text input box
  //const dateText4c = document.querySelector('.dateText4');
  //let strValue4c = 'Values for D50,S,Qs,Qw:  ';
  //strValue4c = strValue4c + String(localStorage.getItem('valueSize')) + ';  ';
  //strValue4c = strValue4c + String(localStorage.getItem('valueSlope')) + ';  ';
  //strValue4c = strValue4c + String(localStorage.getItem('valueSupply')) + ';  ';
  //strValue4c = strValue4c + String(localStorage.getItem('valueFlow')) + ';  ';
  //strValue4c = strValue4c + String(localStorage.getItem('valueScenario'));
  //dateText4c.value = strValue4c;
  
  //setting an initial value for the sediment continuity % balance
  //localStorage.setItem('calcBalancePercent','65.0');
  
  //Calculations for the sediment continuity percent balance
  
  //calculating scaled values
  localStorage.setItem('valueScaledSlope',String(localStorage.getItem('valueSlope')));
  localStorage.setItem('valueScaledSize',String(localStorage.getItem('valueSize')));
  localStorage.setItem('valueScaledSupply',String(localStorage.getItem('valueSupply')));
  
  //calculating converted values
  const convertedSlope = Number(localStorage.getItem('valueScaledSlope')) / 100.0;
  localStorage.setItem('valueConvertedSlope',String(convertedSlope));
  localStorage.setItem('valueConvertedFlow',String(localStorage.getItem('valueFlow')));
  const convertedSize = Number(localStorage.getItem('valueScaledSize')) / 304.8;
  localStorage.setItem('valueConvertedSize',String(convertedSize));
  const convertedSupply = Number(localStorage.getItem('valueScaledSupply')) / 60.0 / 60.0;
  localStorage.setItem('valueConvertedSupply',String(convertedSupply));
  
  //calculating proportioned values
  const proportionedSlope = (Number(localStorage.getItem('valueConvertedSlope'))) ** 2;
  localStorage.setItem('valueProportionedSlope',String(proportionedSlope));
  const proportionedFlow = (Number(localStorage.getItem('valueConvertedFlow'))) ** 2;
  localStorage.setItem('valueProportionedFlow',String(proportionedFlow));
  const proportionedSize = (Number(localStorage.getItem('valueConvertedSize'))) ** (1.5);
  localStorage.setItem('valueProportionedSize',String(proportionedSize));
  localStorage.setItem('valueProportionedSupply',String(localStorage.getItem('valueConvertedSupply')));
  
  //calculate transport and supply products
  const transportProduct_part1 = (Number(localStorage.getItem('valueProportionedSlope')) * Number(localStorage.getItem('valueProportionedFlow')));
  const transportProduct = transportProduct_part1 / Number(localStorage.getItem('valueProportionedSize'));
  localStorage.setItem('valueProductTransport',String(transportProduct));
  localStorage.setItem('valueProductSupply',String(localStorage.getItem('valueConvertedSupply')));
  
  //calculate transport and supply constants
  const transportConstantCalc = Number(localStorage.getItem('valueProductSupply')) / Number(localStorage.getItem('valueProductTransport'));
  localStorage.setItem('valueConstantTransportCalc',String(transportConstantCalc));
  const supplyConstantCalc = 1.0 / Number(localStorage.getItem('valueProductSupply'));
  localStorage.setItem('valueConstantSupplyCalc',String(supplyConstantCalc));
  
  //add benchmark constant values if not present in local storage
  if(stableOption === "stable") {
    localStorage.setItem('valueConstantTransport', String(transportConstantCalc));
    localStorage.setItem('valueConstantSupply', String(supplyConstantCalc));
  }
  
  //calculate precursor values for calculation of the percent sediment continuity balance
  const transportBalanceCalc_part1 = Number(localStorage.getItem('valueProductTransport')) * Number(localStorage.getItem('valueConstantTransport'));
  const transportBalanceCalc = transportBalanceCalc_part1 * Number(localStorage.getItem('valueConstantSupply'));
  localStorage.setItem('valueBalanceTransport', String(transportBalanceCalc));
  const supplyBalanceCalc = Number(localStorage.getItem('valueProductSupply')) * Number(localStorage.getItem('valueConstantSupply'));
  localStorage.setItem('valueBalanceSupply', String(supplyBalanceCalc));
  
  //calculate the percent sediment continuity balance
  const balanceContinuityPercent = (Number(localStorage.getItem('valueBalanceSupply')) - Number(localStorage.getItem('valueBalanceTransport'))) * 100.0;
  const balanceContinuityPercentRounded = Math.round(balanceContinuityPercent)
  localStorage.setItem('calcBalancePercent', String(balanceContinuityPercentRounded));
  
  //Calculate the angle to represent the sediment Continuity Percent in the Lane's Balance Scale Page:
  //Note:  The calculated % ratio is multiplied by 0.4 to get the angle value for the Lane's Balance Scale.
  let angleCalc = Number(localStorage.getItem('calcBalancePercent')) * 0.4;
  localStorage.setItem('calcAngle',angleCalc);
  updateLanesBalanceScaleChart();
}

function updateLanesBalanceScaleChart() {
  // Update the static portions of the Lane's Balance, Balance Scale Graphic Chart here
  
  //1. Clear canvas
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  
  //2. Create path for the base
  //The horizontal part of the base is 3.6" in width and 0.2" in thickness
  //The vertical part of the base is 3.6" in width and 0.2" in thickness
  //The color is RGB (0, 112, 172)
  //The required height for the whole balance scale is 3.6" + 0.2" + 1.7" = 5.5"
  //The canvas = 690px X 690px; balance height = 528 pixels
  //Base height = 3.8" = 365 px; thickness = 0.2" = 20px; width = 3.6" = 346 pixels
  //Midpoint canvas = 345px, 345px; Base Bottom y = 345 + 528/2 = 609 px
  //Base Right x = 345 + 346/2 = 518 px; base bottom right = 518, 609; hor. base right top = 518, 609-20 = 589
  //right point for bottom of vertical base x = 518 - 346/2 + 20 = x = 355; y = 589
  //right point for top of vertical base = 589 - 346 = y = 243, x = 355;
  //left point for top of vertical base = x = 355 - 20 = 335
  //left point for bottom of vertical base = x = 335, y = 589
  //left point for top of horizontal base = x = 518 - 346 = 172; y = 589
  localStorage.setItem('graphBaseBottomY', '609')
  ctx.fillStyle = "rgb(0, 112, 172)";
  ctx.beginPath();
  //horizontal base right bottom point
  ctx.moveTo(518, 609);
  //horizontal base right top point
  ctx.lineTo(518, 589);
  //vertical base bottom right point
  ctx.lineTo(355, 589);
  //vertical base top right point
  ctx.lineTo(355, 243);
  //vertical base top left point
  ctx.lineTo(335, 243);
  //vertical base bottom left point
  ctx.lineTo(335, 589);
  //horizontal base left top point
  ctx.lineTo(172, 589);
  //horizontal base left bottom point
  ctx.lineTo(172, 609);
  //horizontal base right bottom point
  ctx.lineTo(518, 609);
  ctx.fill();
  
  //2. Create circular path for connecting point of base to scale pointer and balance scale bar
  //diameter = 20, radius = 10 center x = 345, y = 243  + 48 = 291; 
  //Make a black line for the circular connecting point
  //ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.strokeStyle = "rgb(100, 100, 100)";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  //ctx.arc(345, 291, 8, degToRad(0), degToRad(360), false);
  ctx.arc(345, 291, 6, degToRad(0), degToRad(360), false);
  //ctx.lineWidth = 3;
  //ctx.stroke();
  ctx.fill();
  const scaleCenterX = 345;
  const scaleCenterY = 291;
  localStorage.setItem('graphScaleCenterX', scaleCenterX);
  localStorage.setItem('graphScaleCenterY', scaleCenterY);
  
  //3. Make the base for the scale speedometer 
  //Needs to cover the extent of the scale speedometer arc from -35 to 35 degrees.
  //Add 20 pixels on the sides and 30 pixels above and below.  
  //Center x = 345; pointer length = 164;
  //arcHoriz = the arc horizontal distance from the center.
  //arcVert = the vertical distance from the connecting point to the highest point on the arc
  //baseScaleTop = the y point for the top of the base for the scale speedometer
  //baseScaleBottom = the y point for the bottom of the base 
  //baseScaleRight = the x point for the right side of the base for the scale speedometer
  //baseScaleRight = the x point for the right side of the base for the scale speedometer
  const arcHoriz = Math.sin(degToRad(40)) * 164;
  const arcVert = Math.cos(degToRad(40)) * 164;
  const baseScaleTop = 291 + arcVert - 30;
  const baseScaleBottom = 291 + 164 + 30;
  const baseScaleRight = 345 + arcHoriz + 30;
  const baseScaleLeft = 345 - arcHoriz - 30;
  ctx.fillStyle = "rgb(170, 170, 170)";
  ctx.beginPath();
  ctx.moveTo(baseScaleRight, baseScaleTop);
  ctx.lineTo(baseScaleRight, baseScaleBottom);
  ctx.lineTo(baseScaleLeft, baseScaleBottom);
  ctx.lineTo(baseScaleLeft, baseScaleTop);
  ctx.lineTo(baseScaleRight, baseScaleTop);
  ctx.fill();
  
  //4. Make an Arc for the Scale Speedometer 
  //Center is at the same point as the connecting point center  
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.arc(345, 291, 164, degToRad(50), degToRad(130), false);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //5. Add tic marks for the arc for the scale speedometer 
  //Add tics at 0, 25, 50, 75, 100 % (at 0, 10, 20, 30, & 40 degrees)
  //for 100%, 40 degrees
  let x100pt1 = Math.sin(degToRad(40)) * 164 + 345;
  let x100pt2 = Math.sin(degToRad(40)) * 174 + 345;
  let y100pt1 = Math.cos(degToRad(40)) * 164 + 291;
  let y100pt2 = Math.cos(degToRad(40)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = Math.sin(degToRad(40)) * 179 + 345;
  y100pt2 = Math.cos(degToRad(40)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("100", x100pt2, y100pt2);
  ctx.fillText("100", x100pt2, y100pt2);
  
  //line to show aggradation side
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(345 + 10, 291 + 164 + 25);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for aggradation label
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("AGGRADATION", 345 + 22, 291 + 164 + 25 - 5);
  ctx.fillText("AGGRADATION", 345 + 22, 291 + 164 + 25 - 5);
  
  //for arrowhead
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt2, 291 + 164 + 25);
  ctx.lineTo(x100pt2 - 10, 291 + 164 + 25 - 5);
  ctx.lineTo(x100pt2 - 10, 291 + 164 + 25 + 10);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.fill();
  
  //for 75%, 30 degrees
  x100pt1 = Math.sin(degToRad(30)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(30)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(30)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(30)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for 50%, 20 degrees
  x100pt1 = Math.sin(degToRad(20)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(20)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(20)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(20)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = Math.sin(degToRad(20)) * 184 + 345;
  y100pt2 = Math.cos(degToRad(20)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("50", x100pt2, y100pt2);
  ctx.fillText("50", x100pt2, y100pt2);
  
  //for 25%, 10 degrees
  x100pt1 = Math.sin(degToRad(10)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(10)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(10)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(10)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for 0%, 0 degrees
  x100pt1 = Math.sin(degToRad(0)) * 164 + 345;
  x100pt2 = Math.sin(degToRad(0)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(0)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(0)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = Math.sin(degToRad(0)) * 184 + 342;
  y100pt2 = Math.cos(degToRad(0)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("0", x100pt2, y100pt2);
  ctx.fillText("0", x100pt2, y100pt2);
  
  //for -100%, -40 degrees
  x100pt1 = -Math.sin(degToRad(40)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(40)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(40)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(40)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = -Math.sin(degToRad(40)) * 194 + 345;
  y100pt2 = Math.cos(degToRad(40)) * 194 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("-100", x100pt2, y100pt2);
  ctx.fillText("-100", x100pt2, y100pt2);
  
  //line to show degradation side
  x100pt2 = -Math.sin(degToRad(40)) * 179 + 345;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(345 - 10, 291 + 164 + 25);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for degradation label
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("DEGRADATION", 345 - 95, 291 + 164 + 25 - 5);
  ctx.fillText("DEGRADATION", 345 - 95, 291 + 164 + 25 - 5);
  
  //for arrowhead
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt2, 291 + 164 + 25);
  ctx.lineTo(x100pt2 + 10, 291 + 164 + 25 - 5);
  ctx.lineTo(x100pt2 + 10, 291 + 164 + 25 + 10);
  ctx.lineTo(x100pt2, 291 + 164 + 25);
  ctx.fill();
  
  //for 75%, 30 degrees
  x100pt1 = -Math.sin(degToRad(30)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(30)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(30)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(30)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  //for 50%, 20 degrees
  x100pt1 = -Math.sin(degToRad(20)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(20)) * 174 + 345;
  y100pt1 = Math.cos(degToRad(20)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(20)) * 174 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  x100pt2 = -Math.sin(degToRad(20)) * 194 + 345;
  y100pt2 = Math.cos(degToRad(20)) * 184 + 291;
  ctx.fillStyle = "black";
  ctx.font = "10px arial";
  //ctx.strokeText("-50", x100pt2, y100pt2);
  ctx.fillText("-50", x100pt2, y100pt2);
  
  //for 25%, 10 degrees
  x100pt1 = -Math.sin(degToRad(10)) * 164 + 345;
  x100pt2 = -Math.sin(degToRad(10)) * 169 + 345;
  y100pt1 = Math.cos(degToRad(10)) * 164 + 291;
  y100pt2 = Math.cos(degToRad(10)) * 169 + 291;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(x100pt1, y100pt1);
  ctx.lineTo(x100pt2, y100pt2);
  ctx.lineWidth = 1;
  ctx.stroke();
  
  updateScaleBar();
  
}

function updateScaleBar() {
  
  const centerScaleX = Number(localStorage.getItem('graphScaleCenterX'));
  const centerScaleY = Number(localStorage.getItem('graphScaleCenterY'));
  const scaleBarAngle = Number(localStorage.getItem('calcAngle'));
  const scaleBarCenterX = Number(localStorage.getItem('graphScaleCenterX'));
  const scaleBarCenterY = Number(localStorage.getItem('graphScaleCenterY'));
  const centerScaleBarWidth = 326;
  const ScaleBarThickness = 34;
  //const sideScaleBarWidth = 248;
  const sideScaleBarWidth = 180;
  
  //middle part of balance scale bar (rotates)
  const centerScaleBarRightMiddleX = centerScaleX + Math.cos(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarRightMiddleY = centerScaleY - Math.sin(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarRightBottomX = centerScaleBarRightMiddleX + Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarRightBottomY = centerScaleBarRightMiddleY + Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarRightTopX = centerScaleBarRightMiddleX - Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarRightTopY = centerScaleBarRightMiddleY - Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftMiddleX = centerScaleX - Math.cos(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarLeftMiddleY = centerScaleY + Math.sin(degToRad(scaleBarAngle))*(centerScaleBarWidth/2);
  const centerScaleBarLeftBottomX = centerScaleBarLeftMiddleX + Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftBottomY = centerScaleBarLeftMiddleY + Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftTopX = centerScaleBarLeftMiddleX - Math.sin(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  const centerScaleBarLeftTopY = centerScaleBarLeftMiddleY - Math.cos(degToRad(scaleBarAngle))*(ScaleBarThickness/2);
  
  //right part of balance scale bar (does not rotate)
  const rightSideBarLeftTopX = centerScaleBarRightMiddleX;
  const rightSideBarLeftTopY = centerScaleBarRightMiddleY - ScaleBarThickness/2;
  const rightSideBarLeftBottomX = centerScaleBarRightMiddleX;
  const rightSideBarLeftBottomY = centerScaleBarRightMiddleY + ScaleBarThickness/2;
  const rightSideBarRightTopX = centerScaleBarRightMiddleX + sideScaleBarWidth;
  const rightSideBarRightTopY = centerScaleBarRightMiddleY - ScaleBarThickness/2;
  const rightSideBarRightBottomX = centerScaleBarRightMiddleX + sideScaleBarWidth;
  const rightSideBarRightBottomY = centerScaleBarRightMiddleY + ScaleBarThickness/2;
  
  //left part of balance scale bar (does not rotate)
  const leftSideBarLeftTopX = centerScaleBarLeftMiddleX - sideScaleBarWidth;
  const leftSideBarLeftTopY = centerScaleBarLeftMiddleY - ScaleBarThickness/2;
  const leftSideBarLeftBottomX = centerScaleBarLeftMiddleX - sideScaleBarWidth;
  const leftSideBarLeftBottomY = centerScaleBarLeftMiddleY + ScaleBarThickness/2;
  const leftSideBarRightTopX = centerScaleBarLeftMiddleX;
  const leftSideBarRightTopY = centerScaleBarLeftMiddleY - ScaleBarThickness/2;
  const leftSideBarRightBottomX = centerScaleBarLeftMiddleX;
  const leftSideBarRightBottomY = centerScaleBarLeftMiddleY + ScaleBarThickness/2;
  
  //connects the inner edge of the left balance bar to the inner edge of the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftBottomX, leftSideBarLeftBottomY);
  ctx.lineTo(leftSideBarRightBottomX, leftSideBarRightBottomY);
  ctx.lineTo(rightSideBarLeftBottomX, rightSideBarLeftBottomY);
  ctx.lineTo(rightSideBarRightBottomX, rightSideBarRightBottomY);
  ctx.lineTo(rightSideBarRightTopX, rightSideBarRightTopY);
  ctx.lineTo(rightSideBarLeftTopX, rightSideBarLeftTopY);
  ctx.lineTo(leftSideBarRightTopX, leftSideBarRightTopY);
  ctx.lineTo(leftSideBarLeftTopX, leftSideBarLeftTopY);
  ctx.lineTo(leftSideBarLeftBottomX, leftSideBarLeftBottomY);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws a vertical line on the inner edge of the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarLeftTopX, rightSideBarLeftTopY);
  ctx.lineTo(rightSideBarLeftBottomX, rightSideBarLeftBottomY);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws a vertical line on the inner edge of the left balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarRightTopX, leftSideBarRightTopY);
  ctx.lineTo(leftSideBarRightBottomX, leftSideBarRightBottomY);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //puts text in the right balance bar - "INCREASING SLOPE"
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("INCREASING SLOPE", rightSideBarLeftBottomX + 5, rightSideBarLeftBottomY - 5);
  ctx.fillText("INCREASING SLOPE", rightSideBarLeftBottomX + 5, rightSideBarLeftBottomY - 5);
  //draws a horizontal arrow in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarRightBottomX - 70, rightSideBarLeftBottomY - 10);
  ctx.lineTo(rightSideBarRightBottomX - 10, rightSideBarLeftBottomY - 10);
  ctx.lineWidth = 2;
  ctx.stroke();
  //draws an arrowhead on the horizontal line in the right balance bar
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarRightBottomX - 10, rightSideBarLeftBottomY - 10);
  ctx.lineTo(rightSideBarRightBottomX - 20, rightSideBarLeftBottomY - 15);
  ctx.lineTo(rightSideBarRightBottomX - 20, rightSideBarLeftBottomY -5);
  ctx.lineTo(rightSideBarRightBottomX - 10, rightSideBarLeftBottomY - 10);
  ctx.fill();
  //draws tic mark 1 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarLeftTopX + 40, rightSideBarLeftTopY);
  ctx.lineTo(rightSideBarLeftTopX + 40, rightSideBarLeftTopY + 5);
  ctx.lineWidth = 2;
  ctx.stroke();
  //puts tic mark text 1 in the right side bar
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("0.01", rightSideBarLeftTopX + 40 - 10, rightSideBarLeftTopY + 15);
  ctx.fillText("0.01", rightSideBarLeftTopX + 40 - 10, rightSideBarLeftTopY + 15);
  //draws tic mark 2 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(rightSideBarRightTopX - 40, rightSideBarRightTopY);
  ctx.lineTo(rightSideBarRightTopX - 40, rightSideBarRightTopY + 5);
  ctx.lineWidth = 2;
  //puts tic mark text 2 in the right side bar
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("1.0", rightSideBarRightTopX - 40 - 10, rightSideBarLeftTopY + 15);
  ctx.fillText("1.0", rightSideBarRightTopX - 40 - 10, rightSideBarLeftTopY + 15);
  
  //puts text in the left balance bar - "INCREASING SED SIZE"
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("INCREASING SED SIZE", leftSideBarLeftBottomX + 60, leftSideBarLeftBottomY - 5);
  ctx.fillText("INCREASING SED SIZE", leftSideBarLeftBottomX + 60, leftSideBarLeftBottomY - 5);
  //draws a horizontal arrow in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftBottomX + 55, leftSideBarLeftBottomY - 10);
  ctx.lineTo(leftSideBarLeftBottomX + 5, leftSideBarLeftBottomY - 10);
  ctx.lineWidth = 2;
  ctx.stroke();
  //draws an arrowhead on the horizontal line in the right balance bar
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftBottomX + 5, leftSideBarLeftBottomY - 10);
  ctx.lineTo(leftSideBarLeftBottomX + 15, leftSideBarLeftBottomY - 5);
  ctx.lineTo(leftSideBarLeftBottomX + 15, leftSideBarLeftBottomY -15);
  ctx.lineTo(leftSideBarLeftBottomX + 5, leftSideBarLeftBottomY - 10);
  ctx.fill();
  //draws tic mark 1 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarLeftTopX + 40, leftSideBarLeftTopY);
  ctx.lineTo(leftSideBarLeftTopX + 40, leftSideBarLeftTopY + 5);
  ctx.lineWidth = 2;
  ctx.stroke();
  //puts tic mark text 1 in the right side bar
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("110", leftSideBarLeftTopX + 40 - 10, leftSideBarLeftTopY + 15);
  ctx.fillText("110", leftSideBarLeftTopX + 40 - 10, leftSideBarLeftTopY + 15);
  //draws tic mark 2 in the right balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(leftSideBarRightTopX - 40, leftSideBarRightTopY);
  ctx.lineTo(leftSideBarRightTopX - 40, leftSideBarRightTopY + 5);
  ctx.lineWidth = 2;
  ctx.stroke();
  //puts tic mark text 2 in the right side bar
  ctx.fillStyle = "white";
  ctx.font = "10px arial";
  //ctx.strokeText("2", leftSideBarRightTopX - 40 - 3, leftSideBarRightTopY + 15);
  ctx.fillText("2", leftSideBarRightTopX - 40 - 3, leftSideBarRightTopY + 15);
  
  //put in vertical connector to the weight on left side bar
  const connectorX = -((leftSideBarRightBottomX - leftSideBarLeftBottomX - 80) / (110 - 2)) * (Number(localStorage.getItem('valueSize')) - 2) + (leftSideBarRightBottomX - 40);
  //draws weight connector to the left balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX, leftSideBarRightBottomY);
  ctx.lineTo(connectorX, leftSideBarRightBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //put in vertical connector to the weight on right side bar
  const connectorX2 = ((rightSideBarRightBottomX - rightSideBarLeftBottomX - 80) / (1 - 0.01)) * (Number(localStorage.getItem('valueSlope')) - 0.01) + (rightSideBarLeftBottomX + 40);
  //draws weight connector to the left balance bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX2, rightSideBarLeftBottomY);
  ctx.lineTo(connectorX2, rightSideBarLeftBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //put in weight on the left side bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX - 40, leftSideBarRightBottomY + 40);
  ctx.lineTo(connectorX + 40, leftSideBarRightBottomY + 40);
  ctx.lineTo(connectorX + 40, leftSideBarRightBottomY + 120);
  ctx.lineTo(connectorX - 40, leftSideBarRightBottomY + 120);
  ctx.lineTo(connectorX - 40, leftSideBarRightBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //put in weight on the right side bar
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX2 - 40, rightSideBarRightBottomY + 40);
  ctx.lineTo(connectorX2 + 40, rightSideBarRightBottomY + 40);
  ctx.lineTo(connectorX2 + 40, rightSideBarRightBottomY + 120);
  ctx.lineTo(connectorX2 - 40, rightSideBarRightBottomY + 120);
  ctx.lineTo(connectorX2 - 40, rightSideBarRightBottomY + 40);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //puts weight text in the supply weight
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  let textSupply = "SUPPLY = ";
  //ctx.strokeText(textSupply, connectorX - 20, leftSideBarRightBottomY + 65);
  ctx.fillText(textSupply, connectorX - 30, leftSideBarRightBottomY + 65);
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  textSupply = localStorage.getItem('valueSupply');
  //ctx.strokeText(textSupply, connectorX - 10, leftSideBarRightBottomY + 85);
  ctx.fillText(textSupply, connectorX - 13, leftSideBarRightBottomY + 85);
  
  //draws a vertical arrow in the supply weight
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX, leftSideBarRightBottomY + 95);
  ctx.lineTo(connectorX, leftSideBarRightBottomY + 115);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws an arrowhead on the supply weight arrow
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX, leftSideBarRightBottomY + 115);
  ctx.lineTo(connectorX + 5, leftSideBarRightBottomY + 105);
  ctx.lineTo(connectorX - 5, leftSideBarRightBottomY + 105);
  ctx.lineTo(connectorX, leftSideBarRightBottomY + 115);
  ctx.fill();
  
  //puts weight text in the flow weight
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  let textFlow = "FLOW = ";
  //ctx.strokeText(textFlow, connectorX2 - 20, rightSideBarRightBottomY + 65);
  ctx.fillText(textFlow, connectorX2 - 25, rightSideBarRightBottomY + 65);
  ctx.fillStyle = "white";
  ctx.font = "12px arial";
  textFlow = localStorage.getItem('valueFlow');
  //ctx.strokeText(textFlow, connectorX2 - 10, rightSideBarRightBottomY + 85);
  ctx.fillText(textFlow, connectorX2 - 13, rightSideBarRightBottomY + 85);
  
  //draws a vertical arrow in the flow weight
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX2, rightSideBarRightBottomY + 95);
  ctx.lineTo(connectorX2, rightSideBarRightBottomY + 115);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  //draws an arrowhead on the flow weight arrow
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(connectorX2, rightSideBarRightBottomY + 115);
  ctx.lineTo(connectorX2 + 5, rightSideBarRightBottomY + 105);
  ctx.lineTo(connectorX2 - 5, rightSideBarRightBottomY + 105);
  ctx.lineTo(connectorX2, rightSideBarRightBottomY + 115);
  ctx.fill();
  
  //draws a line for the scale pointer
  ctx.strokeStyle = "rgb(125, 125, 125)";
  ctx.beginPath();
  ctx.moveTo(centerScaleX, centerScaleY);
  const pointerLength = 164
  const pointerX = pointerLength * Math.sin(degToRad(scaleBarAngle)) + centerScaleX;
  const pointerY = pointerLength * Math.cos(degToRad(scaleBarAngle)) + centerScaleY;
  ctx.lineTo(pointerX, pointerY);
  ctx.lineWidth = 5;
  ctx.stroke();
  
  //draw an arrowhead for the scale pointer
  //point 1 for the arrow head is the end of the pointer, pointerX and pointerY
  //Use an equilateral triangle with the 1st point as the pointer end and the other two points
  //perpendicular to a point 20 pixels closer to the pointer start point.
  //first get the coordinates for the two points perpendicular to the pointer.
  const arrowPointX1 = pointerX;
  const arrowPointY1 = pointerY;
  //use an arrow that is an equilateral triangle 20 points per side
  //get the point on the pointer that is 20 points from the end, closer to the start
  const arrowPointX0 = (pointerLength - 16) * Math.sin(degToRad(scaleBarAngle)) + centerScaleX;
  const arrowPointY0 = (pointerLength - 16) * Math.cos(degToRad(scaleBarAngle)) + centerScaleY;
  //get point 2 that is counter clockwise of point 0
  const arrowPointX2 = arrowPointX0 + Math.cos(degToRad(scaleBarAngle))*8;
  const arrowPointY2 = arrowPointY0 - Math.sin(degToRad(scaleBarAngle))*8;
  //get point 3 that is clockwise of point 0
  const arrowPointX3 = arrowPointX0 - Math.cos(degToRad(scaleBarAngle))*8;
  const arrowPointY3 = arrowPointY0 + Math.sin(degToRad(scaleBarAngle))*8;
  //Create arrowhead with the 3 points
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(arrowPointX1, arrowPointY1);
  ctx.lineTo(arrowPointX2, arrowPointY2);
  ctx.lineTo(arrowPointX3, arrowPointY3);
  ctx.lineTo(arrowPointX1, arrowPointY1);
  //ctx.stroke();
  ctx.fill();
  
  //Add text below the base
  //Supply (Aggradation) vs. Transport (Degradation) - localStorage.setItem('calcBalancePercent','45.0')
  const baseScaleBottomY = Number(localStorage.getItem('graphBaseBottomY'));
  const balancePercent = localStorage.getItem('calcBalancePercent');
  //20241125:  Change the Base text from "Supply (Aggradation) vs. Transport (Degradation)"; to "Transport (Degradation) vs. Supply (Aggradation)";
  //let belowBaseText = "Supply (Aggradation) vs. Transport (Degradation)";
  let belowBaseText = "Transport (Degradation) vs. Supply (Aggradation)";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(belowBaseText, centerScaleX - 150, baseScaleBottomY + 30);
  belowBaseText = balancePercent + "%";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(belowBaseText, centerScaleX - 20, baseScaleBottomY + 60);
  
  //add text above the scale
  let aboveScaleText = "Lane's Dynamic Equilibrium Balance Scale";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(aboveScaleText, centerScaleX - 145, 20);
  aboveScaleText = "Sediment Supply (Qs) * Sediment Size (d50) ~ Flow Rate (Q) * Slope (S)";
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillStyle = "white";
  ctx.font = "14px arial";
  ctx.fillText(aboveScaleText, centerScaleX - 290, 50);
  

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
  updateObjects('default');
} else {
  populateStorage();
  updateObjects('default');
}

/* Set reference to and populate 8 input text boxes upon opening the web page.
*/
//const watershedText1 = document.querySelector('.watershedText1');
//const watershedText2 = document.querySelector('.watershedText2');
//const watershedText3 = document.querySelector('.watershedText3');
//const watershedText4 = document.querySelector('.watershedText4');
//const watershedText5 = document.querySelector('.watershedText5');
//const watershedText6 = document.querySelector('.watershedText6');
//const watershedText7 = document.querySelector('.watershedText7');
//const watershedText8 = document.querySelector('.watershedText8');
//watershedText1.value = '1';
//watershedText2.value = '2';
//watershedText3.value = '3';
//watershedText4.value = '4';
//watershedText5.value = '5';
//watershedText6.value = '6';
//watershedText7.value = '7';
//watershedText8.value = '8';

/* Get reference to the "Setup" button and 
adds an Event listener and function for the "setup" button click event.
Calls the "populateStorage" function, which sets the default values in the database.
*/
const buttonSetup = document.querySelector('.buttonSetup');
buttonSetup.addEventListener("click", (event) => {
  //if (watershedText4.value === '4') {
  //  watershedText1.value = '';
  //  watershedText2.value = '';
  //  watershedText3.value = '';
  //  watershedText4.value = '';
  //  watershedText5.value = '';
  //  watershedText6.value = '';
  //  watershedText7.value = '';
  //  watershedText8.value = '';
  //} else {
  //  watershedText1.value = '1';
  //  watershedText2.value = '2';
  //  watershedText3.value = '3';
  //  watershedText4.value = '4';
  //  watershedText5.value = '5';
  //  watershedText6.value = '6';
  //  watershedText7.value = '7';
  //  watershedText8.value = '8';
  //}
  // Set the default values with the current slider & select values
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
const buttonReset = document.querySelector('.buttonReset');
buttonReset.addEventListener('click', resetDefault);

//sets reference to the "set watershed" button
//calls the "resetOriginal" function
const buttonExcel = document.querySelector('.buttonExcel');
buttonExcel.addEventListener('click', resetOriginal);

//sets reference to the "set default watershed" button
//calls the "resetWatershedDefault" function
const buttonDefault = document.querySelector('.buttonDefault');
buttonDefault.addEventListener('click', resetWatershedDefault);

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