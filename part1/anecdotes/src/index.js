import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const GetNextAnecdotes = ({ setSelected }) => {
  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
  return (
    <button onClick={()=> setSelected(getRandomInt(5)) }>next anecdotes</button>
  )
}
const VoteResult = ({ votes, anecdotes, mostVotedIndex }) =>{

  return (
    <>
      <div>Anecdotes with most votes</div>
      <div>{ anecdotes[mostVotedIndex] } </div>
      <div>has { votes[mostVotedIndex] } votes</div>
    </>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [voteNumSet, setVoteNumSet] = useState(Array(anecdotes.length).fill(0));
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const onVote = () => {
    let currentMostVotesIndex = mostVotedIndex;
    const copy = [...voteNumSet];
    copy[selected]++;
    setVoteNumSet(copy);
    copy.forEach((v, i)=>{
      if(copy[currentMostVotesIndex] < v ) currentMostVotesIndex = i;
    });
    if(mostVotedIndex !== currentMostVotesIndex) setMostVotedIndex(currentMostVotesIndex);
  }

  return (
    <>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>has {voteNumSet[selected]} votes</div>
      <button onClick={ onVote }>vote</button>
      <GetNextAnecdotes setSelected={ setSelected } />
      <VoteResult votes={voteNumSet} anecdotes={ props.anecdotes } mostVotedIndex={ mostVotedIndex } />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)