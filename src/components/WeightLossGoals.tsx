import {
  Container,
  Slider, TextField,
  Typography
} from "@material-ui/core";
import "./TDEEInput.scss"

import {useRecoilState, useRecoilValue} from "recoil";
import WeightLossPlanState from "../state/WeightLossPlanState";
import {calculateTdee, getGoalDate} from "../utils/WeightLossUtils";
import moment from "moment";
import {Card, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";
import _ from "lodash";

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function WeightLossGoals() {
  const [weightLossPlanState, setWeightLossPlanState] = useRecoilState(WeightLossPlanState.state);
  const tdeeState = useRecoilValue(WeightLossPlanState.selectors.TDEEState);
  const goalDateState = useRecoilValue(WeightLossPlanState.selectors.GoalDateState);
  const weightGoalState = useRecoilValue(WeightLossPlanState.selectors.WeightGoalState);

  function getBodyWeightPercentageDelta() {
    let goalResult = (goalDateState.average as number) * 7 / 3500;
    let result = 1 * goalResult / weightLossPlanState.weight;
    return (result * 100).toFixed(2)
  }

  function getDeficitBasedOnMode() {
    switch (weightLossPlanState.deficitMode) {
      case 'calories':
        return (goalDateState.average).toFixed(0);
      case 'caloriesConsumed':
        return Math.floor(tdeeState.calorieIntake);
      case 'caloriePercentage':
        return weightLossPlanState.deficit;
      case 'bodyWeightPercentage':
        return getBodyWeightPercentageDelta();
      default:
        return weightLossPlanState.deficit;
    }
  }

  function getUnitBasedOnMode() {
    switch (weightLossPlanState.deficitMode) {
      case 'calories':
        return ' calories burned per day';
      case 'caloriesConsumed':
        return ' calories consumed per day';
      case 'caloriePercentage':
        return ' % of TDEE per day';
      case 'bodyWeightPercentage':
      default:
        return '% of body weight per week';
    }

  }

  let handleStateChange = _.throttle((newState) => {
    setWeightLossPlanState(newState);
  }, 300, {trailing: false});

  return (
    <Container className={"card-container"}>
      <h2>Set your weight loss goals</h2>
      <form>
        <Typography>Do you want to target a body fat percentage or a weight?</Typography>
        <ToggleButtonGroup style={{width: '100%'}}
                           aria-label="outlined primary button group" value={weightLossPlanState.targetMode}
                           exclusive
                           onChange={(
                             event: React.MouseEvent<HTMLElement>,
                             newAlignment: string | null,
                           ) => {
                             setWeightLossPlanState({...weightLossPlanState, targetMode: newAlignment || ''})
                           }}
        >
          <ToggleButton value="weight">Weight</ToggleButton>
          <ToggleButton value="bfp">Body Fat %</ToggleButton>
        </ToggleButtonGroup>
        {weightLossPlanState.targetMode == 'bfp' &&
        <div>
            <Paper elevation={0} sx={{padding: '0.75rem',marginBottom: '1rem', color: '#bf360c', bgcolor: '#fbe9e7'}}>
                <Typography>The target weight is being calculated assuming you will lose 75% fat and 25% lean mass.</Typography>
            </Paper>
            <div style={{display: 'flex', gap: '1rem'}}>
                <TextField
                    label="Current Body Fat Percentage"
                    type="number"
                    InputProps={{inputProps: { min: 5 }}}
                    variant='filled'
                    style={{flexGrow: 1}}
                    value={weightLossPlanState.bfp || ''}
                    onChange={(event) => {
                      if(!event.target.value)
                        event.target.value = '';
                      console.debug('Setting cBFP to: ', event.target.value);
                      setWeightLossPlanState({
                        ...weightLossPlanState,
                        bfp: Number.parseInt(event.target.value),
                      })
                    }}

                />
                <TextField
                    label="Target Body Fat Percentage"
                    type="number"
                    InputProps={{inputProps: { min: 5 }}}
                    variant='filled'
                    style={{flexGrow: 1}}
                    value={weightLossPlanState.bfpGoal || ''}
                    onChange={(event) => {
                      // weightGoalText = event.target.value;
                      console.debug('Setting tBFP to: ', event.target.value);
                      setWeightLossPlanState({
                        ...weightLossPlanState,
                        bfpGoal: Number.parseInt(event.target.value),
                      })
                    }}

                />
            </div>
        </div>
        }
        <TextField
          label="Target Weight"
          type="number"
          InputProps={{inputProps: { min: 0 }}}
          variant='filled'
          disabled={weightLossPlanState.targetMode == 'bfp'}
          style={{flexGrow: 1, width: '100%'}}
          value={weightGoalState || ''}
          onChange={(event) => {
            // weightGoalText = event.target.value;
            console.debug('Setting THE weightGoal to: ', event.target.value);
            setWeightLossPlanState({
              ...weightLossPlanState,
              weightGoal:  Number.parseInt(event.target.value)
            })
          }}

        />
        <Typography gutterBottom>How do you want to measure your daily change?</Typography>
        <ToggleButtonGroup style={{width: '100%'}}
                           aria-label="outlined primary button group" value={weightLossPlanState.deficitMode}
                           exclusive
                           onChange={(
                             event: React.MouseEvent<HTMLElement>,
                             newAlignment: string | null,
                           ) => {
                             setWeightLossPlanState({...weightLossPlanState, deficitMode: newAlignment || ''})
                           }}
        >
          <ToggleButton value="calories">Calories Burned<br/>(Per Day)</ToggleButton>
          <ToggleButton value="caloriesConsumed">Calories Consumed<br/>(Per Day)</ToggleButton>
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
            value={weightLossPlanState.deficit}
            onChange={(e, value) => handleStateChange({...weightLossPlanState, deficit: value as number})}
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
        <Card variant="outlined" style={{padding: '1rem'}}>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>Your initial target calorie intake should
              be <strong>{Math.floor(tdeeState.calorieIntake)} cal</strong>.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>You will
              reach <strong>{weightGoalState} lbs </strong> in <strong>{goalDateState.days} days</strong> on <strong>{moment(addDays(new Date(), goalDateState.days)).format('MMM Do YY')}</strong> with
              an average weight loss of <strong>{((goalDateState.average as number) * 7 / 3500).toFixed(2)} lbs</strong> per
              week and <strong>{(goalDateState.average * -1).toFixed(0)} cal</strong> burned per day.</Typography>
          </div>
        </Card>
      </form>
    </Container>
  );
}

export default WeightLossGoals;