import React from 'react';
import axios from 'axios'
import App, { doIncrement, doDecrement, Counter } from './App';

describe('async Component', () => {
  const result = [3, 5, 9];
  const promise = Promise.resolve(result);

  before(() => {
    sinon.stub(axios, 'get').withArgs('https://jsonplaceholder.typicode.com/todos/1').returns(promise);
  });

  after(() => {
    axios.get.restore();
  });

  it('비동기로 카운터를 가져온다', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().asyncCounters).to.equal(null);

    promise.then(() => {
      expect(wrapper.state().asyncCounters).to.equal(result);
    });
  });
});

describe('App Component', () => {
  it('Counter 래퍼를 그려낸다', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });

  it('Counter 래퍼에 모든 Prop이 전달되었다', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(0);

    wrapper.setState({ counter: -1 });

    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });

  it('counter를 하나 올린다', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(0).simulate('click');

    expect(wrapper.state().counter).to.equal(1);
  });

  it('counter를 하나 내린다', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(1).simulate('click');

    expect(wrapper.state().counter).to.equal(-1);
  });
  it('componentDidMount를 호출한다', () => {
    sinon.spy(App.prototype, 'componentDidMount');

    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});

describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 };
    const newState = doIncrement(state);

    expect(newState.counter).to.equal(1);
  });

  it('should decrement the counter in state', () => {
    const state = { counter: 0 };
    const newState = doDecrement(state);

    expect(newState.counter).to.equal(-1);
  });
});