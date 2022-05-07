import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Picker, PickerItem, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

const formatOptions = (labels) => labels.map((label, index) => ({ label, value: index }));
const cityOptions = formatOptions(['北京', '上海', '广州', '深圳', '杭州', '成都', '长沙']);
const currentYear = new Date().getFullYear();
const yearOptions = formatOptions(new Array(10).fill(0).map((_, index) => `${currentYear - index}年`));
const seasonOptions = formatOptions(['春', '夏', '秋', '冬']);
const monthOptions = formatOptions(new Array(12).fill(0).map((_, index) => `${index + 1}月`));
const dayOptions = formatOptions(new Array(31).fill(0).map((_, index) => `${index + 1}日`));
const optionsListMap = {
  city: [cityOptions],
  yearAndSeason: [yearOptions, seasonOptions],
  date: [yearOptions, monthOptions, dayOptions],
};

const getSelectedLabelText = (optionsList, values) => {
  if (isEmpty(optionsList) || isEmpty(values)) return '';
  // console.log({ optionsList, values });
  return optionsList
    .reduce((acc, options, index) => {
      const value = values[index];
      const option = options.find((item) => item.value === value);
      // console.log({ options, value, option, acc });
      if (option) acc.push(option.label);
      return acc;
    }, [])
    .join(',');
};

export default function Demo() {
  const [state, setState] = useState({
    city: { visible: false, values: [], labelText: '' },
    yearAndSeason: { visible: false, values: [], labelText: '' },
    date: { visible: false, values: [], labelText: '' },
  });

  const togglePicker = (name, visible) => {
    const nextVisible = typeof visible === 'boolean' ? visible : !state[name].visible;
    setState({
      ...state,
      [name]: { ...state[name], visible: nextVisible },
    });
  };

  const handleSelect = (name, values) => {
    const labelText = getSelectedLabelText(optionsListMap[name], values);
    setState({
      ...state,
      [name]: { ...state[name], values, labelText, visible: false },
    });
  };

  return (
    <TDemoBlock title="01 类型" summary="基础选择器">
      <Cell arrow title="城市" note={state.city.labelText || '选择城市'} onClick={() => togglePicker('city', true)} />
      <Picker
        visible={state.city.visible}
        defaultValue={state.city.values}
        onConfirm={(values) => handleSelect('city', values)}
        onCancel={() => togglePicker('city', false)}
      >
        <PickerItem options={cityOptions} />
      </Picker>
      <Cell
        arrow
        title="年份和季节"
        note={state.yearAndSeason.labelText || '选择城年份和季节'}
        onClick={() => togglePicker('yearAndSeason', true)}
      />
      <Picker
        visible={state.yearAndSeason.visible}
        defaultValue={state.yearAndSeason.values}
        onConfirm={(values) => handleSelect('yearAndSeason', values)}
        onCancel={() => togglePicker('yearAndSeason', false)}
      >
        <PickerItem options={yearOptions} />
        <PickerItem options={seasonOptions} />
      </Picker>
      <Cell arrow title="日期" note={state.date.labelText || '选择日期'} onClick={() => togglePicker('date', true)} />
      <Picker
        visible={state.date.visible}
        defaultValue={state.date.values}
        onConfirm={(values) => handleSelect('date', values)}
        onCancel={() => togglePicker('date', false)}
      >
        <PickerItem options={yearOptions} />
        <PickerItem options={monthOptions} />
        <PickerItem options={dayOptions} />
      </Picker>
    </TDemoBlock>
  );
}