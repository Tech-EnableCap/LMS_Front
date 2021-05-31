import SearchBar from '../dashboard/searchBar';
import './ms.css';
import DtTable from '../dashboard/table';
let lid, fname, lname, stDate, enDate, dtCat="first_inst_date";

function MasterRepaySch(props) {

    //Handle searchBar Input Events....
    const lidCh = (e) => {
        lid = e.target.value;
    }

    const fnameCh = (e) => {
        fname = e.target.value;
    }

    const lnameCh = (e) => {
        lname = e.target.value;
    }

    const stDateCh = (e) => {
        stDate = e.target.value;
    }

    const enDateCh = (e) => {
        enDate = e.target.value;
    }

    const dtCatCh = (e) => {
        dtCat = e.target.value;
    }

    const srClick = () => {
        alert("Searching...");
    }
    //==================================
    const tbDt = {};
    const dName= "";
    return (
        <div className="master">
            <h2><center>Master Repayment Schedule</center></h2>
            <SearchBar
                hndlSearch={srClick}
                lidChange={lidCh} 
                fnameChange={fnameCh} 
                lnameChange={lnameCh} 
                stDateChange={stDateCh} 
                enDateChange={enDateCh} 
                dtCatChange={dtCatCh}
            />
            <DtTable 
                Data={tbDt}
                tbName={dName}
            />
        </div>
    );
}

export default MasterRepaySch;