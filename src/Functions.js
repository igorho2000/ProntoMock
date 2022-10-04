import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
    selectEveryPopup,
} from './features/popupSlice';
import { DeselectObject } from './features/draftSlice';

export function useOutsideClick(ref) {
    const dispatch = useDispatch();

    React.useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(resetPopups());
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  export function ClickOutsideSelected(ref) {
    const dispatch = useDispatch();

    React.useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (event.target.className === 'selectedText') {
            return
          }
          if (event.target.className === 'elements-control' || event.target.offsetParent.className === 'elements elements-control') {
            return
          }
          if (event.target.className === 'control' || event.target.offsetParent.className === 'control') {
            return
          }
          if (event.shiftKey === true) {
            return
          }
          console.log(event);
          dispatch(DeselectObject());
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

export function RGBtoHEX(array) {
  var red = array[0].toString(16).length == 1 ? '0' + array[0].toString(16) : array[0].toString(16);
  var green = array[1].toString(16).length == 1 ? '0' + array[1].toString(16) : array[1].toString(16);
  var blue = array[2].toString(16).length == 1 ? '0' + array[2].toString(16) : array[2].toString(16);
  var hex = '#' + red + green + blue;
  return hex
}