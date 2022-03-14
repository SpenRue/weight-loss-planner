import {
  Box,
  Card, Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography
} from "@material-ui/core";
import "./TDEEInput.scss"
import React, {useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import WeightLossPlanState, {WeightLossPlanModel} from "../state/WeightLossPlanState";
import {calculateTdee} from "../utils/WeightLossUtils";
import {TextField} from "@material-ui/core";
import {flexbox, spacing} from '@mui/system';
import _ from "lodash";

function TDEEInput() {
  const [weightLossPlanState, setWeightLossPlanState] = useRecoilState(WeightLossPlanState.state);
  const tdeeState = useRecoilValue(WeightLossPlanState.selectors.TDEEState);

  // const [gender, setGender] = useState('Male')
  // const [weight, setWeight] = useState(0);
  // const [age, setAge] = useState(0);
  // const [bfp, setBfp] = useState(0);
  // const [inches, setInches] = useState(0);
  // const [exerciseVolume, setExerciseVolume] = useState(0);

   let handleStateChange = _.throttle(
    (newState: WeightLossPlanModel) => {
    console.log('actually setting the new state');
    setWeightLossPlanState(newState);
  }
  , 100, {trailing: false});

  let someValue: number = 1.2;
  return (
    <Container className={"card-container"}>
      <h2>Find your Total Daily Energy Expenditure</h2>
      {/*<span style={{display: 'block', position: "relative", top: '-1rem', marginBottom: 0}}>(How much you burn a day)</span>*/}
      <form>
        <FormControl style={{flexGrow: 1, flexBasis: 0, width: '100%'}} variant='filled'>
          <InputLabel shrink>Gender</InputLabel>
          <Select label={'Gender'}
                  value={weightLossPlanState.gender}
                  defaultValue={""}
                  onChange={(e, value) => setWeightLossPlanState({...weightLossPlanState, gender: e.target.value as string})}
                  style={{width: '100%'}}
          >
            {['Male', 'Female'].map(x => (<MenuItem key={x} value={x}>{(x as string)}</MenuItem>))}
          </Select>
        </FormControl>
        <div style={{display:'flex', gap: '1rem'}}>
          <TextField
            label="Weight"
            type="number"
            inputProps={{inputMode:"numeric", min: 0}}
            variant='filled'
            style={{flexGrow: 1}}
            value={weightLossPlanState.weight}
            onChange={(event) => setWeightLossPlanState({...weightLossPlanState, weight: Number.parseInt(event.target.value)})}
          />
          <TextField
            label="Age"
            type="number"
            inputProps={{inputMode:"numeric", min: 0}}
            variant='filled'
            style={{flexGrow: 1}}
            value={weightLossPlanState.age}
            onChange={(event) => setWeightLossPlanState({...weightLossPlanState, age:  Number.parseInt(event.target.value)})}
          />
        </div>
        <div className="height-controls">
          <FormControl variant="filled">
            <InputLabel shrink>Height (ft)</InputLabel>
            <Select
              label={'ft'}
              value={Math.floor(weightLossPlanState.height / 12) < 4 ? 4 : Math.floor(weightLossPlanState.height / 12)}
              defaultValue={4}
              onChange={(e, value) => setWeightLossPlanState({
                ...weightLossPlanState,
                height: (e.target.value as number) * 12 + (weightLossPlanState.height % 12)
              })}
            >
              {[4, 5, 6, 7, 8].map(x => (<MenuItem key={x} value={x}>{x}'</MenuItem>))}
            </Select>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel shrink>Height (in)</InputLabel>
            <Select label={'in'}
                    value={weightLossPlanState.height % 12}
                    defaultValue={0}
                    onChange={(e, value) => {
                      setWeightLossPlanState({
                        ...weightLossPlanState,
                        height: (weightLossPlanState.height - weightLossPlanState.height % 12) + (e.target.value as number)
                      });
                    }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(x => (<MenuItem key={x} value={x}>{x}"</MenuItem>))}
            </Select>
          </FormControl>
        </div>
        <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
          <Typography gutterBottom>How active are you? (Calories burned through daily routine and exercise)</Typography>
          <div className="slider-control">
            <Slider
              defaultValue={1.2}
              aria-labelledby="discrete-slider-custom"
              step={0.01}
              valueLabelDisplay="auto"
              min={1.1}
              max={2.4}
              marks = {[
                {
                  value: 1.2,
                  label: 'Sedentary'
                },
                {
                  value: 1.55,
                  label: 'Moderately'
                },
                {
                  value: 1.9,
                  label: 'Extremely'
                },
                {
                  value: 2.3,
                  label: 'Athlete'
                }
              ]}
              valueLabelFormat={(value) => `${Math.floor(tdeeState.exercise)}`}
              // value={someValue}
              onChange={(e, value) => {
                // console.log('onChanged');
                // someValue = value as number;
                // handleStateChange.cancel();
                handleStateChange({...weightLossPlanState, activityScale: value as number})
              }}
            />
            {/*<Typography>{tdeeState.activityScale}</Typography>*/}
          </div>
        </div>
        <Card variant="outlined" style={{padding: '1rem'}}>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>Your Basal Metabolic Rate (BMR)
              is <strong>{Math.floor(tdeeState.bmr)} cal</strong>.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>You
              burn <strong>{Math.floor(tdeeState.exercise)} cal</strong> from
              exercise and daily activities.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>Your total daily energy expenditure (with exercise)
              is <strong>{Math.floor(tdeeState.tdee)} cal</strong>.</Typography>
          </div>
        </Card>
      </form>
    </Container>
  );
}

export default TDEEInput;