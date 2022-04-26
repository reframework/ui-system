import React from 'react';
import { render } from '@testing-library/react';
import MergeProps from './MergeProps';

describe('MergeProps', () => {
  it('merges refs', () => {
    const ownRef = { current: null };
    const mergedRef = { current: null };

    render(
      <MergeProps ref={mergedRef}>
        <div ref={ownRef} />
      </MergeProps>,
    );

    expect(ownRef.current).toBeInstanceOf(HTMLDivElement);
    expect(mergedRef.current).toBeInstanceOf(HTMLDivElement);
  });
  it('merges styles', () => {
    const MockComponent = jest.fn().mockImplementation(() => null);

    const ownStyle = {
      width: 100,
      margin: 16,
      padding: 32,
    };

    const mergedStyle = {
      width: '100%',
      height: '100%',
      padding: 0,
    };

    render(
      <MergeProps style={mergedStyle}>
        <MockComponent style={ownStyle} />
      </MergeProps>,
    );

    expect(MockComponent.mock.calls[0][0].style).toEqual({
      width: '100%',
      height: '100%',
      margin: 16,
      padding: 0,
    });
  });
  it('merges all props', () => {
    const MockComponent = jest.fn().mockImplementation(() => null);

    const ownProps = { variant: 'primary', value: '100', onClick: jest.fn() };
    const mergedProps = { variant: 'secondary', color: 'black', value: '0' };

    render(
      <MergeProps {...mergedProps}>
        <MockComponent {...ownProps} />
      </MergeProps>,
    );

    expect(MockComponent.mock.calls[0][0]).toEqual({
      color: 'black',
      onClick: expect.any(Function),
      value: '0',
      variant: 'secondary',
    });
  });
  it('merges callbacks', () => {
    const MockComponent = jest.fn().mockImplementation(() => null);

    const ownHandler = jest.fn();
    const mergedHandler = jest.fn();

    render(
      <MergeProps onClick={mergedHandler}>
        <MockComponent onClick={ownHandler} />
      </MergeProps>,
    );

    const event = {
      target: document.createElement('input'),
    };

    MockComponent.mock.calls[0][0].onClick.call(null, event);
    expect(ownHandler).toHaveBeenCalledWith(event);
    expect(mergedHandler).toHaveBeenCalledWith(event);
  });
});
