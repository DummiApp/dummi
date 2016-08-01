// dummi.js - All main javascript & jQuery happens here
// CODE WRITTEN BY MARC MUELLER (@seven11nash)

// INITIAL VARIABLES
var outputType = "JSON";
var feedName = "dummi";
var valueArray = ["fullName"];
var valueDetailArray = ["both"];
var itemArray = ["0", "1"];
var valuePool = "Users";
var gender = "both";

// RESET FEED
function newFeed(optional){
	if(optional != "noSwitchToCustom"){
		itemArray = ["0", "1"];
		feedName = "dummi";
		$("#feedName").val("");
	}
	valuePool = "Users";
	valueArray = ["fullName"];
	gender = "both";
	valueDetailArray = [gender];
	var userValues = ["firstName", "lastName", "gender", "age", "username", "email", "emailVerified", "phone", "twitterHandle"];
	document.getElementById("valueTypeSelection").innerHTML = "";
	for(var i = 0;i < userValues.length;i+=1){
		$("#valueTypeSelection").append('<option value="' + userValues[i] + '">' + userValues[i] + '</option>');
	}
	

	document.getElementById("valueWrapper").innerHTML = "";
	$("#valueWrapper").append('<section class="block"><span class="node-name">fullName</span><input type="checkbox" id="fullName" name="toggles" class="toggle-switch" checked><label class="toggle" for="fullName"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Gender</span><ul class="radio-list"><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="both" checked><label for="both">Both</label></li><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="male"><label for="male">Male</label></li><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="female"><label for="female">Female</label></li></ul></div></div></section>');
	document.getElementById(gender).checked = true;

	document.getElementById("valuePoolSelection").value = "Users";
	document.getElementById("valueTypeSelection").value = "firstName";
	document.getElementById("presetSelector").value = "custom";
	document.getElementById("both").checked = true;

	$("#itemNumber").val(itemArray.length);

	removeValue("all");
	generateUniqueURL();
	updateFeed();
}

