/* Rounded rectangle with a plus in it. Click on to make new note. */

import { ChangeEvent } from 'react';
import plus from '../../assets/plus.svg';

type AddNoteProps = {
    /** True if create pop-up is open. */
    isMaking: boolean;

    /** Function that changes isMaking. */
    onMake: (event: ChangeEvent<HTMLInputElement>) => void;
};

const AddNote =({ isMaking, onMake }: AddNoteProps): JSX.Element =>  {
    return (
        <div>
            <input className="add-click" type="checkbox" checked={isMaking} onChange={onMake}/>
            <div className="add-note thumbnail">
                <img className="plus" src={plus} />
            </div>
        </div>
    );
}

export default AddNote;
