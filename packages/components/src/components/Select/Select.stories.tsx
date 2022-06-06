import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectComponent from './Select';

export default {
  title: 'Forms/Select',
  id: 'select-select',
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

const notFoundContent = (
  <span style={{ padding: 'var(--spacing-xs)' }}>Все васёчки убежали 🐈</span>
);

const options = [
  { label: 'Васёк', value: 'Васёк' },
  { label: 'Белый Доцент', value: 'Белый Доцент' },
  { label: 'Кисуня', value: 'Кисуня' },
  { label: 'Бомбочка', value: 'Бомбочка' },
  { label: 'Дуся', value: 'Дуся' },
  { label: 'Музыкальный кот', value: 'Музыкальный кот' },
  { label: 'При-шмякнутый', value: 'Пришмякнутый' },
  { label: 'Храмуля', value: 'Храмуля' },
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
  notFoundContent,
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
  placeholder: 'Выбери васёчка',
  multiple: true,
  listBoxId: 'ref-select',
  options,
  notFoundContent,
};

export const Searchable = Template.bind({});

Searchable.args = {
  placeholder: 'Выбери васёчка',
  listBoxId: 'ref-select',
  searchable: true,
  options,
  notFoundContent,
};

export const SearchableAndMulti = Template.bind({});

SearchableAndMulti.args = {
  placeholder: 'Выбери васёчка',
  searchable: true,
  multiple: true,
  listBoxId: 'ref-select',
  options,
  notFoundContent,
};
