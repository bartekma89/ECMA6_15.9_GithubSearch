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
		key: 'onSubmit',
		value: function onSubmit(event) {
			event.preventDefault();
			var url = 'https://api.github.com/search/users?q=' + this.state.text;
			fetch(url).then(function (response) {
				return response.json();
			}).then(function (responseJson) {
				return console.log(responseJson);
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
					null,
					React.createElement(
						'label',
						null,
						'Github user serach'
					),
					React.createElement('input', { type: 'text', value: this.state.text, onChange: this.onFieldChange.bind(this) }),
					React.createElement(
						'button',
						{ type: 'submit', onSubmit: this.onSubmit.bind(this) },
						'Search'
					)
				)
			);
		}
	}]);

	return Search;
}(React.Component);

ReactDOM.render(React.createElement(Search, null), document.getElementById('root'));
