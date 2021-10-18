const validateparams =  {
    checkParamsPresent: (reqParams, paramObj) => {
      let invalidParameters = [];
      if (validateparams.isparamempty(reqParams)) return false;
      for (let param in reqParams){
        if (!paramObj.includes(param)) invalidParameters.push(param);
      }
      if (invalidParameters.length > 0) return invalidParameters;
      return [];
    },
    isparamempty: (reqParam) => {
      if (reqParam == null || reqParam == 'undefined' || reqParam == []) return true;
    },
  };

module.exports =  validateparams;
