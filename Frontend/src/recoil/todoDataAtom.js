import { atom } from "recoil";

const todoDataAtom = atom({
    key: 'todoDataAtom', //unique ID (with respect to other atoms/selector)
    default: null, //default value (aka initial value)
});

export default todoDataAtom;