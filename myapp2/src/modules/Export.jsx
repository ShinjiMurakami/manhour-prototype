import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';
import { useRef } from 'react';
import { format } from 'date-fns';


// CSV出力対応
export default function Export(props) {

  const value = props.postValue;
  const [data, setData] = useState('');
  const yyyymmdd = format(new Date(), 'yyyyMMdd');
  const filename = `manhour-list_${yyyymmdd}_${value}.csv`;
  const fetchDoneRef = useRef();
  //フェッチの完了を判断するステート(完了後に false とする)
  const [fetchDone, setFetchDone] = useState(false);
  // データ取得
  const handleDataFetch = () => {
    setFetchDone(true);
    const params = new URLSearchParams();
    params.append('search', value);
    axios.post('http://localhost:3001/csvexport', params)
        .then(response => response.data)
        .then((result) => {
          setData(result);
          fetchDoneRef?.current?.link.click();
          setFetchDone(false);
        })            
        .catch(function (error) {
            console.log("error", error);
        })
      };

  return (
      <>
        <div>
            <button
                onClick={handleDataFetch}
            >
                Export As CSV
            </button>
            {fetchDone && 
                <CSVLink
                filename={filename}
                data={data}
                ref={fetchDoneRef}
                >
            </CSVLink>
            }
        </div>
      </>
  )
}