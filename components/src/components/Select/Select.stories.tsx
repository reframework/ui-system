import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectComponent from './Select';

export default {
  title: 'Select/Select',
  id: 'Select/Select',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const wrapperStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: 'white',
  display: 'flex',
  minHeight: 100,
  justifyContent: 'center',
};

const innerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 500,
};
const options = [
  { label: 'Васёк', value: 'Васёк' },
  { label: 'Белый Доцент', value: 'Белый Доцент' },
  { label: 'Кисуня', value: 'Кисуня' },
  { label: 'Бомбочка', value: 'Бомбочка' },
  { label: 'Дуся', value: 'Дуся' },
  { label: 'Музыкальный кот', value: 'Музыкальный кот' },
  { label: 'При-шмякнутый', value: 'Пришмякнутый' },
];

const Template: ComponentStory<typeof SelectComponent> = (props) => {
  return (
    <div style={wrapperStyle}>
      <div style={innerStyle}>
        <SelectComponent {...props} />
      </div>
    </div>
  );
};

export const Select = Template.bind({});

Select.args = {
  placeholder: 'Выбери васёчка',
  listBoxId: 'ref-select',
  options,
};

export const Multi = Template.bind({});

Multi.args = {
  placeholder: 'Выбери васёчка',
  multiple: true,
  listBoxId: 'ref-select',
  options,
};

export const Searchable = Template.bind({});

Searchable.args = {
  placeholder: 'Выбери васёчка',
  listBoxId: 'ref-select',
  searchable: true,
};

export const SearchableAndMulti = Template.bind({});

SearchableAndMulti.args = {
  placeholder: 'Выбери васёчка',
  searchable: true,
  multiple: true,
  listBoxId: 'ref-select',
  options,
};
