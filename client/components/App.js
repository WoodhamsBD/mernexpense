import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      selectedMonth: 'All', 
      selectedYear: 2018, 
      data: [], 
      activeTab: 2018 
    };

    this.getData = this.getData.bind(this);
  }

  // Lifecycle
  // compeonent waiting for props and handing once recieved
  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search) {
      let search = nextProps.history.location.search;
      search = search.substring(1);
      let searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
      this.setState({ activeTab: parseInt(searchObj.year) });
      this.setState({ selectedYear: searchObj.year });
      this.setState({ selectedMonth: searchObj.month });

      this.getData(this, searchObj.year, searchObj.month);
    } else {
      this.getData(this, 2018, 'All');
    }
  }

  componentDidMount() {
    this.getData(this, 2018, 'All');
  }

  // Select Tab
  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab,
      selectedYear: selectedTab
    });
  }

  // API call for tab display
  getData(ev, year, month) {
    axios.get('/getAll?month=' + month + '&year=' + year)
      .then(function (response) {
        ev.setState({ data: response.data });
        ev.setState({ selectedYear: parseInt(year) });
        ev.setState({ selectedMonth: month });
      });

  }

  // Display
  render() {
    return (
      <div>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={2018} title={<YearTabsRouter year='2018' />}><MonthTabs year='2018' monthlyActiveTab={this.state.selectedMonth} /></Tab>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019' />}><MonthTabs year='2019' monthlyActiveTab={this.state.selectedMonth} /></Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020' />}><MonthTabs year='2020' monthlyActiveTab={this.state.selectedMonth} /></Tab>
        </Tabs>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        <table>
          <thead>
            <tr><th></th><th className='desc-col'>Description</th><th className='button-col'>Amount</th><th className='button-col'>Month</th><th className='button-col'>Year</th><th className='button-col'>Update</th><th className='button-col'>Delete</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map((exp) => {
                return <tr><td className='counterCell'></td><td className='desc-col'>{exp.description}</td><td className='button-col'>{exp.amount}</td><td className='button-col'>{exp.month}</td><td className='button-col'>{exp.year}</td><td className='button-col'><Update expense={exp} /></td><td className='button-col'><Delete expense={exp} /></td></tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}