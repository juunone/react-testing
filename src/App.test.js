import React from 'react';
import App, {Counter, onIncrement, onDecrement} from './App';

describe('App Component', () => {
  it('Counter 래퍼를 그려낸다', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });

  it('Counter 래퍼에 모든 Prop이 전달되었다', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(0);

    // wrapper.setState({ counter: -1 });

    // counterWrapper = wrapper.find(Counter);
    // expect(counterWrapper.props().counter).to.equal(-1);
  });

  it('counter를 하나 올린다', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button').at(0).simulate('click');
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(1);
  });

  it('counter를 하나 내린다', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button').at(1).simulate('click');
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(-1);
  });
});

describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 };
    const newState = onIncrement(state);

    expect(newState.counter).to.equal(1);
  });

  it('should decrement the counter in state', () => {
    const state = { counter: 0 };
    const newState = onDecrement(state);

    expect(newState.counter).to.equal(-1);
  });
});