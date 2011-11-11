/*jshint boss:true, evil:true */

// usage:
//   jsc ${env_home}/jsc.js -- "{option1:true,option2:false}" ${file} ...

load("jshint.js");

if (typeof(JSHINT) === 'undefined') {
  print('jshint: Could not load jshint.js, tried "' + env_home + 'jshint.js".');
  quit();
}

(function(args){
    if (args.length < 1) {
        print('jshint: No file name was provided.');
        quit();
    }

	var err, opts;
	try {
		opts = JSON.parse(args[0]);
	} catch(err) {
		print( "Error while parsing arguments: '" + args[0] + "'" );
		quit();
	}

	for (var i = 1; i < args.length; i++) {
		try {
			input = read(args[i]);
		} catch(err) {
			print("Error while reading:", args[i]);
			quit();
		}
		if (!JSHINT(input, opts)) {
			for (var j = 0; err = JSHINT.errors[j]; j++) {
				print(err.reason + ' (line: ' + err.line + ', character: ' + err.character + ')');
				print('> ' + (err.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
				print('');
			}
		}
	}

    quit();
})(arguments);
