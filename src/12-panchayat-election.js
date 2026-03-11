/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Your code here
  const votes = {};
  const registeredVoters = new Set();
  const electionManager = {
    registerVoter(voter) {
      if (
        !voter ||
        typeof voter !== "object" ||
        Object.keys(voter).length === 0
      )
        return false;
      if ([...registeredVoters].some((item) => item.id === voter.id))
        return false;
      if (voter.age < 18) return false;
      registeredVoters.add({
        id: voter.id,
        name: voter.name,
        age: voter.age,
      });
      return true;
    },

    castVote(voterId, candidateId, onSuccess, onError) {
      let valid = true;
      let err = "";
      if (![...registeredVoters].some((item) => item.id === voterId)) {
        err = "voter not registerd";
        valid = false;
      }
      if (!candidates.some((c) => c.id === candidateId)) {
        err = "candidate does not exist";
        valid = false;
      }
      if (Object.values(votes).some((v) => v.voterId === voterId)) {
        err = "voter already voted";
        valid = false;
      }

      if (valid) {
        votes[voterId] = { voterId, candidateId };
        return onSuccess({ voterId, candidateId });
      }
      return onError(err);
    },

    getResults(sortFn) {
      const resultArr = candidates.map((cad) => {
        const voteCount = Object.values(votes).reduce(
          (count, curr) => (curr.candidateId === cad.id ? count + 1 : count),
          0,
        );
        return {
          ...cad,
          votes: voteCount,
        };
      });
      if (!sortFn) return resultArr.sort((a, b) => b.votes - a.votes);
      return resultArr.sort(sortFn);
    },
    getWinner() {
      if (Object.keys(votes).length === 0) return null;
      const candidateWithVotes = this.getResults();
      const winner = candidates.find((e) => e.id === candidateWithVotes[0].id);
      return winner;
    },
  };

  return electionManager;
}

export function createVoteValidator(rules) {
  // Your code here
  const validation = (voter) => {
    if (voter.age < rules.minAge) {
      return { valid: false, reason: "age less than minimum age" };
    }
    if (
      !rules.requiredFields.every((prop) => Object.keys(voter).includes(prop))
    ) {
      return { valid: false, reason: "Invalid voter object" };
    }
    return { valid: true, reason: "" };
  };
  return validation;
}

export function countVotesInRegions(regionTree) {
  // Your code here
  if (!regionTree || typeof regionTree !== "object") return 0;
  const validFields = ["name", "votes", "subRegions"];
  if (!validFields.every((prop) => Object.keys(regionTree).includes(prop)))
    return 0;
  const validSubRegion = Array.isArray(regionTree.subRegions);
  if (!validSubRegion) return 0;
  const votes = regionTree.votes;
  const subRegionVotes = regionTree.subRegions.reduce(
    (acc, curr) => acc + countVotesInRegions(curr),
    0,
  );
  return votes + subRegionVotes;
}

export function tallyPure(currentTally, candidateId) {
  // Your code here
  return {
    ...currentTally,
    [candidateId]: (currentTally[candidateId] || 0) + 1,
  };
}
