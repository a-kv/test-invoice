import React, {useEffect, useState} from 'react';
import '../../scss/buyers.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {getBuyers, getBuyersAC, setOrderAC, setPageAC, setPageSizeAC, setSortFieldsAC} from '../../redux/buyersReducer';
import {Redirect} from "react-router-dom";
import Pagination from "react-js-pagination";
import {Table} from '../Table/Table';

type propsType = {
    isAuth: boolean
}

export const Buyers = ({isAuth}: propsType) => {
    const {buyers, totalCount, currentPage, pageSize, order, sortFields} = useSelector(({buyers}: AppRootStateType) => buyers)

    const dispatch = useDispatch();
    const [hiddenIconFlagTotalRevenues, setHiddenIconFlagTotalRevenues] = useState(false);
    const [hiddenIconFlagNumberOfPurchases, setHiddenIconFlagNumberOfPurchases] = useState(false);
    const [hiddenIconFlagAverageCheck, setHiddenIconFlagAverageCheck] = useState(false);

    useEffect(() => {
        if (buyers.length === 0) {
            dispatch(getBuyers(currentPage, pageSize, sortFields, order))
        }
    }, [dispatch, buyers, currentPage, order, pageSize, sortFields]);

    if (!isAuth) {
        return <Redirect to='/'/>
    }
    const handlePageChange = (currentPage: number) => {
        dispatch(getBuyersAC([]))
        dispatch(setPageAC(currentPage))
    }
    const changePageSize = (pageSize: number) => {
        dispatch(getBuyersAC([]))
        dispatch(setPageSizeAC(pageSize))
    }
    const changeData = (sortFields: string, order: string) => {
        dispatch(getBuyersAC([]))
        dispatch(setSortFieldsAC(sortFields))
        dispatch(setOrderAC(order))

    }
    const setAverageCheckDesc = (sortFields: string, order: string) => {
        changeData(sortFields, order)
        setHiddenIconFlagAverageCheck(!hiddenIconFlagAverageCheck)
    };

    const setNumberOfPurchasesDesc = (sortFields: string, order: string) => {
        changeData(sortFields, order)
        setHiddenIconFlagNumberOfPurchases(!hiddenIconFlagNumberOfPurchases)
    };

    const setTotalRevenuesDesc = (sortFields: string, order: string) => {
        changeData(sortFields, order)
        setHiddenIconFlagTotalRevenues(!hiddenIconFlagTotalRevenues)
    };
    const setAverageCheckAsc= (sortFields: string, order: string) => {
        changeData(sortFields, order)
        setHiddenIconFlagAverageCheck(!hiddenIconFlagAverageCheck)
    };

    const setNumberOfPurchasesAsc = (sortFields: string, order: string) => {
        changeData(sortFields, order)
        setHiddenIconFlagNumberOfPurchases(!hiddenIconFlagNumberOfPurchases)

    };

    const setTotalRevenuesAsc = (sortFields: string, order: string) => {
        changeData(sortFields, order)
        setHiddenIconFlagTotalRevenues(!hiddenIconFlagTotalRevenues)

    };

    return (
        <div className="buyers">
            <div className='setting'><span>Choose page size: </span>
                <select name="mode" id="mode" onChange={(e) => changePageSize(+e.target.value)}>
                    <option value={5} selected>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select></div>
            <Table
                setAverageCheckDesc={setAverageCheckDesc}
                setNumberOfPurchasesDesc={setNumberOfPurchasesDesc}
                setTotalRevenuesDesc={setTotalRevenuesDesc}
                setAverageCheckAsc={setAverageCheckAsc}
                setNumberOfPurchasesAsc={setNumberOfPurchasesAsc}
                setTotalRevenuesAsc={setTotalRevenuesAsc}
                hiddenIconFlagAverageCheck={hiddenIconFlagAverageCheck}
                hiddenIconFlagNumberOfPurchases={hiddenIconFlagNumberOfPurchases}
                hiddenIconFlagTotalRevenues={hiddenIconFlagTotalRevenues}
            />
            <Pagination totalItemsCount={totalCount}
                        onChange={handlePageChange}
                        activePage={currentPage}
                        itemsCountPerPage={pageSize}/>
        </div>

    );
};

