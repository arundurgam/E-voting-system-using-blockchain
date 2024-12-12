import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import './voting.css'; // Import the CSS file with your styles
import VotingContract from './Voting.json';

// Correct the image imports based on your provided paths
import BJPLogo from './bjp.jpg'; // Use the correct relative path
import CongressLogo from './congress.png'; // Use the correct relative path
import NotaLogo from './nota.png'; // Adjust the path

const Voting = ({ aadhar, onLogout }) => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const init = async () => {
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = VotingContract.networks[networkId];
            const contract = new web3.eth.Contract(
                VotingContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            const candidatesCount = await contract.methods.candidatesCount().call();

            const candidates = [];
            for (let i = 0; i < candidatesCount; i++) {
                const candidate = await contract.methods.candidates(i).call();
                candidates.push(candidate);
            }

            setWeb3(web3);
            setContract(contract);
            setCandidates(candidates);
        };

        init();
    }, []);

    const vote = async (candidateId) => {
        try {
            await contract.methods.vote(candidateId).send({
                from: (await web3.eth.getAccounts())[0],
            });

            // Mark the user as having voted in the backend
            await axios.post('http://localhost:3110/mark_voted', { aadhar });

            alert('Vote recorded. Thank you for voting.');
            
            // Log out the user
            onLogout();
        } catch (error) {
            alert('An error occurred while voting.');
        }
    };

    return (
        <div>
            <h2>Welcome for Voting</h2>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index} className={candidate.name === 'BJP' ? 'bjp-candidate' : 'congress-candidate'}>
                        {candidate.name === 'BJP' && (
                            <img src={BJPLogo} alt="BJP Logo" className="candidate-logo" />
                        )}
                        {candidate.name === 'Congress' && (
                            <img src={CongressLogo} alt="Congress Logo" className="candidate-logo" />
                        )}
                        {candidate.name === 'Nota' && (
                            <img src={NotaLogo} alt="Nota Logo" className="candidate-logo" />
                        )}

                        <div className="candidate-info">
                            <span className="candidate-vote">{candidate.voteCount}</span>
                        </div>

                        <button onClick={() => vote(index)}>Vote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Voting;
