import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
    selectEveryPopup,
} from './features/popupSlice';
import { DeselectObject, SortEveryObjectByZ } from './features/draftSlice';

// Function that detects clicks outside popups

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

// Function that detects clicks outside selected

  export function ClickOutsideSelected(ref) {
    const dispatch = useDispatch();

    React.useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (event.shiftKey === true) {
            return
          }
          if (event.target.className === 'selectedText') {
            return
          }
          if (event.target.className === 'elements-control') {
            return
          }
          if (event.target.className === 'control') {
            return
          }
          if (event.target.offsetParent.className === 'elements elements-control') {
            return
          }
          if (event.target.offsetParent.className === 'control') {
            return
          }
          
          dispatch(DeselectObject());
          dispatch(SortEveryObjectByZ());
        }
      }
      // Bind the event listener
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [ref]);
  }

// Function that converts RGB to HEX

export function RGBtoHEX(array) {
  var red = array[0].toString(16).length == 1 ? '0' + array[0].toString(16) : array[0].toString(16);
  var green = array[1].toString(16).length == 1 ? '0' + array[1].toString(16) : array[1].toString(16);
  var blue = array[2].toString(16).length == 1 ? '0' + array[2].toString(16) : array[2].toString(16);
  var hex = '#' + red + green + blue;
  return hex
}

// Function that transforms numerical degrees to pi and optimizes for calculation

export function DegreeCalc(degree) {
  var rotate = 0;
  if (degree <= 90) {
      rotate = degree * Math.PI/180;
  } else if (degree <= 180 && degree > 90) {
      rotate = (180 - degree) * Math.PI/180
  } else if (degree <= 270 && degree > 180) {
      rotate = (degree - 180) * Math.PI/180
  } else if (degree <= 360 && degree > 270) {
      rotate = (360 - degree) * Math.PI/180
  }
  return rotate
}

// Function that transforms an array of elements into relevant stats
export function getSelectedItemStats(selected) {
  const output = selected.map((item, index) => {
    const rotate = DegreeCalc(+item.rotate);

    if (item.type === 'Line') {
      return {
        index: index,
        totalWidth: +item.width,
        totalHeight: +item.borderWidth,
        visualWidth: (+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth) * Math.sin(rotate), 
        visualHeight: (+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate),
        widthDif: ((+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth) * Math.sin(rotate) - +item.width) / 2,
        heightDif: ((+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate) - +item.borderWidth) / 2,
        visualLeft: (+item.x + (+item.width) / 2) - ((+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2,
        visualTop: (+item.y + (+item.height + +item.borderWidth) / 2) - ((+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate)) / 2,
        visualRight: (+item.x + (+item.width) / 2) - ((+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2 + (+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth) * Math.sin(rotate),
        visualBottom: (+item.y + (+item.height + +item.borderWidth) / 2) - ((+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate)) / 2 + (+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate),
        centerLeft: +item.x + (+item.width) / 2,
        centerTop: +item.y,
      }
    }
    var borderRadius = [+item.width / 2, +item.width / 2, +item.width / 2, +item.width / 2]

    if (item.type === 'Square' || item.type === 'Text') {
      borderRadius.splice(0, 4);
      borderRadius = borderRadius.concat(item.radius);
      const width = +item.width;
      const height = +item.height;
      borderRadius = borderRadius.map((item) => {
        if (+item > width) {
          return width / 2;
        }
        if (+item > height) {
          return height / 2;
        }
        return item
      })
      
    }

    const borderRadiusAdjustment = Math.sin(Math.abs(rotate * 2)) * (Math.sqrt(Math.pow(Math.min(...borderRadius), 2) * 2) - Math.min(...borderRadius))

    return {
      index: index,
      totalWidth: +item.width + 2 * +item.borderWidth,
      totalHeight: +item.height + 2 * +item.borderWidth,
      visualWidth: (+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth * 2) * Math.sin(rotate) - 2 * borderRadiusAdjustment, 
      visualHeight: (+item.width + +item.borderWidth * 2) * Math.sin(rotate) + (+item.height + +item.borderWidth * 2) * Math.cos(rotate) - 2 * borderRadiusAdjustment,
      widthDif: ((+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth * 2) * Math.sin(rotate) - (+item.width + 2 * +item.borderWidth)) / 2 - borderRadiusAdjustment, 
      heightDif: ((+item.width + +item.borderWidth * 2) * Math.sin(rotate) + (+item.height + +item.borderWidth * 2) * Math.cos(rotate) - (+item.height + 2 * +item.borderWidth)) / 2 - borderRadiusAdjustment,
      visualLeft: (+item.x + (+item.width + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2 + borderRadiusAdjustment,
      visualTop: (+item.y + (+item.height + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth *2) * Math.sin(rotate) + (+item.height + +item.borderWidth *2) * Math.cos(rotate)) / 2 + borderRadiusAdjustment,
      visualRight: (+item.x + (+item.width + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2 + (+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth * 2) * Math.sin(rotate) - borderRadiusAdjustment,
      visualBottom: (+item.y + (+item.height + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth *2) * Math.sin(rotate) + (+item.height + +item.borderWidth *2) * Math.cos(rotate)) / 2 + (+item.width + +item.borderWidth * 2) * Math.sin(rotate) + (+item.height + +item.borderWidth * 2) * Math.cos(rotate) - borderRadiusAdjustment,
      centerLeft: +item.x + (+item.width) / 2,
      centerTop: +item.y + (+item.height) / 2,
      
    }
  })
  return output
}

// Function that takes a look at selected item stats and organizes them
export function getSelectedStats(selectedItemStats) {

  const leftBound = selectedItemStats.map((item) => (item.visualLeft));
  const topBound = selectedItemStats.map((item) => (item.visualTop));
  const rightBound = selectedItemStats.map((item) => (item.visualRight));
  const bottomBound = selectedItemStats.map((item) => (item.visualBottom));

  return {
    leftBound: Math.min(...leftBound),
    topBound: Math.min(...topBound),
    rightBound: Math.max(...rightBound),
    bottomBound: Math.max(...bottomBound),
    selectedWidth: Math.max(...rightBound) - Math.min(...leftBound),
    selectedHeight: Math.max(...bottomBound) - Math.min(...topBound),
  }
}