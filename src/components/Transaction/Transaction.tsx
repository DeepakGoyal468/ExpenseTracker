import { useEffect, useState } from 'react';
import Form from '../Form/Form';
import "./Transaction.css";

export interface TransactionModel {
    amount: number,
    time : string,
    type: string
}


const Transaction = () => {
    const [transactions, setTransactions] = useState([] as TransactionModel[]);
    const [balance, setBalance] = useState(0);

    const updateTransactions = (newTransaction : TransactionModel) => {
        const trans : TransactionModel[] = [...transactions, newTransaction];
        setTransactions(trans);
    }

    useEffect(()=>{
        const calculateBalance = () => {
            let total = 0;
            transactions.forEach((transaction) => {
                if(transaction.type === 'Add'){
                    total += transaction.amount;
                }
                if(transaction.type === 'Remove'){
                    total -= transaction.amount;
                }                
            })
            setBalance(total);
        }
        calculateBalance();
    },[transactions]);

    
    return(
        <div className="transactionWrapper">
            <div className="formWrapper">
                <Form updateList={updateTransactions} balance = {balance}/>
            </div>
            <div className="transactionContainer">
                <span>Transactions:</span>
                {transactions.length>0 ? transactions.map((transaction, index) => 
                    <div key={index} className="transaction">{transaction.time} - {transaction.amount} - {transaction.type}</div>
                    )
                    : <p>No Transaction Found yet!!!</p>
                }                
            </div>
        </div>        
    )
}

export default Transaction;