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


    const query = `
  query{
    heartBeat
  }
  `;

export default () => {
  return (
    <Provider value={client}>
      {/* <Data /> */}
    </Provider >
  );
};

const HeartBeat = () => {

    const dispatch = useDispatch()
  const [result] = useQuery({
    query
  });

  const { fetching, data, error } = result;
  
  useEffect(() => {
  if (error) {
    dispatch(actions.beatErrorReceived({ error: error.message }));
    return;
  }
  if (!data) return;
  const { heartBeat } = data;
  dispatch(actions.beatDataRecevied(heartBeat));
}, [dispatch, data, error]);
}



