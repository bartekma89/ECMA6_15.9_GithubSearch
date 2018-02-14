class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usersList: [],
			text: ''
		}
	}

	onFieldChange(event) {
		const value = event.target.value;
		this.setState({
			text: value
		})
	}

	onFormSubmit(event) {
		event.preventDefault();
		const { text } = this.state;
		const url = `https://api.github.com/search/users?q=${text}`;
		fetch(url)
		.then( response => {
				if(response.ok) {
					return response.json();
				} else {
					throw new Error('Wystapil blad: ', err)
				}
		})
		.then( responseJson => {
			this.setState({usersList: responseJson.items});
			console.log(this.state.usersList);
		})
		.catch( error => console.dir(error))
	}

	render() {
		return (
				<div>
					<form onSubmit={this.onFormSubmit.bind(this)}>
						<label>Github users search: </label>
						<input placeholder="User name..." value={this.state.text} onChange={this.onFieldChange.bind(this)} />
						<button type='submit'>Search</button>
					</form>
					<ul>
						{this.state.usersList.map( user => {
							return (
									<div key={user.id}>
										<li>
											<img src={user.avatar_url} />
											<a href={user.html_url} target="_blank">{user.login}</a>
										</li>
									</div>
								)
						})}
					</ul>
				</div>
			)
	}
}

ReactDOM.render(<Search />, document.getElementById('root'));