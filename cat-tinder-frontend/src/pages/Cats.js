import React, { Component } from 'react';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Cats extends Component {
  render() {
	const { cats } = this.props

	if(!cats.length) {
		return (
			<h2>Oops! - No Cats Found!</h2>
		);
	} else {
		return (
			<Row>
				<Col xs={12}>
					<ListGroup>
						{cats.map((cat, index) => {
							return (
								<Link to={'/cat/' + cat.id} key={index}>
									<ListGroupItem className='listClass'
										key={index}
										header={
											<h4>
												<span className='cat-name'>
													{cat.name}
												</span>
												<small className='cat-age'>, {cat.age} years old</small>
												<small className='cat-city'>, {cat.city}</small>
											</h4>
										}>
									
										<div className = "container2">
											<img src={"../images/" + Math.round(Math.random()*10) + ".jpg"} className="img-circle" alt='da cat'/>
										</div>

									</ListGroupItem>

								</Link>
							)
						})}
					</ListGroup>
				</Col>
			</Row>
		);
	}
}

}

export default Cats
