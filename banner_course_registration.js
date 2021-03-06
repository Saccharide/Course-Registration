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

    // Tries to login to Banner
    try
    {
        if (window.location.href == "https://banweb.wm.edu/pls/PROD/twbkwbis.P_WWWLogin")
        {
            // Edit to your W&M Username
            document.getElementById('UserID').value="";
            // Edit to your W&M password
            document.getElementsByName("PIN")[0].value="";
            
            // Submits the form
            document.loginform.submit();
	
        }
    }
    // If it doesn't match the banner login page
	catch(err)
    {
		console.log("Not on banner page, banner link: https://banweb.wm.edu/pls/PROD/twbkwbis.P_WWWLogin");
	}

    // If user was able to login, we try to add a button to redirect to "Registration" page
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

    // Tries to click on "Add/Drop Classes" link 
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
    
    // Tries find the sumbit button when prompts for the current term. I only see a brute force way to do this
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

    // Directly modify the current CRN field with the value you want to register
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

