type ContentPlacement =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface AtomicContentPlacementProps {
  justifyContent?: ContentPlacement;
  alignContent?: ContentPlacement;
  placeContent?: ContentPlacement;
  justifyItems?: string;
  alignItems?: string;
  placeItems?: string;
}
