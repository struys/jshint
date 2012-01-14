/*jshint boss:true, evil:true */

usage = 'cat file.js | jsc.js /path/to/jshint.js jsopts file.js';
load(arguments[0]);

if (typeof(JSHINT) === 'undefined') {
  print('jshint: Could not load jshint.js, tried "' + env_home + 'jshint.js".');
  quit();
}

(function(args){
  if (args.length < 2) {
    print('usage: ' + usage);
    quit();
  }

  var err, opts;
  try {
    opts = JSON.parse(args[1]);
  } catch(err) {
    print( "Error while parsing arguments: '" + args[1] + "'" );
    quit();
  }

  var line = readline();
  var input = "";
  while ( line !== null && line !== undefined && line !== 'EOF***') {
    input += line + '\n';
    line = readline();
  }

  if (!JSHINT(input, opts)) {
    if (JSHINT.errors.length) {
      print("LINT ERROR: " + args[2]);
    }

    for (var j = 0; err = JSHINT.errors[j]; j++) {
      print(args[2] + ': line ' + err.line + ', col ' + err.character + ', ' + err.reason);
      print('> ' + (err.evidence || '').replace(/\t/g, "    "));
      print((new Array(err.character + 2)).join(' ') + '^');
    }
  }

  if (JSHINT.errors.length) {
    quit(-1);
  }


  quit();
})(arguments);

// vim:expandtab:sw=2:sts=2
