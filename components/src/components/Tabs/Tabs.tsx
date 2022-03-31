import React from 'react';
import { useConst } from '../../utils';
import './Tabs.css';

const TabsContext = React.createContext({} as any);
export const useTabs = () => React.useContext(TabsContext);

export enum TabsClassName {
  ink = 'ref:tabs-ink',
  tab = 'ref:tab',
  tabList = 'ref:tab-list',
}

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;

  // implement via CSS

  // variant: 'fullWidth' | 'scrollable' | 'standard';
  // size?: 'small' | 'medium' | 'large';
  // tabBarGutter: number;
  // inkColor?: string;
  // textColor?: string;

  // TODO
  // onTabClick: (e: React.MouseEvent) => void;
  // onTabScroll
  // orientation: 'horizontal' | 'vertical';
  // destroyInactiveTabPane?: boolean;
}

type TabsState = {
  tabNode: HTMLDivElement | null;
  value: string | null;
};

export const Tabs: React.FC<TabsProps> = ({
  value,
  children,
  defaultValue,
  onChange,
}) => {
  const isControlled = useConst(value !== undefined);

  const [state, setState] = React.useState<TabsState>({
    value: value || defaultValue || null,
    tabNode: null,
  });

  const updateState = (next: TabsState) => {
    if (!next.value) return;
    setState(next);
    onChange?.(next.value!);
  };

  return (
    <TabsContext.Provider
      value={{
        isControlled,
        value: state.value,
        tabNode: state.tabNode,
        setState: updateState,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
