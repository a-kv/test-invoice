import React, {useEffect} from 'react';
import '../../scss/buyers.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {buyerType, getBuyer} from '../../redux/buyersReducer';
import {NavLink, Redirect, useParams} from "react-router-dom";

type propsType = {
    isAuth: boolean
    buyer?: buyerType | undefined
}

export const Buyer = ({isAuth, buyer}: propsType) => {

    const dispatch = useDispatch();
    let {id} = useParams()


    useEffect(() => {
            dispatch(getBuyer(id))
    }, [])

    if (!isAuth) {
        return <Redirect to='/'/>
    }
    return (
        <div className="buyers">
            <div className='title'>BUYER {buyer.buyerId}</div>
            <table className="table" id='table'>
                {
                    <tr key={buyer.buyerId}>
                        <td><NavLink to={`/buyers/${buyer.buyerId}`}>{buyer.buyerId}</NavLink></td>
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

