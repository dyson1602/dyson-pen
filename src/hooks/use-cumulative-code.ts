import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    //_React and _ReactDOM used to avoid naming collisions if use imports
    //either package not knowing they are autoloaded to work with jsx
    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    
    var show = (value) => {

      const root = document.querySelector('#root')

      if(typeof value === 'object'){
        if(value.$$typeof && value.props){
          _ReactDOM.render(value, root)
        } else {
        root.innerHTML = JSON.stringify(value)
        }
      } else {
        root.innerHTML = value
      }
    }
  `;
    //showFuncNoop used so that if show() is called in a code cell different from the
    //current one you are coding in, the current preview window doesn't show the
    //previous show() function's code
    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
