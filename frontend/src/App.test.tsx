import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// App renders
describe('App', () => {
  test('Renders app title', () => {
    render(<App />);
    const titleElement = screen.getByTestId('titleElement');
    expect(titleElement).toBeInTheDocument();
  })
})

// Input Tests
describe('Input', () => {
  describe('List Input', () => {
    test('Renders Listed input type', () => {
      render(<App />);
      const inputType = screen.getByTestId('listInputSelector');
      expect(inputType).toBeInTheDocument();
    })
    test('Clicking Listed input type does not delete input information', () => {
      render(<App />);
      const inputField = screen.getByTestId('listInputField');
      const inputType = screen.getByTestId('listInputSelector');
      
      fireEvent.change(inputField, {target: {value: 'I want a QR Code NOW!'}})
      fireEvent.click(inputType);

      expect(inputField).toHaveValue('I want a QR Code NOW!')
    })
    test('Deleting input removes item from page', () => {
      render(<App />);
      const inputDelete = screen.getByTestId('listInputDelete')
      const inputField = screen.getByTestId('listInputField');

      fireEvent.click(inputDelete);

      expect(inputField).not.toBeInTheDocument();
    })
    test('Adding new input renders extra input field', () => {
      render(<App />);
      const inputAdd = screen.getByTestId('listInputAdd')
      let inputFields = screen.getAllByTestId('listInputField')

      expect(inputFields).toHaveLength(1);

      fireEvent.click(inputAdd);
      inputFields = screen.getAllByTestId('listInputField')

      expect(inputFields).toHaveLength(2);
    })
    test('Generate with input renders output page', () => {
      render(<App />);
      const inputField = screen.getByTestId('listInputField');
      const generateButton = screen.getByTestId('inputGenerate');
      
      fireEvent.change(inputField, {target: {value: 'I want a QR Code NOW!'}})
      fireEvent.click(generateButton);
      
      const QRDisplay = screen.getByTestId('QRDisplayItem');
      expect(QRDisplay).toBeInTheDocument();
      
    })
    test('Generate without input renders error', () => {
      render(<App />);
      const generateButton = screen.getByTestId('inputGenerate');

      fireEvent.click(generateButton);
      
      const errorMsg = screen.queryByTestId('errorMsg')
      expect(errorMsg).toBeInTheDocument();
    })
    test('Reset clears all inputs and leaves 1 empty field', () => {
      render(<App />);
      const resetButton = screen.getByTestId('inputReset');
      const inputField = screen.getByTestId('listInputField');
      const inputAdd = screen.getByTestId('listInputAdd');

      fireEvent.change(inputField, {target: {value: 'I want a QR Code NOW!'}});
      fireEvent.click(inputAdd);

      let inputFields = screen.getAllByTestId('listInputField');
      
      fireEvent.click(resetButton);

      inputFields = screen.getAllByTestId('listInputField');
      expect(inputFields).toHaveLength(1);
      expect(inputField).toHaveValue('')
    })
  })
  describe('Basic Input', () => {
    test('Clicking JSON input type renders JSON textarea', () => {
      render(<App />)
      const inputType = screen.getByTestId('basicInputSelector');
      fireEvent.click(inputType);
      const inputField = screen.queryByTestId('basicInputTextarea');

      expect(inputField).toBeInTheDocument();
    })
    test('Typing in textarea changes value', () => {
      render(<App />)
      const inputType = screen.getByTestId('basicInputSelector');
      fireEvent.click(inputType);
      const inputField = screen.getByTestId('basicInputTextarea');

      fireEvent.change(inputField, {target: {value: 'I want a QR Code NOW!'}})

      expect(inputField).toHaveValue('I want a QR Code NOW!');
    })
    test('Submitting valid JSON generates output page', () => {
      render(<App />)
      const inputType = screen.getByTestId('basicInputSelector');
      const generateButton = screen.getByTestId('inputGenerate');
      fireEvent.click(inputType);
      const inputField = screen.getByTestId('basicInputTextarea');

      fireEvent.change(inputField, {target: {value: '["I want a QR Code NOW!"]'}})
      fireEvent.click(generateButton)

      const QRDisplay = screen.getByTestId('QRDisplayItem');
      expect(QRDisplay).toBeInTheDocument();
    })
    test('Submitting invalid JSON renders error', () => {
      render(<App />)
      const inputType = screen.getByTestId('basicInputSelector');
      const generateButton = screen.getByTestId('inputGenerate');
      fireEvent.click(inputType);
      const inputField = screen.getByTestId('basicInputTextarea');

      fireEvent.change(inputField, {target: {value: "['I want a QR Code NOW!']"}})
      fireEvent.click(generateButton)
      
      const errorMsg = screen.queryByTestId('errorMsg')
      expect(errorMsg).toBeInTheDocument();
    })
    test('Reset clears textarea', () => {
      render(<App />)
      const inputType = screen.getByTestId('basicInputSelector');
      const resetButton = screen.getByTestId('inputReset');
      fireEvent.click(inputType);
      const inputField = screen.getByTestId('basicInputTextarea');

      fireEvent.change(inputField, {target: {value: 'I want a QR Code NOW!'}});
      
      fireEvent.click(resetButton);

      expect(inputField).toHaveValue('')
    })
  })
  describe('Delimeted Input', () => {
    test('Clicking Delimeted input type renders Delimeted textarea', () => {
      render(<App />);
      const inputType = screen.getByTestId('textInputSelector');
      expect(inputType).toBeInTheDocument();
    })
  })
});
