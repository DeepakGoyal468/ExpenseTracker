import React, { useState } from 'react';
import { TransactionModel } from '../Transaction/Transaction';

import './Form.css';
type FormProps = {
    balance: number,
    updateList : (transaction:TransactionModel) => void;
}

const Form = (props:FormProps) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const addTransaction = (type: string) => {
        if(validateAmount()){
            let transaction={
                amount : Number(amount),
                time: new Date().toISOString(),
                type: type
            }
            props.updateList(transaction);
            setAmount('');
        }        
    }

    const validateAmount = () => {
        if(!amount){
            setError("Please enter a number");
            return false;
        }
        if(!Number(amount)){
            setError("Please enter a valid number");
            return false;
        }    
        return true;    
    }

    const changeAmount = (event :any) => {
        if(error){
            setError('');
        }
        setAmount(event.target.value);
    }

    return(
        <div className="formContainer">
            <span>Balance: {props.balance} </span>
            <input type="text" name="amount" value={amount} onChange={e => changeAmount(e)}/>
            {error && <span className="error">{error}</span>}
            <div>
                <button onClick={() => addTransaction('Add')}>Add</button>
                <button onClick={() => addTransaction('Remove')}>Remove</button>
            </div>
        </div>
    );
}

export default Form;