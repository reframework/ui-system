export interface Display {
  ['block']: boolean; // display: block;
  ['inline-block']: boolean; // display: inline-block;
  inline: boolean; // display: inline;
  flex: boolean; // display: flex;
  ['inline-flex']: boolean; // display: inline-flex;
  table: boolean; // display: table;
  ['inline-table']: boolean; // display: inline-table;
  ['table-caption']: boolean; // display: table-caption;
  ['table-cell']: boolean; // display: table-cell;
  ['table-column']: boolean; // display: table-column;
  ['table-column-group']: boolean; // display: table-column-group;
  ['table-footer-group']: boolean; // display: table-footer-group;
  ['table-header-group']: boolean; // display: table-header-group;
  ['table-row-group']: boolean; // display: table-row-group;
  ['table-row']: boolean; // display: table-row;
  ['flow-root']: boolean; // display: flow-root;
  grid: boolean; // display: grid;
  ['inline-grid']: boolean; // display: inline-grid;
  contents: boolean; // display: contents;
  ['list-item']: boolean; // display: list-item;
  hidden: boolean; // display: none;
}
