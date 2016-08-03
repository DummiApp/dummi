/*
  [ ] view
    [ ] outputType
    [ ] title
    [ ] amount
    [ ] valuePool
      [ ] show options for datapool
    [ ] presets
  [ ] generators
    [ ] A bunch of functions that generate a bunch of things
  [ ] the master generator
    [ ] generates the output
  [ ] display
    [ ] translates the object to nicely viewable document
*/

var viewOptions = {
  valuePool: 'Users'
};

var generateOptions = {
  type: 'JSON',
  title: 'dummi',
  amount: 2
};

var schema = [
	{
		type: 'fullName',
		option: 'both',
		key: 'fullName'
	},
  {
    type: 'age',
    option: 'child',
    key: 'age'
  }
];


function generateFullName(gender) {
  return 'Random Name';
}

function generateAge(group) {
  group = group || 'adult';

  var groups = {
    child: {min: 1, max: 12},
    teen: {min: 13, max: 17},
    adult: {min: 18, max: 61},
    senior: {min: 62, max: 95}
  }

  return chance.integer(groups[group]);
}

function Generator() {
	var generate = {
		fullName: generateFullName,
		firstName: generateFullName,
    age: generateAge
	};

	function JSONgenerator(schema, prettify) {
		var output = {};

		output[generateOptions.title] = [];
		var itemsOutput = output[generateOptions.title];

		for (var i = 0; i < generateOptions.amount; i++) {
			var itemOut = {};
			itemOut.id = i;

			schema.forEach(function(item) {
				var option = item.option || null;

				itemOut[item.key] = generate[item.type](option);
			});

			itemsOutput.push(itemOut);
		}

    if (prettify) {
      output = JSON.stringify(output, null, 2);
      output = output.replace(/"(\w+)":/g, '"<span>$1</span>":');
    }

    return output;
	};

	function CSV(schema, prettify) {
    var output = '';

    function newLine() {
      output = output.slice(0, -1);
      output += '\n';
    }

    schema.forEach(function(item) {
      if (prettify) { output += '<span>'; }
      output += item.key;
      if (prettify) { output += '</span>'; }
      output += ',';
    });

    newLine()

    for (var i = 0; i < generateOptions.amount; i++) {
      schema.forEach(function(item) {
        var option = item.option || null;

        output += generate[item.type](option) + ',';
      });
      newLine();
    }

    return output;
  };

	return {
		JSON: JSONgenerator,
		CSV: CSV
	};
}

var type = 'JSON';
var generator = new Generator();
var finalOutput = generator[type](schema, true);

console.log(finalOutput);
