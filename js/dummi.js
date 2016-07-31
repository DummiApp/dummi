// dummi.js - All main javascript & jQuery happens here
// CODE WRITTEN BY MARC MUELLER (@seven11nash)

// INITIAL VARIABLES
var outputType = "JSON";
var feedName = "dummi";
var valueArray = [];
var valueDetailArray = [];
var itemArray = ["0", "1"];
var gender = "both";

// RESET FEED
function newFeed(){
	feedName = "dummi";
	valueArray = ["phone"];
	valueDetailArray = ["us"];
	itemArray = ["0", "1"];
	gender = "both";
	document.getElementById("valueTypeSelection").value = "firstName";
	document.getElementById("both").checked = true;

	$("#feedName").val("");
	$("#itemNumber").val(itemArray.length);

	removeValue("all");
	generateUniqueURL();
	updateFeed();
}

// CODE GEN FOR LINK
function generateUniqueURL(){
	var code = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 10; i++ )
	    code += possible.charAt(Math.floor(Math.random() * possible.length));

	var uniqueURL = "http://feed.me/" + code;
	// document.getElementById("path--field").value = uniqueURL;
}

// CAPITALIZE DUMMI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// CAMELCASE DUMMI
String.prototype.camelCase = function(value) {
    var words = value.split(' ');
	var numberOfWords = words.length;
	var camelcasedWord = "";
	for(var i = 0;i < numberOfWords;i+=1){
		if(i == 0){
			camelcasedWord = camelcasedWord + words[i].toLowerCase();
		}else{
			camelcasedWord = camelcasedWord + words[i].capitalize();
		}	
	}
	return camelcasedWord;
}
	
// UPDATE OUTPUT
function updateOutput(){

	var selectedValueField = document.getElementById("outputTypeSelection");
	var type = selectedValueField.options[selectedValueField.selectedIndex].value;

	document.getElementById("feedTypeTitle").innerHTML = type;
	document.getElementById("valueTypeLabel").innerHTML = "value type";

	switch(type){
		case "CSV":
			outputType = "CSV";
			document.getElementById("feedNameLabel").innerHTML = "File Name";
			$("#feedName").attr("placeholder", "Name Your CSV File");
			document.getElementById("itemNumberLabel").innerHTML = "# of rows";
			break;
		default:
			outputType = "JSON";
			document.getElementById("feedNameLabel").innerHTML = "Primary Keyword Name";
			$("#feedName").attr("placeholder", "Name Your Primary Keyword");
			document.getElementById("itemNumberLabel").innerHTML = "# of items";
	}

	updateFeed();

}

// FEED NAME HANDLE
$('#feedName').focusin('input',function(e){
	$("#feedName").keyup(function() {
		setTimeout(function(){

			var value = $("#feedName").val();
			value = value.replace(/[^A-Za-z\s!?]/g,'');
			value = value.toLowerCase();
			value = value.camelCase(value);

		    if(value != ""){
		  		feedName = value;
		    }else{
		  		feedName = "dummi";
		    }

		  	updateFeed();

		},500);
	});
});

$('#feedName').focusout('input',function(e){

	var value = $("#feedName").val();
	if(value == ""){
		feedName = "dummi";
		updateFeed();
	}

});

// VALUES
function addValue(){

	var selectedValueField = document.getElementById("valueTypeSelection");
	var selectedValue = selectedValueField.options[selectedValueField.selectedIndex].value;

	var id = valueArray.length;
	if(selectedValue == "phone"){
		valueArray.push("usPhone");
	}else{
		valueArray.push(selectedValue);
	}

	if(selectedValue == "phone"){
		valueDetailArray.push("us");
	}else if(selectedValue == "age"){
		valueDetailArray.push("ad");
	}else{
		valueDetailArray.push("none");
	}

	if(selectedValue == "phone"){
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span><input type="checkbox" id="phoneNumber' + id + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber' + id + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone' + id + '" onclick="updateItemDetail(this.id)" id="us' + id + '" checked><label for="us' + id + '">US</label></li><li><input type="radio" name="phone' + id + '" onclick="updateItemDetail(this.id)" id="uk' + id + '"><label for="uk' + id + '">UK</label></li><li><input type="radio" name="phone' + id + '" onclick="updateItemDetail(this.id)" id="de' + id + '"><label for="de' + id + '">DE</label></li></ul></div></div></section>');
	}else if(selectedValue == "age"){
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span><input type="checkbox" id="age' + id + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="age' + id + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">boundries</span><ul class="radio-list"><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="cd' + id + '"><label for="cd' + id + '">Child</label></li><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="tn' + id + '"><label for="tn' + id + '">Teenager</label></li><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="ad' + id + '" checked><label for="ad' + id + '">Adult</label></li><li><input type="radio" name="age' + id + '" onclick="updateItemDetail(this.id)" id="sn' + id + '"><label for="sn' + id + '">Senior</label></li></ul></div></div></section>');
	}else{
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span></section>');
	}

	removeValue("none");
	updateFeed();
}

