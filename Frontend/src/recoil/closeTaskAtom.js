import { atom } from "recoil";

const closeTaskAtom = atom({
    key: 'closeTaskAtom', //unique ID (with respect to other atoms/selector)
    default: false, //default value (aka initial value)
});

export default closeTaskAtom;