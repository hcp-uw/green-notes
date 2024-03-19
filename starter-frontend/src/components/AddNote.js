import plus from '../assets/plus.svg';

const AddNote =({ isMaking, onMake }) =>  {
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
