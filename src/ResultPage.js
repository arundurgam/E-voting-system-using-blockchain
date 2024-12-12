import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import VotingContract from './Voting.json'; 

const ResultPage = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        const web3Instance = new Web3("http://127.0.0.1:7545");
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);


        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const votingContract = new web3Instance.eth.Contract(
          VotingContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(votingContract);
      } catch (error) {
        console.error("Error connecting to blockchain:", error);
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const loadCandidatesAndVotes = async () => {
      if (contract) {
        try {
          const candidatesArray = await contract.methods.getCandidateNames().call();
          setCandidates(candidatesArray);

          // Load votes
          const votesArray = await contract.methods.getCandidateVotes().call();
          setVotes(votesArray.map(vote => vote.toString())); // Convert BigInt to string
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    };

    loadCandidatesAndVotes();
  }, [contract]);

  return (
    <div className="result-page">
      <h1>Voting Results</h1>
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Vote Count</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 && votes.length > 0 ? (
            candidates.map((candidate, index) => (
              <tr key={index}>
                <td>{candidate}</td>
                <td>{votes[index]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No candidates found or votes not loaded.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultPage;
