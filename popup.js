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
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#closeAllTabs').addEventListener('click', CheckCloseAllTabsSetting);
});

//closeAllTabs

var closeBrow = false;
var closeCurrTab = false;
var useHotAkey = false;
var closeAllTabsSetting = false;
var closeCurrentTab = { active: true, currentWindow: true };


// Close the active tab
function CloseActiveTab(tabs) {
  var currentTab = tabs[0];
  console.log(currentTab);
  if( closeAllTabsSetting==true){
    console.log('open tabs [' + tabs.length + ']' );
    chrome.tabs.getAllInWindow(null, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.remove(tabs[i].id,function() {
      console.log("Removing Tab [" + i + "]");
    });             
    }
  });
    console.log("Close all tabs");
  } 
  else {
    // Close active
     chrome.tabs.remove(tabs[0].id,function() {
       console.log("Removing Active Tab");
    });
  }
 } 
 
 chrome.tabs.query({}, function (tabs) {});

 
function CheckCloseAllTabsSetting(){ 
   if(closeAllTabs.checked){
    console.log("I am checked [Close All Tabs]");
    closeAllTabsSetting =true;
   }
   else{
     closeAllTabsSetting = false;
   }
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
   else if(closeCurrTab==true || closeAllTabsSetting == true){
     // Close current tab
     console.log('closing tab(s)'); 
     chrome.tabs.query(closeCurrentTab, CloseActiveTab);
   }
}

  
