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
					<UsersList users={this.state.usersList} />
				</div>
			)
	}
}

class UsersList extends React.Component {

	get users() {
		return this.props.users.map( user => <User key={user.id} user={user} />)
	}

	render() {
		return (
			<div>
				{this.users}
			</div>
		)
	}

}

const User = (props) => {
		return (
			<div>
				<img src={props.user.avatar_url} stype={{maxWidth: '100px'}} />
				<a href={props.user.html_url} target="_blank">{props.user.login}</a>
			</div>
		)
}


ReactDOM.render(<Search />, document.getElementById('root'));