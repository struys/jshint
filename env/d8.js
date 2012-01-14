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
  var errorsFound = false;
  try {
    opts = JSON.parse(args[0]);
  } catch(err) {
    print( "Error while parsing arguments: '" + args[0] + "'" );
    quit();
  }


  for (var i = 1; i < args.length; i++) {
    try {
      print(args[i]);
      input = read(args[i]);
    } catch(err) {
      print("Error while reading:", args[i]);
      throw err;
    }
    if (!JSHINT(input, opts)) {
      if (JSHINT.errors.length) {
        print("LINT ERROR: " + args[i]);
        errorsFound = true;
      }

      for (var j = 0; err = JSHINT.errors[j]; j++) {
        print(args[i] + ': line ' + err.line + ', col ' + err.character + ', ' + err.reason);
        print('> ' + (err.evidence || '').replace(/\t/g, "    "));
        print((new Array(err.character + 2)).join(' ') + '^');
      }
    }
  }

    quit(errorsFound ? -1 : 0);
})(arguments);

// vim:expandtab:sw=2:sts=2
