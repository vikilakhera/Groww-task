import React, { useState, useEffect } from 'react';

import { getAllBanks } from '../../utils/api';
import { TABLE_HEADERS } from './helpers';

import './allBanksPage.css'

function AllBanksPage() {
  const [ loading, setLoading ] = useState(true)
  const [ hasError, setHasError ] = useState(false)
  const [ banks, setBanks ] = useState([])

  useEffect(() => {
    fetchAllBanks()
  }, [])

  const fetchAllBanks = async () => {
    try {
      const banks = await getAllBanks('MUMBAI');
      setLoading(false)
      setBanks(banks)
    } catch (error) {
      setLoading(false)
      setHasError(true)
      console.error(error)
    }
  }

  if(loading) {
    return <div>loading...</div>
  }

  if(hasError) {
    return <div>Error...</div>
  }

  return (
    <table>
      <thead>
        <tr>
          {
            TABLE_HEADERS.map((header) => {
              return (
                <th>{header}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          banks.map((bank) => {
            const { bank_name, bank_id, ifsc, branch, address  } = bank || {}
        
            return (
              <tr className="table-row">
                <td>{bank_name || 'NA'}</td>
                <td>{bank_id || 'NA'}</td>
                <td>{ifsc || 'NA'}</td>
                <td>{branch || 'NA'}</td>
                <td>{address || 'NA'}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default AllBanksPage;