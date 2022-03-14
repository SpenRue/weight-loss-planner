import {GoalDateModel, TDEEModel, WeightLossPlanModel} from "../state/WeightLossPlanState";

export function calculateTdee(weightLossPlanState: WeightLossPlanModel, deficit: number): TDEEModel {
  const bmr = (10 * weightLossPlanState.weight * 0.453592) + (6.25 * weightLossPlanState.height * 2.54) - (5 * weightLossPlanState.age) + (weightLossPlanState.gender === 'Male' ? 5 : 161);
  const result = bmr * weightLossPlanState.activityScale;
  const calorieLoss = (result * deficit);
  return {
    updatedWeight: weightLossPlanState.weight + (calorieLoss / 3500),
    bmr,
    tdee: result,
    calorieIntake: result + calorieLoss,
    calorieLoss,
    exercise: result - bmr
  };
}

export function compoundTdee(tdee: any, deficit: number, days: number, step: number): any {
  if(!tdee.weightGoal || !tdee.weight || tdee.weight <= tdee.weightGoal) {
    return [tdee];
  }
  step = step ?? 1;
  let resultData = [];
  let newTdee = {...tdee, tdeeParams: tdee};
  for (let i = 0; i < days; i++) {
    // console.log('new tdee params', newTdee.tdeeParams);
    newTdee = calculateTdee(newTdee.tdeeParams, deficit);
    if(i % step === 0)
      resultData.push({...newTdee, day: i});
  }
  // console.log(resultData);
  return resultData;
}

export function getGoalDate(weightLossPlanState: WeightLossPlanModel, deficit: number): GoalDateModel {
  if(!weightLossPlanState.weightGoal || !weightLossPlanState.weight || weightLossPlanState.weight <= weightLossPlanState.weightGoal) {
    return {days: 0, average: 0};
  }
  let newWeightLossPlanState = {...weightLossPlanState};
  let calorieLoss = [];
  for (let i = 0; i < 365 * 2; i++) {
    let tdeeResult: TDEEModel = calculateTdee(newWeightLossPlanState, deficit);
    newWeightLossPlanState = {...newWeightLossPlanState, weight: tdeeResult.updatedWeight}
    calorieLoss.push(tdeeResult.calorieLoss);
    if(weightLossPlanState.weightGoal > tdeeResult.updatedWeight)
      return {days: i, average: calorieLoss.reduce((a: number, b: number) => a + b, 0) / i};
  }

  return {days: -1, average: -1};
}