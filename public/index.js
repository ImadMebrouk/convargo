'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];



//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function shippingPrice(){

  var distance=0;
  var volume=0;
  for(var i =0; i < Object.keys(deliveries).length; i++){
    for(var j =0; j < Object.keys(truckers).length; j++){
        if(deliveries[i].truckerId == truckers[j].id)
        {
        distance = deliveries[i].distance*truckers[j].pricePerKm;
        volume =deliveries[i].volume*truckers[j].pricePerVolume;

        deliveries[i].price = distance + volume;
        }
      }
   }
 }

function DecreasePrice(){

  var reduction = 0;
  for(var i =0; i < Object.keys(deliveries).length; i++){
    for(var j =0; j < Object.keys(truckers).length; j++){
        if(deliveries[i].truckerId == truckers[j].id)
        {
          if(deliveries[i].volume < 5){
             reduction =0;
          }
          else if(deliveries[i].volume < 10){
              reduction = truckers[j].pricePerVolume* 0.1;
          }
          else if(deliveries[i].volume < 25){
              reduction = truckers[j].pricePerVolume* 0.3;
          }
          else{
                reduction = truckers[j].pricePerVolume* 0.5;
          }

        truckers[j].pricePerVolume -= reduction;
        }
      }
    }

    shippingPrice();
    CommissionComputing();
    DeductibleCharge();

}

function CommissionComputing(){

  for(var i =0; i < Object.keys(deliveries).length; i++){
        var commission = deliveries[i].price*0.3;
        var insuranceCom = commission/2;
        var treasuryCom = Math.floor(deliveries[i].distance/500)+1;
        var convargoCom = commission - insuranceCom -treasuryCom;

        deliveries[i].commission.convargo = convargoCom;
        deliveries[i].commission.insurance = insuranceCom;
        deliveries[i].commission.treasury = treasuryCom;

      }
}

function DeductibleCharge(){
  var charge =0;
  for(var i =0; i < Object.keys(deliveries).length; i++){

      if(deliveries[i].options.deductibleReduction ==true)
      {
         charge = Math.floor(deliveries[i].volume);

          deliveries[i].commission.convargo += charge;
          deliveries[i].price += charge;
      }
    }
}

function ActorDebit(){
          for(var i=0; i<deliveries.length;i++ ){
            for(var j=0; j<actors.length;j++){
              if(deliveries[i].id == actors[j].deliveryId)
              {
                actors[j].payment[0].amount = deliveries[i].price; //shipper
                actors[j].payment[1].amount = deliveries[i].price - (deliveries[i].price*0.3); //owner
                actors[j].payment[2].amount = deliveries[i].commission.treasury; // treasury
               actors[j].payment[3].amount = deliveries[i].commission.insurance;//insurance
               actors[j].payment[4].amount = deliveries[i].commission.convargo;//convargo

              }
            }
          }
    }







DecreasePrice();
ActorDebit();

console.log(truckers);
console.log(deliveries);
console.log(actors);
