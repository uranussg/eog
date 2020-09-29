import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import { useStore } from 'react-redux'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});




export default () => {
  return (
    <Provider value={client}>
      {/* <Data /> */}
    </Provider >
  );
};

// const getHeartBeat = () => {
//     const query = `
//   query{
//     heartBeat
//   }
//   `;

//   const [{data}] = useQuery({
//     query
//   });

//   return data.heartBeat
// }



const Data = () => {  
  const dispatch = useDispatch();
  const state = useStore().getState()
  const labels = state.labels.labels
  const heartBeat = state.heartBeat.heartBeat
  let input = labels.map( (metricName: any) => {
    return `{
      metricName:${metricName},
      after:$heartBeat - 100000000,
      before:$heartBeat
    }`

  })
  const query = `
  query($heartBeat: Timestamp){
    getMultipleMeasurements(${input}){
      metric,
      measurements{
        metric
        time: at,
        value,
    }
    }
  }
  `;

  const [result] = useQuery({
    query,
    variables:{
      heartBeat
    }
  })
  const { fetching, data, error } = result;
  data.foreach((dataom: { measurements: { [x: string]: any; value: any; }; metric: string | number; }) => {
    dataom.measurements[dataom.metric] = dataom.measurements.value
  })
    useEffect(() => {
    if (error) {
      dispatch(actions.dataErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.dataRecevied(getMultipleMeasurements));
  }, [dispatch, labels, error]);

  // if (fetching) return <LinearProgress />;
  // return <Chip />;
  const axis = labels.map((label: any) => {
    return <YAxis yAxisId={`${label}`} />
  })
  const colors = ["#8884d8","#82ca9d","#ffc658", "green", "red", "blue"]
  const  lines = labels.map((label: any, idx: number) => {
    return <Line yAxisId={`${label}`} type="monotone" dataKey={`${label}`} stroke={`${colors[idx]}`} activeDot={{ r: 8 }} />
  })
  return (
    <LineChart
      width={500}
      height={300}
      data={data.getMultipleMeasurements}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      {axis}
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  );
};


