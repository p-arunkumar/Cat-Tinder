import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

class CatProfile extends Component {

	// deleteCat(props) {
	// 	const { apiUrl } = this.state
 //  		return fetch(`${apiUrl}/cats/${cat.id}`, {
    // 		method: 'POST'
 //  		}).then((raw) => {
    // 	return raw.json()
	// 	}).then(() =>{
	// 		const cats = Object.assign([], this.state.cats)
	//
	// 		cats.slice(this.state.cats.findIndex(index => index.id == cat.id))
	//
	// 		this.setState({
	// 			cats: cats,
	// 			errors: null,
	// 			fireRedirect: true
	// 		})
	// 	})
	// }



	render() {
		return (
			<div className="profileContent">
					<h6> Warning: you got cat-fished!</h6>
					<img src={"../images/" + Math.round(Math.random()*10) + ".jpg"} className="img-circle" alt='da cat'/>
					<div className = "profileText">
						<h1 className='cat-name'>
								{this.props.cat.name}
						</h1>
						<small className='cat-age'>{this.props.cat.age} years old</small>

						<div className='cat-city'>
							<p>Location: {this.props.cat.city}</p>
						</div>

						<div className='cat-enjoys'>
							<p>Enjoys: {this.props.cat.enjoys}</p>
						</div>
					</div>

					<Button onClick = {this.handleDelete.bind(this)}>
					Delete this profile
					</Button>

			</div>
		);
	}

	handleDelete() {
		this.props.deleteCat(this.props.cat.id)
	}

  }


export default CatProfile
