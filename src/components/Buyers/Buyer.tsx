import React, {useEffect} from 'react';
import '../../scss/buyers.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {buyerType, getBuyers} from '../../redux/buyersReducer';
import {NavLink, Redirect} from "react-router-dom";

type propsType = {
    isAuth: boolean
}

export const Buyers = ({isAuth}: propsType) => {

    const buyers = useSelector<AppRootStateType, Array<buyerType>>(state => state.buyers)
    const dispatch = useDispatch();

    useEffect(() => {
        if (buyers) {
            dispatch(getBuyers())
        }
    }, [])
    if (!isAuth) {
        return <Redirect to='/'/>
    }
    return (
        <div className="buyers">
            <div className='title'>BUYERS</div>
            <table className="table" id='table'>
                <tr>
                    <th>ID покупателя</th>
                    <th>Имя покупателя</th>
                    <th>Средний чек</th>
                    <th>Количество покупок</th>
                    <th>Общая выручка</th>
                </tr>
                {
                    buyers.map(buyer => <tr key={buyer.buyerId}>
                            <td><NavLink to={`/buyers/:${buyer.buyerId}`}>{buyer.buyerId}</NavLink></td>
                            <td>{buyer.buyerName}</td>
                            <td>{buyer.averageCheck} </td>
                            <td>{buyer.numberOfPurchases}</td>
                            <td>{buyer.totalRevenues}</td>
                        </tr>
                    )}
            </table>
        </div>
    );
};

