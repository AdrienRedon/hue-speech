'use strict';
import axios from 'axios';
import config from '../../config.json';

const _actions = {
    turnOn: [
        'allume',
    ],
    turnOff: [
        'étein',
    ],
};

const _lightOn = {"on":true, "bri": 254, "sat": 0,"hue":0};
const _lightOff = {"on":false, "bri": 0, "sat": 0,"hue":0};

const _turnOn =  (lights) => {
    lights.forEach((light, index) => {
        if (light) 
            axios.put(`${config.url}/lights/${index}/state`, _lightOn);
    });
};

const _turnOff = (lights) => {
    lights.forEach((light, index) => {
        if (light) 
            axios.put(`${config.url}/lights/${index}/state`, _lightOff);
    });
};

const getActions = (text) => {
    const isTurnOn = _actions.turnOn.reduce((total, action) => total + text.includes(action), 0);
    const isTurnOff = _actions.turnOff.reduce((total, action) => total + text.includes(action), 0);
    return {
        isTurnOn, 
        isTurnOff,
    };
};

const getLights = (text) => {
    return config.lights.map(light => {
        return light.keywords.reduce((total, keyword) => total + text.includes(keyword), 0);
    });
};

const send = (actions, lights) => {
    if (actions.isTurnOn) {
        _turnOn(lights);
    } else if (actions.isTurnOff) {
        _turnOff(lights);
    }
};

export default {
    getActions,
    getLights,
    send,
}
