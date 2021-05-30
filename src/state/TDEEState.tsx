import {atom, selector, useRecoilState} from "recoil";

let TDEEState = atom({
  key: 'TDEEState',
  default: {
    gender: 'Male',
    weight: 160,
    age: 20,
    bfp: 0,
    height: 12 * 5,
    exerciseVolume: 0,
    activityScale: 1.2,
    deficit: -10,
    days: 30,
    weightGoal: 150
  }
});

export default {
  state: TDEEState,
};