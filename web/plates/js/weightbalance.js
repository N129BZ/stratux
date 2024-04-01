"use strict";

let URL_LOCATION            =  location.hostname;
let URL_PROTOCOL            =  location.protocol;
let URL_PORT                =  location.port;
let URL_HOST_BASE           =  URL_LOCATION;
if (parseInt(URL_PORT) > 0) {
    URL_HOST_BASE += `:${URL_PORT}`;
}
let URL_HOST_PROTOCOL       = `${URL_PROTOCOL}//`;
let URL_SERVER              = `${URL_HOST_PROTOCOL}${URL_HOST_BASE}`;
let URL_GET_CONFIG          = `${URL_SERVER}/getconfig`;
let URL_SAVE_CONFIG         = `${URL_SERVER}/saveconfig`;

let config = {};
/** 
 * Request settings JSON object from server
 */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       config = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", URL_GET_CONFIG, false);
xhttp.send();

let saveBtn = document.getElementById("savebutton");
let container = document.getElementById("container");
let maxgross = document.getElementById("mgw"); 
let mycog = document.getElementById("myplane");

let lmWt = document.getElementById("lm"); 
let lmArm = document.getElementById("lma");
let lmMoment = document.getElementById("lmm");

let rmWt = document.getElementById("rm") 
let rmArm = document.getElementById("rma");
let rmMoment = document.getElementById("rmm");

let noseWt = document.getElementById("nw");
let noseArm = document.getElementById("nwa");
let noseMoment = document.getElementById("nwm"); 

let emptyWt = document.getElementById("ewt"); 
let emptyCG = document.getElementById("ecg");
let emptyMoment = document.getElementById("emom"); 

let pilotWt = document.getElementById("piw"); 
let pilotArm = document.getElementById("pia");
let pilotMoment = document.getElementById("pim");

let psgrWt = document.getElementById("paw"); 
let psgrArm = document.getElementById("paa");
let psgrMoment = document.getElementById("pam");

let rwLockWt = document.getElementById("rwl"); 
let rwLockArm = document.getElementById("rwla"); 
let rwLockMoment = document.getElementById("rwlm"); 

let lwLockWt = document.getElementById("lwl");
let lwlockArm = document.getElementById("lwla");
let lwlockMoment = document.getElementById("lwlm");

let fuelGals = document.getElementById("fig"); 
let fuelWt = document.getElementById("fwt");
let fuelArm = document.getElementById("fua"); 
let fuelMoment = document.getElementById("fum"); 

let rbagWt = document.getElementById("rb"); 
let rbagArm = document.getElementById("rba"); 
let rbagMoment = document.getElementById("rbm"); 

let totalWt = document.getElementById("totwt"); 
let totalCG = document.getElementById("totcg");
let totalMoment = document.getElementById("totmom"); 
let cog = document.getElementById("cog"); 

let weightMap = new Map();
let momentMap = new Map();

window.onload = async () => {
	let pX = -100;
	for (var i = 170; i <= 555; i++) {
		momentMap.set(i, pX * 2);
		pX++;
	}
	for (var i = 720; i <= 1440; i++) {
		let pY = 362 - ((i - 720) * .6);
	 	weightMap.set(i, pY);
	}
	maxgross.value = config.maxgross;
	rmWt.value = config.rmweight;
	rmArm.value = config.rmarm;
	rmMoment.value = config.rmmoment;
	
	lmWt.value = config.lmweight;
	lmArm.value = config.lmarm;
	lmMoment.value = config.lmmoment;

	noseWt.value = config.nwweight;
	noseArm.value = config.nwarm;
	noseMoment.value = config.nwmoment;

	emptyWt.value = config.emptyweight;
	emptyCG.value = config.emptycg;
	emptyMoment.value = config.emptymoment;

	pilotWt.value = config.pilotweight;
	pilotArm.value = config.pilotarm;
	pilotMoment.value = config.pilotmoment;

	psgrWt.value = config.psgrweight;
	psgrArm.value = config.psgrarm;
	psgrMoment.value = config.psgrmoment;

	rwLockWt.value = config.rwlockweight;
	rwLockArm.value = config.rwlockarm;
	rwLockMoment.value = config.rwlockmoment;

	lwLockWt.value = config.lwlockweight;
	lwlockArm.value = config.lwlockarm;
	lwlockMoment.value = config.lwlockmoment;

	fuelGals.value = config.fuelgals;
	fuelWt.value = config.fuelweight;
	fuelArm.value = config.fuelarm;
	fuelMoment.value = config.fuelmoment;

	rbagWt.value = config.rbagweight;
	rbagArm.value = config.rbagarm;
	rbagMoment.value = config.rbagmoment;

	totalWt.value = config.emptyweight;
	totalCG.value = config.emptycg;
	totalMoment.value = config.emptymoment;

	calcWB(true);
};

