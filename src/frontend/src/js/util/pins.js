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

export {getPriorityForNewPin, parsePriority}