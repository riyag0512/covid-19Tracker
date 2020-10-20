
import React, { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map'
import {
    MenuItem,
    FormControl,
    Select,
    CardContent,
    Card,
} from "@material-ui/core";
import './App.css';
import Table from "./Table";
import { sortData,prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {

   const [countries, setCountries]= useState([]);
   const [country, setCountry]= useState('worldwide');
   const [countryInfo, setCountryInfo]= useState({});
   const [tableData, setTableData]= useState([]);
   const [mapCenter, setMapCenter] = useState({lat: 34.88746, lng: -40.4796});
   const [mapZoom, setMapZoom] = useState(3);
   const [mapCountries, setMapCountries] =useState([]);
    const [casesType, setCasesType] =useState("cases");
   useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then( (data) => {
    setCountryInfo(data);
  });
}, []);

   //USEEFFECT = Runs piece of  code based on condition

   useEffect( () => {
      //code runs once when component loads and not again
  
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
          name: country.country,
          value: country.countryInfo.iso2 
        }
      ));

      const sortedData=sortData(data);
      setTableData(sortedData);
       setMapCountries(data);
      setCountries(countries);
    });
  };
    getCountriesData();
    
  

}, [countries]);

const onCountryChange =async (event) => {
  const countryCode =event.target.value;

 

const url= 
countryCode ==="worldwide" 
? "https://disease.sh/v3/covid-19/all" :
`https://disease.sh/v3/covid-19/countries/${countryCode}`;

await fetch(url)
.then(response => response.json())
.then(data =>{
  setCountry(countryCode);
  setCountryInfo(data);

 setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
 setMapZoom(4);

})
  };
  console.log("infocode is" ,country);
console.log("info is" ,countryInfo);

  return (


    <div className="app">
      
      <div className="app_left">
      <div className="app_header">

      <h1>COVID-19 TRACKER</h1>
     <FormControl className="app_dropdown">
       <Select   variant="outlined" onChange ={onCountryChange}  value={country}
       >
         {/* loop through all countries and show as dropdown list*/}
       {/* jsx*/}
       <MenuItem value="worldwide">Worldwide</MenuItem>
       {
          countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))
       }
       
       
       
        { /*<MenuItem value="worldwide">Worldwide</MenuItem>
         <MenuItem value="worldwide">3</MenuItem>
         <MenuItem value="worldwide">World</MenuItem>
         <MenuItem value="worldwide">Worldde</MenuItem>
         */}

       </Select>
     </FormControl>
   
      </div>
      
   

  <div className="app_stats">

  <InfoBox 
  isRed
  active={casesType==="cases"}
  onClick={ e => setCasesType("cases")}
    title="Coronavirus Cases"  cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} />
    
  <InfoBox  
   active={casesType==="recovered"}
  onClick={ e => setCasesType("recovered")}
  title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered} />
  <InfoBox 
   isRed
   active={casesType==="deaths"}
  onClick={ e => setCasesType("deaths")}
  title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} />
   {/*inboxs*/} 
    {/*inboxs*/}
     {/*inboxs*/}

     </div>
    

     {/*map*/}
     <Map 
     countries={mapCountries}
     casesType={casesType}
     center={mapCenter}
    
     zoom={mapZoom}
     />
    </div>


    <Card className="app_right">

<CardContent>

  <h3>Live cases by country</h3>
  
       {/*table*/}
       <Table countries={tableData} />
       <h3 className="app_title">Worldwide new {casesType}</h3>

       <LineGraph className="app_graph" casesType={casesType} />
       {/*graph*/}
       </CardContent>

    </Card>
    </div>
  );
 
}

export default App;
