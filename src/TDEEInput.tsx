import {
  Card,
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
import {useState} from "react";
import {useRecoilState} from "recoil";
import TDEEState from "./state/TDEEState";
import {calculateTdee} from "./utils/WeightLossUtils";

function TDEEInput() {
  const [tdeeState, setTDEEState] = useRecoilState(TDEEState.state);
  // const [gender, setGender] = useState('Male')
  // const [weight, setWeight] = useState(0);
  // const [age, setAge] = useState(0);
  // const [bfp, setBfp] = useState(0);
  // const [inches, setInches] = useState(0);
  // const [exerciseVolume, setExerciseVolume] = useState(0);

  return (
    <Card className={"card-container"}>
      <h3>Find your initial TDEE</h3>
        <form>
          <div className={'height-controls'}>
            <FormControl  style={{flexGrow: 1, flexBasis: 0 }}>
              <InputLabel shrink>Gender</InputLabel>
              <Select label={'Gender'}
                      value={tdeeState.gender}
                      defaultValue={""}
                      onChange={(e, value) => setTDEEState({...tdeeState, gender: e.target.value as string})}>
                {['Male', 'Female'].map(x => (<MenuItem key={x} value={x}>{(x as string)}</MenuItem>))}
              </Select>
            </FormControl>
            <div className="weight-control" style={{flexGrow: 1, flexBasis: 0}}>
              <Typography gutterBottom>Weight (lbs)</Typography>
              <div className="slider-control">
                <Slider
                  defaultValue={160}
                  aria-labelledby="discrete-slider-custom"
                  step={1}
                  valueLabelDisplay="auto"
                  min={50}
                  max={300}
                  value={tdeeState.weight} onChange={(e, value) => setTDEEState({...tdeeState, weight: value as number})}
                />
                <Typography>{tdeeState.weight}</Typography>
              </div>
            </div>
          </div>
          <div className={'height-controls'}>
            <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
              <Typography gutterBottom>Age</Typography>
              <div className="slider-control">
                <Slider
                  defaultValue={25}
                  aria-labelledby="discrete-slider-custom"
                  step={1}
                  valueLabelDisplay="auto"
                  min={1}
                  max={120}
                  value={tdeeState.age} onChange={(e, value) => setTDEEState({...tdeeState, age: value as number})}
                />
                <Typography>{tdeeState.age}</Typography>
              </div>
            </div>
            {/*<div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
            {/*  <Typography gutterBottom>Body Fat Percentage</Typography>*/}
            {/*  <Slider*/}
            {/*    defaultValue={25}*/}
            {/*    aria-labelledby="discrete-slider-custom"*/}
            {/*    step={1}*/}
            {/*    valueLabelDisplay="auto"*/}
            {/*    min={1}*/}
            {/*    max={50}*/}
            {/*    value={tdeeState.bfp} onChange={(e, value) => setTDEEState({...tdeeState, bfp: value as number})}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <div className="height-controls">
            <FormControl>
              <InputLabel shrink>Height (ft)</InputLabel>
              <Select
                label={'ft'}
                value={Math.floor(tdeeState.height/12) < 4 ? 4 : Math.floor(tdeeState.height / 12)}
                defaultValue={4}
                onChange={(e, value) => setTDEEState({...tdeeState, height: (e.target.value as number) * 12 + (tdeeState.height % 12)})}
              >
                {[4,5,6,7,8].map(x => (<MenuItem key={x} value={x}>{x}'</MenuItem>))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel shrink>Height (in)</InputLabel>
              <Select label={'in'}
                      value={tdeeState.height % 12}
                      defaultValue={0}
                      onChange={(e, value) => {
                        setTDEEState({...tdeeState, height: (tdeeState.height - tdeeState.height % 12) + (e.target.value as number)});
                      }}>
                {[0,1,2,3,4,5,6,7,8,9,10,11].map(x => (<MenuItem key={x} value={x}>{x}"</MenuItem>))}
              </Select>
            </FormControl>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
            <Typography gutterBottom>Activity Scale (1.2 for Sedentary, 2.4 for Athlete)</Typography>
            <div className="slider-control">
              <Slider
                defaultValue={1.2}
                aria-labelledby="discrete-slider-custom"
                step={0.01}
                valueLabelDisplay="auto"
                min={1}
                max={2.4}
                value={tdeeState.activityScale} onChange={(e, value) => setTDEEState({...tdeeState, activityScale: value as number})}
              />
              <Typography>{tdeeState.activityScale}</Typography>
            </div>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
            <Typography gutterBottom>Your Basal Metabolic Rate (BMR) is <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit/100).bmr)} cal</strong>.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
            <Typography gutterBottom>You burn <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit/100).exercise)} cal</strong> from exercise and daily activities.</Typography>
          </div>
          <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>
            <Typography gutterBottom>Your total daily energy expenditure (with exercise) is <strong>{Math.floor(calculateTdee(tdeeState, tdeeState.deficit/100).tdee)} cal</strong>.</Typography>
          </div>
          {/*<FormControl variant="filled" className={'exercise-volume-control'}>*/}
          {/*  <InputLabel>Exercise Volume</InputLabel>*/}
          {/*  <Select label={'Exercise Volume'}*/}
          {/*    value={tdeeState.exerciseVolume}*/}
          {/*    onChange={(e, value) => setTDEEState({...tdeeState, exerciseVolume: e.target.value as number})}*/}
          {/*  >*/}
          {/*    <MenuItem value={0}>None</MenuItem>*/}
          {/*    <MenuItem value={1}>Light exercise (1-2 days a week)</MenuItem>*/}
          {/*    <MenuItem value={2}>Moderate Exercise (3-5 days a week)</MenuItem>*/}
          {/*    <MenuItem value={3}>Heavy Exercise (6-7 days a week)</MenuItem>*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}
        </form>
    </Card>
  );
}

export default TDEEInput;