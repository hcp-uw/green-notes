// Types used for file navigation

/** route type, just a linked list */
export type route = {readonly kind: "nil"} 
| {readonly kind: "cons", readonly hd: string, readonly tl: route};

/** empty route */
export const nil: {kind: "nil"} = {kind: "nil"};

/** returns a route with hd in front of tl */
export const cons = (hd: string, tl: route): route => {
    return {kind: "cons", hd: hd, tl: tl};
};

/** returns a route with R concatted to end of L */
export const concat = (L: route, R : route): route => {
    if (L.kind === "nil") {
        return R;
    } else {
        return cons(L.hd, concat(L.tl, R));
    }
};

/** Returns the route in reverse order */
export const rev = (R: route): route => {
    if (R.kind === "nil") {
        return nil;
    } else {
        return concat(rev(R.tl), cons(R.hd, nil));
    }
};