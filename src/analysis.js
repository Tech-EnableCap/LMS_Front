import SearchBar from './dashboard/searchBar';
import {Bar, Doughnut} from 'react-chartjs-2';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {route} from './route';

let startDate, endDate, dateCat="first_inst_date";

function Analysis(props) {
    const [anData, setAnData] = useState({});
    const [dataN, setDataN] = useState({});
    const [dataV, setDataV] = useState({});
    const [dataP, setDataP] = useState({});
    useEffect(() => {
        props.isLoad(true);
        const header = {
            Authorization: "Bearer " + localStorage.enalmsjwttkn
        }
        axios.post(route + "/analysis", "", {headers:header}).then((res) => {
            if("error" in res.data.msg) {
                localStorage.clear();
                window.location.reload();
            }
            setAnData(res.data.msg);            
            props.isLoad(false);
        })        
    }, []);

    useEffect(() => {
        //console.log(anData);
        if(!('risk' in anData)) 
            return;

        let dtN = {
            labels: ['Good', 'Risky', 'Very Risky', 'No Info'],
            datasets: [
              {           
                label: '# of Votes', 
                data: [anData.risk["nloans"]["good"], anData.risk["nloans"]["risky"], anData.risk["nloans"]["very_risky"], anData.risk["nloans"]["no_info"]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',                
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',                
                  ],
                borderWidth: 1,
              },
            ],
          };
        let dtV = {
            labels: ['Good', 'Risky', 'Very Risky', 'No Info'],
            datasets: [
              {           
                label: '# of Votes', 
                data: [anData.risk["vloans"]["good"], anData.risk["vloans"]["risky"], anData.risk["vloans"]["very_risky"], anData.risk["vloans"]["no_info"]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',                
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',                
                  ],
                borderWidth: 1,
              },
            ],
        };
        let dtP = {
            labels: ['Monthly', 'Weekly'],
            datasets: [
              {
                label: '# of Votes',
                data: [(("monthly" in anData) && anData.monthly["number_of_loans"]), (("weekly" in anData) && anData.weekly["number_of_loans"])],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
              },
            ],
        };
        setDataP(dtP);
        setDataN(dtN);
        setDataV(dtV);
    }, [anData]);

    const stDateCh = (e) => {
        startDate = e.target.value;
    }

    const enDateCh = (e) => {
        endDate = e.target.value;
    }

    const dtCatCh = (e) => {
        dateCat = e.target.value;
    }

    const search = () => {
        
        props.isLoad(true);
        const crit = {
            "stDate":startDate,
            "endDate":endDate,
            "cat":dateCat
        }   
        const header = {
            Authorization: "Bearer " + localStorage.enalmsjwttkn
        }     
        axios.post(route + "/analysis", crit, {headers:header}).then((res) => {
            if(!("monthly" in res.data.msg)) {
                alert (res.data.msg.error);
                setAnData({});     
                props.isLoad(false);
                return;
            }            
            setAnData(res.data.msg);
            props.isLoad(false); 

        })
    }

      

    let tdStl = {
        padding: "5px"      
    }

    let options = { 
        legend: {
            labels: {
                fontColor: "blue",
                fontSize: 18
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "green",
                    fontSize: 18,
                    stepSize: 1,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "purple",
                    fontSize: 14,
                    stepSize: 1,
                    beginAtZero: true
                }
            }]
        }
    };
    return (
        <div className="analysis">
            {/*<SearchBar 
            stDateChange={stDateCh} 
            enDateChange={enDateCh} 
            dtCatChange={dtCatCh} 
            hndlSearch={search}
            />*/}
            <div style={{                
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content",
                /*backgroundColor: "black"*/
                }}>
            <table><tr><td style={{paddingRight:"50px"}}>
                <div style={{width: "fit-content"}}>
                    <div className="chart" style={{height:"300px", width:"300px", margin: "0 auto 0 auto"}}>
                        <Doughnut data={dataP} options={options}/>
                    </div>
                
                    <div style={{color: "white", display: "inline-block", borderRight: "1px solid grey"}}>
                        <center><h3>Monthly</h3></center>
                        <table>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>No. of loans</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("monthly" in anData) && anData.monthly["number_of_loans"]}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Total Amt. of Loans</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("monthly" in anData) && anData.monthly["total_amounts_of_loans"]}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Ticket Size</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("monthly" in anData) && parseFloat(anData.monthly["avg_ticket_size"]).toFixed(2)}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Loan Tenure</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("monthly" in anData) && parseFloat(anData.monthly["avg_tenure"]).toFixed(2)}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Interest Rate</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("monthly" in anData) && parseFloat(anData.monthly["avg_interest_rate"]).toFixed(2)}</td></tr>
                        </table>
                    </div>
                    <div style={{color: "white", display: "inline-block", marginLeft: "20px", borderRight: "1px solid grey"}}>
                        <center><h3>Weekly</h3></center>
                        <table>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>No. of loans</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("weekly" in anData) && anData.weekly["number_of_loans"]}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Total Amt. of Loans</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("weekly" in anData) && anData.weekly["total_amounts_of_loans"]}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Ticket Size</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("weekly" in anData) && parseFloat(anData.weekly["avg_ticket_size"]).toFixed(2)}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Loan Tenure</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("weekly" in anData) && parseFloat(anData.weekly["avg_tenure"]).toFixed(2)}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Interest Rate</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("weekly" in anData) && parseFloat(anData.weekly["avg_interest_rate"]).toFixed(2)}</td></tr>
                        </table>
                    </div>
                    <div style={{color: "white", marginTop: "30px", borderRight: "1px solid grey"}}>
                        <center><h3>Total</h3></center>
                        <table>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>No. of loans</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("total" in anData) && anData.total["number_of_loans"]}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Total Amt. of Loans</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("total" in anData) && anData.total["total_amounts_of_loans"]}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Ticket Size</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("total" in anData) && parseFloat(anData.total["avg_ticket_size"]).toFixed(2)}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Loan Tenure</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("total" in anData) && parseFloat(anData.total["avg_tenure"]).toFixed(2)}</td></tr>
                            <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Avg. Interest Rate</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("total" in anData) && parseFloat(anData.total["avg_interest_rate"]).toFixed(2)}</td></tr>
                        </table>
                    </div>
                </div>
            </td>
            <td style={{paddingLeft:"50px"}}>
                <div style={{width: "fit-content"}}>                
                    <table>
                        <tr>
                            <td>
                                <div style={{color: "white", borderRight: "1px solid grey"}}>
                                    <center><h3>By No. of Loans</h3></center>
                                    <table>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Good</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.nloans["good"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Risky</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.nloans["risky"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Very Risky</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.nloans["very_risky"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>No info</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.nloans["no_info"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Total Sample Size</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.nloans["total_sample_size"]}</td></tr>
                                    </table>
                                </div>
                            </td>
                            <td>
                                <div className="chart" style={{height:"200px", width:"400px"}}>
                                    <Bar data={dataN} options={options}/>
                                </div>
                            </td>
                        </tr>                    
                        <tr>
                            <td>
                                <div style={{color: "white", borderRight: "1px solid grey"}}>
                                    <center><h3>By Vol. of Loans</h3></center>
                                    <table>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Good</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.vloans["good"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Risky</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.vloans["risky"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Very Risky</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.vloans["very_risky"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>No info</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.vloans["no_info"]}</td></tr>
                                        <tr><td style={{padding:"5px", borderBottom:"1px solid grey"}}>Total Sample Size</td><td style={{padding:"5px", borderBottom:"1px solid grey"}}>{("risk" in anData) && anData.risk.vloans["total_sample_size"]}</td></tr>
                                    </table>
                                </div>
                            </td>
                            <td style={{paddingTop: "20px"}}>
                                <div className="chart" style={{height:"200px", width:"400px"}}>
                                        <Bar data={dataV} options={options}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            </tr>
            </table></div>
            <div style={{
                height: "100px",
                width: "100%"
            }}></div>
        </div>
    );
}

export default Analysis;