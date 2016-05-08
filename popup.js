// Auth: Seth DeSantis 
// Date: 5/8/2016

/*
  Globals
*/

var closeCurrTab = false;
var useHotAkey = false;
var closeAllTabsSetting = false;
var closeCurrentTab = { active: true, currentWindow: true };

/*
 Event Listeners 
*/
 
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


// Close the active tab
function CloseActiveTab(tabs) {
  var currentTab = tabs[0];
  console.log(currentTab);
  if(closeAllTabsSetting) {
    console.log('open tabs [' + tabs.length + ']' );
    chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.remove(tabs[i].id,function() {
        console.log("Removing Tab [" + i + "]");
        });             
      }
    }); 
  } 
  else {
    // Close active
     chrome.tabs.remove(tabs[0].id,function() {
       console.log("Removing Active Tab");
    });
  }
 } 
 
 chrome.tabs.query({}, function (tabs) {});

 

/*
  Event Handlers
*/
function CheckCloseAllTabsSetting(){ 
   if(closeAllTabs.checked) {
    console.log("I am checked [Close All Tabs]");
    closeAllTabsSetting =true;
   }
   else {
     closeAllTabsSetting = false;
   }
}

function CheckUseHotkey() {
  if(useHotkey.checked) {
    useHotAkey = true;
    console.log("I am checked [Use Hotkey]");
  }
  else {
    useHotAkey= false;
  }
}

function CheckCloseTab() {
   if(closeTab.checked) {
    console.log("I am checked [Close Tab]");
   closeCurrTab=true;
   }
   else {
     closeCurrTab = false;
   }
} 

/*
  @NAME: browsingdata
  @DESC: Clears all history from the beggining of time.
*/
function browsingdata() {
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
   
    if(closeCurrTab || closeAllTabsSetting) {
     // Close current tab
     console.log('closing tab(s)'); 
     chrome.tabs.query(closeCurrentTab, CloseActiveTab);
   }
}