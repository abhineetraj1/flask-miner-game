localStorage.setItem("times",0);
function change(i) {
	if (document.getElementsByClassName('bdr')[i].innerHTML == "")	{
		var a = document.createElement("img");
		if (parseInt(localStorage.times) < 5) {
			Image="/static/icons/diamond.png";
			localStorage.setItem("times",parseInt(localStorage.times)+1);
		}
		else{Image=["/static/icons/bomb.png","/static/icons/diamond.png"][Math.floor(Math.random() * 2)];}
		if (Image == "/static/icons/diamond.png") {
			document.getElementById("won").innerHTML = parseInt(document.getElementById("won").innerHTML)+250;
		} else {
			setTimeout(function () {
				document.getElementById("msg").style.display="block";
				document.getElementById("game").style.display="none";
				localStorage.setItem("times",0);
				clearBoard();
			}, 300);
			setTimeout(function () {
				document.getElementById("msg").style.display="none";
				document.getElementById("game").style.display="none";
				document.getElementById("details").style.display="block";
			}, 3000);
		}
		a.src=Image;
		a.style.height="40px";
		document.getElementsByClassName("bdr")[i].style.background="white";
		document.getElementsByClassName('bdr')[i].appendChild(a);
	} else {
		document.getElementById("err").style.display="block";
		setTimeout(function () {
			document.getElementById("err").style.display="none";
		}, 1500);
	}
}
function start_game() {
	var a = document.getElementById("coins").innerHTML;
	if (parseInt(document.getElementById("coins").innerHTML) < 500) {
		alert("You cannot play the game");
	} else{
		document.getElementById("coins").innerHTML = parseInt(a) - 500;
		localStorage.setItem("coins",parseInt(a) - 500);
		var xhr = new XMLHttpRequest();
		var frm = new FormData();
		frm.append("email",localStorage.email);
		frm.append("coins",localStorage.coins);
		xhr.open("POST","/post");
		xhr.send(frm);
		document.getElementById("won").innerHTML="0";
		document.getElementById("details").style.display="none";
		document.getElementById('game').style.display="block";
	}
}
function  Withdraw() {
	var coins = parseInt(document.getElementById("won").innerHTML) + parseInt(document.getElementById("coins").innerHTML);
	localStorage.setItem("coins",coins);
	document.getElementById("coins").innerHTML = coins;
	var xhr = new XMLHttpRequest();
	var frm = new FormData();
	frm.append("email",localStorage.email);
	frm.append("coins",localStorage.coins);
	xhr.open("POST","/post");
	xhr.send(frm);
	document.getElementById("won").innerHTML="0";
	document.getElementById("details").style.display="block";
	document.getElementById('game').style.display="none";
	clearBoard();
}
function quit() {
	var a = document.getElementById("coins").innerHTML;
	document.getElementById("coins").innerHTML = parseInt(a) + 500;
	localStorage.setItem("coins",parseInt(a) + 500);
	var xhr = new XMLHttpRequest();
	var frm = new FormData();
	frm.append("email",localStorage.email);
	frm.append("coins",localStorage.coins);
	xhr.open("POST","/post");
	xhr.send(frm);
	document.getElementById("won").innerHTML="0";
	document.getElementById("details").style.display="block";
	document.getElementById('game').style.display="none";
	clearBoard();
}
function clearBoard() {
	for (var i = document.getElementsByClassName('bdr').length - 1; i >= 0; i--) {
		document.getElementsByClassName('bdr')[i].innerHTML="";
		document.getElementsByClassName('bdr')[i].style.background="#003459";
	}
}
document.addEventListener ("keydown", function (zEvent) {
    if( (zEvent.ctrlKey &&  zEvent.shiftKey && (zEvent.key == "i") || (zEvent.key == "I"))) {
        zEvent.preventDefault();
    }
    if(zEvent.ctrlKey && (zEvent.key == "s") || (zEvent.key == "S")) {
        zEvent.preventDefault();
    }
    if(zEvent.ctrlKey) {
        zEvent.preventDefault();
    }
});
document.body.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});