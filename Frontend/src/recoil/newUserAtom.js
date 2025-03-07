import { atom } from "recoil";

const newUserAtom = atom({
    key: 'newUserAtom', //unique ID (with respect to other atoms/selector)
    default: false, //default value (aka initial value)
});

export default newUserAtom;