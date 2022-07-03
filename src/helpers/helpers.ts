import axios from "axios";

export function checkImage(path: string):any {
    axios
        .get(path)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}