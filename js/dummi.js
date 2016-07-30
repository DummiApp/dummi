// feedme.js - All main javascript & jQuery happens here
// CODE WRITTEN BY MARC MUELLER (@seven11nash)

// INITIAL VARIABLES
var outputType = "JSON";
var feedName = "feedMe";
var itemArray = [];
var itemDetailArray = [];
var valueArray = ["0", "1"];
var gender = "both";
var helpToggle = false;

// CODE GEN FOR LINK
function generateUniqueURL(){
	var code = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 10; i++ )
	    code += possible.charAt(Math.floor(Math.random() * possible.length));

	var uniqueURL = "http://feed.me/" + code;
	// document.getElementById("path--field").value = uniqueURL;
}

// CAMELCASING FEEDNAME
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// UPDATE OUTPUT
function updateOutput(){

	var selectedValueField = document.getElementById("outputTypeSelection");
	var type = selectedValueField.options[selectedValueField.selectedIndex].value;

	document.getElementById("feedTypeTitle").innerHTML = type;

	if(type == "CSV"){
		outputType = "CSV";
		document.getElementById("feedNameLabel").innerHTML = "File Name";
		$("#feedName").attr("placeholder", "Name your CSV File");
		document.getElementById("itemNumberLabel").innerHTML = "# of rows";
		document.getElementById("valueTypeLabel").innerHTML = "value type";
		updateFeed();
	}else{
		outputType = "JSON";
		document.getElementById("feedNameLabel").innerHTML = "Feed Name";
		$("#feedName").attr("placeholder", "Name your Feed");
		document.getElementById("itemNumberLabel").innerHTML = "# of items";
		document.getElementById("valueTypeLabel").innerHTML = "value type";

		updateFeed();
	}

}

// FEED NAME HANDLE
$('#feedName').focusin('input',function(e){
	$("#feedName").keyup(function() {
		setTimeout(function(){

			var value = $("#feedName").val();
			value = value.replace(/[^A-Za-z\s!?]/g,'');
			value = value.toLowerCase();
			var words = value.split(' ');
			var numberOfWords = words.length;
			value = "";
			for(var i = 0;i < numberOfWords;i+=1){
				if(i == 0){
					value = value + words[i].toLowerCase();
				}else{
					value = value + words[i].capitalize();
				}	
			}

		    if(value != ""){
		  		feedName = value;
		    }else{
		  		feedName = "feedMe";
		    }

		  	updateFeed();

		},500);
	});
});

$('#feedName').focusout('input',function(e){

	var value = $("#feedName").val();
	if(value == ""){
		feedName = "feedMe";
		updateFeed();
	}

});

// VALUES
function addValue(){

	var selectedValueField = document.getElementById("valueTypeSelection");
	var selectedValue = selectedValueField.options[selectedValueField.selectedIndex].value;

	var id = itemArray.length;
	if(selectedValue == "phone"){
		itemArray.push("usPhone");
	}else{
		itemArray.push(selectedValue);
	}
	if(selectedValue == "phone"){
		itemDetailArray.push("us");
	}else if(selectedValue == "age"){
		itemDetailArray.push("ad");
	}else{
		itemDetailArray.push("none");
	}

	if(selectedValue == "phone"){
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span><input type="checkbox" id="phoneNumber' + id + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber' + id + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone' + id + '" onclick="updateItemDetail(this.id)" id="us' + id + '" checked><label for="us' + id + '">US</label></li><li><input type="radio" name="phone' + id + '" onclick="updateItemDetail(this.id)" id="uk' + id + '"><label for="uk' + id + '">UK</label></li><li><input type="radio" name="phone' + id + '" onclick="updateItemDetail(this.id)" id="de' + id + '"><label for="de' + id + '">DE</label></li></ul></div></div></section>');
	}else if(selectedValue == "age"){
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span><input type="checkbox" id="age' + id + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="age' + id + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">boundries</span><ul class="radio-list"><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="cd' + id + '"><label for="cd' + id + '">Child</label></li><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="tn' + id + '"><label for="tn' + id + '">Teenager</label></li><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="ad' + id + '" checked><label for="ad' + id + '">Adult</label></li><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="sn' + id + '"><label for="sn' + id + '">Senior</label></li></ul></div></div></section>');
	}else{
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span></section>');
	}

	updateFeed();
}

