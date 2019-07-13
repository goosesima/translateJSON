var elm;

elm = document.createElement('link');
elm.rel = 'stylesheet';
elm.type = 'text/css';
elm.href = 'alertsima.css';
document.getElementsByTagName('head')[0].appendChild(elm);

alert = function(t){
elm = document.createElement('div');
elm.className = 'alertsima alertsimamove';

elm.innerHTML = '<h2>Alert</h2><br><p>' + t + '</p><br><div><button>Close</button></div>';

document.getElementsByTagName('body')[0].appendChild(elm);

setTimeout(function(){elm.className = 'alertsima';},300);

elm.getElementsByTagName('button')[0].onclick = function(){

elm.className = 'alertsima alertsimamove';

setTimeout(function(){elm.parentNode.removeChild(elm);},300);
}};
