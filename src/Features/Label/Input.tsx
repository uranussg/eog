import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useStore } from 'react-redux'
import { Provider, createClient, useQuery } from 'urql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  "flareTemp",
  "casingPressure",
  "injValve",
  "oilTemp",
  "tubingPressure",
  "waterTemp",
];

function getStyles(option: string, displayOption: string[], theme: Theme) {
  return {
    fontWeight:
      displayOption.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const client = createClient({
    url: 'https://react.eogresources.com/graphql',
  });
const query = `
  query{
    getMultipleMeasurements(input:{
      metricName:"flareTemp",
      after:1601309311284,
      before:1601309321284
    }){
      measurements{
        at,
        value,
    }
    }
  }
  `;
export default  () => {
  return (
    <Provider value={client}>
      <MultipleSelect />
    </Provider >
  );
};
function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const state = useStore().getState()
  const [displayOption, setdisplayOption] = React.useState<string[]>([]);
  const dispatch = useDispatch();
    let metricName = "flareTemp"
    let heartBeat = 1601309321284
    const [{data}] = useQuery({
      query,
      variables: {
        heartBeat
      },
    });
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {

    // console.log(data)
    setdisplayOption(event.target.value as string[]);
    dispatch(actions.labelSelectionRecevied(event.target.value as string[]))
  };

  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setdisplayOption(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="input-options">Chip</InputLabel>
        <Select
          labelId="input-options"
          id="options"
          multiple
          value={displayOption}
          onChange={handleChange}
          input={<Input id="select-options" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} style={getStyles(option, displayOption, theme)}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </div>
  );
}