function removeValue(id){
	if(id == "all"){
		itemArray = [];
		itemDetailArray = [];
		document.getElementById("valueWrapper").innerHTML = "";
	}else{
		itemArray.splice(id, 1);
		itemDetailArray.splice(id, 1);
		document.getElementById("valueWrapper").innerHTML = "";
		for(var i = 0;i < itemArray.length;i+=1){
			if(itemArray[i] == "phone"){
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + itemArray[i] + '</span><input type="checkbox" id="phoneNumber' + i + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber' + i + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone' + i + '" onclick="updateItemDetail(this.id)" id="us' + i + '" checked><label for="us' + i + '">US</label></li><li><input type="radio" name="phone' + i + '" onclick="updateItemDetail(this.id)" id="uk' + i + '"><label for="uk' + i + '">UK</label></li><li><input type="radio" name="phone' + i + '" onclick="updateItemDetail(this.id)" id="de' + i + '"><label for="de' + i + '">DE</label></li></ul></div></div></section>');
				document.getElementById(itemDetailArray[i] + i).checked = true;
			}else if(itemArray[i] == "age"){
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + itemArray[i] + '</span><input type="checkbox" id="age' + i + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="age' + i + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">boundries</span><ul class="radio-list"><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="cd' + i + '"><label for="cd' + i + '">Child</label></li><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="tn' + i + '"><label for="tn' + i + '">Teenager</label></li><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="ad' + i + '" checked><label for="ad' + i + '">Adult</label></li><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="sn' + i + '"><label for="sn' + i + '">Senior</label></li></ul></div></div></section>');
			}else{
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + itemArray[i] + '</span></section>');
			}
		}
	}

	updateFeed();
}

// VALUE OPTIONS
function updateItemDetail(id){
	if(id == "both"){
		gender = "both";
	}else if(id == "male"){
		gender = "male";
	}else if(id == "female"){
		gender = "female";
	}else{
		var detail = id.substring(0,2);
		var itemId = id.substr(2);
		itemDetailArray[itemId] = detail;
		if(detail == "us" || detail == "uk" || detail == "de"){
			itemArray[itemId] = detail + "Phone";
		}
	}

	updateFeed();
}

// ITEM NUMBER
$('#itemNumber').focusin('input',function(e){
	$("#itemNumber").keyup(function() {
		setTimeout(function(){

			var value = $("#itemNumber").val();
			value = value.split(' ').join('');
			value = value.replace(/[^0-9\s!?]/g,'');
			$("#itemNumber").val(value);

		    if(value != ""){
		    	valueArray = [];
				for(var i = 0; i < value; i+=1){

					valueArray.push('"' + i + '"');

				}
		    }else{
		  		
		    }

		  	updateFeed();

		},300);
	});
});

$('#itemNumber').focusout('input',function(e){

	var value = $("#itemNumber").val();
	if(value == ""){
		$("#itemNumber").val("2");
		valueArray = ["0", "1"];
		updateFeed();
	}

});

// RESET FEED
function newFeed(){
	feedName = "feedMe";
	itemArray = ["phone"];
	itemDetailArray = ["us"];
	valueArray = ["0", "1"];
	gender = "both";
	helpToggle = false;
	document.getElementById("valueTypeSelection").value = "firstName";
	document.getElementById("both").checked = true;

	$("#feedName").val("");
	$("#itemNumber").val(valueArray.length);

	removeValue("all");
	generateUniqueURL();
	updateFeed();
}

