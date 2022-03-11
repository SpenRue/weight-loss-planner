import {
  Container,
  Slider, TextField,
  Typography
} from "@material-ui/core";
import "./TDEEInput.scss"

import {useRecoilState} from "recoil";
import TDEEState from "../state/TDEEState";
import {calculateTdee, getGoalDate} from "../utils/WeightLossUtils";
import moment from "moment";
import {Card, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function WeightLossGoals() {
  const [tdeeState, setTDEEState] = useRecoilState(TDEEState.state);

  function goal() {
    let result = getGoalDate(tdeeState, tdeeState.deficit / 100)
    console.log('result: ', result);
    return result;
  }

  function getBodyWeightPercentageDelta() {
    let goalResult = (goal().average as number) * 7 / 3500;
    let result = 1 * goalResult / tdeeState.weight;
    return (result * 100).toFixed(2)
  }

  function getDeficitBasedOnMode() {
    switch(tdeeState.deficitMode) {
      case 'calories':
        return (goal().average).toFixed(0);
      case 'caloriePercentage':
        return tdeeState.deficit;
      case 'bodyWeightPercentage':
        return getBodyWeightPercentageDelta();
      default:
        return tdeeState.deficit;
    }
  }

  function getUnitBasedOnMode() {
    switch(tdeeState.deficitMode) {
      case 'calories':
        return ' calories per day';
      case 'caloriePercentage':
        return ' % of TDEE per day';
      case 'bodyWeightPercentage':
      default:
        return '% of body weight per week';
    }

  }

  let weightGoalText: string = tdeeState.weightGoal.toString();

  return (
    <Container className={"card-container"}>
      <h2>Set your weight loss goals</h2>
      <form>
        <TextField
          label="Target Weight"
          type="number"
          inputProps={{inputMode:"numeric", min: 0}}
          variant='filled'
          style={{width: '100%'}}
          value={weightGoalText}
          onChange={(event) => {
            // weightGoalText = event.target.value;
            // if(!event.target.value) return;
            console.log('Setting weightGoal to: ', event.target.value);
            setTDEEState({
              ...tdeeState,
              weightGoal: Number.parseInt(event.target.value)
            })
          }}

        />
        {/*<div className={'height-controls'}>*/}
        {/*  /!*<div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*!/*/}
        {/*  /!*  <Typography gutterBottom>Target Weight (lbs)</Typography>*!/*/}
        {/*  /!*  <div className="slider-control">*!/*/}
        {/*  /!*    <Slider*!/*/}
        {/*  /!*      defaultValue={150}*!/*/}
        {/*  /!*      aria-labelledby="discrete-slider-custom"*!/*/}
        {/*  /!*      step={1}*!/*/}
        {/*  /!*      valueLabelDisplay="auto"*!/*/}
        {/*  /!*      min={50}*!/*/}
        {/*  /!*      max={300}*!/*/}
        {/*  /!*      value={tdeeState.weightGoal}*!/*/}
        {/*  /!*      onChange={(e, value) => setTDEEState({...tdeeState, weightGoal: value as number})}*!/*/}
        {/*  /!*    />*!/*/}
        {/*  /!*    <Typography>{tdeeState.weightGoal}</Typography>*!/*/}
        {/*  /!*  </div>*!/*/}
        {/*  /!*</div>*!/*/}
        {/*  /!*<div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*!/*/}
        {/*  /!*  <Typography gutterBottom>Target Body Fat Percentage</Typography>*!/*/}
        {/*  /!*  <Slider*!/*/}
        {/*  /!*    defaultValue={25}*!/*/}
        {/*  /!*    aria-labelledby="discrete-slider-custom"*!/*/}
        {/*  /!*    step={1}*!/*/}
        {/*  /!*    valueLabelDisplay="auto"*!/*/}
        {/*  /!*    min={1}*!/*/}
        {/*  /!*    max={50}*!/*/}
        {/*  /!*  />*!/*/}
        {/*  /!*</div>*!/*/}
        {/*</div>*/}
        {/*<div className={'height-controls'}>*/}
        <Typography gutterBottom>How do you want to measure your daily change?</Typography>
        <ToggleButtonGroup style={{width: '100%'}}
                           aria-label="outlined primary button group" value={tdeeState.deficitMode}
                           exclusive
                           onChange={(
                             event: React.MouseEvent<HTMLElement>,
                             newAlignment: string | null,
                           ) => {
                             setTDEEState({...tdeeState, deficitMode: newAlignment || ''})
                           }}
        >
          <ToggleButton value="calories">Calories<br/>(Per Day)</ToggleButton>
          <ToggleButton value="caloriePercentage">TDEE %<br/>(Per Day)</ToggleButton>
          <ToggleButton value="bodyWeightPercentage">Body Weight %<br/>(Per Week)</ToggleButton>
        </ToggleButtonGroup>
        <Typography gutterBottom>Target Change: {getDeficitBasedOnMode() + getUnitBasedOnMode()}</Typography>
        <div className="slider-control">
          <Slider
            defaultValue={-1}
            aria-labelledby="discrete-slider-custom"
            step={0.01}
            valueLabelDisplay="auto"
            value={tdeeState.deficit}
            onChange={(e, value) => setTDEEState({...tdeeState, deficit: value as number})}
            min={-75}
            max={0}
            marks={[
              {
                value: 0,
                label: 'Maintenance'
              },
              {
                value: -19,
                label: 'Slow',
              },
              {
                value: -30,
                label: 'Fast',

              },
              {
                value: -60,
                label: 'Crash Diet'
              }
            ]}
            valueLabelFormat={(_) => getDeficitBasedOnMode()}
          />
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
        {/*<div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
        {/*  <Typography gutterBottom>Amount of Days on Graph</Typography>*/}
        {/*  <div className="slider-control">*/}
        {/*    <Slider*/}
        {/*      defaultValue={30}*/}
        {/*      aria-labelledby="discrete-slider-custom"*/}
        {/*      step={1}*/}
        {/*      valueLabelDisplay="auto"*/}
        {/*      min={1}*/}
        {/*      max={365 * 2}*/}
        {/*      value={tdeeState.days}*/}
        {/*      onChange={(e, value) => setTDEEState({...tdeeState, days: value as number})}*/}
        {/*    />*/}
        {/*    <Typography>{tdeeState.days}</Typography>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <Card variant="outlined" style={{padding: '1rem'}}>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>Your initial target calorie intake should
              be <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit / 100).calorieIntake)} cal</strong>.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>You will
              reach <strong>{tdeeState.weightGoal} lbs </strong> in <strong>{goal().days} days</strong> on <strong>{moment(addDays(new Date(), goal().days)).format('MMM Do YY')}</strong> with
              an average weight loss of <strong>{((goal().average as number) * 7 / 3500).toFixed(2)} lbs</strong> per
              week and <strong>{(goal().average * -1).toFixed(0)} cal</strong> burned per day.</Typography>
          </div>
        </Card>
      </form>
    </Container>
  );
}

export default WeightLossGoals;