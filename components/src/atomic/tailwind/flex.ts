export interface FlexGrow {
  grow: boolean; //	flex-grow: 1;
  ['grow-0']: boolean; //	flex-grow: 0;
}

export interface FlexShrink {
  ['shrink']: boolean; //	flex-shrink: 1;
  ['shrink-0']: boolean; //	flex-shrink: 0;
}

export interface FlexOrder {
  ['order-1']: boolean; //order: 1;
  ['order-2']: boolean; //order: 2;
  ['order-3']: boolean; //order: 3;
  ['order-4']: boolean; //order: 4;
  ['order-5']: boolean; //order: 5;
  ['order-6']: boolean; //order: 6;
  ['order-7']: boolean; //order: 7;
  ['order-8']: boolean; //order: 8;
  ['order-9']: boolean; //order: 9;
  ['order-10']: boolean; //order: 10;
  ['order-11']: boolean; //order: 11;
  ['order-12']: boolean; //order: 12;
  ['order-first']: boolean; //order: -9999;
  ['order-last']: boolean; //order: 9999;
  ['order-none']: boolean; //order: 0;
}

export interface FlexDirection {
  ['flex-row']: boolean; //flex-direction: row;
  ['flex-row-reverse']: boolean; //	flex-direction: row-reverse;
  ['flex-col']: boolean; //flex-direction: column;
  ['flex-col-reverse']: boolean; //	flex-direction: column-reverse;
}

export interface FlexWrap {
  ['flex-wrap']: boolean; //	flex-wrap: wrap;
  ['flex-wrap-reverse']: boolean; //	flex-wrap: wrap-reverse;
  ['flex-nowrap']: boolean; //	flex-wrap: nowrap;
}

export interface FlexShorts {
  ['flex-1']: boolean; //	flex: 1 1 0%;
  ['flex-auto	flex']: boolean; // 1 1 auto;
  ['flex-initial']: boolean; //	flex: 0 1 auto;
  ['flex-none']: boolean; //	flex: none;
}

