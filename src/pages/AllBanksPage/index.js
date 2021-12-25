import React, { useState, useMemo, useEffect } from 'react';
import './allBanksPage.css'
import { getAllBanks } from '../../utils/api';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { columns } from '../../utils';
import Dropdown from '../../components/dropdown/dropdown';
import { TABLE_HEADERS, CITY_NAMES, FILTER_KEY } from "./helpers";
import { useDebounce } from '../../utils/useDebouce';

function AllBanksPage() {
  const [ loading, setLoading ] = useState(true);
  const [ hasError, setHasError ] = useState(false);
  const [ banks, setBanks ] = useState([]);
  const [ searched, setSearched ] = useState('');
  const [ filter, setFilter ] = useState(TABLE_HEADERS[0])
  const debouncedTerm = useDebounce(searched, 500)

  const filteredBanks = useMemo(() => {
    const filterKey = FILTER_KEY[filter]

    return banks.filter((bank) => {
      const lowerCaseValue = bank[filterKey].toString().toLowerCase()

      return lowerCaseValue.includes(debouncedTerm.toLowerCase())
    })
  }, [ debouncedTerm, filter, banks.length ])

  useEffect(() => {
    fetchAllBanks('MUMBAI')
  }, [])

  const fetchAllBanks = async (cityName) => {
    try {
      const banks = await getAllBanks(cityName);
      setLoading(false)
      setBanks(banks)
    } catch (error) {
      setLoading(false)
      setHasError(true)
      console.error(error)
    }
  }

  const onCityChange = (cityName) => {
    fetchAllBanks(cityName)
  }

  const onFilterChange = (filterName) => {
    setFilter(filterName)
    setSearched('')
  }

  const onInputChange = ({ target }) => {
    setSearched(target.value)
  }

  if(loading) {
    return <div>loading...</div>
  }

  if(hasError) {
    return <div>Error...</div>
  }

  return (
      <div className='wrapper'>
        <div className='header'>
          <h3>All Banks</h3>
          <div className='header-right-child'>
            <input 
              type="text" 
              value={searched}
              onChange={onInputChange}
            />
            <Dropdown 
              arr={TABLE_HEADERS} 
              onSelectChange={onFilterChange}
            />
            <Dropdown 
              arr={CITY_NAMES} 
              onSelectChange={onCityChange}
            />
          </div>
        </div>
        <div className='table container'>
          <BootstrapTable
          bootstrap4
          keyField="id"
          data={filteredBanks}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 10 })}
        />
        </div>
      </div>
    // <table>
    //   <thead>
    //     <tr>
    //       {
    //         TABLE_HEADERS.map((header) => {
    //           return (
    //             <th>{header}</th>
    //           )
    //         })
    //       }
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {
    //       banks.map((bank) => {
    //         const { bank_name, bank_id, ifsc, branch, address  } = bank || {}
        
    //         return (
    //           <tr className="table-row">
    //             <td>{bank_name || 'NA'}</td>
    //             <td>{bank_id || 'NA'}</td>
    //             <td>{ifsc || 'NA'}</td>
    //             <td>{branch || 'NA'}</td>
    //             <td>{address || 'NA'}</td>
    //           </tr>
    //         )
    //       })
    //     }
    //   </tbody>
    // </table>
  )
}

export default AllBanksPage;