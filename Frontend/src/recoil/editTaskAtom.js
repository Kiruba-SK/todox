import { atom } from "recoil";

const editTaskAtom = atom({
    key: 'editTaskAtom', //unique ID (with respect to other atoms/selector)
    default: false, //default value (aka initial value)
});

export default editTaskAtom; 