const ship = (length) => {
  let shipLength = length;
  let timesHit = 0;
  let sunkOrNot = false;

  // functions that get our values.
  const getLength = ()=> length;
  const getTimesHit = ()=> timesHit;
  //   might be redundant, as isSunk already returns sunkOrNot after an additional check.
  const getSunkenStatus = ()=> sunkOrNot;

  const hit = () => {
    timesHit += 1;
  };

  const isSunk = () => {
    if (timesHit === shipLength){
      sunkOrNot = true;
    }
    return sunkOrNot;
  };

  return {getLength, getTimesHit, getSunkenStatus, hit, isSunk};
};



export default ship;
