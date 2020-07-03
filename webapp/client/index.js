
var socket = io();


var cloc, dis, time, sort;


socket.on('passenger', function(msg) {
	console.log('message: ' + msg);

	var node = document.createElement("LI");
	node.classList.add("collection-item");

	node.innerHTML = msg;
	document.getElementById("pbox").appendChild(node);
});

function register() {
	var rname = document.getElementById("reg_name").value;
	var rphno = document.getElementById("reg_phno").value;
	var rlino = document.getElementById("reg_lino").value;
	var ridp = document.getElementById("reg_idp").value;
	var runame = document.getElementById("reg_uname").value;
	var rpass = document.getElementById("reg_pass").value;

	var dat = "";
	dat = rname + ","+ rphno + "," + rlino + "," + ridp + "," + runame + "," + rpass;
	console.log(dat);
	socket.emit('register', dat);
}

function login() {
	var luname = document.getElementById("login_uname").value;
	var lpass = document.getElementById("login_pass").value;

	var dat = "";
	dat = luname + "," + lpass;
	console.log(dat);
	socket.emit('login', dat);
}

socket.on('login_success', function(msg) {
	console.log('message: ' + msg);
	window.location = http://localhost:3000/index1.html";


});

function l1()
{
	cloc="marthahalli";
}

function l2()
{
	cloc="whitefield";
}

function l3()
{
	cloc="indranagar";
}
	
function km1()
{
	dis="1";
}

function km2()
{
	dis="2";
}

function km5()
{
	dis="5";
}

function t0()
{
	time="0000";
}

function t2()
{
	time="0200";
}

function t4()
{
	time="0400";
}

function t6()
{
	time="0600";
}

function t8()
{
	time="0800";
}

function t10()
{
	time="1000";
}

function t12()
{
	time="1200";
}

function t14()
{
	time="1400";
}

function t16()
{
	time="1600";
}

function t18()
{
	time="1800";
}

function t20()
{
	time="2000";
}

function t22()
{
	time="2200";
}

function send()
{
	sort =  cloc.concat(",");
	sort =  sort.concat(time);
	sort =  sort.concat(",");
	sort =  sort.concat(dis);
	
	console.log(sort);
	socket.emit('data', sort);

}
