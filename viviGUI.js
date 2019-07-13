if(typeof add == 'undefined'){window.add = {};}

add.help = function(){
    console.clear(); var g = function(i){console.log(i)};

    g('What is this addJS?\n  addJS - this is a script what make add CSS, JS simpler to pages');
    g('How to use?\n  add.JS("function or URL to JS file","After load do somethings");\n  add.CSS("styles or URL to CSS file","After load do somethings");\n    Note: You can use one argument');
    g('How to connect addJS?\n\naddJS=document.createElement("script");a.src="https://simakyr.github.io/addJS/addJS.js";document.body.appendChild(a)');
    return '';
}
add.detectUrl = function(i){
  var p = document.createElement('a');
  p.href = i;
  return i == p.href;
}
add.JS = function(code,onloadCode){
  var p = document.createElement('script');
  if(add.detectUrl(code)){
    p.src = code;
  }
  else{
    p.innerHTML = code;
  }
  if(typeof onloadCode == 'function'){
    p.onload = onloadCode;
  }
  document.getElementsByTagName('body')[0].appendChild(p);
}

add.CSS = function(code,onloadCode){
  var p;
  if(add.detectUrl(code)){
    p = document.createElement('link');
    p.rel = 'stylesheet';
    p.href = code;
  }
  else{
    p = document.createElement('style');
    p.innerHTML = code;
  }
  if(typeof onloadCode == 'function'){
    p.onload = onloadCode;
  }
  document.getElementsByTagName('body')[0].appendChild(p);
}

function generateId (len) {
  return Array.from(window.crypto.getRandomValues(new Uint8Array((len || 40) / 2)), (function dec2hex(dec){return ('0' + dec.toString(16)).substr(-2)})).join('')
}

add.CSS(`
.viviGUIBtn{
  border: 0;
  padding: 0.7% 1%;
  border-radius: 100px;
  color: #fff;
  background: #1976d2;
  outline:0;
}
.viviGUIInput{
  padding: 0.7% 1%;
  border-radius: 100px;
  border: 0;
  background: #1976d2;
  outline:0;
  color: #fff;
}
.viviGUI{
  font-family: Helvetica, Sans-Serif;
}
.viviGuiHoverable{
  transition: .2s background !important;
}
.viviGuiHoverable:hover{
  background: #004a9f;
}
.viviGUIMainlayout{
  top: 0;
  left: 0;
  position: abolute;
  height: 100%;
  width: 100%;
}
.viviGUIHorizontal{
  text-align: center;
  justify-content: center;
}
.viviGUIVertical{
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}
`);

window.viviGUI = {};

viviGUI.log = function(t){ console.log('[viviGUI]: ' + t); }
viviGUI._warn = function(t){ console.warn('[viviGUI"warning]: ' + t); }
viviGUI._error = function(t){ console.error('[viviGUI"error]: ' + t); }

viviGUI.typePage = function(webpage_or_app){
  if(webpage_or_app){
    if(webpage_or_app.toLowerCase() != 'webpage'){
      add.CSS(`
        .viviGUIMainlayout{
          position: fixed !important;
        }
        p, h1, h2, h3, h4, h5, button, img {
          user-select: none !important;
          -moz-user-select: none !important;
          -khtml-user-select: none !important;
          -webkit-user-select: none !important;
          -o-user-select: none !important;
        }
          `);
    }else{

    }
  }
}
viviGUI.setTheme = function(theme){

}

viviGUI.addVerticalCentering = function(elem){
  elem.classList.add('viviGUIVertical');
}

viviGUI.addHorizontalCentering = function(elem){
  elem.classList.add('viviGUIHorizontal');
}

viviGUI.setLayout = function(layout){
  layout.classList.add('viviGUIMainlayout');
}

viviGUI.makeRounded = function(elem){
    elem.style.borderRadius = '100000px';
}

viviGUI.makeNoBorder = function(elem){
    elem.style.border = '0';
}

viviGUI.unsetLayout = function(layout){
  layout.classList.remove('viviGUIMainlayout');
}

viviGUI.setPadding = function(elem, padding){
  elem.style.padding = padding;
}

viviGUI.setMargin = function(elem, margin){
  elem.style.margin = margin;
}

