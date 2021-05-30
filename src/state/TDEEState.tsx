import {atom, selector, useRecoilState} from "recoil";

let TDEEState = atom({
  key: 'TDEEState',
  default: {
    gender: 'Male',
    weight: 0,
    age: 0,
    bfp: 0,
    height: 12 * 4,
    exerciseVolume: 0,
    activityScale: 1,
    deficit: 0,
    days: 30,
    weightGoal: 150
  }
});

export default {
  state: TDEEState,
};