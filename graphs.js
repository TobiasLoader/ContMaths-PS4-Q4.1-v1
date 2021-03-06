
// FUNCTIONS: LINES, CURVES
var FuncList = [f];

var lambda = 1.3; 

function f(x){return exp(lambda*(x-1)) - x}
function dfdx(x) {return lambda*exp(lambda*(x-1)) - 1}

function graph(polynomial,x){
	var expression = 0;
	var number = false;
	var store = [];
	var num = 0;
	var neg = false;
	var xTerm = false;
	var startNum = "F";
	var lastNum = "F";
	var numList = [1,0];
	function numberEnd(){
		if (number===true){
				if (store.length === 1 && store[0]==="-"){
					num = -1;
				} else {
					if (store[0]==="-"){
						store.splice(0,1);
						neg = true;
					}
					for (var k=0; k<store.length; k+=1){
						num += store[k]*Math.pow(10,k);
					}
					if (neg){
						num = -num;
					}
				}
				if (startNum===0 && !xTerm){
					numList[0] = num;
				}
				if (lastNum===polynomial[i].length-1 && xTerm){
					numList[1] = num;
				}
			}
			store = [];
			num = 0;
			number = false;
			neg = false;
			startNum = "F";
			lastNum = "F";
	}

	for (var i=0; i<polynomial.length; i+=1){
		xTerm = false;
		numList = [1,0];
		for (var j=0; j<polynomial[i].length; j+=1){
			
			if (parseInt(polynomial[i][j]) || polynomial[i][j]==="-"){
// 				print(j);
				if (startNum === "F"){
					startNum = j;
				}
				lastNum = j;
				number = true;
				if (parseInt(polynomial[i][j])) { store.push(parseInt(polynomial[i][j])); }
				else {store.push("-");}
			} else {
				numberEnd();
			}
			if (polynomial[i].length-1 === j){
				numberEnd();
			}
			if (polynomial[i][j]==="x"){
				xTerm = true;
			}
		}
		if (numList[1]===0 && xTerm){
			numList[1] = 1;
		}
		if (numList[1]===0 && !xTerm){
			numList[1] = 0;
		}
/*
		print("Coefficient",numList[0]);
		print("x",x)
		print("Exponent",numList[1]);
		print("Expression",numList[0],"*",x,"^",numList[1],"=",numList[0]*Math.pow(x,numList[1]));
		
*/expression += (numList[0])*Math.pow(x,numList[1]);
	}
	return expression;
// 	return expression;
}


// POINTS: SERIES, INDIVIDUAL POINTS

var IndiPoints = [];
var P = [];
var localRealD;

function createLocalRealD(){
	localRealD = realD;
	if (localRealD<1){
		localRealD=1/round(1/localRealD);
	} else {
		localRealD = round(localRealD);
	}
}

function GP(a,r,S,qScale){
	
	// CANNOT HAVE BOTH SUM FEATURE AND QUALITY SCALE ON AT THE SAME TIME.
	// SUM OVERIDES, SO IF CHOSEN, STANDARD QUALITY IS AUTOMATICALLY SELECTED.
	// IF NEITHER CHOSEN, STANDARD QUALITY IS AGAIN SELECTED.
	
	if (qScale && !S){
		for (var X=0; X<2*PixRealXW/localRealD; X+=1){
			if (a>PixRealY0 && a<PixRealYH) {
				P.push([X*localRealD/2,a]);
			}
			a*=pow(r,localRealD/2);
		}
	} else {
		if (S){
			var s=a;
		}
		for (var X=0; X<PixRealXW; X+=1){
			if (!S && a>PixRealY0 && a<PixRealYH) {
				P.push([X,a]);
			} else if (S && s>PixRealY0 && s<PixRealYH) {
				P.push([X,s]);
			}
			a*=r;
			if (S){
				s += a;
			}
		}
	}
}
function AP(a,d,S,qScale){
	if (qScale && !S){
		for (var X=0; X<2*PixRealXW/localRealD; X+=1){
			if (a>PixRealY0 && a<PixRealYH){
				P.push([X*localRealD/2,a]);
			}
			a+=d*localRealD/2;
		}
	} else {
		if (S){
			var s=a;
		}
		for (var X=0; X<PixRealXW; X+=1){
			if (!S && a>PixRealY0 && a<PixRealYH) {
				P.push([X,a]);
			} else if (S && s>PixRealY0 && s<PixRealYH) {
				P.push([X,s]);
			}
			a+=d;
			if (S){
				s += a;
			}
		}
	}
}



function NewtonsMethod(){
	var alpha = 1;
	var X = 0;
	P.push([X,0])
	
	for (var n=0; n<8; n+=1){
		X = X - f(X)/dfdx(X);
		P.push([X,0])
	}
}

function createPoints(){
	P = [];
	NewtonsMethod();
// 	P.concat(IndiPoints);
}