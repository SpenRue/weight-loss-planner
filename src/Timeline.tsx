import {
  Card,
  Slider,
  Typography
} from "@material-ui/core";
import "./TDEEInput.scss"
import TDEEState from './state/TDEEState'
import {useRecoilState} from "recoil";
import { Line } from 'react-chartjs-2';
import {LineProps} from "chart.js";
import {calculateTdee, compoundTdee} from './utils/WeightLossUtils';

const options = {
  animation: false,
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-calories',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-lbs',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};



function getChartData(tdee: any, deficit: number, days: number, step: number): LineProps {
  let compoundData = compoundTdee(tdee, deficit, days, step);

  const basicData: LineProps = {
    labels: [...Array(Math.floor(days/step)).keys()].map((x:number) => x * step),
    datasets: [
      {
        label: 'TDEE',
        data: compoundData.map((x: any) => x.tdee),
        fill: false,
        borderColor: 'green',
        yAxisID: 'y-axis-calories',
      },
      {
        label: 'BMR',
        data: compoundData.map((x: any) => x.bmr),
        fill: false,
        borderColor: 'purple',
        yAxisID: 'y-axis-calories',
      },
      {
        label: 'Calorie Intake',
        data: compoundData.map((x: any) => x.calorieIntake),
        fill: false,
        borderColor: 'orange',
        yAxisID: 'y-axis-calories',
      },
      {
        label: 'Loss Via Exercise',
        data: compoundData.map((x: any) => x.exercise),
        fill: false,
        borderColor: 'red',
        yAxisID: 'y-axis-calories',
      },
      {
        label: 'Weight',
        data: compoundData.map((x: any) => x.tdeeParams.weight),
        fill: false,
        borderColor: '#42A5F5',
        yAxisID: 'y-axis-lbs',
      },
      // {
      //   label: 'Weight Loss',
      //   data: compoundData.map((x: any) => tdee.weight - x.tdeeParams.weight),
      //   fill: false,
      //   borderColor: '#FFA726',
      //   yAxisID: 'y-axis--lbs'
      // }
    ]
  };
  return basicData ;
}

function Timeline() {
  const [tdee] = useRecoilState(TDEEState.state);
  return (
    <Card className={"card-container"}>
      <h3>Timeline</h3>
      {/*<p>{tdee.gender}</p>*/}
      {/*<p>{tdee.weight}</p>*/}
      {/*<p>{tdee.age}</p>*/}
      {/*<p>{tdee.bfp}</p>*/}
      {/*<p>{Math.floor(tdee.height / 12) + "' " + tdee.height % 12 + '\"'}</p>*/}
      {/*<p>{tdee.height}</p>*/}
      {/*<p>{tdee.exerciseVolume}</p>*/}
      {/*<h4>TDEE</h4>*/}
      {/*<p>{calculateTdee(tdee, -0.2).bmr}</p>*/}
      {/*<p>{calculateTdee(tdee, -0.2).tdee}</p>*/}
      <Line type='line' data={getChartData(tdee, tdee.deficit / 100, tdee.days ?? 30, 5)} options={options}/>
      {/*<Chart type={'line'} data={getChartData(tdee, -0.2)} options={options}></Chart>*/}
      {/*<form>*/}
      {/*  <div className={'height-controls'}>*/}
      {/*    <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
      {/*      <Typography gutterBottom>Target Weight (lbs)</Typography>*/}
      {/*      <Slider*/}
      {/*        defaultValue={160}*/}
      {/*        aria-labelledby="discrete-slider-custom"*/}
      {/*        step={1}*/}
      {/*        valueLabelDisplay="auto"*/}
      {/*        min={50}*/}
      {/*        max={300}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
      {/*      <Typography gutterBottom>Target Body Fat Percentage</Typography>*/}
      {/*      <Slider*/}
      {/*        defaultValue={25}*/}
      {/*        aria-labelledby="discrete-slider-custom"*/}
      {/*        step={1}*/}
      {/*        valueLabelDisplay="auto"*/}
      {/*        min={1}*/}
      {/*        max={50}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={'height-controls'}>*/}
      {/*    <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
      {/*      <Typography gutterBottom>Initial Deficit</Typography>*/}
      {/*      <Slider*/}
      {/*        defaultValue={0}*/}
      {/*        aria-labelledby="discrete-slider-custom"*/}
      {/*        step={1}*/}
      {/*        valueLabelDisplay="auto"*/}
      {/*        min={-50}*/}
      {/*        max={50}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="weight-control" style={{flexGrow: 1, flexBasis: 0 }}>*/}
      {/*      <Typography gutterBottom>End Deficit</Typography>*/}
      {/*      <Slider*/}
      {/*        defaultValue={0}*/}
      {/*        aria-labelledby="discrete-slider-custom"*/}
      {/*        step={1}*/}
      {/*        valueLabelDisplay="auto"*/}
      {/*        min={-50}*/}
      {/*        max={50}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</form>*/}
    </Card>
  );
}

export default Timeline;