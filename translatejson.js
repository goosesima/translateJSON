var translation;
try{
  translation = JSON.parse(localStorage['translateJSON']);
}catch{
  translation = {"title":"TranslateJSON BETA",
  "forgotjson":"You forgot load file! Then translate json",
  "save":"Save",
  "load":"Load",
  "nojson":"Where is a .json in file name?",
  "errorjson": "Failed parse JSON",
  "translationplease": "Enter translated string",
  "errorfile":"Error reading file"};
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

viviGUI.typePage('app');

var mainScreen = viviGUI.newLayout();
viviGUI.addToLayout(document.body, mainScreen);
viviGUI.setMargin(document.body, '0px');
viviGUI.setLayout(mainScreen);

var bar = viviGUI.newLayout();
viviGUI.setPadding(bar, '2px');
viviGUI.setBackground(bar, '#42a5f5');

var title = viviGUI.newBoldText(translation['title']);
viviGUI.setColor(title, '#fff');
viviGUI.setMargin(title, '10px');
viviGUI.addToLayout(bar, title);

var saveFile = function(){
  if((typeof contentFile).toLowerCase() != 'undefined'){
    download('translated.json', translateJSON.save(window.contentFile));
  }else{
    alert(translation['forgotjson'])
  }
}
var barBtnSave = viviGUI.newButton(translation['save'], saveFile);
var pickFile = function(){
  filePicker.click();
}

var barBtnLoad = viviGUI.newButton(translation['load'], pickFile);

viviGUI.setMargin(barBtnSave, '2px');
viviGUI.setMargin(barBtnLoad, '2px');
viviGUI.addToLayout(bar, barBtnSave);
viviGUI.addToLayout(bar, barBtnLoad);

var filePicker = viviGUI.newInput('','','file');

filePicker.onchange = function(){
  var file = filePicker.files[0];
  if (file) {
      if(file.name.split('.')[1] == 'json'){
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (evt) {
          window.contentFile = evt.target.result;
          translateJSON.clear();
          translateJSON.load(window.contentFile);
      }
      reader.onerror = function (evt) {
          alert(translation['errorfile']);
      }
    }else{
      alert(translation['nojson']);
    }
  }
}

filePicker.onclick = function(){
  this.value=null;
}

var list = viviGUI.newLayout();
list.style.overflowY = 'scroll';
viviGUI.setHeight(list, '100%');
viviGUI.setWidth(list, '100%');
document.body.style.overflow = 'hidden';
viviGUI.addToLayout(mainScreen, bar);
viviGUI.addToLayout(mainScreen, list);

var generateTranslateElement = function(text, jsonname){
  var p = viviGUI.newLayout();
  viviGUI.setColor(p, '#fff');
  viviGUI.setBackground(p, '#42a5f5');
  viviGUI.makeRounded(p);
  viviGUI.setMargin(p, '5px');
  var g = viviGUI.newText(text, function(){ });
  var b = viviGUI.newImg('leftarrow.png', 'Left arrow', function(){}, false);
  viviGUI.setHeight(b, '24px');
  viviGUI.addVerticalCentering(p);
  var t = viviGUI.newTextarea(translation['translationplease'], text, 'text');
  t.style.resize = 'none';
  viviGUI.setWidth(t, '100%');
  viviGUI.setMargin(t, '2px');
  viviGUI.setPadding(g, '2px 2px 2px 10px');
  viviGUI.makeRounded(g);
  viviGUI.makeHoverabre(g);

  var tmp2 = viviGUI.newText(jsonname);
  viviGUI.setBackground(tmp2, '#004a9f');
  viviGUI.setColor(tmp2, '#fff');
  viviGUI.makeRounded(tmp2);
  viviGUI.setPadding(tmp2, '4px');
  viviGUI.addToLayout(mainScreen, tmp2);

  g.onmouseover = function(e){
    viviGUI.setVisibility(tmp2, 'visible');
  }
  g.onmouseout = function(e){
    viviGUI.setVisibility(tmp2, 'gone');
  }
  p.getTranslatedString = function(){ return t.value; }
  viviGUI.addToLayout(p, g);

  p.tooltipFix = function(){
    var tmp = g.getBoundingClientRect();
    var tmp3 = tmp2.getBoundingClientRect();
    viviGUI.moveLayoutToXYAnimation(tmp2, tmp.x + tmp.width + 'px', tmp.y +'px', 0);
    viviGUI.setVisibility(tmp2, 'gone');
  }

  viviGUI.addToLayout(p, b);
  viviGUI.addToLayout(p, t);
  return p;
}
translateJSON = {};
translateJSON.load = function(data) {
  if(data){
    var obj;
    window.jsonTranslate = [];
    try{
    	obj = JSON.parse(data)
    }catch(e){
    	alert(translation['errorjson']);
    	console.error(e);
    }
    if(obj){
    	var keys = Object.keys(obj);
    	var i = 0;
    	while(i!=keys.length){
    		jsonTranslate[i] = generateTranslateElement(obj[keys[i]], keys[i])
    		viviGUI.addToLayout(list, jsonTranslate[i]);
        jsonTranslate[i].tooltipFix();
    		i++;
        }
    }
  }
}

translateJSON.save = function(data) {
  if(data){
    var obj;
    try{
      obj = JSON.parse(data)
    }catch(e){
      alert(translation['errorjson']);
      console.error(e);
    }
    if(obj){
      var keys = Object.keys(obj);
      var i = 0;
      while(i!=keys.length){
        obj[keys[i]] = jsonTranslate[i].getTranslatedString();
        i++;
      }
      return JSON.stringify(obj);
    }
  }
}

translateJSON.clear = function(){
  window.jsonTranslate = [];
  list.innerHTML = '';
}
