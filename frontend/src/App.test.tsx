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
  test('Renders Listed input type', () => {
    render(<App />);
    const inputType = screen.getByTestId('listInputSelector');
    expect(inputType).toBeInTheDocument();
  })
  test('Clicking JSON input type renders JSON textarea', () => {
    render(<App />);
    const inputType = screen.getByTestId('basicInputSelector');
    expect(inputType).toBeInTheDocument();
  })
  test('Clicking Delimeted input type renders Delimeted textarea', () => {
    render(<App />);
    const inputType = screen.getByTestId('textInputSelector');
    expect(inputType).toBeInTheDocument();
  })

  // List Input Tests
  describe('List Input', () => {
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
});
