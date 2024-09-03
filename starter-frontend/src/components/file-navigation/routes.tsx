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

/** Returns the length of the route */
export const len = (R: route): number => {
    if (R.kind === "nil") {
        return 0;
    } else {
        return 1 + len(R.tl)
    }
}


// Type for thumbnail data

export type ThumbnailInfo = {name: string, iD: string, kind: "folder" | "doc", content: string}

// Type for note data
export type NoteInfo = {name: string, route: string, body: string, kind: "folder" | "doc"}

/**
 * Determines whether the given value is a record.
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
    return val !== null && typeof val === "object";
  };

/** Backend server url */
export const FetchRoute: string = "http://localhost:3001";
// export const FetchRoute: string = "https://green-notes.onrender.com";