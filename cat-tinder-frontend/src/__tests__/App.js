import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it("renders create a cat form", ()=>{
  const app = mount(<App />)
  expect(app.find('.subtitle').text()).toEqual('Create a Cat Profile')
})

it("links to cat index", ()=>{
  const app = mount(<App />)
  app.find('a#cats-link').simulate('click', {button: 0})
  expect(app.find('.subtitle').text()).toEqual('Meet the Cats')
})
