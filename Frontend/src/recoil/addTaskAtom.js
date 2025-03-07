import { atom } from "recoil";

const addTaskAtom = atom({
    key: 'addTaskAtom', //unique ID (with respect to other atoms/selector)
    default: false, //default value (aka initial value)
});

export default addTaskAtom;