import React, {useEffect} from 'react';
import '../../../scss/buyer.scss';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useParams} from "react-router-dom";
import {buyerType, getBuyer} from "../../../redux/buyerReducer";
import {AppRootStateType} from "../../../redux/store";


type propsType = {
    isAuth: boolean

}

export const Buyer = ({isAuth}: propsType) => {

    const buyer = useSelector<AppRootStateType, buyerType>(state => state.buyer)
    const dispatch = useDispatch();
    let {id} = useParams()

    useEffect(() => {
        let a = getBuyer(id)
        console.log(a)
        dispatch(a)
    }, [])

    if (!isAuth) {
        return <Redirect to='/'/>
    }
    return (
        <div className='buyer'>
            <div className='title'>BUYER ID {buyer.id}</div>
            <table className='table' id='table'>
                {
                    <tr key={buyer.id}>
                        <td>{buyer.buyerName}</td>
                        <td>{buyer.averageCheck} </td>
                        <td>{buyer.numberOfPurchases}</td>
                        <td>{buyer.totalRevenues}</td>
                    </tr>
                }
            </table>
        </div>

    );
};

