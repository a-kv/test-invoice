import React, {useEffect, useState} from 'react';
import '../../scss/table.scss';
import {buyerType} from '../../redux/buyersReducer';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";

type propsType = {
    setAverageCheckDesc: (sortFields: string, order: string) => void
    setNumberOfPurchasesDesc: (sortFields: string, order: string) => void
    setTotalRevenuesDesc: (sortFields: string, order: string) => void
    setAverageCheckAsc: (sortFields: string, order: string) => void
    setNumberOfPurchasesAsc: (sortFields: string, order: string) => void
    setTotalRevenuesAsc: (sortFields: string, order: string) => void
    hiddenIconFlagAverageCheck: boolean
    hiddenIconFlagTotalRevenues: boolean
    hiddenIconFlagNumberOfPurchases: boolean
}

export const Table = (props: propsType) => {

    const buyers = useSelector<AppRootStateType, Array<buyerType>>(state => state.buyers.buyers)
    const [search, setSearch] = useState("");
    const [buyersArr, setBuyersArr] = useState(buyers);

    useEffect(() => {
        setBuyersArr(buyers.filter(b =>
            b.buyerName.toLowerCase().includes(search.toLowerCase())
        ))
    }, [buyers, search]);

    return (
        <div className="buyers">
            <div className='titleWrap'>
                <div className='title'>BUYERS</div>
                <input className='search'
                       type="text"
                       placeholder="Search buyer by name..."
                       onChange={e => setSearch(e.target.value)}
                /></div>
            <div className='tableWrap'>
                <table className="table" id='table'>
                    <tr>
                        <th>Buyer ID</th>
                        <th>Name</th>
                        <th className="col">Average check
                            {!props.hiddenIconFlagAverageCheck ?
                                <span id={'max'} className="material-icons"
                                      onClick={() => props.setAverageCheckDesc('averageCheck', 'desc')}>filter_list</span>
                                : <span id={'min'} className="material-icons"
                                        onClick={() => props.setAverageCheckAsc('averageCheck', 'asc')}>filter_list</span>}
                        </th>
                        <th className="col">Buying
                            {!props.hiddenIconFlagNumberOfPurchases ?
                                <span id={'max'} className="material-icons"
                                      onClick={() => props.setNumberOfPurchasesDesc('numberOfPurchases', 'desc')}>filter_list</span>
                                : <span id={'min'} className="material-icons"
                                        onClick={() => props.setNumberOfPurchasesAsc('numberOfPurchases', 'asc')}>filter_list</span>}
                        </th>
                        <th className="col">Total revenue
                            {!props.hiddenIconFlagTotalRevenues ?
                                <span id={'max'} className="material-icons"
                                      onClick={() => props.setTotalRevenuesDesc('totalRevenues', 'desc')}>filter_list</span>
                                : <span id={'min'} className="material-icons"
                                        onClick={() => props.setTotalRevenuesAsc('totalRevenues', 'asc')}>filter_list</span>}
                        </th>
                    </tr>

                    {
                        buyersArr.map(buyer =>
                            <tr key={buyer.id}>
                                <td><NavLink to={`/buyers/${buyer.id}`}>{buyer.id}</NavLink></td>
                                <td>{buyer.buyerName}</td>
                                <td>{buyer.averageCheck} </td>
                                <td>{buyer.numberOfPurchases}</td>
                                <td>{buyer.totalRevenues}</td>
                            </tr>
                        )}
                </table>
            </div>
        </div>
    );
};

