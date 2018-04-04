// ==UserScript==
// @name         Banner Course Registration
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  W&M Banner Registration extenstion, use it at your own risk :) 
// @author       Sacchride 
// @include *
// @match        http://*
// @match        https://*
// @grant        none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

jQuery(function ($){

    try
    {
        if (window.location.href == "https://banweb.wm.edu/pls/PROD/twbkwbis.P_WWWLogin")
        {
            document.getElementById('UserID').value="";
            document.getElementsByName("PIN")[0].value="";
            document.loginform.submit();
        }
    }
	catch(err)
    {
		console.log("Not on banner page, banner link: https://banweb.wm.edu/pls/PROD/twbkwbis.P_WWWLogin");
	}

	try
    {
        if (window.location.href.slice(0,60) == "https://banweb.wm.edu/pls/PROD/twbkwbis.P_GenMenu?name=bmenu")
	    {
    		var a = document.createElement('a');
    		a.href = "https://banweb.wm.edu/pls/PROD/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu";
    		a.id="clickme";
		    document.body.appendChild(a);
		    document.getElementById('clickme').click();
	    }
	}
	catch(err){
		console.log("Failed to go to Registration page");
	}

    try
    {
        if (window.location.href == "https://banweb.wm.edu/pls/PROD/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu")
        {
            document.getElementsByClassName('submenulinktext2 ')[6].click();
        }
    }
	catch(err){
		console.log("Failed to find 'AddDrop' button");
	}
    
	try{
		var inputs = document.getElementsByTagName("input");
		for(var i = 0; i < inputs.length; i++) 
        {
            if(inputs[i].type == "submit" && inputs[i].value == "Submit") {
                inputs[i].form.submit();
            } 
        }
	}
    catch(err){
		console.log("No need to select the current term");
	}

	try{
		document.getElementById('crn_id1').value = 20429;
		var inputs2 = document.getElementsByTagName("input");
		if(document.getElementsByClassName('errortext').length === 0){
            for(var j = 0; j < inputs2.length; j++) {
                if(inputs2[j].type == "submit" && inputs2[j].value == "Submit Changes") {
                     inputs2[j].click();
                } 
            }
		}
	}
	catch(err){
		console.log("Failed to find a CRN field to enter");
	}
});
