import React from 'react';
import { useControlledState } from '@utils/useControlledState';
import './Tabs.css';

const TabsContext = React.createContext({} as any);
export const useTabs = () => React.useContext(TabsContext);

export enum TabsClassName {
  active = 'ref:tab-active',
  disabled = 'ref:tab-disabled',
  ink = 'ref:tabs-ink',
  animated = 'ref:tab-animated',
  tab = 'ref:tab',
  tabList = 'ref:tab-list',
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  animated?: boolean;
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
  animated,
  children,
  defaultValue,
  onChange,
  value: valueProp,
}) => {
  const [tabNode, setTabNode] = React.useState<HTMLDivElement | null>(null);

  const {
    setState: setValue,
    state: value,
    isControlled,
  } = useControlledState({
    controlled: valueProp,
    default: defaultValue,
  });

  const setState = (next: TabsState) => {
    if (!next.value) return;

    if (next.value !== value) {
      setValue(next.value);
      onChange?.(next.value);
    }

    if (next.tabNode !== tabNode) {
      setTabNode(next.tabNode);
    }
  };

  return (
    <TabsContext.Provider
      value={{
        animated,
        isControlled,
        value: value,
        tabNode,
        setState,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