function loadPreset(){

	var selectedValueField = document.getElementById("presetSelector");
	var presetName = selectedValueField.options[selectedValueField.selectedIndex].value;

	if(presetName == "Users"){
		newFeed("noSwitchToCustom");

		valuePool = "Users";
		valueArray = ["fullName", "firstName", "lastName", "gender", "age", "username", "email", "usPhone"];
		gender = "both";
		valueDetailArray = [gender, "none", "none", "none", "adult", "none", "none", "us"];

		renderValues();
		updateFeed();
		document.getElementById("presetSelector").value = presetName;
	}else if(presetName == "News Articles"){
		newFeed("noSwitchToCustom");

		updateValuePool("Articles");
		valueArray = ["title", "subTitle", "author", "createdOn", "fullArticle", "rating"];
		valueDetailArray = ["none", "none", "usersName", "USDate", "none", "outOfTen"];

		renderValues();
		updateFeed();
		document.getElementById("presetSelector").value = presetName;
	}else if(presetName == "Movies"){
		newFeed("noSwitchToCustom");

		updateValuePool("Movies");
		valueArray = ["title", "description", "MPPArating", "runtime", "startTimes", "rating"];
		valueDetailArray = ["none", "none", "none", "none", "anyTime", "outOfTen"];

		renderValues();
		updateFeed();
		document.getElementById("presetSelector").value = presetName;
	}
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
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// REPALCE AT
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

// REPLACE ALL
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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

// UPDATE VALUE POOL
function updateValuePool(directType){

	var type = "";

	if(directType){
		type = directType;
	}else{	
		var selectedValueField = document.getElementById("valuePoolSelection");
		type = selectedValueField.options[selectedValueField.selectedIndex].value;
	}
	
	valueArray = [];
	valueDetailArray = [];

	document.getElementById("valueTypeSelection").innerHTML = "";
	document.getElementById("presetSelector").value = "custom";
	document.getElementById("valuePoolSelection").value = type;

	switch(type){
		case "Users":
			valuePool = "Users";
			valueArray = ["fullName"];
			valueDetailArray = [gender];
			var userValues = ["firstName", "lastName", "gender", "age", "username", "email", "emailVerified", "phone", "twitterHandle"];
			for(var i = 0;i < userValues.length;i+=1){
				$("#valueTypeSelection").append('<option value="' + userValues[i] + '">' + userValues[i] + '</option>');
			}
			break;
		case "Articles":
			valuePool = "Articles";
			var articleValues = ["title", "subTitle", "createdOn", "author", "snippet", "fullArticle", "rating"];
			for(var i = 0;i < articleValues.length;i+=1){
				$("#valueTypeSelection").append('<option value="' + articleValues[i] + '">' + articleValues[i] + '</option>');
			}
			break;
		case "Movies":
			valuePool = "Articles";
			var movieValues = ["title", "description", "MPPArating", "runtime", "startTimes", "rating"];;
			for(var i = 0;i < movieValues.length;i+=1){
				$("#valueTypeSelection").append('<option value="' + movieValues[i] + '">' + movieValues[i] + '</option>');
			}
			break;
		default:
			console.log("an error has occured, please contact @seven11nash on Twitter or via marc@dummi.io to report this bug.");
	}

	removeValue("all");
	updateFeed();

}

// VALUES
function renderValues(){
	document.getElementById("valueWrapper").innerHTML = "";
	var optionsLabel = "";
	var optionsArray = [];
	var detailOptionsArray = [];
	for(var i = 0;i < valueArray.length;i+=1){
		if(valueArray[i] == "fullName"){

			$("#valueWrapper").append('<section class="block"><span class="node-name">fullName</span><input type="checkbox" id="fullName" name="toggles" class="toggle-switch" checked><label class="toggle" for="fullName"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Gender</span><ul class="radio-list"><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="both" checked><label for="both">Both</label></li><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="male"><label for="male">Male</label></li><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="female"><label for="female">Female</label></li></ul></div></div></section>');
			document.getElementById(gender).checked = true;

		}else{

			if(valueArray[i] == "phone" || valueArray[i] == "usPhone" || valueArray[i] == "ukPhone" || valueArray[i] == "dePhone"){
				optionsLabel = "Country";
				optionsArray = ["usPhone", "ukPhone", "dePhone"];
				detailOptionsArray = ["us", "uk", "de"];
			}else if(valueArray[i] == "age" || valueArray[i] == "childAge" || valueArray[i] == "teenAge" || valueArray[i] == "seniorAge"){
				optionsLabel = "Age Boundries";
				optionsArray = ["childAge", "teenAge", "age", "seniorAge"];
				detailOptionsArray = ["child", "teen", "adult", "senior"];
			}else if(valueArray[i] == "createdOn"){
				optionsLabel = "Date Format";
				optionsArray = ["mm/dd/yyyy", "dd/mm/yyyy"];
				detailOptionsArray = ["USDate", "nonUSDate"];
			}else if(valueArray[i] == "author"){
				optionsLabel = "Name";
				optionsArray = ["Username", "Full Name"];
				detailOptionsArray = ["usersName", "fullName"];
			}else if(valueArray[i] == "rating"){
				optionsLabel = "Out of options";
				optionsArray = ["Out of 5", "Out of 10"];
				detailOptionsArray = ["outOfFive", "outOfTen"];
			}else if(valueArray[i] == "startTimes" || valueArray[i] == "eveningStartTimes" || valueArray[i] == "middayStartTimes"){
				optionsLabel = "Time of Day";
				optionsArray = ["Any Time", "Evening", "Midday"];
				detailOptionsArray = ["anyTime", "evening", "midday"];
			}
			if(valueDetailArray[i] != "none"){
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + valueArray[i] + '</span><input type="checkbox" id="' + valueArray[i] + i + '" name="toggles" class="toggle-switch" checked><label class="toggle" for="' + valueArray[i] + i + '"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">' + optionsLabel + '</span><ul class="radio-list" id="radioL' + i + '">');

				$("#valueWrapper").append('</ul></div></div></section>');

				var optionsString = "";
				for(var j = 0;j < optionsArray.length; j+=1){
					optionsString = optionsString + '<li><input type="radio" name="' + valueArray[i] + i + '" onclick="updateItemDetail(this.id)" id="' + detailOptionsArray[j] + i + '"><label for="' + detailOptionsArray[j] + i + '">' + optionsArray[j] + '</label></li>';
				}
				document.getElementById("radioL" + i).innerHTML = optionsString;
				document.getElementById(valueDetailArray[i] + i).checked = true;
			}else{
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + valueArray[i] + '</span></section>');
			}

		}
	}

	updateFeed();
}

