import React from 'react'
import './App.css'

let recipes = (typeof localStorage['recipes'] !== 'undefined') 
				? JSON.parse(localStorage['recipes'])
				: [
					{name: 'Pizza',
					ingredients: ['Bread Crust', 'Cheese', 'Tomatoes', 'Capsicum', 'Onions', 'Meat']},

					{name: 'Strawberry Milkshake',
					ingredients: ['Cold Milk', 'Ice Cream', 'Strawberry']}
				]

localStorage.setItem('recipes', JSON.stringify(recipes))

const Button = (props) => <button className={props.cl} onClick={() => props.handler(props.idx)} data-toggle={props.dataToggle} data-target={props.dataTarget}>{props.children}</button>

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newRecipeName: '',
			newRecipeIngredients: [],
			recipes: recipes
		}
	}

	addName(e) {
		this.setState({newRecipeName: e.target.value})
	}

	addIngredients(e) {
		this.setState({newRecipeIngredients: e.target.value.split(',')})
	}

	addRecipe() {
		localStorage.setItem('recipes', JSON.stringify(this.state.recipes.concat({
			name: this.state.newRecipeName,
			ingredients: this.state.newRecipeIngredients
			}
		)))

		this.setState({recipes: this.state.recipes.concat({
			name: this.state.newRecipeName,
			ingredients: this.state.newRecipeIngredients,
		}),
		newRecipeName: '',
		newRecipeIngredients: []
		})
	}

	deleteRecipe(idx) {
		var recipes = JSON.parse(localStorage['recipes'])
		recipes.splice(idx, 1)
		localStorage.setItem('recipes', JSON.stringify(recipes))
		this.setState({recipes})
	}

	editRecipe(idx) {
		console.log('edit', idx);
		document.getElementById('edit-name').value = this.state.recipes[idx].name
		document.getElementById('edit-ingredients').value = this.state.recipes[idx].ingredients

		var self = this

		const editState = (recipes, self) => {
			self.setState({recipes: recipes})
		}

		document.getElementById('edit-recipe').onclick = function() {

			var name = document.getElementById('edit-name').value
			var ingredients = document.getElementById('edit-ingredients').value

			var recipes = JSON.parse(localStorage['recipes'])

			recipes[idx]['name'] = name
			recipes[idx]['ingredients'] = ingredients.split(',')

			localStorage.setItem('recipes', JSON.stringify(recipes))

			editState(recipes, self)
		}
		
	}

  	render() {
  		let recipes = this.state.recipes

  		return (
  			<div className="container-fluid">
  				<div className="row">
  				<div className="col-md-1 col-sm-0 col-xs-0"></div>
  				<div className="col-md-10 col-sm-12 col-xs-12">
  				

  				<h1>Your recipes</h1>
  				{recipes.map((item, idx) => (
  					<div key={idx}>

					<div className="panel-group" id="accordion">
						<div className="panel panel-default">
							<div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target={"#collapse" + idx}>
								<h4 className="panel-title">
									<a className="accordion-toggle">
										{item.name}
									</a>
								</h4>
							</div>
							<div id={"collapse" + idx} className="panel-collapse collapse">
								<div className="panel-body">
									<ul>
										{item.ingredients.map((ing, idx) => (
											<li key={idx}>{ing}</li>
										))}
									</ul>

									<Button cl="btn btn-danger" idx={idx} handler={this.deleteRecipe.bind(this)}>Delete</Button>
									<span>&nbsp;&nbsp;</span>
									<Button cl="btn btn-info" idx={idx} handler={this.editRecipe.bind(this)} dataToggle="modal" dataTarget="#myModal">Edit</Button>
								</div>
							</div>
						</div>
					</div>
	  					


  					</div>
  				))}
  				<br />
  				<h1>Add a new recipe</h1>
  				<input className="form-control" onChange={this.addName.bind(this)} type="text" value={this.state.newRecipeName} />

  				<br />
  				<br />

  				<textarea className="form-control" onChange={this.addIngredients.bind(this)} cols="50" rows="10" value={this.state.newRecipeIngredients}></textarea>

  				<br />

  				<button type="button" className="btn btn-success" onClick={this.addRecipe.bind(this)}>Submit</button>

  			</div>
			<div className="col-md-1 col-sm-0 col-xs-0"></div>
  			</div>


  			</div>
  		)
  	}
}

export default App
