import React, {useEffect, useState} from 'react';
import '../../scss/buyers.scss';
import {buyerType, getBuyersAction} from '../../redux/buyersReducer';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";


type propsType = {
    isAuth: boolean
    // buyerData: Array<buyerType>
    // setSearch: (value: string) => void
}

export const Table = ({isAuth}: propsType) => {

    const buyers = useSelector<AppRootStateType, Array<buyerType>>(state => state.buyers)
    const [search, setSearch] = useState("");
    const [buyersArr, setBuyersArr] = useState(buyers);
    const [isHidden1, setIsHidden1] = useState(false);
    const [isHidden2, setIsHidden2] = useState(false);
    const [isHidden3, setIsHidden3] = useState(false);

    useEffect(() => {
        setBuyersArr(buyers.filter(b =>
            b.buyerName.toLowerCase().includes(search.toLowerCase())
        ))
    }, [search, buyers]);

    const sortBuyers = (param: keyof buyerType , asc: boolean) => {
        if(asc){
            setBuyersArr(buyers.sort((a, b) => a[param] < b[param] ? 1 : -1))
        } else {
            setBuyersArr(buyers.sort((a, b) => a[param] > b[param] ? 1 : -1))
        }
    };

    const setAverageCheckAsc = () => {
        sortBuyers('averageCheck', true)
        setIsHidden3(!isHidden3);
    };
    const setAverageCheckDesc = () => {
        sortBuyers('averageCheck', false)
        setIsHidden3(!isHidden3);
    };
    const setNumberOfPurchasesAsc = () => {
        sortBuyers('numberOfPurchases', true)
        setIsHidden2(!isHidden2);
    };
    const setNumberOfPurchasesDesc = () => {
        sortBuyers('numberOfPurchases', false)
        setIsHidden2(!isHidden2);
    };
    const setTotalRevenuesAsc = () => {
        sortBuyers('totalRevenues', true)
        setIsHidden1(!isHidden1);
    };
    const setTotalRevenuesDesc = () => {
        sortBuyers('totalRevenues', false)
        setIsHidden1(!isHidden1);
    };

    return (
        <div className="buyers">
            <div className='title'>BUYERS</div>
            <input
                type="text"
                placeholder="Search buyer by name..."
                onChange={e => setSearch(e.target.value)}
            />
            <table className="table" id='table'>
                <tr>
                    <th>ID покупателя</th>
                    <th>Имя покупателя</th>
                    <th className="col">Средний чек
                        {!isHidden3 ?
                            <span id={'max'} className="material-icons" onClick={() => setAverageCheckDesc()} >filter_list</span>
                            : <span id={'min'}  className="material-icons" onClick={() => setAverageCheckAsc()}>filter_list</span>}
                    </th>
                    <th className="col">Количество покупок
                        {!isHidden2 ?
                            <span id={'max'} className="material-icons" onClick={() => setNumberOfPurchasesDesc()} >filter_list</span>
                            : <span id={'min'}  className="material-icons" onClick={() => setNumberOfPurchasesAsc()}>filter_list</span>}
                    </th>
                    <th className="col">Общая выручка
                        {!isHidden1 ?
                            <span id={'max'} className="material-icons" onClick={() => setTotalRevenuesDesc()} >filter_list</span>
                            : <span id={'min'}  className="material-icons" onClick={() => setTotalRevenuesAsc()}>filter_list</span>}
                    </th>
                </tr>
                {
                    buyersArr.map(buyer =>
                        <tr key={buyer.buyerId}>
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

