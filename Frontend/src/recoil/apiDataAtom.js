import { atom } from "recoil";

const apiDataAtom = atom({
    key: 'apiDataAtom', //unique ID (with respect to other atoms/selector)
    default: null, //default value (aka initial value)
});

export default apiDataAtom;