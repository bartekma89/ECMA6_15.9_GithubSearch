'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
	_inherits(Search, _React$Component);

	function Search(props) {
		_classCallCheck(this, Search);

		var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

		_this.state = {
			usersList: [],
			text: ''
		};
		return _this;
	}

	_createClass(Search, [{
		key: 'onFieldChange',
		value: function onFieldChange(event) {
			var value = event.target.value;
			this.setState({
				text: value
			});
		}
	}, {
		key: 'onFormSubmit',
		value: function onFormSubmit(event) {
			var _this2 = this;

			event.preventDefault();
			var text = this.state.text;

			var url = 'https://api.github.com/search/users?q=' + text;
			fetch(url).then(function (response) {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Wystapil blad: ', err);
				}
			}).then(function (responseJson) {
				_this2.setState({ usersList: responseJson.items });
				console.log(_this2.state.usersList);
			}).catch(function (error) {
				return console.dir(error);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'form',
					{ onSubmit: this.onFormSubmit.bind(this) },
					React.createElement(
						'label',
						null,
						'Github users search: '
					),
					React.createElement('input', { placeholder: 'User name...', value: this.state.text, onChange: this.onFieldChange.bind(this) }),
					React.createElement(
						'button',
						{ type: 'submit' },
						'Search'
					)
				),
				React.createElement(UsersList, { users: this.state.usersList })
			);
		}
	}]);

	return Search;
}(React.Component);

var UsersList = function (_React$Component2) {
	_inherits(UsersList, _React$Component2);

	function UsersList() {
		_classCallCheck(this, UsersList);

		return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
	}

	_createClass(UsersList, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.users
			);
		}
	}, {
		key: 'users',
		get: function get() {
			return this.props.users.map(function (user) {
				return React.createElement(User, { key: user.id, user: user });
			});
		}
	}]);

	return UsersList;
}(React.Component);

var User = function User(props) {
	return React.createElement(
		'div',
		null,
		React.createElement('img', { src: props.user.avatar_url }),
		React.createElement(
			'a',
			{ href: props.user.html_url, target: '_blank' },
			props.user.login
		)
	);
};

ReactDOM.render(React.createElement(Search, null), document.getElementById('root'));
