function Message(b){this.BTN_NO=0;this.BTN_YES=1;this.BTN_CANCEL=2;this.BTN_SUBMIT=3;this.BTN_OK=4;this.overlay=$("<div id='msgOverlay' class='msgOverlay'>").appendTo($("body"));this.msgBox=$("<div id='msgBox' class='msgBox'>").appendTo($("body"));this.msgBox_2=$("<div id='msgBox_2' class='msgBox_2' >").appendTo($("#msgBox"));this.captionDiv=$("<div id='msgCaption' class='msgCaption'>").appendTo(this.msgBox_2);this.contentDiv=$("<div id='msgContent' class='msgContent'>").appendTo(this.msgBox_2);this.buttonsDiv=
$("<div id='msgButtons' class='msgButtons'>").appendTo(this.msgBox_2);this.callback="";this.noBtn=$("<input type='button' class='msgButton' value='"+wrappertexts.language[b].MESSAGE_BTN_NO+"'/>");this.yesBtn=$("<input type='button' class='msgButton' value='"+wrappertexts.language[b].MESSAGE_BTN_YES+"'/>");this.cancelBtn=$("<input type='button' class='msgButton' value='"+wrappertexts.language[b].MESSAGE_BTN_CANCEL+"'/>");this.submitBtn=$("<input type='button' class='msgButton' value='"+wrappertexts.language[b].MESSAGE_BTN_SUBMIT+
"'/>");this.okBtn=$("<input type='button' class='msgButton' value='"+wrappertexts.language[b].MESSAGE_BTN_OK+"'/>");this.messageBox=function(a,b,d,e){this.captionDiv.html(a);this.contentDiv.html(b);this.buttonsDiv.empty();this.callback=e;var c=this;for(a=0;a<d.length;a++)d[a]==this.BTN_NO?this.buttonsDiv.append(this.noBtn.bind("click",function(){c.DoAction(c.BTN_NO)})):d[a]==this.BTN_YES?this.buttonsDiv.append(this.yesBtn.bind("click",function(){c.DoAction(c.BTN_YES)})):d[a]==this.BTN_CANCEL?this.buttonsDiv.append(this.cancelBtn.bind("click",
function(){c.DoAction(c.BTN_CANCEL)})):d[a]==this.BTN_SUBMIT?this.buttonsDiv.append(this.submitBtn.bind("click",function(){c.DoAction(c.BTN_SUBMIT)})):d[a]==this.BTN_OK?this.buttonsDiv.append(this.okBtn.bind("click",function(){c.DoAction(c.BTN_OK)})):this.buttonsDiv.append($("<input type='button' class='msgButton' value='"+d[a]+"'/>").bind("click",{button:a},function(a){c.DoAction(a.data.button)}));this.overlay.show();setTimeout(function(){c.msgBox.show()},200);this.msgBox.css("margin-top",-(this.msgBox.height()/
2)+"px");$("#msgBox_2").removeClass("msgBox_2")};this.DoAction=function(a){this.Close();""!=this.callback&&this.callback(a)};this.Close=function(){this.overlay.hide();this.msgBox.hide()};this.Hide=function(){"block"==this.msgBox.css("display")&&(this.overlay.css("visibility","hidden"),this.msgBox.css("visibility","hidden"))};this.Show=function(){"block"==this.msgBox.css("display")&&(this.overlay.css("visibility","visible"),this.msgBox.css("visibility","visible"))};this.changeOrientation=function(a){this.msgBox.css("-webkit-transform",
"scale("+a+")");this.msgBox.css("-moz-transform","scale("+a+")");this.msgBox.css("-ms-transform","scale("+a+")");this.msgBox.css("-o-transform","scale("+a+")")};this.setVisibility=function(a){a?this.Show():this.Hide()}}
function WrapperPopup(b){this.BTN_NO=0;this.BTN_YES=1;this.BTN_CANCEL=2;this.BTN_SUBMIT=3;this.BTN_OK=4;this.overlay=$("<div id='msgOverlay_wrapper' class='msgOverlay_wrapper'>").appendTo($("body"));this.msgBox=$("<div id='msgBox_wrapper' class='msgBox_wrapper'>").appendTo($("body"));this.msgBox_2=$("<div id='msgBox_2_wrapper' class='msgBox_2_wrapper' >").appendTo($("#msgBox_wrapper"));this.captionDiv=$("<div id='msgCaption_wrapper' class='msgCaption_wrapper'>").appendTo(this.msgBox_2);this.contentDiv=
$("<div id='msgContent_wrapper' class='msgContent_wrapper'>").appendTo(this.msgBox_2);this.buttonsDiv=$("<div id='msgButtons_wrapper' class='msgButtons_wrapper'>").appendTo(this.msgBox_2);this.callback="";this.noBtn=$("<input type='button' class='msgButton_wrapper' value='"+wrappertexts.language[b].MESSAGE_BTN_NO+"'/>");this.yesBtn=$("<input type='button' class='msgButton_wrapper' value='"+wrappertexts.language[b].MESSAGE_BTN_YES+"'/>");this.cancelBtn=$("<input type='button' class='msgButton_wrapper' value='"+
wrappertexts.language[b].MESSAGE_BTN_CANCEL+"'/>");this.submitBtn=$("<input type='button' class='msgButton_wrapper' value='"+wrappertexts.language[b].MESSAGE_BTN_SUBMIT+"'/>");this.okBtn=$("<input type='button' class='msgButton_wrapper' value='"+wrappertexts.language[b].MESSAGE_BTN_OK+"'/>");this.messageBox=function(a,b,d,e){this.captionDiv.html(a);this.contentDiv.html(b);this.buttonsDiv.empty();this.callback=e;var c=this;for(a=0;a<d.length;a++)d[a]==this.BTN_NO?this.buttonsDiv.append(this.noBtn.bind("click",
function(){c.DoAction(c.BTN_NO)})):d[a]==this.BTN_YES?this.buttonsDiv.append(this.yesBtn.bind("click",function(){c.DoAction(c.BTN_YES)})):d[a]==this.BTN_CANCEL?this.buttonsDiv.append(this.cancelBtn.bind("click",function(){c.DoAction(c.BTN_CANCEL)})):d[a]==this.BTN_SUBMIT?this.buttonsDiv.append(this.submitBtn.bind("click",function(){c.DoAction(c.BTN_SUBMIT)})):d[a]==this.BTN_OK?this.buttonsDiv.append(this.okBtn.bind("click",function(){c.DoAction(c.BTN_OK)})):this.buttonsDiv.append($("<input type='button' class='msgButton_wrapper' value='"+
d[a]+"'/>").bind("click",{button:a},function(a){c.DoAction(a.data.button)}));this.overlay.show();setTimeout(function(){c.msgBox.show()},200);this.msgBox.css("margin-top",-(this.msgBox.height()/2)+"px");$("#msgBox_2_wrapper").removeClass("msgBox_2_wrapper")};this.DoAction=function(a){this.Close();""!=this.callback&&this.callback(a)};this.Close=function(){this.overlay.hide();this.msgBox.hide()};this.Hide=function(){"block"==this.msgBox.css("display")&&(this.overlay.css("visibility","hidden"),this.msgBox.css("visibility",
"hidden"))};this.Show=function(){"block"==this.msgBox.css("display")&&(this.overlay.css("visibility","visible"),this.msgBox.css("visibility","visible"))};this.changeOrientation=function(a){this.msgBox.css("-webkit-transform","scale("+a+")");this.msgBox.css("-moz-transform","scale("+a+")");this.msgBox.css("-ms-transform","scale("+a+")");this.msgBox.css("-o-transform","scale("+a+")")};this.setVisibility=function(a){a?this.Show():this.Hide()}}
function getErrorMessageFromErrorType(b){b="TXT_"+b;void 0===getLocalizedMessage(b)&&(b="TXT_ERROR_DEFAULT");return getLocalizedMessage(b)}function getLocalizedMessage(b){"TXT_ERROR_INSUFFICIENT_FUNDS"===b&&(b="TXT_ERROR_INSUFFICIENTFUNDS");if(void 0!==wrappertexts.language[wrapperLang][b])return wrappertexts.language[wrapperLang][b]}"undefined"!==typeof exports&&(module.exports={getErrorMessageFromErrorType:getErrorMessageFromErrorType,getLocalizedMessage:getLocalizedMessage});
/* Version 3.0.17 Date: 20200514 */
