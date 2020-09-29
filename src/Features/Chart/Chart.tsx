import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import { useStore } from 'react-redux'

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
      measurements{
        metric
        time: at,
        value:value,
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
};


