import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

import { SchoolYear } from '@/types/year.ts';

// eslint-disable-next-line import/order
import { schoolYears } from './years.ts';

type DataContextType = {
  years: SchoolYear[];
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo(() => ({ years: schoolYears }), []);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = (): DataContextType => {
  const value = useContext(DataContext);

  if (!value) throw new Error('useData must be used within a DataProvider');
  return value;
};