function calcFuel() {
	let fgals = parseInt(fuelGals.value);
	let fwt =  fgals * 6;
	let fua = parseInt(fuelArm.value);
	let fum = fwt * fua; 
	fuelWt.value = fwt;
	fuelMoment.value = fum;
	config.fuelgals = fgals;
	config.fuelweight = fwt;
	config.fuelarm = fua;
	config.fuelmoment = fum;
	return [fwt, fum];
}

function calcWB(isOnLoad = false) {
	
	saveBtn.disabled = isOnLoad;

	let rmw = parseInt(rmWt.value);
	let rma = parseInt(rmArm.value);
	let rmm = rmw * rma;
	rmMoment.value = rmm;
	config.rmweight = rmw;
	config.rmarm = rma;
	config.rmmoment = rmm;

	let lmw = parseInt(lmWt.value)
	let lma = parseInt(lmArm.value);
	let lmm =  lmw * lma;
	lmMoment.value = lmm;
	config.lmweight = lmw;
	config.lmarm = lma;
	config.lmmoment = lmm;

	let nww = parseInt(noseWt.value);
	let nwa = parseInt(noseArm.value);
	let nwm = nww * nwa;
	noseMoment.value = nwm;
	config.nwweight = nww;
	config.nwarm = nwa;
	config.nwmoment = nwm;

	let ewt = + lmw + rmw + nww;
	let emom = lmm + rmm + nwm;
	let ecg = Math.round(emom / ewt);
	emptyWt.value = ewt;
	emptyCG.value = ecg;
	emptyMoment.value = emom; 
	config.emptyweight = ewt;
	config.emptycg = ecg;
	config.emptymoment = emom;
	
	let piw = parseInt(pilotWt.value); 
	let pia = parseInt(pilotArm.value);
	let pim = piw * pia;
	pilotMoment.value = pim;
	config.pilotweight = piw;
	config.pilotarm = pia;
	config.pilotmoment = pim;

	let paw = parseInt(psgrWt.value);
	let paa = parseInt(psgrArm.value);
	let pam = paw * paa; 
	psgrMoment.value = pam;
	config.psgrweight = paw;
	config.psgrarm = paa;
	config.psgrmoment = pam;

	let rwlw = parseInt(rwLockWt.value);
	let rwla = parseInt(rwLockArm.value);
	let rwlm = rwlw * rwla;
	rwLockMoment.value = rwlm;
	config.rwlockweight = rwlw;
	config.rwlockarm = rwla;
	config.rwlockmoment = rwlm;

	let lwlw = parseInt(lwLockWt.value); 
	let lwla = parseInt(lwlockArm.value);
	let lwlm = lwlw * lwla;
	lwlockMoment.value = lwlm;
	config.lwlockweight = lwlw;
	config.lwlockarm = lwla;
	config.lwlockmoment = lwlm;

	let fnums = calcFuel(); // returns [weight, moment]
	
	let rbw = parseInt(rbagWt.value); 
	let rba = parseInt(rbagArm.value);  
	let rbm = rbw * rba;
	rbagMoment.value = rbm;
	config.rbagweight = rbw;
	config.rbagarm = rba;
	config.rbagmoment = rbm;

	let twt = ewt + piw + paw + rwlw + lwlw + fnums[0] + rbw;
	let tmom = emom + pim + pam + rwlm + lwlm + fnums[1] + rbm;
	let tcg = Math.round(tmom / twt);
	totalWt.value = twt;
	totalCG.value = tcg;
	totalMoment.value = tmom; 
	config.totalweight = twt;
	config.totalcg = tcg;
	config.totalmoment = tmom;
	
	let cogtxt = `(${tcg}, ${twt})`
	cog.value = cogtxt;
	mycog.innerHTML = cogtxt;

	placeDot(tcg, twt);
}

function placeDot(acMoment, acWeight) {
	let color = "red";
	let x = momentMap.get(acMoment);
	let y = 362 - ((acWeight - 720) * .6); 
	console.log(`weightMap y value: ${weightMap.get(acWeight)}, calculated y value: ${y}`);
	let svg = document.getElementById("wbcontainer");
	let path = document.getElementById("wbpath");
	try {
		let point = svg.createSVGPoint();
		point.y = y; 
		point.x = x;
		const isinfill = path.isPointInFill(point);
		console.log(`Point(${point.x},${point.y} is in fill area: ${isinfill}`);

		if (isinfill) {
			color = "limegreen";
		}
	}
	catch (error) {
		console.log(error.message)
	}
	finally { 
		let dot = document.getElementById("dot");
		dot.setAttribute("style", `height:10px;width:10px;border-radius:50%;position:absolute;top:${y-5}px;left:${x-5}px;background-color:${color};`);
		//mycog.setAttribute("style", `visibility:visible;position:absolute;top:${y+10}px;left:${x-30}px;color:${color};`);
		mycog.setAttribute("style", `font-size:x-small;visibility:visible;position:absolute;top:${y+10}px;left:${x-25}px;`);
	}
}

function saveConfig() {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", URL_SAVE_CONFIG);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
	xhr.send(JSON.stringify(config));
}
