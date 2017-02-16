'use strict';
import axios from 'axios';
import config from '../../config.json';

const getActions = (text) => {
    return config.actions.map(action => {
        const triggered = action.keywords.reduce((total, keyword) => {
            return total + text.includes(keyword)
        }, 0);

        return {
            name: action.name,
            triggered
        };
    });
};

const getLights = (text) => {
    return config.lights.map(light => {
        return light.keywords.reduce((totalLight, keyword) => totalLight + text.includes(keyword), 0);
    });
};

const send = (actions, lights) => {
    actions.forEach((action, indexAction) => {
        if (action.triggered) 
            lights.forEach((light, indexLight) => {
                if (light) 
                    axios.put(`${config.url}/lights/${indexLight + 1}/state`, config.actions.find(a => a.name === action.name).data);
            });
    });
};

export default {
    getActions,
    getLights,
    send,
}
