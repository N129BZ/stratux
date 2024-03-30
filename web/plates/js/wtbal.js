angular.module('appControllers').controller('WtBalCtrl', WtBalCtrl); // get the main module contollers set
WtBalCtrl.$inject = ['$rootScope', '$scope', '$state', '$http', '$interval']; // Inject my dependencies

var saveBtn = document.getElementById("savebutton");
var container = document.getElementById("container");
var maxgross = document.getElementById("mgw"); 
var mycog = document.getElementById("myplane");

var lmWt = document.getElementById("lm"); 
var lmArm = document.getElementById("lma");
var lmMoment = document.getElementById("lmm");

var rmWt = document.getElementById("rm") 
var rmArm = document.getElementById("rma");
var rmMoment = document.getElementById("rmm");

var noseWt = document.getElementById("nw");
var noseArm = document.getElementById("nwa");
var noseMoment = document.getElementById("nwm"); 

var emptyWt = document.getElementById("ewt"); 
var emptyCG = document.getElementById("ecg");
var emptyMoment = document.getElementById("emom"); 

var pilotWt = document.getElementById("piw"); 
var pilotArm = document.getElementById("pia");
var pilotMoment = document.getElementById("pim");

var psgrWt = document.getElementById("paw"); 
var psgrArm = document.getElementById("paa");
var psgrMoment = document.getElementById("pam");

var rwLockWt = document.getElementById("rwl"); 
var rwLockArm = document.getElementById("rwla"); 
var rwLockMoment = document.getElementById("rwlm"); 

var lwLockWt = document.getElementById("lwl");
var lwlockArm = document.getElementById("lwla");
var lwlockMoment = document.getElementById("lwlm");

var fuelGals = document.getElementById("fig"); 
var fuelWt = document.getElementById("fwt");
var fuelArm = document.getElementById("fua"); 
var fuelMoment = document.getElementById("fum"); 

var rbagWt = document.getElementById("rb"); 
var rbagArm = document.getElementById("rba"); 
var rbagMoment = document.getElementById("rbm"); 

var totalWt = document.getElementById("totwt"); 
var totalCG = document.getElementById("totcg");
var totalMoment = document.getElementById("totmom"); 
var cog = document.getElementById("cog"); 

var weightMap = new Map();
var momentMap = new Map();


function WtBalCtrl($rootScope, $scope, $state, $http, $interval, craftService) {

}