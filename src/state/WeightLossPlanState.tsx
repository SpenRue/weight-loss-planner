import {atom, selector, useRecoilState} from "recoil";
import {calculateTdee, getGoalDate} from "../utils/WeightLossUtils";
import { useSearchParams } from 'react-router-dom';
import {useEffect, useRef} from "react";
import qs from 'qs';

// export function SetUrlHook() {
//   const [weightLossPlanState, setWeightLossPlanState] = useRecoilState(WeightLossPlanState);
//   const latestWeightLossPlanState = useRef(weightLossPlanState);
//   const [searchParams, setSearchParams] = useSearchParams();
//   // useEffect(() => {
//   //   latestWeightLossPlanState.current = weightLossPlanState;
//   // }, [weightLossPlanState]);
//
//   useEffect(()=>{
//     // your custom hook logic here
//     // use latestSomeState.current for latest value
//     setSearchParams(qs.stringify(weightLossPlanState));
//   });
//
// }


export interface WeightLossPlanModel {
  gender: string;
  weight: number;
  age: number;
  bfp: number;
  bfpGoal: number;
  height: number;
  exerciseVolume: number;
  activityScale: number;
  deficit: number;
  deficitMode: string;
  targetMode: string;
  days: number;
  weightGoal: number;
}

export interface TDEEModel {
  updatedWeight: number,
  bmr: number,
  tdee: number,
  calorieIntake: number,
  calorieLoss: number,
  exercise: number
}

export interface GoalDateModel {
  days: number,
  average: number
}

let defaultValue: WeightLossPlanModel = {
  gender: 'Male',
  weight: 160,
  age: 20,
  bfp: 30,
  bfpGoal: 15,
  height: 12 * 5,
  exerciseVolume: 0,
  activityScale: 1.2,
  deficit: -10,
  deficitMode: 'calories',
  targetMode: 'weight',
  days: 30,
  weightGoal: 150
}


const WeightLossPlanState = atom({
  key: 'WeightLossPlanState',
  default: defaultValue,
  // effects_UNSTABLE: [
  //   ({onSet}) => {
  //     onSet((newValue, oldValue) => {
  //
  //     })
  //   }
  // ]
});

const TDEEState = selector({
  key: 'tdeeState',
  get: ({get}) => {
    const weightLossPlanState = get(WeightLossPlanState);
    return calculateTdee(weightLossPlanState, weightLossPlanState.deficit/100);
  }
})

const GoalDateState = selector({
  key: 'goalDateState',
  get: ({get}) => {
    const weightLossPlanState = get(WeightLossPlanState);
    return getGoalDate(weightLossPlanState, weightLossPlanState.deficit/100);
  }
})

export default {
  state: WeightLossPlanState,
  selectors: {
    TDEEState,
    GoalDateState,
  }
};