viviGUI.setHeight = function(elem, height){
  elem.style.height = height;
}

viviGUI.setWidth = function(elem, width){
  elem.style.width = width;
}

viviGUI.setElementHeight = function(elem, height){
  elem.height = height;
}

viviGUI.setElementWidth = function(elem, width){
  elem.width = width;
}
viviGUI.newLayout = function(){
  return document.createElement('div');
}

viviGUI.addToLayout = function(layout, elem){
  layout.appendChild(elem);
}

viviGUI.moveLayoutToXYAnimation = function(layout, x, y, second){
  var p = 'g' + generateId(128);
  add.CSS('.' + p + '{position: absolute;top:' + y + ' !important;left:' + x + ' !important;transition:' + second + 's; }');
  layout.classList.add(p);
}

viviGUI.makeHoverabre = function(elem){
  elem.classList.add('viviGuiHoverable');
}
viviGUI.newButton = function(name, onclick){
  var p = document.createElement('button');
  p.classList.add('viviGUI');
  p.classList.add('viviGUIBtn');
  p.innerText = name;
  p.onclick = onclick;
  viviGUI.makeHoverabre(p);
  return p;
}

viviGUI.newImg = function(src, name, onclick, hoverable){
  var p = document.createElement('img');
  p.alt = name;
  p.src = src;
  p.onclick = onclick;
  if(hoverable) viviGUI.makeHoverabre(p);
  return p;
}

viviGUI.newP = function(text, onclick){
  var p = document.createElement('p');
  p.classList.add('viviGUI');
  p.innerText = name;
  p.onclick = onclick;
  return p;
}

viviGUI.newLink = function(text, url, onclick){
  var p = document.createElement('a');
  p.classList.add('viviGUI');
  if(text){
    p.innerText = text;
  }else{
    viviGUI.error('viviGUI.newLink: You can\'t use this function without Name argument!');
  }
  p.onclick = onclick;
  if((typeof url).toLowerCase() == 'string'){
    p.href = url;
    return p;
  }else{
    viviGUI.error('viviGUI.newLink: You can\'t use this function without URL argument!');
  }
}

viviGUI.newBoldText = function(text, onclick){
  var p = document.createElement('b');
  p.classList.add('viviGUI');
  p.innerText = text;
  p.onclick = onclick;
  return p;
}

viviGUI.newText = function(text, onclick){
  var p = document.createElement('span');
  p.classList.add('viviGUI');
  p.innerText = text;
  p.onclick = onclick;
  return p;
}

viviGUI.newHeadText = function(size, name, onclick){
  if((typeof size).toLowerCase() == 'number'){
    if(0 < size && 7 > size){
      var p = document.createElement('h' + size);
      p.innerText = name;
      p.onclick = onclick;
      p.classList.add('viviGUI');
      return p;
    }else{
      viviGUI._error('viviGUI.newHeadText: You are using soo big or small size, please use in range from 1 to 6.')
    }
  }else{
    viviGUI._warn('viviGUI.newHeadText: Please use size as Number not an String, use Number(\'My string 84848\')');
  }
}

viviGUI.newA = viviGUI.newLink;
viviGUI.newB = viviGUI.newBoldText;

viviGUI.setOpacity = function(elem, value){
  if(!elem){ viviGUI._error('viviGUI.setOpacity: What you element or layout?') }
  else{
    if((typeof value).toLowerCase() == 'number'){
      elem.style.opacity = value/100;
    }else{
      viviGUI._error('viviGUI.setOpacity: Use Number type value');
    }
  }
}

viviGUI.setBlockOrInline = function(elem,type){
  if(!elem){ viviGUI._error('viviGUI.setBlockOrInline: What you element or layout?') }
  else{
    elem.style.display = type.toLowerCase();
  }
}

viviGUI.setBackground = function(elem, hex){
  if(!elem){ viviGUI._error('viviGUI.setBackground: What you element or layout?') }
  else{
    elem.style.background = hex;
  }
}

viviGUI.setTextColor = function(elem, hex){
  if(!elem){ viviGUI._error('viviGUI.setTextColor: What you element or layout?') }
  else{
    elem.style.color = hex;
  }
}

viviGUI.setSizeFont = function(elem,size){
  elem.style.fontSize = size;
}

