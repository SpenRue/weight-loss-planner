import {
  Card,
  Slider,
  Typography
} from "@material-ui/core";
import "./TDEEInput.scss"

import {useRecoilState} from "recoil";
import TDEEState from "./state/TDEEState";
import {calculateTdee, getGoalDate} from "./utils/WeightLossUtils";
import moment from "moment";

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function WeightLossGoals() {
  const [tdeeState, setTDEEState] = useRecoilState(TDEEState.state);
  function goal() {
    return getGoalDate(tdeeState, tdeeState.deficit/100);
  }
  return (
    <Card className={"card-container"}>
      <h3>Set your weight loss goals</h3>
      <form>
        <div className={'height-controls'}>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
            <Typography gutterBottom>Target Weight (lbs)</Typography>
            <div className="slider-control">
              <Slider
                defaultValue={150}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                min={50}
                max={300}
                value={tdeeState.weightGoal}
                onChange={(e, value) => setTDEEState({...tdeeState, weightGoal: value as number})}
              />
              <Typography>{tdeeState.weightGoal}</Typography>
            </div>
          </div>
          {/*<div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
          {/*  <Typography gutterBottom>Target Body Fat Percentage</Typography>*/}
          {/*  <Slider*/}
          {/*    defaultValue={25}*/}
          {/*    aria-labelledby="discrete-slider-custom"*/}
          {/*    step={1}*/}
          {/*    valueLabelDisplay="auto"*/}
          {/*    min={1}*/}
          {/*    max={50}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        {/*<div className={'height-controls'}>*/}
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
            <Typography gutterBottom>Target Calorie Deficit (Percentage)</Typography>
            <div className="slider-control">
              <Slider
                defaultValue={-1}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                value={tdeeState.deficit}
                onChange={(e, value) => setTDEEState({...tdeeState, deficit: value as number})}
                min={-75}
                max={0}
              />
              <Typography>{tdeeState.deficit}%</Typography>
            </div>
          </div>
        {/*  <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
        {/*    <Typography gutterBottom>End Deficit</Typography>*/}
        {/*    <Slider*/}
        {/*      defaultValue={0}*/}
        {/*      aria-labelledby="discrete-slider-custom"*/}
        {/*      step={1}*/}
        {/*      valueLabelDisplay="auto"*/}
        {/*      min={-50}*/}
        {/*      max={50}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
          <Typography gutterBottom>Amount of Days on Graph</Typography>
          <div className="slider-control">
            <Slider
              defaultValue={30}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              min={1}
              max={365 * 2}
              value={tdeeState.days}
              onChange={(e, value) => setTDEEState({...tdeeState, days: value as number})}
            />
            <Typography>{tdeeState.days}</Typography>
          </div>
        </div>
        <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
          <Typography gutterBottom>Your initial target calorie intake should be <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit/100).calorieIntake)} cal</strong>.</Typography>
        </div>
        <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
          <Typography gutterBottom>You will reach <strong>{tdeeState.weightGoal} lbs </strong> in <strong>{goal().days} days</strong> on <strong>{moment(addDays(new Date(), goal().days)).format('MMM Do YY')}</strong> with an average weight loss of <strong>{((goal().average as number) * 7 / 3500).toFixed(2)} lbs</strong> per week and <strong>{(goal().average * -1).toFixed(0)} cal</strong> burned per day.</Typography>
        </div>
      </form>
    </Card>
  );
}

export default WeightLossGoals;