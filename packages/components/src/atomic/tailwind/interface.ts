export interface GridColumns {
  ['grid-cols-1']: boolean; //	grid-template-columns: repeat(1, minmax(0, 1fr));
  ['grid-cols-2']: boolean; //	grid-template-columns: repeat(2, minmax(0, 1fr));
  ['grid-cols-3']: boolean; //	grid-template-columns: repeat(3, minmax(0, 1fr));
  ['grid-cols-4']: boolean; //	grid-template-columns: repeat(4, minmax(0, 1fr));
  ['grid-cols-5']: boolean; //	grid-template-columns: repeat(5, minmax(0, 1fr));
  ['grid-cols-6']: boolean; //	grid-template-columns: repeat(6, minmax(0, 1fr));
  ['grid-cols-7']: boolean; //	grid-template-columns: repeat(7, minmax(0, 1fr));
  ['grid-cols-8']: boolean; //	grid-template-columns: repeat(8, minmax(0, 1fr));
  ['grid-cols-9']: boolean; //	grid-template-columns: repeat(9, minmax(0, 1fr));
  ['grid-cols-10']: boolean; //	grid-template-columns: repeat(10, minmax(0, 1fr));
  ['grid-cols-11']: boolean; //	grid-template-columns: repeat(11, minmax(0, 1fr));
  ['grid-cols-12']: boolean; //	grid-template-columns: repeat(12, minmax(0, 1fr));
  ['grid-cols-none']: boolean; //	grid-template-columns: none;
}

export interface ColumnStartEnd {
  ['col-auto']: boolean; //	grid-column: auto;
  ['col-span-1']: boolean; //	grid-column: span 1 / span 1;
  ['col-span-2']: boolean; //	grid-column: span 2 / span 2;
  ['col-span-3']: boolean; //	grid-column: span 3 / span 3;
  ['col-span-4']: boolean; //	grid-column: span 4 / span 4;
  ['col-span-5']: boolean; //	grid-column: span 5 / span 5;
  ['col-span-6']: boolean; //	grid-column: span 6 / span 6;
  ['col-span-7']: boolean; //	grid-column: span 7 / span 7;
  ['col-span-8']: boolean; //	grid-column: span 8 / span 8;
  ['col-span-9']: boolean; //	grid-column: span 9 / span 9;
  ['col-span-10']: boolean; //	grid-column: span 10 / span 10;
  ['col-span-11']: boolean; //	grid-column: span 11 / span 11;
  ['col-span-12']: boolean; //	grid-column: span 12 / span 12;
  ['col-span-full']: boolean; //	grid-column: 1 / -1;
  ['col-start-1']: boolean; //	grid-column-start: 1;
  ['col-start-2']: boolean; //	grid-column-start: 2;
  ['col-start-3']: boolean; //	grid-column-start: 3;
  ['col-start-4']: boolean; //	grid-column-start: 4;
  ['col-start-5']: boolean; //	grid-column-start: 5;
  ['col-start-6']: boolean; //	grid-column-start: 6;
  ['col-start-7']: boolean; //	grid-column-start: 7;
  ['col-start-8']: boolean; //	grid-column-start: 8;
  ['col-start-9']: boolean; //	grid-column-start: 9;
  ['col-start-10']: boolean; //	grid-column-start: 10;
  ['col-start-11']: boolean; //	grid-column-start: 11;
  ['col-start-12']: boolean; //	grid-column-start: 12;
  ['col-start-13']: boolean; //	grid-column-start: 13;
  ['col-start-auto']: boolean; //	grid-column-start: auto;
  ['col-end-1']: boolean; // grid-column-end: 1;
  ['col-end-2']: boolean; // grid-column-end: 2;
  ['col-end-3']: boolean; // grid-column-end: 3;
  ['col-end-4']: boolean; // grid-column-end: 4;
  ['col-end-5']: boolean; // grid-column-end: 5;
  ['col-end-6']: boolean; // grid-column-end: 6;
  ['col-end-7']: boolean; // grid-column-end: 7;
  ['col-end-8']: boolean; // grid-column-end: 8;
  ['col-end-9']: boolean; // grid-column-end: 9;
  ['col-end-10']: boolean; // grid-column-end: 10;
  ['col-end-11']: boolean; // grid-column-end: 11;
  ['col-end-12']: boolean; // grid-column-end: 12;
  ['col-end-13']: boolean; // grid-column-end: 13;
  ['col-end-auto']: boolean; // grid-column-end: auto;
}

