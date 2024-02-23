import React from 'react';

const ContestComparison = ({ user1Contests, user2Contests }) => {
  // Find common contests
  const commonContests = user1Contests.filter((contest1) =>
    user2Contests.some((contest2) => contest1.contest.title === contest2.contest.title)
  );

  return (
    <div>
      {commonContests.length === 0 ? (
        <div style={{ color: 'white' }}>
          "kuch common contests ni hai"
        </div>
      ) : (
        <>
          <h2 style={{ color: 'white' }}>Common Contests and Rankings</h2>
          <table style={{ color: 'black', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Contest</th>
                <th>{localStorage.getItem('userId')}'s Rank</th>
                <th>{localStorage.getItem('userId2')}'s Rank</th>
              </tr>
            </thead>
            <tbody>
              {commonContests.map((commonContest) => {
                // Find the corresponding contest for user2
                const user2Contest = user2Contests.find(
                  (contest2) => contest2.contest.title === commonContest.contest.title
                );

                const user1Ranking = commonContest.ranking;
                const user2Ranking = user2Contest ? user2Contest.ranking : 'N/A';

                return (
                  <tr
                    key={commonContest.contest.title}
                    style={{
                      margin: '5px',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    <td>{commonContest.contest.title}</td>
                    <td style={{ color: user1Ranking < user2Ranking ? 'green' : 'red' }}>
                      {user1Ranking}
                    </td>
                    <td style={{ color: user2Ranking < user1Ranking ? 'green' : 'red' }}>
                      {user2Ranking}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ContestComparison;