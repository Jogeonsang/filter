import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FILTER_CONSTANTS } from '~/constants/filter';
import { FilterOptions } from '~/types/recruitment';

interface FilterState {
  filterOptions: FilterOptions;
  openSections: { [key: string]: boolean };
  updateFilter: (options: FilterOptions) => void;
  resetFilter: () => void;
  toggleSection: (key: string) => void;
  setAllSections: (isOpen: boolean) => void;
}

const initialFilterState: FilterOptions = {
  occupation: '',
  region: '',
  employment_type: '',
  career: '',
  working_hours_per_week: '',
};

const initialOpenSections = FILTER_CONSTANTS.search_header.reduce(
  (acc, header) => ({
    ...acc,
    [header.key]: false,
  }),
  {},
);

export const useFilterStore = create<FilterState>()(
  persist(
    set => ({
      filterOptions: initialFilterState,
      openSections: initialOpenSections,

      updateFilter: (options: FilterOptions) => {
        set({ filterOptions: options });
      },

      resetFilter: () => {
        set({ filterOptions: initialFilterState });
      },

      toggleSection: (key: string) => {
        set(state => ({
          openSections: {
            ...state.openSections,
            [key]: !state.openSections[key],
          },
        }));
      },

      setAllSections: (isOpen: boolean) => {
        set(state => ({
          openSections: Object.keys(state.openSections).reduce(
            (acc, key) => ({
              ...acc,
              [key]: isOpen,
            }),
            {},
          ),
        }));
      },
    }),
    {
      name: 'recruitment-filters',
    },
  ),
);