// DISPLAY HELP
function toggleHelp(){
	if(helpToggle == false){
		helpToggle = true;
		var helpText = '<b>Welcome to Feed.Me help</b><br>Note: To go back to your feed press the help button again<br><br><b>What is Feed.Me for?</b><br>Feed.Me is a tool for developers and designers, you can simply and easily generate spoof JSON data, which is hosted on Feed.Me or you can download as a json file. This helps prototyping and testing if your code would work with real JSON data.<br><br><b>How do I pull data from the downloaded json? (Js)</b><br>$.getJSON("path/to/feedMe.json", function(json) {<br>&nbsp;&nbsp;console.log("JSON Data: " + json.feedMe[1].fullName);<br>});';
		document.getElementById("codeField").innerHTML = helpText;
		document.getElementById("feedTypeTitle").innerHTML = "Feed.Me Help";
		$("#newFeed").css("display", "none");
		document.getElementById("helpLink").innerHTML = "Back to Feed";
	}else{
		helpToggle = false;
		document.getElementById("feedTypeTitle").innerHTML = "JSON";
		$("#newFeed").css("display", "inline");
		document.getElementById("helpLink").innerHTML = "Help";
		updateFeed();
	}
}

// FUNCTION FOR THE COPY BUTTON
function copyLink(){
	var copyUrl = $("#path--field").val();
	// SELECT TEXT
    document.getElementById("path--field").focus();
    document.getElementById("path--field").select();
    // COPY
    document.execCommand("copy");
    // DESELECT
    document.getElementById("copyButton").focus();
    $("#path--field").val("COPIED");
    setTimeout(function(){
    	$("#path--field").val(copyUrl);
    }, 700);
}