function removeValue(id){
	if(id == "all"){
		valueArray = [];
		valueDetailArray = [];
		document.getElementById("valueWrapper").innerHTML = "";
	}else{
		if(id != "none"){
			valueArray.splice(id, 1);
			valueDetailArray.splice(id, 1);
		}
		document.getElementById("valueWrapper").innerHTML = "";
		for(var i = 0;i < valueArray.length;i+=1){
			if(valueArray[i] == "phone" || valueArray[i] == "usPhone" || valueArray[i] == "ukPhone" || valueArray[i] == "dePhone"){
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + valueArray[i] + '</span><input type="checkbox" id="phoneNumber' + i + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber' + i + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone' + i + '" onclick="updateItemDetail(this.id)" id="us' + i + '" checked><label for="us' + i + '">US</label></li><li><input type="radio" name="phone' + i + '" onclick="updateItemDetail(this.id)" id="uk' + i + '"><label for="uk' + i + '">UK</label></li><li><input type="radio" name="phone' + i + '" onclick="updateItemDetail(this.id)" id="de' + i + '"><label for="de' + i + '">DE</label></li></ul></div></div></section>');
				document.getElementById(valueDetailArray[i] + i).checked = true;
			}else if(valueArray[i] == "age" || valueArray[i] == "cdAge" || valueArray[i] == "tnAge" || valueArray[i] == "snAge"){
				var blockTitle = "";
				switch(valueArray[i]){
					case "cdAge":
						blockTitle = "childAge";
						break;
					case "tnAge":
						blockTitle = "teenAge";
						break;
					case "snAge":
						blockTitle = "seniorAge";
						break;
					default:
						blockTitle = "age";
				}
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + blockTitle + '</span><input type="checkbox" id="age' + i + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="age' + i + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">boundries</span><ul class="radio-list"><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="cd' + i + '"><label for="cd' + i + '">Child</label></li><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="tn' + i + '"><label for="tn' + i + '">Teenager</label></li><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="ad' + i + '" checked><label for="ad' + i + '">Adult</label></li><li><input type="radio" name="age' + i + '" onclick="updateItemDetail(this.id)" id="sn' + i + '"><label for="sn' + i + '">Senior</label></li></ul></div></div></section>');
				document.getElementById(valueDetailArray[i] + i).checked = true;
			}else{
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + valueArray[i] + '</span></section>');
			}
		}
	}

	updateFeed();
}

// VALUE OPTIONS
function updateItemDetail(id){
	switch(id){
		case "both":
			gender = "both";
			break;
		case "male":
			gender = "male";
			break;
		case "female":
			gender = "female";
			break;
		default:
			var detail = id.substring(0,2);
			var itemId = id.substr(2);
			valueDetailArray[itemId] = detail;
			if(detail == "us" || detail == "uk" || detail == "de"){
				valueArray[itemId] = detail + "Phone";
			}else if(detail == "cd" || detail == "tn" || detail == "sn"){
				valueArray[itemId] = detail + "Age";
			}
	}

	removeValue("none");
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

			if(value > 1001){
				value = 1001;
				$("#itemNumber").val("1001");
			}

		    if(value != ""){
		    	itemArray = [];
				for(var i = 0; i < value; i+=1){

					itemArray.push('"' + i + '"');

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
		itemArray = ["0", "1"];
		updateFeed();
	}

});

// FUNCTION FOR THE COPY BUTTON
function copyLink(){
	var link = $("#path--field").val();
	// SELECT TEXT
    document.getElementById("path--field").focus();
    document.getElementById("path--field").select();
    // COPY
    document.execCommand("copy");
    // DESELECT
    document.getElementById("copyButton").focus();
    $("#path--field").val("COPIED");
    setTimeout(function(){
    	$("#path--field").val(link);
    }, 700);
}

