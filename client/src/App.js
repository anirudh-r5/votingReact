import React, { Component } from 'react';
import { Divider, message } from 'antd';
import ElectionContract from './contracts/Election.json';
import getWeb3 from './getWeb3';
import NoAdmin from './components/noAdmin';
import AdminDash from './components/adminDash';
import UserVote from './components/userVote';
import PageHeader from './components/pageHeader';
import PageFooter from './components/pageFooter';

import 'antd/dist/antd.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			web3: null,
			accounts: null,
			contract: null,
			admin: null,
			names: null,
			voted: null,
		};
	}

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = ElectionContract.networks[networkId];
			const instance = new web3.eth.Contract(
				ElectionContract.abi,
				deployedNetwork && deployedNetwork.address,
			);
			this.setState({ web3, accounts, contract: instance });
			const count = await this.state.contract.methods.candidatesCount().call();
			const names = [];
			for (let i = 1; i <= count; i++) {
				const temp = await this.state.contract.methods.candidates(i).call();
				names.push(temp);
			}
			this.setState({ names: names });
			const status = await this.state.contract.methods.getAdmin().call();
			this.setState({ admin: status });
			const login = await this.state.contract.methods.voters(accounts[0]).call();
			this.setState({ voted: login });
		}
		catch (error) {
			// Catch any errors for any of the above operations.
			// eslint-disable-next-line no-undef
			alert(
				'Failed to load web3, accounts, or contract. Check console for details.',
			);
			console.error(error);
		}
	};

	addNames = async (names) => {
		const { contract, accounts } = this.state;
		message.loading('Adding Candidates...', 3);
		names.forEach(async (ele) => {
			await contract.methods.addCandidate(ele.first).send({ from: accounts[0] });
		});
		setTimeout(window.location.reload(), 3000);
	};

	getNames = async () => {
		const { contract } = this.state;
		const count = await contract.methods.candidatesCount().call();
		const names = [];
		for (let i = 1; i <= count; i++) {
			const temp = await contract.methods.candidates(i).call();
			names.push(temp);
		}
		return names;
	};

	setAdmin = async (addr) => {
		const { accounts, contract } = this.state;
		await contract.methods.setAdmin(addr[0]).send({ from: accounts[0] });
		const status = await contract.methods.getAdmin().call();
		this.setState({ admin: status });
	};

	castVote = async (vote) => {
		const { accounts, contract } = this.state;
		const loader = message.loading('Casting your vote', 0);
		await contract.once('votedEvent', {}, () => {
			message.success('Vote Casted', 1);
			setTimeout(window.location.reload(), 500);
		});
		await contract.methods.vote(vote).send({ from:accounts[0] });
		setTimeout(loader, 10);
	}

	render() {
		let content;
		if (!this.state.web3) {
			content = <div>Loading Web3, accounts, and contract...</div>;
		}
		else if (!this.state.admin || this.state.admin == 0x0) {
			content = <NoAdmin account={this.state.accounts} click={this.setAdmin} />;
		}
		else if (this.state.admin === this.state.accounts[0]) {
			content = <AdminDash addNames={this.addNames} names={this.state.names}/>;
		}
		else {
			content = <UserVote names={this.state.names} vote={this.castVote} voted={this.state.voted}/>;
		}
		return (
			<div className="App">
				<Divider />
				<PageHeader />
				{content}
				<PageFooter account={this.state.accounts} />
			</div>
		);
	}
}

export default App;
