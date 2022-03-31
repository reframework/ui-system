import React, { useRef } from 'react';
import { useConst, useControlledStateV2 } from '../../utils';
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
  const {
    state: internalValue,
    setState: setInternalValue,
    isControlled,
  } = useControlledStateV2({
    controlled: value,
    default: defaultValue,
  });

  const [tabNode, setTabNode] = React.useState<HTMLDivElement | null>(null);

  const updateState = (next: TabsState) => {
    if (!next.value) return;
    setInternalValue(next.value);
    setTabNode(next.tabNode);
    onChange?.(next.value!);
  };

  return (
    <TabsContext.Provider
      value={{
        isControlled,
        value: internalValue,
        tabNode,
        setState: updateState,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
