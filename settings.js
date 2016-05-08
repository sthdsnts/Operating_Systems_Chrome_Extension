document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#closeBrowser').addEventListener('change', CheckClosedSetting);
});
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#closeTab').addEventListener('change', CheckCloseTab);
});
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#useHotkey').addEventListener('change', CheckUseHotkey);
});

function CheckClosedSetting(){
   //Do Something...maybe another function showAlert(), for instance
   if(closeBrowser.checked){
    console.log("I am checked [Close Browser]");
   }
   else{
      //do something else
   }
}
function CheckUseHotkey(){
   if(useHotkey.checked){
    console.log("I am checked [Use Hotkey]");
   }
   else{
      //do something else
   }
}

function CheckCloseTab(){
   if(closeTab.checked){
    console.log("I am checked [Close Tab]");
   }
   else{
      //do something else
   }
}
 