// FUNCTION CONTROLLING WHAT IS SEEN IN THE MAIN STAGE (CODEFIELD)
function updateFeed(){
	if(helpToggle == false){

		var finalJSON = '{<br>"<span>' + feedName + '</span>": [<br>';
		var finalCSV = "fullName";

		if(itemArray.length > 0){
			finalCSV = finalCSV + ",";
		}else{
			finalCSV = finalCSV + "<br>";
		}

		for(var i = 0; i < itemArray.length; i+=1){
			finalCSV = finalCSV + itemArray[i];
			if(itemArray.length > i+1){
				finalCSV = finalCSV + ",";
			}else{
				finalCSV = finalCSV + "<br>";
			}
		}

		var valueAmount = valueArray.length;
		for(var i = 0; i < valueAmount; i+=1){

			finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;{<br>';

			var fullName = "";
			if(gender == "male"){
				fullName = chance.name({ gender: "male" });
			}else if(gender == "female"){
				fullName = chance.name({ gender: "female" });
			}else{
				fullName = chance.name();
			}

			var firstName = fullName;
	    	firstName = firstName.substring(0, firstName.indexOf(' '));
	    	firstName = firstName.toLowerCase();
	    	firstName = firstName.charAt(0);
	    	var lastName = fullName;
	    	lastName = lastName.split(' ')[1];
	    	firstPlusLast = firstName + lastName;

	    	var emailVerified = chance.bool({likelihood: 60});

	    	var usPhone = chance.phone({ country: 'us', mobile: true });
	    	var ukPhone = chance.phone({ country: 'uk', mobile: true });
	    	var dePhoneOptions = ["0150", "0151", "0160", "0170", "0171", "0175", "0152", "0162", "0172", "0173", "0174", "0155", "0163", "0177", "0178", "0159", "0176", "0179", "0161", "0167", "0164", "0168", "0169"];
	    	var randomOption = chance.integer({min: 1, max: dePhoneOptions.length-1});
	    	var dePhone = dePhoneOptions[randomOption] + "&nbsp;" + chance.integer({min: 1000000, max: 9999999});

			finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>fullName</span>": "' + fullName + '"';
			finalCSV = finalCSV + fullName;

			if(itemArray.length == 0){
				finalJSON = finalJSON + '<br>';
			}else{
				finalJSON = finalJSON + ',<br>';
				finalCSV = finalCSV + ",";
			}

			for(var j = 0;j < itemArray.length;j+=1){
				var itemType = itemArray[j];
				var itemDetail = itemDetailArray[j];
			    if(itemType == "firstName"){
					name = fullName.substring(0, fullName.indexOf(' '));
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>firstName</span>": "' + name + '"';
					finalCSV = finalCSV + name;
			    }else if(itemType == "lastName"){
					name = fullName.split(' ')[1];
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>lastName</span>": "' + name + '"';
					finalCSV = finalCSV + name;
			    }else if(itemType == "age"){
			    	var age = 0;
			    	if(itemDetail == "cd"){
			    		age = chance.integer({min: 1, max: 12});
			    	}else if(itemDetail == "tn"){
			    		age = chance.integer({min: 13, max: 17});
			    	}else if(itemDetail == "sn"){
			    		age = chance.integer({min: 62, max: 95});
			    	}else{
			    		age = chance.integer({min: 18, max: 61});
			    	}
			    	finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>age</span>": ' + age;
			    	finalCSV = finalCSV + age;
			    }else if(itemType == "username"){
			    	var username = firstPlusLast;
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>username</span>": "' + username + '"';
					finalCSV = finalCSV + username;
			    }else if(itemType == "email"){
			    	var email = firstPlusLast + "@example.com";
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>email</span>": "' + email + '"';
					finalCSV = finalCSV + email;
			    }else if(itemType == "emailVerified"){
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>emailVerified</span>": ' + emailVerified;
					finalCSV = finalCSV + emailVerified;
			    }else if(itemType == "twitterHandle"){
			    	var username = "@" + firstPlusLast;
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>twitterHandle</span>": "' + username + '"';
					finalCSV = finalCSV + username;
			    }else if(itemType == "usPhone"){
			    	finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>usPhone</span>": "' + usPhone + '"';
		    		finalCSV = finalCSV + usPhone;
			    }else if(itemType == "ukPhone"){
		    		finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>ukPhone</span>": "' + ukPhone + '"';
		    		finalCSV = finalCSV + ukPhone;
			    }else if(itemType == "dePhone"){
			    	finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>dePhone</span>": "' + dePhone + '"';
		    		finalCSV = finalCSV + dePhone;
			    }
			    if(j+1 == itemArray.length){
					finalJSON = finalJSON + '<br>';
					// finalCSV = finalCSV + "<br>";
				}else{
					finalJSON = finalJSON + ',<br>';
					finalCSV = finalCSV + ",";
				}
			}

			finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;}';

			if(i+1 == valueAmount){
				finalJSON = finalJSON + '<br>';
			}else{
				finalJSON = finalJSON + ',<br>';
				finalCSV = finalCSV + '<br>';
			}

		}
		if(valueAmount == 0){
			finalJSON = finalJSON + '<br>';
		}
		var JSONend = "]<br>}";
		finalJSON = finalJSON + JSONend;

		document.getElementById("codeField").innerHTML = "";
		if(outputType == "CSV"){
			document.getElementById("codeField").innerHTML = finalCSV;
		}else{
			document.getElementById("codeField").innerHTML = finalJSON;
		}

		if(outputType == "CSV"){
			// DOWNLOAD XML
			finalCSV = "data:text/csv;charset=utf-8," + finalCSV;
			finalCSV = finalCSV.split('&nbsp;').join('');
			finalCSV = finalCSV.split('<span>').join('');
			finalCSV = finalCSV.split('</span>').join('');
			finalCSV = finalCSV.split('<br>').join('\n');
			var data = encodeURI(finalCSV);
			document.getElementById("implementField").innerHTML = "";
			$('#implementField').append('<input type="text" id="path--field" value="Download as an CSV file" readonly><a href="data:' + data + '" download="' + feedName + '.csv">Download</a>');
		}else{
			// DOWNLOAD JSON
			finalJSON = finalJSON.split('&nbsp;').join('');
			finalJSON = finalJSON.split('<span>').join('');
			finalJSON = finalJSON.split('</span>').join('');
			finalJSON = finalJSON.split('<br>').join('');
			var data = finalJSON;
			data = JSON.parse(data);
			data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
			document.getElementById("implementField").innerHTML = "";
			$('#implementField').append('<input type="text" id="path--field" value="Download as a JSON file" readonly><a href="data:' + data + '" download="' + feedName + '.json">Download</a>');
		}
		
	}
}

// INITIAL START
generateUniqueURL();
updateFeed();














