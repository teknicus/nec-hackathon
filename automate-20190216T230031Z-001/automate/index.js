var io = require('socket.io')(http);
var socket = io();
	


var cloc, dis, time, sort;




function l1()
{
	cloc="l1";
}

function l2()
{
	cloc="l2";
}

function l3()
{
	cloc="l3";
}
	
function km2()
{
	dis="2";
}

function km5()
{
	dis="5";
}

function km10()
{
	dis="10";
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

}
