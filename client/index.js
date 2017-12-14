import _ from 'lodash';
import getMoment from 'moment';
import sum from './func';

const main = (z) => {
  const result = sum(z)(3);
  const day = getMoment().format('dddd');
  console.log(`Hi! It is now ${day}. Your sum is ${result}`);
  return result;
};

main(10);
