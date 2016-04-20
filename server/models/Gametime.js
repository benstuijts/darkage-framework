'use strict';

const Gametime = function(durationOfOneTurnInMinutes, durationOfOneTurnInGametimeInMinutes) {
  const gametime = {
    turn: durationOfOneTurnInMinutes, 
    turnGT: durationOfOneTurnInGametimeInMinutes //120 * 60, // minuten gametime 120 * 60 = 7200 minuten = 120 uur = 5 dagen
  }; 
  
  gametime.set = function(durationOfOneTurnInMinutes, durationOfOneTurnInGametimeInMinutes) {
      gametime.turn = durationOfOneTurnInMinutes;
      gametime.turnGT = durationOfOneTurnInGametimeInMinutes;
  };
  
  gametime.RTtoGT = function(RT) {
    return {
      milliseconds: Math.round(((1/(gametime.turnGT/gametime.turn)) * RT) * 60 * 1000),
      seconds: ((1/(gametime.turnGT/gametime.turn)) * RT) * 60,
      minutes: (1/(gametime.turnGT/gametime.turn)) * RT
    };
  };
  
  gametime.GTtoRT = function(GT) {
    return {
      milliseconds: Math.round((gametime.turn / gametime.turnGT) * GT * 60 ),
      seconds: (gametime.turn / gametime.turnGT) * GT * 60,
      minutes: (gametime.turn / gametime.turnGT) * GT,
    }
  }
  
  gametime.timePassed = function(turns) {
    return {
      turns: turns,
      realtime: turns * gametime.turn,
      gametime : {
        milliseconds: turns * gametime.turnGT * 1000,
        minutes: turns * gametime.turnGT,
        hours: turns * gametime.turnGT / 60,
        days: turns * gametime.turnGT / 60 / 24,
        years: turns * gametime.turnGT / 60 / 24 / 365,
      }
    };
  };
  
  return gametime;
};

module.exports = Gametime;