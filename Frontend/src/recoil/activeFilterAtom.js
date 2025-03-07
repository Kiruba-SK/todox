import { atom } from "recoil";

const activeFilterAtom = atom({
    key: 'activeFilterAtom', //unique ID (with respect to other atoms/selector)
    default: 'All', //default value (aka initial value)
});

export default activeFilterAtom; 