export interface FlexBasis {
  ['basis-0']: boolean; //	flex-basis: 0px;
  ['basis-1']: boolean; //	flex-basis: 0.25rem;
  ['basis-2']: boolean; //	flex-basis: 0.5rem;
  ['basis-3']: boolean; //	flex-basis: 0.75rem;
  ['basis-4']: boolean; //	flex-basis: 1rem;
  ['basis-5']: boolean; //	flex-basis: 1.25rem;
  ['basis-6']: boolean; //	flex-basis: 1.5rem;
  ['basis-7']: boolean; //	flex-basis: 1.75rem;
  ['basis-8']: boolean; //	flex-basis: 2rem;
  ['basis-9']: boolean; //	flex-basis: 2.25rem;
  ['basis-10']: boolean; //	flex-basis: 2.5rem;
  ['basis-11']: boolean; //	flex-basis: 2.75rem;
  ['basis-12']: boolean; //	flex-basis: 3rem;
  ['basis-14']: boolean; //	flex-basis: 3.5rem;
  ['basis-16']: boolean; //	flex-basis: 4rem;
  ['basis-20']: boolean; //	flex-basis: 5rem;
  ['basis-24']: boolean; //	flex-basis: 6rem;
  ['basis-28']: boolean; //	flex-basis: 7rem;
  ['basis-32']: boolean; //	flex-basis: 8rem;
  ['basis-36']: boolean; //	flex-basis: 9rem;
  ['basis-40']: boolean; //	flex-basis: 10rem;
  ['basis-44']: boolean; //	flex-basis: 11rem;
  ['basis-48']: boolean; //	flex-basis: 12rem;
  ['basis-52']: boolean; //	flex-basis: 13rem;
  ['basis-56']: boolean; //	flex-basis: 14rem;
  ['basis-60']: boolean; //	flex-basis: 15rem;
  ['basis-64']: boolean; //	flex-basis: 16rem;
  ['basis-72']: boolean; //	flex-basis: 18rem;
  ['basis-80']: boolean; //	flex-basis: 20rem;
  ['basis-96']: boolean; //	flex-basis: 24rem;
  ['basis-auto']: boolean; //	flex-basis: auto;
  ['basis-px']: boolean; //	flex-basis: 1px;
  ['basis-0']: boolean; //.5	flex-basis: 0.125rem;
  ['basis-1']: boolean; //.5	flex-basis: 0.375rem;
  ['basis-2']: boolean; //.5	flex-basis: 0.625rem;
  ['basis-3']: boolean; //.5	flex-basis: 0.875rem;
  ['basis-1']: boolean; ///2	flex-basis: 50%;
  ['basis-1']: boolean; ///3	flex-basis: 33.333333%;
  ['basis-2']: boolean; ///3	flex-basis: 66.666667%;
  ['basis-1']: boolean; ///4	flex-basis: 25%;
  ['basis-2']: boolean; ///4	flex-basis: 50%;
  ['basis-3']: boolean; ///4	flex-basis: 75%;
  ['basis-1']: boolean; ///5	flex-basis: 20%;
  ['basis-2']: boolean; ///5	flex-basis: 40%;
  ['basis-3']: boolean; ///5	flex-basis: 60%;
  ['basis-4']: boolean; ///5	flex-basis: 80%;
  ['basis-1']: boolean; ///6	flex-basis: 16.666667%;
  ['basis-2']: boolean; ///6	flex-basis: 33.333333%;
  ['basis-3']: boolean; ///6	flex-basis: 50%;
  ['basis-4']: boolean; ///6	flex-basis: 66.666667%;
  ['basis-5']: boolean; ///6	flex-basis: 83.333333%;
  ['basis-1']: boolean; ///12	flex-basis: 8.333333%;
  ['basis-2']: boolean; ///12	flex-basis: 16.666667%;
  ['basis-3']: boolean; ///12	flex-basis: 25%;
  ['basis-4']: boolean; ///12	flex-basis: 33.333333%;
  ['basis-5']: boolean; ///12	flex-basis: 41.666667%;
  ['basis-6']: boolean; ///12	flex-basis: 50%;
  ['basis-7']: boolean; ///12	flex-basis: 58.333333%;
  ['basis-8']: boolean; ///12	flex-basis: 66.666667%;
  ['basis-9']: boolean; ///12	flex-basis: 75%;
  ['basis-10']: boolean; ///12	flex-basis: 83.333333%;
  ['basis-11']: boolean; ///12	flex-basis: 91.666667%;
  ['basis-full']: boolean; //	flex-basis: 100%;
}

export interface JustifyContent {
  ['justify-start']: boolean; //justify-content: flex-start;
  ['justify-end']: boolean; //justify-content: flex-end;
  ['justify-center']: boolean; //justify-content: center;
  ['justify-between']: boolean; //justify-content: space-between;
  ['justify-around']: boolean; //justify-content: space-around;
  ['justify-evenly']: boolean; //justify-content: space-evenly;
}

export interface AlignContent {
  // content-center	align-content: center;
  // content-start	align-content: flex-start;
  // content-end	align-content: flex-end;
  // content-between	align-content: space-between;
  // content-around	align-content: space-around;
  // content-evenly	align-content: space-evenly;
}

export interface AlignSelf {
  // self-auto	align-self: auto;
  // self-start	align-self: flex-start;
  // self-end	align-self: flex-end;
  // self-center	align-self: center;
  // self-stretch	align-self: stretch;
  // self-baseline	align-self: baseline;
}

export interface JustifySelf {
  // justify-self-auto	justify-self: auto;
  // justify-self-start	justify-self: start;
  // justify-self-end	justify-self: end;
  // justify-self-center	justify-self: center;
  // justify-self-stretch	justify-self: stretch;
}

export interface JustifyItems {
  // justify-items-start	justify-items: start;
  // justify-items-end	justify-items: end;
  // justify-items-center	justify-items: center;
  // justify-items-stretch	justify-items: stretch;
}

export interface AlignItems {
  // items-start	align-items: flex-start;
  // items-end	align-items: flex-end;
  // items-center	align-items: center;
  // items-baseline	align-items: baseline;
  // items-stretch	align-items: stretch;
}
