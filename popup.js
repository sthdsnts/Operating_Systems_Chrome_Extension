// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

 
 document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#closeBrowser').addEventListener('change', CheckClosedSetting);
});
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#closeTab').addEventListener('change', CheckCloseTab);
});
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#useHotkey').addEventListener('change', CheckUseHotkey);
});
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#myBtn').addEventListener('click', browsingdata);
});

var closeBrow = false;
var closeCurrTab = false;
var useHotAkey = false;
var closeCurrentTab = { active: true, currentWindow: true };

 function CloseActiveTab(tabs) {
  var currentTab = tabs[0];
  console.log(currentTab);
  chrome.tabs.remove(tabs[0].id,function() {
       console.log("Removing Active Tab");
  }
    );
 }

 
function CheckClosedSetting(){ 
   if(closeBrowser.checked){
    console.log("I am checked [Close Browser]");
    closeBrow =true;
   }
   else{
     closeBrow = false;
   }
}
function CheckUseHotkey(){
   if(useHotkey.checked){
     useHotAkey = true;
    console.log("I am checked [Use Hotkey]");
   }
   else{
     useHotAkey= false;
      //do something else
   }
}

function CheckCloseTab(){
   if(closeTab.checked){
    console.log("I am checked [Close Tab]");
   closeCurrTab=true;
   }
   else{
     closeCurrTab = false;
   }
}




function browsingdata(){
    chrome.browsingData.remove({
      "originTypes": {
        "protectedWeb": true,  
        "unprotectedWeb":true,
        "extension":true   
      }
    }, {
      "appcache": true,
      "cache": true, 
      "cookies": true, 
      "downloads": true,
      "fileSystems": true,
      "formData": true,
      "history": true, 
      "indexedDB": true, 
      "localStorage": true,
      "pluginData": true, 
      "passwords": true, 
      "webSQL": true 
    }, function (){
        console.log("All data is Deleted...");
    });
   
   
   if(closeBrow==true){
     // Call function to close browser
     console.log('closing browser');
   }  
   else if(closeCurrTab==true){
     // Close current tab
     console.log('closing current tab'); 
     chrome.tabs.query(closeCurrentTab, CloseActiveTab);
   }
}

  
