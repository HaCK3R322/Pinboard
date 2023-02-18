function parsePriority(priority) {
    let gp = parseInt(priority.split('.')[0]);
    let pp = parseInt(priority.split('.')[1]);

    return {
        groupPriority: gp,
        pinPriority: pp
    }
}

function getPriorityForNewPin(pins, newPinGroupName) {
    // check if there are pins with the same group name
    let pinsWithSameGroup = pins.filter(pin => pin.groupName === newPinGroupName);

    if (pinsWithSameGroup.length === 0) {
        let maxGroupPriority = Math.max(...pins.map(pin => parsePriority(pin.priority).groupPriority));
        return (maxGroupPriority + 1) + ".0";
    } else {
        // find max pin priority in the group
        let maxPinPriority = Math.max(...pinsWithSameGroup.map(pin => parsePriority(pin.priority).pinPriority));
        let groupPriority = parsePriority(pinsWithSameGroup[0].priority).groupPriority;

        return groupPriority + "." + (maxPinPriority + 1);
    }
}

function sortGroupsByDateCreation(groups) {
    for(let i = 0; i < groups.length; i++) {
        groups[i].sort((a, b) => {
            return Date.parse(a.dateCreation) - Date.parse(b.dateCreation);
        } );
    }

    // sort groups by dateCreation of the first pin in the group
    groups.sort((a, b) => {
        return Date.parse(a[0].dateCreation) - Date.parse(b[0].dateCreation);
    });

    return groups;
}

function sortGroupsByPriority(groups) {
    // priority is a string where before dot is a number of group and after dot is a number of pin in the group
    for(let i = 0; i < groups.length; i++) {
        groups[i].sort((a, b) => {
            let aPriority = a.priority.split('.');
            let bPriority = b.priority.split('.');
            return parseInt(aPriority[0]) - parseInt(bPriority[0]) || parseInt(aPriority[1]) - parseInt(bPriority[1]);
        } );
    }

    // sort groups by priority of the first pin in the group
    groups.sort((a, b) => {
            let aPriority = a[0].priority.split('.');
            let bPriority = b[0].priority.split('.');
            return parseInt(aPriority[0]) - parseInt(bPriority[0]);
        }
    );

    return groups;
}

function getSortedGroups(pins, groupsSortFunction) {
    let groupNames = []
    pins.forEach(pin => {
        if(!groupNames.includes(pin.groupName)) {
            groupNames.push(pin.groupName);
        }
    });

    let groups = [];
    for(let i = 0; i < groupNames.length; i++) {
        let gPins = [];
        pins.forEach(pin => {
            if(pin.groupName === groupNames[i]) {
                gPins.push(pin);
            }
        });
        groups.push(gPins);
    }

    // sort each group by dateCreation
    //groups = sortByDateCreation(groups);

    // sort each group by priority
    groups = groupsSortFunction(groups);

    return groups;
}

export {getPriorityForNewPin, parsePriority, getSortedGroups, sortGroupsByDateCreation, sortGroupsByPriority}