import { atom } from "recoil";

const searchTextAtom = atom({
    key: 'searchTextAtom', //unique ID (with respect to other atoms/selector)
    default: "", //default value (aka initial value)
});

export default searchTextAtom;