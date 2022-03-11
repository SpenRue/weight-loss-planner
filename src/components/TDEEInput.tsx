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
import {useRecoilState} from "recoil";
import TDEEState from "../state/TDEEState";
import {calculateTdee} from "../utils/WeightLossUtils";
import {TextField} from "@material-ui/core";
import {flexbox, spacing} from '@mui/system';

function TDEEInput() {
  const [tdeeState, setTDEEState] = useRecoilState(TDEEState.state);
  // const [gender, setGender] = useState('Male')
  // const [weight, setWeight] = useState(0);
  // const [age, setAge] = useState(0);
  // const [bfp, setBfp] = useState(0);
  // const [inches, setInches] = useState(0);
  // const [exerciseVolume, setExerciseVolume] = useState(0);

  return (
    <Container className={"card-container"}>
      <h2>Find your Total Daily Energy Expenditure</h2>
      {/*<span style={{display: 'block', position: "relative", top: '-1rem', marginBottom: 0}}>(How much you burn a day)</span>*/}
      <form>
        <FormControl style={{flexGrow: 1, flexBasis: 0, width: '100%'}} variant='filled'>
          <InputLabel shrink>Gender</InputLabel>
          <Select label={'Gender'}
                  value={tdeeState.gender}
                  defaultValue={""}
                  onChange={(e, value) => setTDEEState({...tdeeState, gender: e.target.value as string})}
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
            value={tdeeState.weight}
            onChange={(event) => setTDEEState({...tdeeState, weight: Number.parseInt(event.target.value)})}
          />
          <TextField
            label="Age"
            type="number"
            inputProps={{inputMode:"numeric", min: 0}}
            variant='filled'
            style={{flexGrow: 1}}
            value={tdeeState.age}
            onChange={(event) => setTDEEState({...tdeeState, age:  Number.parseInt(event.target.value)})}
          />
        </div>
        <div className="height-controls">
          <FormControl variant="filled">
            <InputLabel shrink>Height (ft)</InputLabel>
            <Select
              label={'ft'}
              value={Math.floor(tdeeState.height / 12) < 4 ? 4 : Math.floor(tdeeState.height / 12)}
              defaultValue={4}
              onChange={(e, value) => setTDEEState({
                ...tdeeState,
                height: (e.target.value as number) * 12 + (tdeeState.height % 12)
              })}
            >
              {[4, 5, 6, 7, 8].map(x => (<MenuItem key={x} value={x}>{x}'</MenuItem>))}
            </Select>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel shrink>Height (in)</InputLabel>
            <Select label={'in'}
                    value={tdeeState.height % 12}
                    defaultValue={0}
                    onChange={(e, value) => {
                      setTDEEState({
                        ...tdeeState,
                        height: (tdeeState.height - tdeeState.height % 12) + (e.target.value as number)
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
              valueLabelFormat={(value) => `${Math.floor(calculateTdee(tdeeState, tdeeState.deficit / 100).exercise)}`}
              value={tdeeState.activityScale}
              onChange={(e, value) => setTDEEState({...tdeeState, activityScale: value as number})}
            />
            {/*<Typography>{tdeeState.activityScale}</Typography>*/}
          </div>
        </div>
        <Card variant="outlined" style={{padding: '1rem'}}>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>Your Basal Metabolic Rate (BMR)
              is <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit / 100).bmr)} cal</strong>.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>You
              burn <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit / 100).exercise)} cal</strong> from
              exercise and daily activities.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
            <Typography gutterBottom>Your total daily energy expenditure (with exercise)
              is <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit / 100).tdee)} cal</strong>.</Typography>
          </div>
        </Card>
      </form>
    </Container>
  );
}

export default TDEEInput;