'use strict';
import axios from 'axios';
import config from '../../config.json';

const getActions = (text) => {
    return config.actions.map(action => {
        const triggered = action.keywords.reduce((total, keyword) => {
            return total + text.includes(keyword)
        }, 0);

        return {
            ...action,
            triggered
        };
    });
};

const getLights = (text) => {
    return config.lights.map(light => {
        const triggered = light.keywords.reduce((totalLight, keyword) => totalLight + text.includes(keyword), 0);
        
        return {
            ...light,
            triggered
        }
    });
};

const getGroups = (text) => {
    return config.groups.map(group => {
        const triggered = group.keywords.reduce((totalGroup, keyword) => totalGroup + text.includes(keyword), 0);
        
        return {
            ...group,
            triggered
        }
    });
};

const send = (actions, lights, groups) => {
    actions.forEach(action => {
        if (action.triggered) {
            lights.forEach(light => {
                if (light.triggered || action.name === 'Color loop') 
                    axios.put(`${config.url}/lights/${light.index}/state`, action.data);
            });
            groups.forEach(group => {
                if (group.triggered) {
                    group.lights.forEach(light => {
                        axios.put(`${config.url}/lights/${light}/state`, action.data);
                    })
                }
            });
        }
    });
};

export default {
    getActions,
    getLights,
    getGroups,
    send,
}