export interface GridTemplateRows {
  ['grid-rows-1']: boolean; // grid-template-rows: repeat(1, minmax(0, 1fr));
  ['grid-rows-2']: boolean; // grid-template-rows: repeat(2, minmax(0, 1fr));
  ['grid-rows-3']: boolean; // grid-template-rows: repeat(3, minmax(0, 1fr));
  ['grid-rows-4']: boolean; // grid-template-rows: repeat(4, minmax(0, 1fr));
  ['grid-rows-5']: boolean; // grid-template-rows: repeat(5, minmax(0, 1fr));
  ['grid-rows-6']: boolean; // grid-template-rows: repeat(6, minmax(0, 1fr));
  ['grid-rows-none']: boolean; // grid-template-rows: none;
}

export interface RowStartEnd {
  ['row-auto']: boolean; //	grid-row: auto;
  ['row-span-1']: boolean; //	grid-row: span 1 / span 1;
  ['row-span-2']: boolean; //	grid-row: span 2 / span 2;
  ['row-span-3']: boolean; //	grid-row: span 3 / span 3;
  ['row-span-4']: boolean; //	grid-row: span 4 / span 4;
  ['row-span-5']: boolean; //	grid-row: span 5 / span 5;
  ['row-span-6']: boolean; //	grid-row: span 6 / span 6;
  ['row-span-full']: boolean; //	grid-row: 1 / -1;
  ['row-start-1']: boolean; //	grid-row-start: 1;
  ['row-start-2']: boolean; //	grid-row-start: 2;
  ['row-start-3']: boolean; //	grid-row-start: 3;
  ['row-start-4']: boolean; //	grid-row-start: 4;
  ['row-start-5']: boolean; //	grid-row-start: 5;
  ['row-start-6']: boolean; //	grid-row-start: 6;
  ['row-start-7']: boolean; //	grid-row-start: 7;
  ['row-start-auto']: boolean; //	grid-row-start: auto;
  ['row-end-1']: boolean; //	grid-row-end: 1;
  ['row-end-2']: boolean; //	grid-row-end: 2;
  ['row-end-3']: boolean; //	grid-row-end: 3;
  ['row-end-4']: boolean; //	grid-row-end: 4;
  ['row-end-5']: boolean; //	grid-row-end: 5;
  ['row-end-6']: boolean; //	grid-row-end: 6;
  ['row-end-7']: boolean; //	grid-row-end: 7;
  ['row-end-auto']: boolean; //	grid-row-end: auto;
}

export interface GridAutoFlow {
  ['grid-flow-row']: boolean; //	grid-auto-flow: row;
  ['grid-flow-col']: boolean; //	grid-auto-flow: column;
  ['grid-flow-row-dense']: boolean; //	grid-auto-flow: row dense;
  ['grid-flow-col-dense']: boolean; //	grid-auto-flow: column dense;
}

export interface GridAutoColumns {
  ['auto-cols-auto']: boolean; // grid-auto-columns: auto;
  ['auto-cols-min']: boolean; // grid-auto-columns: min-content;
  ['auto-cols-max']: boolean; // grid-auto-columns: max-content;
  ['auto-cols-fr']: boolean; // grid-auto-columns: minmax(0, 1fr);
}

export interface GridAutoRows {
  ['auto-rows-auto']: boolean; //	grid-auto-rows: auto;
  ['auto-rows-min']: boolean; //	grid-auto-rows: min-content;
  ['auto-rows-max']: boolean; //	grid-auto-rows: max-content;
  ['auto-rows-fr']: boolean; //	grid-auto-rows: minmax(0, 1fr);
}

export interface GridGap {
  gridGap: string;
}