// FUNCTION CONTROLLING WHAT IS SEEN IN THE MAIN STAGE (CODEFIELD)
function updateFeed(){

	var finalJSON = '{<br>"<span>' + feedName + '</span>": [<br>';
	var finalCSV = "<span>fullName";

	if(valueArray.length > 0){
		finalCSV = finalCSV + ",";
	}else{
		finalCSV = finalCSV + "</span><br>";
	}

	for(var i = 0; i < valueArray.length; i+=1){
		finalCSV = finalCSV + valueArray[i];
		if(valueArray.length > i+1){
			finalCSV = finalCSV + ",";
		}else{
			finalCSV = finalCSV + "</span><br>";
		}
	}

	var valueAmount = itemArray.length;
	for(var i = 0; i < valueAmount; i+=1){

		finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;{<br>';

		var fullName = "";
		var itemGender = "";
		if(gender == "male"){
			fullName = chance.name({ gender: "male" });
		}else if(gender == "female"){
			fullName = chance.name({ gender: "female" });
		}else{
			var random = chance.integer({min: 1, max: 2});
			switch(random){
				case 1:
					fullName = chance.name({ gender: "female" });
					itemGender = "female"
					break;
				default:
					fullName = chance.name({ gender: "male" });
					itemGender = "male";
			}
			
		}

		var firstName = fullName;
    	firstName = firstName.split(' ')[0];
    	firstName = firstName.toLowerCase();
    	firstName = firstName.charAt(0);
    	var lastName = fullName;
    	lastName = lastName.split(' ')[1];
    	username = firstName + lastName;

    	var childAge = chance.integer({min: 1, max: 12});
    	var teenAge = chance.integer({min: 13, max: 17});
    	var age = chance.integer({min: 18, max: 61});
    	var seniorAge = chance.integer({min: 62, max: 95});

    	var emailVerified = chance.bool({likelihood: 60});

    	var usPhone = chance.phone({ country: 'us', mobile: true });
    	var ukPhone = chance.phone({ country: 'uk', mobile: true });
    	var dePhoneOptions = ["0150", "0151", "0160", "0170", "0171", "0175", "0152", "0162", "0172", "0173", "0174", "0155", "0163", "0177", "0178", "0159", "0176", "0179", "0161", "0167", "0164", "0168", "0169"];
    	var randomOption = chance.integer({min: 1, max: dePhoneOptions.length-1});
    	var dePhone = dePhoneOptions[randomOption] + "&nbsp;" + chance.integer({min: 1000000, max: 9999999});

		finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>fullName</span>": "' + fullName + '"';
		finalCSV = finalCSV + fullName;

		if(valueArray.length == 0){
			finalJSON = finalJSON + '<br>';
		}else{
			finalJSON = finalJSON + ',<br>';
			finalCSV = finalCSV + ",";
		}

		for(var j = 0;j < valueArray.length;j+=1){
			var itemType = valueArray[j];
			var itemDetail = valueDetailArray[j];

			switch(itemType){
				case "firstName":
					firstName = fullName.split(' ')[0];
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>firstName</span>": "' + firstName + '"';
					finalCSV = finalCSV + firstName;
					break;
				case "lastName":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>lastName</span>": "' + lastName + '"';
					finalCSV = finalCSV + lastName;
					break;
				case "gender":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>gender</span>": "' + itemGender + '"';
					finalCSV = finalCSV + itemGender;
					break;
				case "cdAge":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>childAge</span>": ' + childAge;
		    		finalCSV = finalCSV + childAge;
					break;
				case "tnAge":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>teenAge</span>": ' + teenAge;
		    		finalCSV = finalCSV + teenAge;
					break;
				case "age":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>age</span>": ' + age;
		    		finalCSV = finalCSV + age;
					break;
				case "snAge":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>seniorAge</span>": ' + seniorAge;
		    		finalCSV = finalCSV + seniorAge;
					break;
				case "username":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>username</span>": "' + username + '"';
					finalCSV = finalCSV + username;
					break;
				case "email":
					var email = username + "@example.com";
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>email</span>": "' + email + '"';
					finalCSV = finalCSV + email;
					break;
				case "emailVerified":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>username</span>": "' + username + '"';
					finalCSV = finalCSV + username;
					break;
				case "twitterHandle":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>twitterHandle</span>": "' + username + '"';
					finalCSV = finalCSV + username;
					break;
				case "usPhone":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>usPhone</span>": "' + usPhone + '"';
	    			finalCSV = finalCSV + usPhone;
					break;
				case "ukPhone":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>ukPhone</span>": "' + ukPhone + '"';
	    			finalCSV = finalCSV + ukPhone;
					break;
				case "dePhone":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>dePhone</span>": "' + dePhone + '"';
	    			finalCSV = finalCSV + dePhone;
					break;
				default:
					console.log("an error has occured, please contact @seven11nash on Twitter or via marc@dummi.io to report this bug.");
			}

		    if(j+1 == valueArray.length){
				finalJSON = finalJSON + '<br>';
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

	finalJSON = finalJSON + "]<br>}";

	document.getElementById("codeField").innerHTML = "";
	switch(outputType){
		case "CSV":
			document.getElementById("codeField").innerHTML = finalCSV;
			break;
		default:
			document.getElementById("codeField").innerHTML = finalJSON;
	}

	if(outputType == "CSV"){
		// DOWNLOAD CSV
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

// INITIAL START
newFeed();