// ADD VALUES
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
		valueDetailArray.push("adult");
	}else if(selectedValue == "createdOn"){
		valueDetailArray.push("USDate");
	}else if(selectedValue == "author"){
		valueDetailArray.push("usersName");
	}else if(selectedValue == "rating"){
		valueDetailArray.push("outOfFive");
	}else if(selectedValue == "startTimes"){
		valueDetailArray.push("anyTime");
	}else{
		valueDetailArray.push("none");
	}

	document.getElementById("presetSelector").value = "custom";

	renderValues();
	updateFeed();
}

// REMOVE VALUES
function removeValue(id){
	if(id == "all"){
		document.getElementById("valueWrapper").innerHTML = "";
		if(valuePool == "Users"){
			valueArray = ["fullName"];
			valueDetailArray = [gender];
			$("#valueWrapper").append('<section class="block"><span class="node-name">fullName</span><input type="checkbox" id="fullName" name="toggles" class="toggle-switch" checked><label class="toggle" for="fullName"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Gender</span><ul class="radio-list"><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="both" checked><label for="both">Both</label></li><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="male"><label for="male">Male</label></li><li><input type="radio" name="gender" onclick="updateItemDetail(this.id)" id="female"><label for="female">Female</label></li></ul></div></div></section>');
			document.getElementById(valueDetailArray[0]).checked = true;
		}else{
			valueArray = [];
			valueDetailArray = [];
		}
	}else{
		if(id != "none"){
			valueArray.splice(id, 1);
			valueDetailArray.splice(id, 1);
		}
		renderValues();
	}

	document.getElementById("presetSelector").value = "custom";

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
			var detail = id.replace(/[^A-Za-z\s!?]/g,'');
			var itemId = id.replace(/[^0-9\s!?]/g,'');
			valueDetailArray[itemId] = detail;
			if(detail == "us" || detail == "uk" || detail == "de"){
				valueArray[itemId] = detail + "Phone";
			}else if(detail == "adult" || detail == "child" || detail == "teen" || detail == "senior"){
				if(detail != "adult"){
					valueArray[itemId] = detail + "Age";
				}else{
					valueArray[itemId] = "age";
				}
			}else if(detail == "anyTime" || detail == "evening" || detail == "midday"){
				if(detail != "anyTime"){
					valueArray[itemId] = detail + "StartTimes";
				}else{
					valueArray[itemId] = "startTimes";
				}
			}
	}

	document.getElementById("presetSelector").value = "custom";

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

			if(value > 500){
				value = 500;
				$("#itemNumber").val("500");
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
	var finalCSV = "<span>id";

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
			itemGender = "male"
			fullName = chance.name({ gender: "male" });
		}else if(gender == "female"){
			itemGender = "female"
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

		// FIXED VARIABLES
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

    	var rndYear = chance.integer({min: 2000, max: 2016});
    	var rndMonth = chance.integer({min: 1, max: 12});
    	var rndDay = chance.integer({min: 1, max: 30});
    	if(rndMonth == 2){
    		rndDay = chance.integer({min: 1, max: 28});
    	}
    	var usCreatedOn = rndMonth + "/" + rndDay + "/" + rndYear;
    	var nonUsCreatedOn = rndDay + "/" + rndMonth + "/" + rndYear;

    	var title = HolderIpsum.words(chance.integer({min: 1, max: 5}), true);
		title = title.capitalize();

    	var rating = chance.floating({min: 0, max: 5, fixed: 1});

    	var description = HolderIpsum.words(chance.integer({min: 6, max: 24}), true);
		description = description.charAt(0).toUpperCase() + description.slice(1) + ".";

		var ratingOptions = ["UR", "G", "PG", "PG-13", "R", "NC-17"];
    	var randomRatingOptions = chance.integer({min: 1, max: ratingOptions.length-1});
    	var MPPArating = ratingOptions[randomRatingOptions];

    	var randomMinute = ["00", "15", "20", "30", "40", "45", "50"];
		var randomTimes = []; 
		var randomEveningTimes = []; 
		var randomMiddayTimes = []; 
		for(var k = 0;k<3;k+=1){
			randomTimes.push(chance.integer({min: 1, max: 11}) + ":" + randomMinute[chance.integer({min: 1, max: randomMinute.length-1})] + "pm");
			randomEveningTimes.push(chance.integer({min: 6, max: 11}) + ":" + randomMinute[chance.integer({min: 1, max: randomMinute.length-1})] + "pm");
			randomMiddayTimes.push(chance.integer({min: 1, max: 5}) + ":" + randomMinute[chance.integer({min: 1, max: randomMinute.length-1})] + "pm");
		}

    	var runtime = chance.integer({min: 70, max: 200}) + "min";

    	// ADD ID TO ALL FILES
    	finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>id</span>": ' + i;
		finalCSV = finalCSV + i;

		var j = 0;
		if(valuePool == "Users"){
			finalJSON = finalJSON + ',<br>';
			finalCSV = finalCSV + ",";
			finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>fullName</span>": "' + fullName + '"';
			finalCSV = finalCSV + fullName;
			j = 1;
		}

		if(valueArray.length == 0 && valuePool != "Users"){
			finalJSON = finalJSON + '<br>';
		}else if(valueArray.length == 1 && valuePool == "Users"){
			finalJSON = finalJSON + '<br>';
		}else{
			finalJSON = finalJSON + ',<br>';
			finalCSV = finalCSV + ",";
		}

		for(var j = j;j < valueArray.length;j+=1){
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
				case "childAge":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>childAge</span>": ' + childAge;
		    		finalCSV = finalCSV + childAge;
					break;
				case "teenAge":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>teenAge</span>": ' + teenAge;
		    		finalCSV = finalCSV + teenAge;
					break;
				case "age":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>age</span>": ' + age;
		    		finalCSV = finalCSV + age;
					break;
				case "seniorAge":
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
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>emailVerified</span>": ' + emailVerified;
					finalCSV = finalCSV + emailVerified;
					break;
				case "twitterHandle":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>twitterHandle</span>": "@' + username + '"';
					finalCSV = finalCSV + "@" + username;
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
				case "title":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>title</span>": "' + title + '"';
	    			finalCSV = finalCSV + title;
					break;
				case "subTitle":
					var subTitle = HolderIpsum.words(chance.integer({min: 5, max: 12}), true);
					subTitle = subTitle.charAt(0).toUpperCase() + subTitle.slice(1);
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>subTitle</span>": "' + subTitle + '"';
	    			finalCSV = finalCSV + subTitle;
					break;
				case "author":
					var usersName = username;
					if(valueDetailArray[j] == "fullName"){
						usersName = fullName;
					}else{
						usersName = "@" + usersName;
					}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>author</span>": "' + usersName + '"';
	    			finalCSV = finalCSV + usersName;
					break;
				case "createdOn":
					var createdOn = nonUsCreatedOn;
					if(valueDetailArray[j] == "nonUSDate"){
						createdOn = usCreatedOn;
					}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>createdOn</span>": "' + createdOn + '"';
	    			finalCSV = finalCSV + createdOn;
					break;
				case "snippet":
					var text = HolderIpsum.words(chance.integer({min: 110, max: 150}), true);
					for(var k = chance.integer({min: 60, max: 80});k < text.length;k+=chance.integer({min: 32, max: 100})){
						text = text.replaceAt(k, ". ");
					}
					text = text.replaceAll(" . ", ". ");
					var textArray = text.split(". ");
					for(var k = 0;k<textArray.length;k+=1){
						textArray[k] = textArray[k].capitalize();
						textArray[k] = textArray[k].replace(/\./g,'')
					}
					text = textArray.join(". ");
					text = text + ".";
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>snippet</span>": "' + text + '"';
	    			finalCSV = finalCSV + text;
					break;
				case "fullArticle":
					var p1 = HolderIpsum.words(chance.integer({min: 100, max: 150}), true) + HolderIpsum.words(chance.integer({min: 100, max: 150}), true);
					for(var k = chance.integer({min: 60, max: 80});k < p1.length;k+=chance.integer({min: 32, max: 100})){
						p1 = p1.replaceAt(k, ". ");
					}
					p1 = p1.replaceAll(" . ", ". ");
					var pArray = p1.split(". ");
					for(var k = 0;k<pArray.length;k+=1){
						pArray[k] = pArray[k].capitalize();
						pArray[k] = pArray[k].replace(/\./g,'')
					}
					p1 = pArray.join(". ");
					p1 = p1 + ".";
					var fullArticle = p1;
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>fullArticle</span>": "' + fullArticle + '"';
	    			finalCSV = finalCSV + fullArticle;
					break;
				case "rating":
					var tempRating = rating;
					if(valueDetailArray[j] == "outOfTen"){
						tempRating = tempRating * 2;
					}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>rating</span>": ' + tempRating;
	    			finalCSV = finalCSV + tempRating;
					break;
				case "description":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>description</span>": "' + description + '"';
					finalCSV = finalCSV + description;
					break;
				case "MPPArating":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>MPPArating</span>": "' + MPPArating + '"';
					finalCSV = finalCSV + MPPArating;
					break;
				case "runtime":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>runtime</span>": "' + runtime + '"';
					finalCSV = finalCSV + runtime;
					break;
				case "startTimes":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>startTimes</span>": {<br>';
					for(var k = 0;k<randomTimes.length;k+=1){
						if(k == randomTimes.length-1){
							finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>' + k + '</span>": "' + randomTimes[k] + '"<br>';
						}else{
							finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>' + k + '</span>": "' + randomTimes[k] + '",<br>';
						}
					}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}';
					finalCSV = finalCSV + '"';
					for(var k = 0;k<randomTimes.length;k+=1){
						if(k == randomTimes.length-1){
							finalCSV = finalCSV + randomTimes[k] + '"';
						}else{
							finalCSV = finalCSV + randomTimes[k] + ',';
						}
					}
					break;
				case "eveningStartTimes":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>eveningStartTimes</span>": {<br>';
					for(var k = 0;k<randomTimes.length;k+=1){
						if(k == randomEveningTimes.length-1){
							finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>' + k + '</span>": "' + randomEveningTimes[k] + '"<br>';
						}else{
							finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>' + k + '</span>": "' + randomEveningTimes[k] + '",<br>';
						}
					}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}';
					finalCSV = finalCSV + '"';
					for(var k = 0;k<randomTimes.length;k+=1){
						if(k == randomTimes.length-1){
							finalCSV = finalCSV + randomTimes[k] + '"';
						}else{
							finalCSV = finalCSV + randomTimes[k] + ',';
						}
					}
					break;
				case "middayStartTimes":
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>middayStartTimes</span>": {<br>';
					for(var k = 0;k<randomTimes.length;k+=1){
						if(k == randomMiddayTimes.length-1){
							finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>' + k + '</span>": "' + randomMiddayTimes[k] + '"<br>';
						}else{
							finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>' + k + '</span>": "' + randomMiddayTimes[k] + '",<br>';
						}
					}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}';
					finalCSV = finalCSV + '"';
					for(var k = 0;k<randomTimes.length;k+=1){
						if(k == randomTimes.length-1){
							finalCSV = finalCSV + randomTimes[k] + '"';
						}else{
							finalCSV = finalCSV + randomTimes[k] + ',';
						}
					}
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














