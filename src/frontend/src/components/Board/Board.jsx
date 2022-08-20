import React from 'react';

import cl from './Board.module.css';
import Pin from "../Pin/Pin";

function groupPins(pins) {
    let groupNames = [];
    pins.forEach(pin => {
        if(!groupNames.includes(pin.groupName)) {
            groupNames.push(pin.groupName);
        }
    } );

    let groups = [];
    for(let i = 0; i < groupNames.length; i++) {
        let gPins = [];
        pins.forEach(pin => {
            if(pin.groupName === groupNames[i]) {
                gPins.push(pin);
            }
        } );
        groups.push(gPins);
    }

    return groups;
}

const Board = ({pins}) => {
    let groups = groupPins(pins);

    return(
          <div className={cl.Board}>
              {
                  groups.map((group, groupIndex) => {
                          return (
                              <div className={cl.Group} key={groupIndex}>
                                  {
                                      group.map((pin, pinIndex) =>
                                          <Pin
                                              key={pinIndex}
                                              pin={pin}
                                          />
                                      )
                                  }
                              </div>
                          );
                      }
                  )
              }
          </div>
    );
};

export default Board;