#!/bin/bash
# usage (run from any directory) :
#   env/jsc.sh /path/to/script.js
# or with jshint options:
#   env/jsc.sh /path/to/script.js "option1:true,option2:false,option3:25"

alias jsc="/usr/bin/js"
FILE="${1}"
OPTS="${2}"

FILE_CONTENT=$(cat "${FILE}")

if [ -L $BASH_SOURCE ]; then
  ENV_HOME="$( cd "$( dirname "$(readlink "$BASH_SOURCE")" )" && pwd )"
else
  ENV_HOME="$( cd "$( dirname "$BASH_SOURCE" )" && pwd )"
fi

LINT_RESULT=$(/usr/bin/js "${ENV_HOME}"/jsc.js -- "${FILE_CONTENT}" "${OPTS}" "${ENV_HOME}")
ERRORS=$(echo ${LINT_RESULT} | egrep [^\s] -c)

if [[ ${ERRORS} -ne 0 ]]; then
	echo "[jshint] Error(s) in ${FILE}:"
	printf "%s\n" "${LINT_RESULT}"
else
	echo "[jshint] ${FILE} passed!"
fi

exit $((0 + ${ERRORS}))
