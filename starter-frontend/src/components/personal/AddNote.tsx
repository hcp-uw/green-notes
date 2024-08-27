import { ChangeEvent } from 'react';
import plus from '../../assets/plus.svg';

/** Parameters for the AddNote button */
type AddNoteProps = {
    /** True if create pop-up is open. */
    isMaking: boolean;

    /** Function that changes isMaking. */
    onMake: (event: ChangeEvent<HTMLInputElement>) => void;
};

/** Button to open the Create new note modal */
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
