import { atom } from "recoil";

const userInfoAtom = atom({
    key: 'userInfoAtom', //unique ID (with respect to other atoms/selector)
    default: false, //default value (aka initial value)
});

export default userInfoAtom;