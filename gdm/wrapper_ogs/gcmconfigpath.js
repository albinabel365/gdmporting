var GCMConfigUrl = function getGCMConfigUrl(env,stage) {
    if(env.toLowerCase() == 'dev'){
        return "https://ogs-gcm-eu-dev.nyxop.net/gcm/config.js";
    }
    else if(env.toLowerCase() == 'pa'){
        return stage ? "https://ogs-gcm-pa-stage.nyxop.net/gcm/config.js" : "https://ogs-gcm-pa-prod.nyxop.net/gcm/config.js";
    }
    else if(env.toLowerCase() == 'pail'){
        return stage ? "https://ogs-gcm-pail-stage.nyxop.net/gcm/config.js" : "https://ogs-gcm-pail-prod.nyxop.net/gcm/config.js";
    }
    else if(env.toLowerCase() == 'can'){
        return stage ? "https://ogs-cdn-stage-ca.nyxop.net/gcm/config.js" : "https://ogs-cdn-ca.nyxop.net/gcm/config.js";
    }
    else if(env.toLowerCase() == 'usnj'){
        return stage ? "https://ogs-cdn-usnj-stage.nyxop.net/gcm/config.js" : "https://ogs-cdn-usnj.nyxop.net/gcm/config.js";
    }
    else if(env.toLowerCase() == 'local'){
        return "/gcm/config.js"
    }
    else{
        return stage ? "https://ogs-gcm-eu-stage.nyxop.net/gcm/config.js" : "https://ogs-gcm-eu-prod.nyxop.net/gcm/config.js";
    }
 }

