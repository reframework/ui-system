import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectComponent from './Select';

export default {
  title: 'Select/Select',
  id: 'Select/Select',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = (props) => {
  return <SelectComponent {...props} />;
};

export const Select = Template.bind({});

Select.args = {
  placeholder: 'Выбрать васёчка',
  listBoxId: 'ref-select',
  options: [
    { label: 'Васёк', value: 'Васёк' },
    { label: 'Белый Доцент', value: 'Белый Доцент' },
    { label: 'Кисуня', value: 'Кисуня' },
    { label: 'Бомбочка', value: 'Бомбочка' },
    { label: 'Дуся', value: 'Дуся' },
    { label: 'Музыкальный кот', value: 'Музыкальный кот' },
    { label: 'При шмякнутый', value: 'Пришмякнутый' },
  ],
};

export const Multi = Template.bind({});

Multi.args = {
  placeholder: 'Выбрать васёчка',
  multiple: true,
  listBoxId: 'ref-select',
  options: [
    { label: 'Васёк', value: 'Васёк' },
    { label: 'Белый Доцент', value: 'Белый Доцент' },
    { label: 'Кисуня', value: 'Кисуня' },
    { label: 'Бомбочка', value: 'Бомбочка' },
    { label: 'Дуся', value: 'Дуся' },
    { label: 'Музыкальный кот', value: 'Музыкальный кот' },
    { label: 'При шмякнутый', value: 'Пришмякнутый' },
  ],
};

export const Searchable = Template.bind({});

Searchable.args = {
  placeholder: 'Выбрать васёчка',
  listBoxId: 'ref-select',
  searchable: true,
  options: [
    { label: 'Васёк', value: 'Васёк' },
    { label: 'Белый Доцент', value: 'Белый Доцент' },
    { label: 'Кисуня', value: 'Кисуня' },
    { label: 'Бомбочка', value: 'Бомбочка' },
    { label: 'Дуся', value: 'Дуся' },
    { label: 'Музыкальный кот', value: 'Музыкальный кот' },
    { label: 'При шмякнутый', value: 'Пришмякнутый' },
  ],
};

export const SearchableAndMultiple = Template.bind({});

SearchableAndMultiple.args = {
  placeholder: 'Выбрать васёчка',
  searchable: true,
  multiple: true,
  listBoxId: 'ref-select',
  options: [
    { label: 'Васёк', value: 'Васёк' },
    { label: 'Белый Доцент', value: 'Белый Доцент' },
    { label: 'Кисуня', value: 'Кисуня' },
    { label: 'Бомбочка', value: 'Бомбочка' },
    { label: 'Дуся', value: 'Дуся' },
    { label: 'Музыкальный кот', value: 'Музыкальный кот' },
    { label: 'При-шмякнутый', value: 'Пришмякнутый' },
  ],
};
