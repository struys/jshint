/*jshint boss:true, evil:true */

// usage:
//   jsc ${env_home}/jsc.js -- ${file} "{option1:true,option2:false}" ${env_home}

		
load("../jshint.js");

if (typeof(JSHINT) === 'undefined') {
  print('jshint: Could not load jshint.js, tried "' + env_home + 'jshint.js".');
  quit();
}

(function(args){

    trim = function(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '')
	}
	
    var name  = args[0],
        opts  = (function(arg){
            var opts = {};
            var item;

            switch (arg) {
            case undefined:
            case '':
                return opts;
            default:
                arg = arg.split(',');
                for (var i = 0, ii = arg.length; i < ii; i++) {
                    item = arg[i].split(':');
                    opts[item[0]] = eval(item[1]);
                }
                return opts;
            }
        })(args[1]);

    if (!name) {
        print('jshint: No file name was provided.');
        quit();
    } else if ( ! name.match(/^\//) ) {
		name = trim(os.system("readlink", ["-f", name]));
	}

	print("Reading file... >", name, "<");
    input = read(name);

    if (!JSHINT(input, opts)) {
        for (var i = 0, err; err = JSHINT.errors[i]; i++) {
            print(err.reason + ' (line: ' + err.line + ', character: ' + err.character + ')');
            print('> ' + (err.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
            print('');
        }
    }

    quit();
})(arguments);
