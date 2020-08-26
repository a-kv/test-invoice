import React, {useEffect} from 'react';
import '../../scss/buyers.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {getBuyers, getBuyersAC, setOrder, setPage, setPageSize, setSortFields} from '../../redux/buyersReducer';
import {Redirect} from "react-router-dom";
import {Table} from '../Table/Table';
import Pagination from "react-js-pagination";

type propsType = {
    isAuth: boolean
}

export const Buyers = ({isAuth}: propsType) => {
    const {buyers, totalCount, currentPage, pageSize, order, sortFields} = useSelector(({buyers}: AppRootStateType) => buyers)

    const dispatch = useDispatch();

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
        console.log(`active page is ${currentPage}`);
        dispatch(setPage(currentPage))
    }
    const changePageSize = (pageSize: number) => {
        dispatch(getBuyersAC([]))
        dispatch(setPageSize(pageSize))
    }

    const setAverageCheckDesc = (sortFields: string, order: string) => {
        dispatch(getBuyersAC([]))
        setSortFields(sortFields)
        setOrder(order)
    };

    const setNumberOfPurchasesDesc = (sortFields: string, order: string) => {
        dispatch(getBuyersAC([]))
        setSortFields(sortFields)
        setOrder(order)
    };

    const setTotalRevenuesDesc = (sortFields: string, order: string) => {
        dispatch(getBuyersAC([]))
        setSortFields(sortFields)
        setOrder(order)
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
            />
            <Pagination totalItemsCount={totalCount}
                        onChange={handlePageChange}
                        activePage={currentPage}
                        itemsCountPerPage={pageSize}/>
        </div>

    );
};