viviGUI.newLine = function(){
  return document.createElement('br');
}

viviGUI.setColor = viviGUI.setTextColor;

viviGUI.setVisibility = function(elem, gone_or_visible_or_invisible){
  if(!elem){ viviGUI._error('viviGUI.setVisibility: What you element or layout?') }
  else{
     if(gone_or_visible_or_invisible){
       var type = gone_or_visible_or_invisible.toLowerCase();
       if(type){
         elem.style.display = 'block';
         elem.style.visibility = 'visible';
        if(type == 'gone'){
          elem.style.display = 'none';
        }
        if(type == 'visible'){
          elem.style.visibility = 'visible';
        }
        if(type == 'invisible'){
          elem.style.visibility = 'invisible';
        }
       }
     }else{
       viviGUI._error('viviGUI.setVisibility: What you want to do with this function?');
     }
  }
}

viviGUI._rightHeightAndWeight = function(p, height, width, functionName){
  if((typeof height).toLowerCase() == 'number'){ viviGUI.setElementHeight(p, height); } else {
    viviGUI._error(functionName + ': Height wrong. When you change element setings, you don\'t need to use a PX or percentes. exemple. 200')
  }
  if((typeof width).toLowerCase() == 'number'){ viviGUI.setElementHeight(p, width); } else {
    viviGUI._error(functionName + ': Width wrong. When you change element setings, you don\'t need to use a PX or percentes. exemple. 200')
  }
}

viviGUI.newVideo = function(name, url, onload, height, width, show_controls){
  var p = document.createElement('video');
  p.innerText = name;
  p.onload = onload;
  p.src = url;
  viviGUI._rightHeightAndWeight(p, height, width, 'viviGUI.newVideo');
  return p;
}

viviGUI.newCanvas = function(height, width){
  var p = document.createElement('canvas');
  viviGUI._rightHeightAndWeight(p, height, width, 'viviGUI.newCanvas');
  return p;
}

viviGUI.newIframe = function(name, url, onload, height, width){
  var p = document.createElement('iframe');
  p.innerText = name;
  p.onload = onload;
  p.src = url;
  viviGUI._rightHeightAndWeight(p, height, width, 'viviGUI.newIframe');
  return p;
}

viviGUI._typesOfInput = 'color, date, datetime-local, email, file, hidden, image, month, number, password, radio, range, reset, search, submit, tel, text, time, url, week';

viviGUI.newInput = function(placeholder, enteredtext, type){
    var p = document.createElement('input');
    p.classList.add('viviGUIInput');
    p.classList.add('viviGUI');
    if((typeof placeholder).toLowerCase() == 'string'){
      p.placeholder = name;
    }else{
      viviGUI._warn('viviGUI.newInput: Recommended use placeholder, it\'s make desing better');
    }
    if((typeof enteredtext).toLowerCase() == 'string'){
      p.value = enteredtext;
    }
    if((typeof type).toLowerCase() != 'string'){
      viviGUI._warn('viviGUI.newInput: Where is type? Discover about input types in - viviGUI.documentation.typesOfInput()');
    }else{
      if(viviGUI._typesOfInput.replace(type,'') == viviGUI._typesOfInput){
        viviGUI._error('viviGUI.newInput: You are using wrong type');
      }else{
        p.type = type;
      }
    }
    return p;
}

viviGUI.newTextarea = function(placeholder, enteredtext){
    var p = document.createElement('textarea');
    p.classList.add('viviGUIInput');
    p.classList.add('viviGUI');
    if((typeof placeholder).toLowerCase() == 'string'){
      p.placeholder = name;
    }else{
      viviGUI._warn('viviGUI.newInput: Recommended use placeholder, it\'s make desing better');
    }
    if((typeof enteredtext).toLowerCase() == 'string'){
      p.value = enteredtext;
    }
    return p;
}

viviGUI.documentation = {};

viviGUI.documentation.typesOfInput = function(){
  viviGUI._log('Types define functions element, style, here types what you can use:')
  viviGUI._log(viviGUI._typesOfInput);
  viviGUI._log('We don\'t define all types because you can use other element');
  viviGUI._log('Not defined types - button(viviGUI.newButton), checkbox(viviGUI.newCheckbox)');
}
