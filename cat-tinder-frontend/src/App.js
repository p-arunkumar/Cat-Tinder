import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Link} from 'react-router-dom'
import {
	Grid,
	PageHeader,
	Row
} from 'react-bootstrap'
import Cats from './pages/Cats'
import NewCat from './pages/NewCat'
import CatProfile from './pages/CatProfile'
import './App.css'

class App extends Component {
  constructor(props){
      super(props)

      this.state = {
        cats: [],
		apiUrl: "http://localhost:3000",
		fireRedirect: undefined,
    	errors: null
      }
    }

	componentWillMount() {
		const { apiUrl } = this.state

		fetch(`${apiUrl}/cats`)
			.then((rawResponse) => {
				return rawResponse.json()
			})
			.then((parsedResponse) => {
				this.setState({cats: parsedResponse.cats})
			})
	}

	handleNewCat(params) {
		const { apiUrl } = this.state

		fetch(`${apiUrl}/cats`, {
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			},
			method: "POST"
		})
		.then((raw)=> {
			return raw.json()
		})
		.then((resp) => {
			if(resp.errors){
				this.setState({errors: resp.errors})
			} else {
				const cats = Object.assign([], this.state.cats)

				cats.push(resp.cat)

				this.setState({
					cats: cats,
					errors: null,
					fireRedirect: true
				})
			}
		})
	}

	deleteCat(props) {
		console.log("Clicked");
		const { apiUrl } = this.state
  		fetch(`${apiUrl}/cat/${props}/destroy`, {
    		method: 'POST'
  		}).then((res) => {
			window.location = "/cats"
			// console.log(res.status)
			// if(res.status == 200 || 201){
			// 	console.log("success")
			// 	const cats = Object.assign([], this.state.cats)
			// 	console.log(cats);
			// 	cats.splice(cats.findIndex(cat => cat.id == props), 1)
			// 	this.setState({
			// 		cats:cats
			// 	})
			// }
		}).catch((error) => {
			console.log(error);
		})
		// .then((res) => {
    	// return res.json()
		// }).then(() => {
		// 	const cats = Object.assign([], this.state.cats)
		//
		// 	cats.splice(this.state.cats.findIndex(cat => cat.id == props))
		//
		// 	this.setState({
		// 		cats: cats,
		// 		errors: null,
		// 		fireRedirect: true
		// 	})
		//
		// 	console.log(this.state.cats);
		// })
	}

  render() {
    const { cats, fireRedirect } = this.state

	if(fireRedirect) {
		this.setState({fireRedirect: undefined})
	}

    return (
      <Router>
        <div className = 'catsList'>
          <Route exact path="/" render={props => (
            <Grid>
              <PageHeader className="pageHeader">
			  <img src='./cat.jpg' alt = "catz"/>
                <Row>
                    Cat Tinder:
                    <small className='subtitle'> Create a Cat Profile</small>
				</Row>

              </PageHeader>
			  <NewCat
   				onSubmit={this.handleNewCat.bind(this)}
				errors={this.state.errors && this.state.errors.validations}/>
			{this.state.fireRedirect &&
      		<Redirect to="/cats" />
	    	}
			<PageHeader className="pageHeader">
				<Row>
					<small>
					  <Link to='/cats' id='cats-link'>Show me the Cats</Link>
					</small>
				</Row>
			</PageHeader>
            </Grid>
          )} />

          <Route exact path="/cats" render={props => (
          <Grid>
            <PageHeader className="pageHeader">
			<img src='./cat.jpg' alt = "catz"/>
              <Row>
                  Cat Tinder:
                  <small className='subtitle'> Meet the Cats</small>

              </Row>
            </PageHeader>
			<div className='showCatsList'>
            <Cats cats={cats} />
			{this.state.fireRedirect && (
				<Redirect to="/" />
		    )}
			</div>
			<PageHeader className="pageHeader">
				<Row>
					  <small>
						<Link to='/' id='cats-link'>Add a Cat</Link>
					  </small>
				</Row>
			</PageHeader>
          </Grid>
        )} />

		<Route path="/cat/:id" render={props => (
		<Grid>
		  <PageHeader className="pageHeader">
		  <img src='../cat.jpg' alt = "catz"/>
			<Row>
				Cat Tinder:
				<small className='subtitle'> Profile </small>

			</Row>
		  </PageHeader>
		  <div className='showCatsList'>
			<CatProfile deleteCat = {this.deleteCat.bind(this)} cat={this.state.cats[this.state.cats.findIndex(cat => cat.id == props.match.params.id)]} />
		  </div>
		  <PageHeader className="pageHeader">
			  <Row>
					<small>
					  <Link to='/' id='cats-link'>Add a Cat</Link>
					</small>
			  </Row>
			  <Row>
					<small>
					  <Link to='/cats' id='cats-link'>Meet the Cats</Link>
					</small>
			  </Row>
		  </PageHeader>
		</Grid>
	  )} />
        </div>
      </Router>
    );
  }
}

export default App;
