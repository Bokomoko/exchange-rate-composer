/*
# Given a file of currency conversion rates, write a
# function that converts one currency to another.

# Sample log file entries:

# Means USD is worth 1.32 GBP
*/
// assuming the rateTable is a json object with the schema above.

function convCurr(inCurr, outCurr, rateArray) {
    // filter the rates from input currency 
    
    const inRate = rateArray.find((e) => {
      return e.from == inCurr && e.to == outCurr
    })
    if (inRate) {    // if there is no rate 
      return inRate.rate
    }
  
    // get all the rates from inCurr 
    const fromIn = rateArray.filter((e) => e.from == inCurr)
    if (fromIn.length == 0) {
      return null
    }
    for (let newOutCurr of fromIn) {
      const rate = convCurr(newOutCurr.to, outCurr, rateArray)
      if (rate) {
        return newOutCurr.rate * rate
      }
    }
    return null
  }
  
  // this is the original structure of the exchange rates file
  rates = [
    { from: "EUR", to: "GBP", rate: 1.2 },
    { from: "GBP", to: "BRL" , rate: 5.5},
    { from: "USD", to: "EUR", rate: 1.1 },
    { from: "USD", to : "AUS", rate: 1.46 }
  ]
  
  const ratesMap = {}
  for ( const rate of rates) {
    ratesMap[rate.from] = {[rate.to] : rate.rate } 
    ratesMap[rate.to]= { [rate.from] : 1/rate.rate }

  }
   
  for ( const  fromCurr of Object.keys(ratesMap) ){
    for ( const [ toCurr, rate  ] of Object.entries(ratesMap[fromCurr])) {
        console.log(`from ${fromCurr} to ${toCurr} rate is ${rate.toFixed(4)}`)
    }
  }

  // object ratesMap now contains all the exchange rates and their inverses



  console.log(convCurr('USD', 'EUR', rates))
  
  console.log(convCurr('USD', 'GBP', rates))
  
  console.log(convCurr('USD', 'BRL', rates))