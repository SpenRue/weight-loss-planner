export function calculateTdee(tdee: any, deficit: number): { tdeeParams: any, bmr: number, tdee: number, calorieIntake: number, calorieLoss: number, exercise: number } {
  const bmr = (10 * tdee.weight * 0.453592) + (6.25 * tdee.height * 2.54) - (5 * tdee.age) + (tdee.gender === 'Male' ? 5 : 161);
  const result = bmr * tdee.activityScale;
  const calorieLoss = (result * deficit);
  return {
    tdeeParams: {...tdee, weight: tdee.weight + (calorieLoss / 3500) },
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

export function getGoalDate(tdee: any, deficit: number): any {
  if(!tdee.weightGoal || !tdee.weight || tdee.weight <= tdee.weightGoal) {
    return {days: 0, average: 0};
  }
  console.log('getting goal date', deficit, tdee);
  let newTdee = {...tdee, tdeeParams: tdee};
  console.log('new tdee', newTdee);
  let calorieLoss = [];
  for (let i = 0; i < 365 * 2; i++) {
    console.log('Calculating new TDEE');
    newTdee = calculateTdee(newTdee.tdeeParams, deficit);
    calorieLoss.push(newTdee.calorieLoss);
    if(newTdee.tdeeParams.weightGoal > newTdee.tdeeParams.weight)
      return {days: i, average: calorieLoss.reduce((a: number, b: number) => a + b, 0) / i};
  }

  return {days: -1, average: -1};
}