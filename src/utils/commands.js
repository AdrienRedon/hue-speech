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

const _lights = {
    /* 3 */ livingRoom: [
        'salon',
        'chambre'
    ],
    /* 2 */ kitchen: [
        'cuisine',
    ],
    /* 1 */ entrance: [
        'entrée',
        'couloir',
        'porte',
    ],
};

const _lightOn = {"on":true, "bri": 254, "sat": 0,"hue":0};
const _lightOff = {"on":false, "bri": 0, "sat": 0,"hue":0};

const getActions = (text) => {
    const isTurnOn = _actions.turnOn.reduce((total, action) => {
        return total + text.includes(action);
    }, 0);
    const isTurnOff = _actions.turnOff.reduce((total, action) => {
        return total + text.includes(action);
    }, 0);
    return {
        isTurnOn, 
        isTurnOff,
    };
};

const getLights = (text) => {
    const isLivingRoom = _lights.livingRoom.reduce((total, light) => {
        return total + text.includes(light);
    }, 0);
    const isKitchen = _lights.kitchen.reduce((total, light) => {
        return total + text.includes(light);
    }, 0);
    const isEntrance = _lights.entrance.reduce((total, light) => {
        return total + text.includes(light);
    }, 0);
    return {
        isLivingRoom, 
        isKitchen,
        isEntrance,
    };
};

const send = (actions, lights) => {
    if (actions.isTurnOn) {
        turnOn(lights);
    } else if (actions.isTurnOff) {
        turnOff(lights);
    }
};

const turnOn =  (lights) => {
    if (lights.isLivingRoom) {
        axios.put(config.url + '/lights/3/state', _lightOn);
    }
    if (lights.isKitchen) {
        axios.put(config.url + '/lights/2/state', _lightOn);
    }
    if (lights.isEntrance) {
        axios.put(config.url + '/lights/1/state', _lightOn);
    }
};

const turnOff = (lights) => {
    if (lights.isLivingRoom) {
        axios.put(config.url + '/lights/3/state', _lightOff);
    }
    if (lights.isKitchen) {
        axios.put(config.url + '/lights/2/state', _lightOff);
    }
    if (lights.isEntrance) {
        axios.put(config.url + '/lights/1/state', _lightOff);
    }
};

export default {
    getActions,
    getLights,
    send,
}