import { useRouter } from "next/router"; 
import { useState } from 'react';
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import Layout from "components/Layout";
import { eth } from "state/eth";
import axios from "axios";
export default function Manage() {
    const router = useRouter();
    const { address, provider} = eth.useContainer();
    var airdrops = {};
    const writedata = async (e) => {
      var arr = e;
      airdrops = arr;
      console.log(airdrops);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const credentials = airdrops;
    const user = await axios.post("../api/hello", credentials);
  };
    const readExcel = (file) => {
      const promise = new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.readAsArrayBuffer(file);
  
         fileReader.onload = (e) => {
          const bufferArray = e.target.result;
  
          const wb = XLSX.read(bufferArray, { type: "buffer" });
  
          let worksheet = wb.Sheets[wb.SheetNames[0]];
          const owner = 0xFCe007Aa5b65ea377Ab232D058A7A9794f7DEeC4;
          var airdrops = {};
          for (let i = 1; i < 4; i++) {
          const address = worksheet[`A${i}`].v;
          const money   = worksheet[`B${i}`].v;
          var amount = money;
          airdrops[address] = amount;
      }
          resolve(airdrops);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
  
      promise.then((d) => {
        writedata(d);
      });
    };
    return (
        <Layout>
            <div> 
                <form>
                <input type = "file" onChange={(e) => {
                   const file = e.target.files[0];
                   readExcel(file);
                }} name="data" id="data"/>
                <button type = "submit" onClick={(e) => handleUpdate(e)}>Update MerkleRoot </button>
                <button onClick={() => handleLogOut()}> Logout </button>
                </form>
            </div>
        </Layout>
    )
}