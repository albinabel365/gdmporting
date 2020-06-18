var GCMErrorMapping = function getErrorObject(errorCode) {
    var errObj = {};
    errObj.errorSeverity = "ERROR";
    errObj.errorCode = errorCode;
    switch (errorCode) {
        case 1:
        case 2:
        case 3:
        case 102:
            errObj.errorCategory = "NON_RECOVERABLE_ERROR";
            break;
        case 103:
            errObj.errorCategory = "RECOVERABLE_ERROR";
            errObj.errorSeverity = "INFO";
            break;
        case 1000:
        case 1003:
            errObj.errorCategory = "LOGIN_ERROR";
            break;
        case 1006:
            errObj.errorCategory = "INSUFFICIENT_FUNDS";
            break;
        case 1109:
            errObj.errorCategory = "REALITY_CHECK";
            break;
        default:
            errObj.errorCategory = "CRITICAL";
    }
    return errObj;
}

if (typeof exports !== 'undefined') {  // Necessary for gcmerrormapping.test.js to import/require these functions
    module.exports = {
        GCMErrorMapping: GCMErrorMapping,
    };
}